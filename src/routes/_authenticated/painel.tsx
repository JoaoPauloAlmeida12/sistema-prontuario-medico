import {createFileRoute,redirect} from '@tanstack/react-router'
import {queryOptions,useSuspenseQuery} from '@tanstack/react-query'
import {getClinic} from '@/lib/clinic.functions'
import {ClinicWorkspace} from '@/components/clinic/workspace'
import {supabase} from '@/integrations/supabase/client'
const options=queryOptions({queryKey:['clinic','initial'],queryFn:()=>getClinic({data:{}})})
export const Route=createFileRoute('/_authenticated/painel')({beforeLoad:async()=>{const {data,error}=await supabase.auth.mfa.getAuthenticatorAssuranceLevel();if(error||data?.currentLevel!=='aal2')throw redirect({to:'/segundo-fator'})},head:()=>({meta:[{title:'Painel da clínica | Modulare'},{name:'description',content:'Agenda e gestão privada da clínica Modulare.'},{property:'og:title',content:'Painel da clínica | Modulare'},{property:'og:description',content:'Gestão privada da clínica.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary'}]}),loader:({context})=>context.queryClient.ensureQueryData(options),component:Page,errorComponent:()=> <div className="access-message"><h1>Acesso à clínica indisponível</h1><p>Confirme seu acesso e a permissão concedida pelo responsável.</p><a href="/auth">Voltar ao acesso</a></div>})
function Page(){const {data}=useSuspenseQuery(options);return <ClinicWorkspace data={data}/>}