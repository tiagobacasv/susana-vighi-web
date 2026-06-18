import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import {
  FlaskConical,
  Microscope,
  Dna,
  Activity,
  Sparkles,
  ScanLine,
  Layers,
  ChevronRight,
  Snowflake,
  Droplets,
  FileSearch,
  Stethoscope,
  ArrowUp,
  Grid2x2,
  PlusCircle,
} from "lucide-react";
import { useEffect, useState, type ElementType } from "react";

export const Route = createFileRoute("/especialidades")({
  head: () => ({
    meta: [
      { title: "Especialidades — CAP Vighi" },
      {
        name: "description",
        content:
          "Biología Molecular, Inmunohistoquímica y Técnicas de Alta Complejidad: citometría de flujo, inmunofluorescencia y microscopía electrónica.",
      },
      { property: "og:title", content: "Especialidades — CAP Vighi" },
      {
        property: "og:description",
        content:
          "Diagnóstico anatomopatológico integral: biología molecular, inmunohistoquímica y técnicas de alta complejidad.",
      },
    ],
  }),
  component: EspecialidadesPage,
});

// ───────────────────────────────────────────────────────────────────────────────

type SubBlock = {
  titulo: string;
  Icon: ElementType;
  descripcion: string;
  bullets?: string[];
  envio?: string[];
};

type Especialidad = {
  slug: string;
  numero: string;
  titulo: string;
  Icon: ElementType;
  resumen: string;
  partnership?: string;
  destacados?: { titulo: string; detalle: string }[];
  paneles?: { titulo: string; detalle: string }[];
  sub?: SubBlock[];
};

const especialidades: Especialidad[] = [
  {
    slug: "biologia-molecular",
    numero: "01",
    titulo: "Biología Molecular",
    Icon: Dna,
    resumen:
      "La Biología Molecular es una herramienta clave para el diagnóstico de precisión: impacta en el pronóstico y la selección terapéutica de los pacientes. Nuestro servicio integra técnicas moleculares validadas en estrecha correlación con los hallazgos anatomopatológicos, garantizando resultados confiables y alineados con estándares científicos actuales.",
    partnership: "Sistema BenchMark ULTRA — Roche ©",
    destacados: [
      {
        titulo: "Tecnología de avanzada",
        detalle:
          "El sistema BenchMark ULTRA es el sistema de tinción por láminas de hibridación in situ más innovador y totalmente automatizado de Roche Tissue Diagnostics. Cajones deslizantes individuales para flujo de trabajo de una sola pieza y un menú de más de 250 ensayos listos para usar.",
      },
      {
        titulo: "Técnicas automatizadas",
        detalle:
          "Efectuadas en condiciones estables, con idénticos antisueros y controles computarizados.",
      },
      {
        titulo: "El diagnóstico biomolecular permite",
        detalle:
          "Elevar las posibilidades y calidad de vida humana e incrementar las probabilidades en la gestación del embarazo.",
      },
    ],
  },
  {
    slug: "inmunohistoquimica",
    numero: "02",
    titulo: "Inmunohistoquímica",
    Icon: FlaskConical,
    resumen:
      "Herramienta esencial para el diagnóstico anatomopatológico actual: tipificación tumoral, evaluación de factores pronósticos y predictivos, aportando información decisiva para la clasificación y toma de decisiones clínicas. Utilizamos técnicas estandarizadas con protocolos automatizados en plataforma BenchMark Ultra de Ventana, con anticuerpos monoclonales y policlonales y controles de calidad rigurosos.",
    partnership: "Plataforma BenchMark Ultra — Ventana / Roche ©",
    paneles: [
      {
        titulo: "Inestabilidad Microsatelital",
        detalle: "MLH1 (M1) · PMS2 (A16-4) · MSH2 (G219-1129) · MSH6 (SP93)",
      },
      {
        titulo: "PDL-1 · BRAF",
        detalle:
          "Marcadores clave en oncología de precisión. Aporta información fundamental para la selección terapéutica.",
      },
      {
        titulo: "Microambiente Inmunológico — Panel Endometrio",
        detalle: "CD3 · CD4 · CD8 · CD16 · CD20 · CD45 · CD56 · CD68 · CD138",
      },
      {
        titulo: "Patología Mamaria",
        detalle:
          "Receptores Hormonales (Estrógeno y Progesterona) · Her2-Neu · Ki-67 · Proteínas 5/6 · 8/18 · P-53",
      },
      {
        titulo: "Paneles de Hematopatología",
        detalle: "Clasificación de neoplasias linfoides y mieloides.",
      },
      {
        titulo: "Paneles de Origen Primario Desconocido",
        detalle: "Orientado a la identificación del sitio primario tumoral.",
      },
      {
        titulo: "Paneles Epiteliales, Mesenquimáticos y Neuroendócrinos",
        detalle: "Para la correcta categorización tumoral.",
      },
    ],
  },
  {
    slug: "tecnicas-alta-complejidad",
    numero: "03",
    titulo: "Técnicas de Alta Complejidad",
    Icon: Layers,
    resumen:
      "Métodos complementarios al diagnóstico anatomopatológico que amplían la resolución, sensibilidad y precisión del informe en patologías complejas.",
    sub: [
      {
        titulo: "Citometría de Flujo",
        Icon: Activity,
        descripcion:
          "Método de diagnóstico rápido que provee múltiples parámetros, obtenidos de células y partículas provenientes de muestras líquidas o tejidos sólidos de material en fresco. Valor auxiliar invaluable en Hematopatología: diagnóstico, clasificación y determinación de factores pronósticos en entidades linfoproliferativas.",
        envio: [
          "Material en fresco: biopsias de tejidos refrigeradas con hielo (no congelar). Enviar en el día.",
          "Sangre periférica y líquidos: tubo con EDTA a temperatura ambiente (no refrigerar). Enviar en el día.",
        ],
      },
      {
        titulo: "Inmunofluorescencia",
        Icon: Sparkles,
        descripcion:
          "Técnica que utiliza marcadores fluorescentes para identificar moléculas adheridas en la superficie celular. Se realiza sobre tejidos en fresco.",
        bullets: ["Biopsias renales", "Biopsias de piel", "Biopsias oculares"],
        envio: [
          "Material en fresco: biopsias de tejidos refrigeradas con hielo (no congelar). Enviar en el día.",
        ],
      },
      {
        titulo: "Microscopía Electrónica",
        Icon: ScanLine,
        descripcion:
          "Técnica que obtiene imágenes de alta resolución sobre la ultraestructura celular. Utilizada como método complementario al diagnóstico anatomopatológico.",
        envio: ["Tacos de parafina.", "Adjuntar informe histológico."],
      },
    ],
  },
  {
    slug: "histopatologia",
    numero: "04",
    titulo: "Histopatología",
    Icon: Microscope,
    resumen:
      "Procesamiento y diagnóstico de biopsias y piezas quirúrgicas con coloraciones de rutina y técnicas especiales. Tiempo de entrega promedio: 6 días hábiles para biopsia y 9 días hábiles para biopsia con inmunohistoquímica.",
  },
  {
    slug: "citologia",
    numero: "05",
    titulo: "Citología — Papanicolaou y PAAF",
    Icon: ScanLine,
    resumen:
      "Screening cervicovaginal (Papanicolaou) con lectura especializada y entrega ágil — 3 días hábiles promedio — y estudio de muestras obtenidas por punción aspirativa con aguja fina (PAAF) de órganos sólidos.",
  },
];

