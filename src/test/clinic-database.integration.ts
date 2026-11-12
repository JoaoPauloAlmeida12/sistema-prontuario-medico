import {createClient} from '@supabase/supabase-js';import {randomUUID,randomBytes} from 'node:crypto';
const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY,pub=process.env.SUPABASE_PUBLISHABLE_KEY;if(!url||!key||!pub)throw Error('Configuration missing');
const make=(k:string)=>createClient(url,k,{auth:{persistSession:false},global:{fetch:(i,n)=>{const h=new Headers(n?.headers);h.set('apikey',k);if(k.startsWith('sb_')&&h.get('Authorization')===`Bearer ${k}`)h.delete('Authorization');return fetch(i,{...n,headers:h})}}});
const admin=make(key);function assert(x:unknown,msg:string){if(!x)throw Error(msg);console.log('PASS',msg)}
const {data:clinic,error:ce}=await admin.from('clinics').insert({name:'Teste isolado — não utilizar',is_demo:true}).select().single();if(ce)throw Error(ce.message);
const accounts=[];
for(const role of ['doctor','reception']){const password=randomBytes(30).toString('base64url'),email=`test-${role}-${randomUUID()}@example.com`;const {data,error}=await admin.auth.admin.createUser({email,password,email_confirm:true});if(error)throw Error(error.message);const u=data.user;await admin.from('user_roles').insert({user_id:u.id,clinic_id:clinic.id,role});const client=make(pub);const r=await client.auth.signInWithPassword({email,password});if(r.error)throw Error(r.error.message);accounts.push({role,client,user:u.id})}
const doctor=accounts[0].client,reception=accounts[1].client;
const {data:patient,error:pe}=await reception.from('patients').insert({clinic_id:clinic.id,name:'Paciente fictício de teste',birth_date:'1990-01-01'}).select().single();assert(!pe,'Reception creates administrative patient');
const persisted=await doctor.from('patients').select().eq('id',patient.id);assert(persisted.data?.length===1,'Patient reads back through doctor identity');
const appointment={clinic_id:clinic.id,patient_id:patient.id,professional_id:accounts[0].user,service:'Teste',starts_at:'2026-11-12T23:30:00-03:00',ends_at:'2026-11-13T00:30:00-03:00',modality:'presencial'};
const a=await doctor.from('appointments').insert(appointment).select().single();assert(!a.error,'Cross-day appointment accepted');
const conflict=await reception.from('appointments').insert({...appointment,starts_at:'2026-11-13T00:00:00-03:00',ends_at:'2026-11-13T01:00:00-03:00'});assert(!!conflict.error,'Overlapping cross-day appointment rejected by database');
const denied=await reception.from('encounters').insert({clinic_id:clinic.id,patient_id:patient.id});assert(!!denied.error,'Reception clinical insert blocked');
const {data:e,error:ee}=await doctor.from('encounters').insert({clinic_id:clinic.id,patient_id:patient.id,content:{Subjetivo:'Texto fictício'}}).select().single();assert(!ee,'Doctor creates persistent clinical draft');
const hidden=await reception.from('encounters').select().eq('id',e.id);assert(hidden.data?.length===0,'Reception direct API cannot read clinical content');
const final=await doctor.from('encounters').update({status:'finalizado',version:2}).eq('id',e.id);assert(!final.error,'Doctor finalizes reviewed version');
const overwrite=await doctor.from('encounters').update({content:{Subjetivo:'Overwrite'},version:3}).eq('id',e.id);assert(!!overwrite.error,'Finalized record overwrite rejected');
const deleted=await doctor.from('encounters').delete().eq('id',e.id);const remains=await doctor.from('encounters').select().eq('id',e.id);assert(remains.data?.length===1,'Finalized deletion blocked');
const add=await doctor.from('addenda').insert({clinic_id:clinic.id,encounter_id:e.id,reason:'Correção de teste',content:'Adendo fictício'});assert(!add.error,'Doctor adds append-only addendum');
const promotion=await reception.from('user_roles').update({role:'doctor'}).eq('user_id',accounts[1].user);const unchanged=await reception.from('user_roles').select('role').eq('user_id',accounts[1].user).single();assert(unchanged.data?.role==='reception','Reception cannot elevate own role');
const {data:t}=await reception.from('financial_titles').insert({clinic_id:clinic.id,description:'Teste',category:'Teste',direction:'receber',amount_cents:30000,due_date:'2026-11-12'}).select().single();
const {data:s}=await reception.from('settlements').insert({clinic_id:clinic.id,title_id:t.id,amount_cents:10000,paid_at:'2026-11-12',method:'Teste'}).select().single();const second=await reception.from('settlements').insert({clinic_id:clinic.id,title_id:t.id,amount_cents:15000,paid_at:'2026-12-02',method:'Teste'});assert(!second.error,'Partial payments on separate dates');
const r=await reception.from('reversals').insert({clinic_id:clinic.id,settlement_id:s.id,amount_cents:3000,reversed_at:'2026-12-05',reason:'Teste'});assert(!r.error,'Partial reversal linked to original settlement');
const excess=await reception.from('reversals').insert({clinic_id:clinic.id,settlement_id:s.id,amount_cents:10000,reversed_at:'2026-12-05',reason:'Teste'});assert(!!excess.error,'Excess reversal rejected');
const path=clinic.id+'/'+randomUUID()+'/test.txt';const up=await doctor.storage.from('clinical-originals').upload(path,new Blob(['Fictitious test content']),{contentType:'text/plain'});assert(!up.error,'Doctor uploads private original');
const nofile=await reception.storage.from('clinical-originals').createSignedUrl(path,60);assert(!!nofile.error,'Reception cannot obtain private file URL');
const yesfile=await doctor.storage.from('clinical-originals').createSignedUrl(path,60);assert(!yesfile.error,'Doctor obtains expiring original URL');
const anonymous=make(pub);const anon=await anonymous.from('patients').select();assert(!!anon.error||anon.data?.length===0,'Anonymous direct API cannot read patients');
await admin.storage.from('clinical-originals').remove([path]);
for(const table of ['audit_events','reversals','settlements','financial_titles','documents','addenda','encounter_versions','encounters','appointments','patients','user_roles']){const clean=await admin.from(table).delete().eq('clinic_id',clinic.id);if(clean.error)console.log('Cleanup pending:',table)}
await admin.from('clinics').delete().eq('id',clinic.id);for(const a of accounts)await admin.auth.admin.deleteUser(a.user);
console.log('Isolated test data removed');
