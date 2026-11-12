import { createFileRoute } from "@tanstack/react-router";
import { ClinicWorkspace } from '@/components/clinic/workspace';
import { demoData } from '@/lib/demo';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({meta:[{title:'Modulare — Gestão da Clínica | Demonstração'},{name:'description',content:'Demonstração fictícia e separada da gestão privada da clínica Modulare.'},{property:'og:title',content:'Modulare — Gestão da Clínica'},{property:'og:description',content:'Agenda, pacientes e gestão privada da clínica.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <ClinicWorkspace data={demoData()} demo />;
}