// Subespecialidades diagnósticas — áreas de pericia por sistema/órgano.
const subespecialidades: { area: string; items: string[] }[] = [
  {
    area: "Patología Mamaria & Ginecológica",
    items: [
      "Patología mamaria",
      "Patología ginecológica",
      "Patología del tracto genital inferior",
      "Patología obstétrica y placentaria",
    ],
  },
  {
    area: "Oncohematología & Linfoproliferativos",
    items: [
      "Hematopatología",
      "Síndromes linfoproliferativos",
      "Médula ósea",
    ],
  },
  {
    area: "Patología Digestiva & Hepática",
    items: [
      "Patología gastrointestinal",
      "Patología hepática",
      "Patología pancreática y biliar",
    ],
  },
  {
    area: "Uropatología & Nefropatología",
    items: [
      "Patología urológica",
      "Patología renal médica",
      "Patología prostática",
    ],
  },
  {
    area: "Dermatopatología & Tejidos Blandos",
    items: [
      "Dermatopatología",
      "Tumores de tejidos blandos",
      "Patología ósea y articular",
    ],
  },
  {
    area: "Otras áreas",
    items: [
      "Patología pulmonar",
      "Patología endócrina",
      "Patología de cabeza y cuello",
      "Neuropatología",
      "Patología oftálmica",
      "Patología pediátrica",
    ],
  },
];

// Servicios complementarios — prestaciones que acompañan al diagnóstico.
const complementarios: { titulo: string; Icon: ElementType; detalle: string }[] = [
  {
    titulo: "Biopsia por congelación intraoperatoria",
    Icon: Snowflake,
    detalle:
      "Diagnóstico rápido durante el acto quirúrgico para definir conducta inmediata sobre la pieza.",
  },
  {
    titulo: "Tinciones histoquímicas especiales",
    Icon: Droplets,
    detalle:
      "Batería amplia de coloraciones complementarias (PAS, Tricrómico, Reticulina, Ziehl-Neelsen, Giemsa, entre otras) para caracterización tisular.",
  },
  {
    titulo: "Consulta y segunda opinión",
    Icon: FileSearch,
    detalle:
      "Revisión de casos derivados de otros centros, con reinterpretación de láminas y ampliación de estudios cuando corresponde.",
  },
  {
    titulo: "Interconsulta clínico-patológica",
    Icon: Stethoscope,
    detalle:
      "Diálogo permanente con médicos tratantes para correlacionar hallazgos morfológicos con el contexto clínico y orientar conducta terapéutica.",
  },
];

// ───────────────────────────────────────────────────────────────────────────────

function EspecialidadesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Especialidades"
        title="Diagnóstico anatomopatológico integral."
        description="Biología Molecular, Inmunohistoquímica y Técnicas de Alta Complejidad — con tecnología validada y partnerships internacionales."
      />

      {/* Índice */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {especialidades.map((e) => (
              <a
                key={e.slug}
                href={`#${e.slug}`}
                className="group flex items-center gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:border-clinical-accent hover:bg-secondary"
              >
                <e.Icon className="size-4 text-clinical-accent" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  {e.numero}
                </span>
                <span className="text-xs font-semibold leading-tight">{e.titulo}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detalle */}
      <div className="bg-secondary/30">
        {especialidades.map((e, idx) => (
          <section
            key={e.slug}
            id={e.slug}
            className={
              "scroll-mt-24 py-20 " + (idx % 2 === 1 ? "bg-background" : "")
            }
          >
            <div className="mx-auto max-w-7xl px-6">
              <header className="mb-10 flex items-start gap-6">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-clinical-blue text-white shadow-lg shadow-clinical-blue/20">
                  <e.Icon className="size-7" />
                </div>
                <div className="flex-1">
                  <div className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                    {e.numero} · Especialidad
                  </div>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                    {e.titulo}
                  </h2>
                  {e.partnership && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
                      <span className="size-1.5 rounded-full bg-clinical-accent" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-clinical-blue">
                        Partnership · {e.partnership}
                      </span>
                    </div>
                  )}
                </div>
              </header>

              <p className="max-w-4xl text-base leading-relaxed text-clinical-slate md:text-lg">
                {e.resumen}
              </p>

              {/* Destacados */}
              {e.destacados && (
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                  {e.destacados.map((d) => (
                    <div
                      key={d.titulo}
                      className="rounded-xl border border-border bg-background p-6"
                    >
                      <h3 className="text-sm font-bold tracking-tight">{d.titulo}</h3>
                      <p className="mt-3 text-xs leading-relaxed text-clinical-slate">
                        {d.detalle}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Paneles IMHQ */}
              {e.paneles && (
                <div className="mt-12">
                  <h3 className="mb-6 font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                    Paneles orientados según contexto clínico y morfológico
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {e.paneles.map((p) => (
                      <div
                        key={p.titulo}
                        className="flex gap-4 rounded-xl border border-border bg-background p-5"
                      >
                        <ChevronRight className="mt-0.5 size-4 shrink-0 text-clinical-accent" />
                        <div>
                          <h4 className="text-sm font-bold tracking-tight">{p.titulo}</h4>
                          <p className="mt-1.5 text-xs leading-relaxed text-clinical-slate">
                            {p.detalle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-técnicas */}
              {e.sub && (
                <div className="mt-12 space-y-6">
                  {e.sub.map((s) => (
                    <article
                      key={s.titulo}
                      className="rounded-2xl border border-border bg-background p-7"
                    >
                      <header className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-clinical-accent/10">
                          <s.Icon className="size-5 text-clinical-accent" />
                        </div>
                        <h3 className="text-xl font-bold tracking-tight">{s.titulo}</h3>
                      </header>
                      <p className="mt-4 text-sm leading-relaxed text-clinical-slate">
                        {s.descripcion}
                      </p>

                      {s.bullets && (
                        <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                          {s.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-xs font-medium"
                            >
                              <span className="size-1 rounded-full bg-clinical-accent" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}

                      {s.envio && (
                        <div className="mt-5 rounded-lg border border-dashed border-border bg-secondary/50 p-4">
                          <p className="font-mono text-[10px] uppercase tracking-widest text-clinical-blue">
                            Envío de muestras
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {s.envio.map((line, i) => (
                              <li
                                key={i}
                                className="text-xs leading-relaxed text-clinical-slate"
                              >
                                · {line}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Subespecialidades diagnósticas */}
      <section className="border-t border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              06 · Subespecialidades
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Pericia diagnóstica por sistema y órgano.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-clinical-slate">
              Nuestro cuerpo médico integra especialistas con dedicación específica en
              distintas áreas de la patología quirúrgica, lo que permite un abordaje
              fundamentado en cada contexto clínico.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {subespecialidades.map((s) => (
              <div key={s.area} className="bg-background p-7">
                <h3 className="text-sm font-bold tracking-tight text-clinical-blue">
                  {s.area}
                </h3>
                <ul className="mt-4 space-y-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-xs leading-relaxed text-clinical-slate"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-clinical-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios complementarios */}
      <section className="border-t border-border bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                07 · Servicios complementarios
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                Prestaciones que acompañan al informe.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-clinical-slate">
              Estudios y servicios adicionales que se integran al flujo diagnóstico
              cuando el caso lo requiere.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {complementarios.map((c) => (
              <article
                key={c.titulo}
                className="flex gap-5 rounded-2xl border border-border bg-background p-7"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-clinical-accent/10">
                  <c.Icon className="size-5 text-clinical-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">{c.titulo}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-clinical-slate">
                    {c.detalle}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
