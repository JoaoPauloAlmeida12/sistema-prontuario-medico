import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {useServerFn} from '@tanstack/react-start'
import {searchPatients} from '@/lib/clinic.functions'
import {Button} from '@/components/ui/button'
export function PatientPicker({c,selected='',name='patient',demoPatients}:{c:string;selected?:string;name?:string;demoPatients?:Array<{id:string;name:string;identifier:string}>}){
 const [term,setTerm]=useState(''),[page,setPage]=useState(0);const fetch=useServerFn(searchPatients)
 const result=useQuery({queryKey:['patient-picker',c,term,page],queryFn:()=>fetch({data:{c,term,page_number:page}}),enabled:!demoPatients})
 const rows=demoPatients?demoPatients.filter(p=>(p.name+' '+p.identifier).toLowerCase().includes(term.toLowerCase())).slice(page*25,page*25+25):result.data
 return <><label className="field">Pesquisar paciente<input value={term} onChange={e=>{setTerm(e.target.value);setPage(0)}}/></label><label className="field">Paciente<select key={page+term} name={name} required defaultValue={selected}><option value="">Selecionar paciente</option>{selected&&!rows?.some(p=>p.id===selected)&&<option value={selected}>Paciente selecionado</option>}{rows?.map(p=><option key={p.id} value={p.id}>{p.name} · {p.identifier}</option>)}</select></label>{result.error&&!demoPatients&&<p role="alert">Falha na pesquisa.</p>}<div className="pagination"><Button type="button" variant="outline" disabled={!page} onClick={()=>setPage(page-1)}>Anterior</Button><Button type="button" variant="outline" disabled={(rows?.length??0)<25} onClick={()=>setPage(page+1)}>Próxima</Button></div></>
}