import { createFileRoute } from "@tanstack/react-router";
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
  { label: "Papanicolaou", value: "3", unit: "días hábiles" },
  { label: "Biopsia", value: "6", unit: "días hábiles" },
  { label: "Inmunohistoquímica", value: "7", unit: "días hábiles" },
  { label: "Biopsia c/ IHQ", value: "9", unit: "días hábiles" },
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
    desc: "Reducir tiempos de diagnóstico puede salvar vidas. Nuestra logística está diseñada para informar lo antes posible.",
  },
  {
    n: "02",
    title: "Calidad médica",
    desc: "Fomentamos los más altos estándares de calidad médica con controles internos y revisión por pares.",
  },
  {
    n: "03",
    title: "Equipo",
    desc: "Formamos a nuestros líderes en mandos medios y gestionamos equipos altamente eficientes.",
  },
  {
    n: "04",
    title: "Tecnología",
    desc: "Invertimos en aparatología de alta complejidad y patología digital integrada al flujo de trabajo.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-clinical-accent/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-md bg-clinical-blue">
              <span className="size-3 bg-clinical-accent" />
            </span>
            <span className="text-lg font-bold uppercase tracking-tight">
              Susana Vighi
            </span>
          </a>
          <div className="hidden items-center gap-10 text-sm font-medium uppercase tracking-wide text-clinical-slate md:flex">
            <a href="#especialidades" className="transition-colors hover:text-foreground">
              Especialidades
            </a>
            <a href="#tecnologia" className="transition-colors hover:text-foreground">
              Tecnología
            </a>
            <a href="#equipo" className="transition-colors hover:text-foreground">
              Equipo
            </a>
            <a href="#contacto" className="transition-colors hover:text-foreground">
              Contacto
            </a>
            <a
              href="#contacto"
              className="rounded-full bg-clinical-blue px-5 py-2.5 text-xs text-primary-foreground transition-all hover:opacity-90"
            >
              Portal de resultados
            </a>
          </div>
        </div>
      </nav>

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
                Patología de <br />
                <span className="text-clinical-slate">precisión digital.</span>
              </h1>
              <p className="mb-10 max-w-lg text-xl leading-relaxed text-clinical-slate">
                Lideramos la especialidad de anatomía patológica en Argentina, combinando
                experiencia médica, innovación y eficiencia al servicio del diagnóstico.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#especialidades"
                  className="rounded-lg bg-clinical-blue px-8 py-4 font-semibold text-primary-foreground transition-all hover:shadow-xl"
                >
                  Ver especialidades
                </a>
                <a
                  href="#contacto"
                  className="rounded-lg border border-border bg-background px-8 py-4 font-semibold text-foreground transition-all hover:bg-secondary"
                >
                  Consultar estudios
                </a>
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

      {/* Turnaround / data row */}
      <section className="border-y border-border bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <span className="font-mono text-xs uppercase tracking-widest text-clinical-slate">
              Tiempos de entrega promedio
            </span>
          </div>
          <div className="grid gap-12 md:grid-cols-4">
            {turnaround.map((t) => (
              <div key={t.label}>
                <div className="mb-6 h-1 w-12 bg-clinical-accent" />
                <div className="mb-2 text-4xl font-bold tracking-tight">
                  {t.value}
                  <span className="ml-1 text-2xl text-clinical-slate">d</span>
                </div>
                <div className="text-sm font-medium text-clinical-slate">
                  <span className="block font-semibold text-foreground">{t.label}</span>
                  {t.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="especialidades" className="py-32">
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
            <a
              href="#contacto"
              className="group flex items-center gap-2 font-semibold italic text-clinical-blue hover:not-italic"
            >
              Ver todos los servicios
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
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

      {/* Pillars / Tecnología */}
      <section id="tecnologia" className="bg-clinical-blue py-32 text-primary-foreground">
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

      {/* Equipo / Lugar */}
      <section id="equipo" className="py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
              Nuestro equipo
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Dirección médica con más de tres décadas de trayectoria.
            </h2>
            <p className="mt-6 text-lg text-clinical-slate">
              Bajo la dirección de la Dra. Susana Vighi, nuestro laboratorio combina la
              experiencia clínica acumulada con metodologías modernas para sostener un
              estándar de excelencia.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-bold">+30</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  Años de trayectoria
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold">SGC</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  Sistema de gestión de calidad
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-secondary ring-1 ring-black/5">
              <img
                src={heroImg}
                alt="Centro de Anatomía Patológica"
                loading="lazy"
                width={800}
                height={1000}
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contacto */}
      <footer id="contacto" className="mt-20 bg-clinical-blue py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 md:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl font-bold">
              Confianza médica, <br />
              claridad científica.
            </h2>
            <p className="mb-10 max-w-sm text-white/60">
              Estamos a disposición de pacientes, médicos derivantes e instituciones para
              consultas y derivaciones.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="size-2 bg-clinical-accent" />
                <span className="text-sm uppercase tracking-widest">
                  Ciudad de Buenos Aires, Argentina
                </span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <span className="size-2 bg-white/20" />
                <a href="mailto:info@susanavighi.com.ar" className="text-sm hover:text-primary-foreground">
                  info@susanavighi.com.ar
                </a>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <span className="size-2 bg-white/20" />
                <span className="text-sm">Lunes a Viernes 08:00 — 20:00</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-sm">
            <h4 className="mb-6 font-bold italic">Médicos derivantes</h4>
            <p className="mb-8 text-sm text-white/60">
              Coordinemos la recepción de muestras y la entrega digital de informes para
              su institución.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email profesional"
                className="flex-1 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-sm text-primary-foreground placeholder:text-white/40 focus:border-clinical-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-clinical-accent px-6 py-3 text-sm font-bold uppercase text-clinical-blue transition-opacity hover:opacity-90"
              >
                Contactar
              </button>
            </form>
          </div>
        </div>
        <div className="mx-auto mt-20 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 px-6 pt-10 text-[10px] uppercase tracking-widest text-white/40 md:flex-row">
          <div>© {new Date().getFullYear()} Centro de Anatomía Patológica Dra. Susana Vighi</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary-foreground">Privacidad</a>
            <a href="#" className="hover:text-primary-foreground">Términos</a>
            <a href="#" className="hover:text-primary-foreground">Sistema de gestión</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
