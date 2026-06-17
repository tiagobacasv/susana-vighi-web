import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/sistema-gestion")({
  head: () => ({
    meta: [
      { title: "Sistema de gestión — CAP Vighi" },
      { name: "description", content: "Los 3 pilares del servicio del Centro de Anatomía Patológica Dra. Susana Vighi: Celeridad, Trazabilidad y Proactividad." },
      { property: "og:title", content: "Sistema de gestión — CAP Vighi" },
      { property: "og:description", content: "Eficiencia operativa, seguimiento en tiempo real y monitoreo continuo orientados a la excelencia diagnóstica." },
    ],
  }),
  component: SistemaGestionPage,
});

const pilares = [
  {
    num: "01",
    titulo: "Celeridad",
    subtitulo: "Mayor eficiencia operativa sobre una creciente cantidad de muestras.",
    desc: "Optimizamos continuamente los flujos de trabajo para sostener tiempos de entrega reducidos sin comprometer la calidad diagnóstica. Los resultados se validan mensualmente con reportes de tendencia.",
    items: [
      { label: "Protocolos diarios", value: "630" },
      { label: "Días hábiles promedio", value: "5" },
    ],
  },
  {
    num: "02",
    titulo: "Trazabilidad",
    subtitulo: "Seguimiento en tiempo real y previsibilidad de entrega.",
    desc: "Cada muestra cuenta con seguimiento completo desde la recepción hasta la entrega del informe. El sistema identifica el estado de cada protocolo mediante semáforos y compara automáticamente fechas teóricas y reales.",
    items: [
      { label: "On Time", value: "OT" },
      { label: "Delayed", value: "DY" },
      { label: "Late", value: "LT" },
    ],
  },
  {
    num: "03",
    titulo: "Proactividad",
    subtitulo: "Monitoreo continuo para anticipar desvíos y mejorar resultados.",
    desc: "Utilizamos mapas de calor para identificar atrasos, asignamos responsables por actividad y realizamos evaluaciones semanales de desempeño sectorial. Nuestro objetivo es Rojo Cero.",
    items: [
      { label: "Objetivo", value: "Rojo Cero" },
    ],
  },
];

function SistemaGestionPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Sistema de gestión"
        title="Los 3 pilares de nuestro servicio."
        description="Integramos eficiencia operativa, seguimiento completo de muestras y vigilancia permanente de procesos orientados hacia la excelencia diagnóstica."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {pilares.map((p) => (
              <div key={p.num} className="rounded-2xl border border-border p-8">
                <div className="mb-6 font-mono text-xs text-clinical-accent">{p.num}</div>
                <h3 className="mb-1 text-xl font-bold tracking-tight">{p.titulo}</h3>
                <p className="mb-4 text-sm font-semibold text-clinical-accent">{p.subtitulo}</p>
                <p className="mb-8 text-sm leading-relaxed text-clinical-slate">{p.desc}</p>
                <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                  {p.items.map((item) => (
                    <div key={item.label} className="flex flex-col">
                      <span className="text-2xl font-bold tracking-tight text-clinical-blue">{item.value}</span>
                      <span className="text-xs text-clinical-slate">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
