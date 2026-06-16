import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/equipo")({
  head: () => ({
    meta: [
      { title: "Nuestro equipo — CAP Vighi" },
      { name: "description", content: "Equipo médico y técnico del Centro de Anatomía Patológica Dra. Susana Vighi." },
      { property: "og:title", content: "Nuestro equipo — CAP Vighi" },
      { property: "og:description", content: "Médicos patólogos, citotecnólogos y técnicos especializados." },
    ],
  }),
  component: EquipoPage,
});

const equipo = [
  { nombre: "Dra. Susana Vighi", rol: "Dirección médica · Médica anatomopatóloga" },
  { nombre: "Equipo de patólogos", rol: "Médicos especialistas en anatomía patológica" },
  { nombre: "Citotecnólogos", rol: "Lectura y screening de citologías" },
  { nombre: "Técnicos histológicos", rol: "Procesamiento de muestras y cortes" },
  { nombre: "Área de calidad", rol: "Sistema de gestión y trazabilidad" },
  { nombre: "Recepción y secretaría", rol: "Atención a pacientes y médicos derivantes" },
];

function EquipoPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Nuestro equipo"
        title="Profesionales formados para el más alto estándar."
        description="Formamos a nuestros líderes en mandos medios y gestionamos equipos altamente eficientes, sostenidos por una cultura de mejora continua."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {equipo.map((p, i) => (
              <div key={p.nombre} className="bg-background p-8">
                <div className="mb-6 font-mono text-xs text-clinical-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2 text-lg font-bold tracking-tight">{p.nombre}</h3>
                <p className="text-sm text-clinical-slate">{p.rol}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
