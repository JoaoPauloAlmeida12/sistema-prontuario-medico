import type {Row} from './clinic'
export interface ClinicData {
 membership: Row<'user_roles'>; clinic:Row<'clinics'>; patients:Row<'patients'>[]; appointments:Row<'appointments'>[]; titles:Row<'financial_titles'>[]; settlements:Row<'settlements'>[]; reversals:Row<'reversals'>[]; encounters:Row<'encounters'>[]; documents:Row<'documents'>[]; addenda:Row<'addenda'>[]; services:Row<'services'>[];
 doctors?:{user_id:string;display_name:string}[]; total?:number;
 metrics?:{today:number;confirmed:number;completed:number;documents:number;receipts:number;expenses:number;reversal_net:number;open_receive:number}
}
export interface EncounterBundle {encounter:Row<'encounters'>;versions:Row<'encounter_versions'>[];addenda:Row<'addenda'>[];attachments:Row<'clinical_attachments'>[]}
export interface PatientBundle {patient:Row<'patients'>;appointments:Row<'appointments'>[];encounters:Row<'encounters'>[];versions:Row<'encounter_versions'>[];addenda:Row<'addenda'>[];documents:Row<'documents'>[];attachments:Row<'clinical_attachments'>[]}