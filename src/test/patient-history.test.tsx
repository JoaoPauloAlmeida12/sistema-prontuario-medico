import {fireEvent,render,screen,cleanup} from '@testing-library/react'
import {afterEach,describe,expect,it,vi} from 'vitest'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import {ClinicWorkspace,newestEncounters,PatientEncounterHistory} from '@/components/clinic/workspace'
import {demoData} from '@/lib/demo'
import type {Row} from '@/lib/clinic'

const mocks=vi.hoisted(()=>({read:vi.fn(),getClinic:vi.fn()}))
vi.mock('@/lib/clinic.functions',()=>({readClinical:mocks.read,getClinic:mocks.getClinic}))
vi.mock('@tanstack/react-start',()=>({useServerFn:(fn:unknown)=>fn}))
vi.mock('@tanstack/react-router',()=>({Link:({children,...props}:any)=><a {...props}>{children}</a>,useNavigate:()=>vi.fn()}))
vi.mock('@/components/clinic/encounter-editor',()=>({EncounterEditor:({bundle}:any)=><div data-testid="existing-editor">{bundle.encounter.id}</div>}))

const encounter=(id:string,created_at:string,modality='presencial',status='finalizado'):Row<'encounters'>=>({id,created_at,updated_at:created_at,clinic_id:'demo',patient_id:'p1',appointment_id:null,author_id:'demo',modality,status,version:1,finalized_at:status==='finalizado'?created_at:null,content:{Plano:'Plano fictício\nRetorno fictício',Avaliação:'Avaliação fictícia',Objetivo:'Exame fictício',Subjetivo:'Relato fictício'}})
const older=encounter('older','2026-10-01T10:00:00-03:00'),newer=encounter('newer','2026-11-12T11:00:00-03:00','teleconsulta','rascunho')
afterEach(()=>{cleanup();vi.clearAllMocks()})
describe('Histórico do paciente',()=>{
 it('orders by encounter date descending without mutating the clinical bundle',()=>{
  const input=[older,newer]
  expect(newestEncounters(input).map(e=>e.id)).toEqual(['newer','older'])
  expect(input.map(e=>e.id)).toEqual(['older','newer'])
 })
 it('expands the complete saved evolution and opens the selected encounter',()=>{
  const onOpen=vi.fn()
  render(<PatientEncounterHistory encounters={[older,newer]} onOpen={onOpen}/>)
  expect(screen.queryByText('Relato fictício')).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button',{name:'Expandir evolução de 12/11/2026 às 11:00'}))
  for(const text of ['Relato fictício','Exame fictício','Avaliação fictícia'])expect(screen.getByText(text)).toBeVisible()
  expect(screen.getByText(/Plano fictício/).textContent).toBe('Plano fictício\nRetorno fictício')
  fireEvent.click(screen.getByRole('button',{name:'Abrir atendimento de 12/11/2026 às 11:00'}))
  expect(onOpen).toHaveBeenCalledWith(newer)
  fireEvent.click(screen.getByRole('button',{name:'Recolher evolução de 12/11/2026 às 11:00'}))
  expect(screen.queryByText('Relato fictício')).not.toBeInTheDocument()
 })
 it('keeps non-SOAP content available without inventing clinical text',()=>{
  render(<PatientEncounterHistory encounters={[{...older,content:{Retorno:'Texto fictício original'}}]} onOpen={vi.fn()}/>)
  fireEvent.click(screen.getByRole('button',{name:/Expandir evolução/}))
  expect(screen.getByText('Texto fictício original')).toBeVisible()
 })
 it('reuses the audited patient read and existing encounter opening in the workspace',async()=>{
  const data=demoData()
  mocks.getClinic.mockResolvedValue(data)
  mocks.read.mockImplementation(({data:request}:any)=>Promise.resolve(request.mode==='patient'?{patient:data.patients[0],encounters:[older,newer],appointments:[],documents:[],versions:[],addenda:[],attachments:[]}:{encounter:newer,versions:[],addenda:[],attachments:[]}))
  render(<QueryClientProvider client={new QueryClient({defaultOptions:{queries:{retry:false}}})}><ClinicWorkspace data={data}/></QueryClientProvider>)
  fireEvent.click(screen.getByRole('button',{name:'Pacientes'}))
  fireEvent.click(await screen.findByRole('button',{name:'Mariana Oliveira'}))
  fireEvent.click(await screen.findByRole('button',{name:'Expandir evolução de 12/11/2026 às 11:00'}))
  expect(screen.getByText('Relato fictício')).toBeVisible()
  expect(mocks.read).toHaveBeenCalledWith({data:{c:'demo',entity:'p1',mode:'patient'}})
  fireEvent.click(screen.getByRole('button',{name:'Abrir atendimento de 12/11/2026 às 11:00'}))
  expect(await screen.findByTestId('existing-editor')).toHaveTextContent('newer')
  expect(mocks.read).toHaveBeenCalledWith({data:{c:'demo',entity:'newer',mode:'encounter'}})
 })
})