import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import heroImg from "@/assets/hero-histology.jpg";
import histoImg from "@/assets/service-histopathology.jpg";
import immunoImg from "@/assets/service-immuno.jpg";
import cytoImg from "@/assets/service-cytology.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CAP Vighi — Centro de Anatomía Patológica Dra. Susana Vighi" },
      {
        name: "description",
        content:
          "Laboratorio de anatomía patológica en Buenos Aires. Patología digital, inmunohistoquímica y biopsias con tiempos de respuesta líderes.",
      },
      { property: "og:title", content: "CAP Vighi — Anatomía Patológica de precisión" },
      {
        property: "og:description",
        content:
          "Diagnóstico anatomopatológico de excelencia, integrando patología digital e inteligencia artificial.",
      },
    ],
  }),
  component: Index,
});

const turnaround = [
  { label: "Papanicolaou", value: "3" },
  { label: "Biopsia", value: "6" },
  { label: "Inmunohistoquímica", value: "7" },
  { label: "Biopsia c/ IHQ", value: "9" },
];

const services = [
  {
    title: "Histopatología",
    desc: "Procesamiento y análisis de biopsias y piezas quirúrgicas con coloraciones de rutina y técnicas especiales.",
    img: histoImg,
    shape: "square",
  },
  {
    title: "Inmunohistoquímica",
    desc: "Determinación de biomarcadores para oncología de precisión y terapias dirigidas.",
    img: immunoImg,
    shape: "circle",
  },
  {
    title: "Citología",
    desc: "Papanicolaou y punciones aspirativas (PAAF) con lectura especializada.",
    img: cytoImg,
    shape: "diamond",
  },
];

const pillars = [
  {
    n: "01",
    title: "Celeridad",
    desc: "Reducir tiempos de diagnóstico puede salvar vidas. La logística está diseñada para informar lo antes posible.",
  },
  {
    n: "02",
    title: "Calidad médica",
    desc: "Fomentamos los más altos estándares con controles internos y revisión por pares.",
  },
  {
    n: "03",
    title: "Equipo",
    desc: "Formamos a nuestros líderes en mandos medios y gestionamos equipos altamente eficientes.",
  },
  {
    n: "04",
    title: "Tecnología",
    desc: "Invertimos en aparatología de alta complejidad y patología digital integrada al flujo.",
  },
];

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-clinical-accent/30 bg-clinical-accent/10 px-3 py-1">
                <span className="size-1.5 animate-pulse rounded-full bg-clinical-accent" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-clinical-blue">
                  Patología digital + IA
                </span>
              </div>
              <h1 className="mb-8 text-5xl font-bold leading-[0.95] tracking-tighter text-balance md:text-7xl">
                Lideramos la <br />
                <span className="text-clinical-accent">anatomía patológica.</span>
              </h1>
              <p className="mb-10 max-w-lg text-xl leading-relaxed text-clinical-slate">
                Combinamos experiencia médica, innovación e infraestructura digital
                para optimizar el flujo de trabajo y reducir los tiempos de informe.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/especialidades"
                  className="rounded-lg bg-clinical-blue px-8 py-4 font-semibold text-primary-foreground transition-all hover:shadow-xl"
                >
                  Ver especialidades
                </Link>
                <Link
                  to="/contacto"
                  className="rounded-lg border border-border bg-background px-8 py-4 font-semibold text-foreground transition-all hover:bg-secondary"
                >
                  Consultar
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 rotate-3">
                <img
                  src={heroImg}
                  alt="Muestra histológica digitalizada"
                  width={1280}
                  height={1280}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-background p-6 shadow-xl">
                <div className="text-3xl font-bold text-clinical-blue">24–72hs</div>
                <div className="font-mono text-xs uppercase tracking-wider text-clinical-slate">
                  Tiempo de respuesta
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turnaround */}
      <section className="border-y border-border bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-baseline justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-clinical-slate">
              Tiempos de entrega promedio
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-clinical-slate md:block">
              Días hábiles
            </span>
          </div>
          <div className="grid gap-12 md:grid-cols-4">
            {turnaround.map((t) => (
              <div key={t.label}>
                <div className="mb-6 h-1 w-12 bg-clinical-accent" />
                <div className="mb-2 text-5xl font-bold tracking-tight">
                  {t.value}
                  <span className="ml-1 text-2xl text-clinical-slate">d</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                Especialidades
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Excelencia en cada muestra.
              </h2>
              <p className="mt-6 text-lg text-clinical-slate">
                Una gama completa de servicios diagnósticos con enfoque integral y
                personalizado.
              </p>
            </div>
            <Link
              to="/especialidades"
              className="group flex items-center gap-2 font-semibold italic text-clinical-blue hover:not-italic"
            >
              Ver todas las especialidades
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group rounded-2xl border border-border p-8 transition-all hover:border-clinical-accent hover:shadow-2xl hover:shadow-clinical-accent/10"
              >
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg border border-border bg-secondary transition-colors group-hover:border-clinical-accent/30 group-hover:bg-clinical-accent/10">
                  <span
                    className={
                      "size-5 border-2 border-clinical-blue transition-colors group-hover:border-clinical-accent " +
                      (s.shape === "circle"
                        ? "rounded-full"
                        : s.shape === "diamond"
                          ? "rotate-45"
                          : "")
                    }
                  />
                </div>
                <h3 className="mb-4 text-xl font-bold">{s.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-clinical-slate">
                  {s.desc}
                </p>
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-clinical-blue py-32 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
              Nuestros pilares
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Pioneros en la incorporación de patología digital e IA en Argentina.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/60">
              Integramos patología digital e inteligencia artificial a nuestros procesos
              para optimizar el flujo de trabajo y reducir significativamente los tiempos
              de informe.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="group bg-clinical-blue p-10 transition-colors hover:bg-white/5"
              >
                <div className="mb-8 font-mono text-sm text-clinical-accent">{p.n}</div>
                <h3 className="mb-4 text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Tres décadas formando un referente en diagnóstico.
            </h2>
          </div>
          <div>
            <p className="text-lg text-clinical-slate">
              Bajo la dirección de la Dra. Susana Vighi, integramos experiencia clínica,
              tecnología y un sistema de gestión riguroso para sostener un estándar de
              excelencia.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/equipo"
                className="rounded-lg bg-clinical-blue px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
              >
                Conocer al equipo
              </Link>
              <Link
                to="/sistema-gestion"
                className="rounded-lg border border-border px-6 py-3 font-semibold hover:bg-secondary"
              >
                Sistema de gestión
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
