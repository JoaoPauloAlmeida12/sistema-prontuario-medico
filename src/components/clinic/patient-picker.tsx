import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import {useServerFn} from '@tanstack/react-start'
import {searchPatients} from '@/lib/clinic.functions'
import {Button} from '@/components/ui/button'
export function PatientPicker({c,selected='',name='patient'}:{c:string;selected?:string;name?:string}){
 const [term,setTerm]=useState(''),[page,setPage]=useState(0);const fetch=useServerFn(searchPatients)
 const result=useQuery({queryKey:['patient-picker',c,term,page],queryFn:()=>fetch({data:{c,term,page_number:page}})})
 return <><label className="field">Pesquisar paciente<input value={term} onChange={e=>{setTerm(e.target.value);setPage(0)}}/></label><label className="field">Paciente<select key={page+term} name={name} required defaultValue={selected}><option value="">Selecionar paciente</option>{selected&&!result.data?.some(p=>p.id===selected)&&<option value={selected}>Paciente selecionado</option>}{result.data?.map(p=><option key={p.id} value={p.id}>{p.name} · {p.identifier}</option>)}</select></label>{result.error&&<p role="alert">Falha na pesquisa.</p>}<div className="pagination"><Button type="button" variant="outline" disabled={!page} onClick={()=>setPage(page-1)}>Anterior</Button><Button type="button" variant="outline" disabled={(result.data?.length??0)<25} onClick={()=>setPage(page+1)}>Próxima</Button></div></>
}