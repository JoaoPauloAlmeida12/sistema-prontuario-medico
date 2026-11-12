import { createServerFn } from '@tanstack/react-start'
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware'
export const getClinic = createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:membership,error} = await context.supabase.from('user_roles').select('*').eq('user_id',context.userId).single()
 if(error || !membership) throw new Error('Esta conta ainda não possui acesso à clínica.')
 const c=membership.clinic_id
 const [clinic,patients,appointments,titles,settlements,reversals,encounters,documents,addenda,services] = await Promise.all([
 context.supabase.from('clinics').select('*').eq('id',c).single(),
 context.supabase.from('patients').select('*').eq('clinic_id',c).order('name').limit(1000),
 context.supabase.from('appointments').select('*').eq('clinic_id',c).order('starts_at').limit(1000),
 context.supabase.from('financial_titles').select('*').eq('clinic_id',c).limit(1000),
 context.supabase.from('settlements').select('*').eq('clinic_id',c).limit(1000),
 context.supabase.from('reversals').select('*').eq('clinic_id',c).limit(1000),
 context.supabase.from('encounters').select('*').eq('clinic_id',c).order('created_at',{ascending:false}).limit(1000),
 context.supabase.from('documents').select('*').eq('clinic_id',c).order('created_at',{ascending:false}).limit(1000),
 context.supabase.from('addenda').select('*').eq('clinic_id',c).limit(1000),
 context.supabase.from('services').select('*').eq('clinic_id',c).limit(1000)])
 for(const result of [clinic,patients,appointments,titles,settlements,reversals,encounters,documents,addenda,services]) if(result.error) throw new Error('Não foi possível carregar os registros autorizados.')
 if(!clinic.data) throw new Error('Clínica indisponível.')
 return {membership,clinic:clinic.data,patients:patients.data??[],appointments:appointments.data??[],titles:titles.data??[],settlements:settlements.data??[],reversals:reversals.data??[],encounters:encounters.data??[],documents:documents.data??[],addenda:addenda.data??[],services:services.data??[]}
})
export type ClinicData = Awaited<ReturnType<typeof getClinic>>