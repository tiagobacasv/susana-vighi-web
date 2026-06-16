import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/sistema-gestion")({
  head: () => ({
    meta: [
      { title: "Sistema de gestión — CAP Vighi" },
      { name: "description", content: "Sistema de gestión de calidad del Centro de Anatomía Patológica Dra. Susana Vighi." },
      { property: "og:title", content: "Sistema de gestión — CAP Vighi" },
      { property: "og:description", content: "Procesos estandarizados, trazabilidad y mejora continua." },
    ],
  }),
  component: SistemaGestionPage,
});

const pilares = [
  { titulo: "Procesos estandarizados", desc: "Protocolos documentados para cada etapa del flujo preanalítico, analítico y posanalítico." },
  { titulo: "Trazabilidad", desc: "Identificación inequívoca de muestras desde la recepción hasta la entrega del informe." },
  { titulo: "Mejora continua", desc: "Indicadores de calidad, auditorías internas y revisión por la dirección." },
  { titulo: "Capacitación", desc: "Programa de formación continua para todo el equipo profesional y técnico." },
];

function SistemaGestionPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Sistema de gestión"
        title="Calidad como práctica cotidiana."
        description="Nuestro sistema de gestión sostiene la consistencia del diagnóstico, la seguridad del paciente y la mejora continua de los procesos."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {pilares.map((p, i) => (
              <div key={p.titulo} className="rounded-2xl border border-border p-8">
                <div className="mb-6 font-mono text-xs text-clinical-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight">{p.titulo}</h3>
                <p className="text-clinical-slate leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
