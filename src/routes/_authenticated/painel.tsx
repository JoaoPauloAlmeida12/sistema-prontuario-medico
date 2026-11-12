import {createFileRoute} from '@tanstack/react-router'
import {queryOptions,useSuspenseQuery} from '@tanstack/react-query'
import {getClinic} from '@/lib/clinic.functions'
import {ClinicWorkspace} from '@/components/clinic/workspace'
const options=queryOptions({queryKey:['clinic'],queryFn:()=>getClinic()})
export const Route=createFileRoute('/_authenticated/painel')({head:()=>({meta:[{title:'Painel da clínica | Modulare'},{name:'description',content:'Agenda e gestão privada da clínica Modulare.'},{property:'og:title',content:'Painel da clínica | Modulare'},{property:'og:description',content:'Gestão privada da clínica.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),loader:({context})=>context.queryClient.ensureQueryData(options),component:Page,errorComponent:()=> <div className="access-message"><h1>Acesso à clínica pendente</h1><p>A conta precisa receber uma permissão do responsável.</p><a href="/auth">Voltar ao acesso</a></div>})
function Page(){const {data}=useSuspenseQuery(options);return <ClinicWorkspace data={data}/>}