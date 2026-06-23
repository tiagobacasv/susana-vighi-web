import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { Gauge, Radar, Activity } from "lucide-react";
import type { ElementType } from "react";
import sistemaAsset from "@/assets/sistema-gestion.jpg";

export const Route = createFileRoute("/sistema-gestion")({
  head: () => ({
    meta: [
      { title: "Sistema de gestión — CAP Vighi" },
      {
        name: "description",
        content:
          "Los 3 pilares del servicio del Centro de Anatomía Patológica Dra. Susana Vighi: Celeridad, Trazabilidad y Proactividad.",
      },
      { property: "og:title", content: "Sistema de gestión — CAP Vighi" },
      {
        property: "og:description",
        content:
          "Eficiencia operativa, seguimiento en tiempo real y monitoreo continuo orientados a la excelencia diagnóstica.",
      },
    ],
  }),
  component: SistemaGestionPage,
});

// ───────────────────────────────────────────────────────────────────────────────

type Metric = { label: string; value: string; sub?: string };

type Pilar = {
  num: string;
  titulo: string;
  subtitulo: string;
  Icon: ElementType;
  desc: string;
  metrics: Metric[];
};

const pilares: Pilar[] = [
  {
    num: "01",
    titulo: "Celeridad",
    subtitulo: "Mayor eficiencia operativa sobre una creciente cantidad de muestras.",
    Icon: Gauge,
    desc: "Optimizamos continuamente los flujos de trabajo para sostener tiempos de entrega reducidos sin comprometer la calidad diagnóstica. Los resultados se validan mensualmente con reportes de tendencia.",
    metrics: [
      { value: "630", label: "Protocolos diarios" },
      { value: "5", label: "Días hábiles promedio" },
    ],
  },
  {
    num: "02",
    titulo: "Trazabilidad",
    subtitulo: "Seguimiento en tiempo real y previsibilidad de entrega.",
    Icon: Radar,
    desc: "Cada muestra cuenta con seguimiento completo desde la recepción hasta la entrega del informe. El sistema identifica el estado de cada protocolo mediante semáforos y compara automáticamente fechas teóricas y reales.",
    metrics: [
      { value: "OT", label: "On Time", sub: "En término" },
      { value: "DY", label: "Delayed", sub: "Demorado" },
      { value: "LT", label: "Late", sub: "Atrasado" },
    ],
  },
  {
    num: "03",
    titulo: "Proactividad",
    subtitulo: "Monitoreo continuo para anticipar desvíos y mejorar resultados.",
    Icon: Activity,
    desc: "Utilizamos mapas de calor para identificar atrasos, asignamos responsables por actividad y realizamos evaluaciones semanales de desempeño sectorial.",
    metrics: [{ value: "Rojo Cero", label: "Objetivo permanente" }],
  },
];

// ───────────────────────────────────────────────────────────────────────────────

function SistemaGestionPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Sistema de gestión"
        title="Los 3 pilares de nuestro servicio."
        description="Integramos eficiencia operativa, seguimiento completo de muestras y vigilancia permanente de procesos orientados hacia la excelencia diagnóstica."
      />

      {/* Imagen referencial del sistema */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-5 md:items-center">
            <div className="md:col-span-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                Plataforma operativa
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                Un tablero único para cada muestra.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-clinical-slate">
                Sistema interno de gestión de protocolos diseñado por el laboratorio:
                permite asignar responsables, registrar tiempos por etapa y visualizar
                el estado en vivo de la operación.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Recepción", "Procesamiento", "Lectura", "Validación", "Entrega"].map(
                  (s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-clinical-blue"
                    >
                      {s}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm">
                <img
                  src={sistemaAsset}
                  alt="Plataforma de gestión de muestras CAP Vighi"
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-3 text-[11px] text-clinical-slate">
                Imagen referencial — reemplazable por captura real del sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-5xl">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                Pilares del servicio
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Calidad operativa en tres dimensiones.
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-clinical-slate">
              Cada pilar se mide, se reporta y se ajusta — el sistema convierte la gestión cotidiana en datos accionables.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pilares.map((p) => (
              <article
                key={p.num}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background p-8 transition-colors hover:border-clinical-accent"
              >
                <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  {p.num}
                </div>
                <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-clinical-blue text-white shadow-sm">
                  <p.Icon className="size-5" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-clinical-blue">
                  {p.titulo}
                </h3>
                <p className="mt-2 text-sm font-medium leading-snug text-clinical-accent">
                  {p.subtitulo}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-clinical-slate">
                  {p.desc}
                </p>

                <div className="mt-8 flex justify-center gap-6 border-t border-border">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col items-center pt-4 text-center" style={m.sub ? { marginBottom: "-15px" } : undefined}>
                      <span className="text-2xl font-bold tracking-tight text-clinical-blue">
                        {m.value}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-wide text-clinical-slate">
                        {m.label}
                      </span>
                      {m.sub && (
                        <span className="text-[10px] text-clinical-slate/80">
                          {m.sub}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="border-t border-border bg-background py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
            Compromiso operativo
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
            La calidad diagnóstica también se construye con procesos medibles.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-clinical-slate">
            Cada indicador del sistema se revisa periódicamente con el equipo. El
            objetivo no es solo cumplir tiempos: es sostener un estándar que el
            paciente y el médico tratante puedan dar por sentado.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
