import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { Target, Compass } from "lucide-react";

export const Route = createFileRoute("/proposito")({
  head: () => ({
    meta: [
      { title: "Propósito y Misión — CAP Vighi" },
      { name: "description", content: "Misión y propósito del Centro de Anatomía Patológica Dra. Susana Vighi: liderar la especialidad en LATAM con estándares y tiempos internacionales." },
      { property: "og:title", content: "Propósito y Misión — CAP Vighi" },
      { property: "og:description", content: "Reducir tiempos de diagnóstico puede salvar vidas. Expandimos el liderazgo en toda la región." },
    ],
  }),
  component: PropositoPage,
});

const valores = [
  {
    titulo: "Celeridad",
    texto: "La celeridad le otorga virtud al diagnóstico médico. Reducir tiempos de informe acelera decisiones clínicas que pueden cambiar el curso de una vida.",
  },
  {
    titulo: "Calidad",
    texto: "Fomentamos los más altos estándares de calidad médica mediante protocolos estandarizados, controles internos y revisión por pares.",
  },
  {
    titulo: "Innovación",
    texto: "Invertimos en aparatología de alta complejidad y somos pioneros en patología digital e inteligencia artificial en Argentina.",
  },
  {
    titulo: "Equipo",
    texto: "Gestionamos equipos altamente eficientes y formamos a nuestros líderes en mandos medios para sostener una cultura de mejora continua.",
  },
];

function PropositoPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Propósito y Misión"
        title="Lideramos la especialidad de anatomía patológica."
        description="Nuestra razón de ser guía cada decisión: aportar valor clínico real a través de diagnósticos precisos, rápidos y trazables."
      />

      {/* Misión + Propósito */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <article className="group relative overflow-hidden rounded-2xl border border-border bg-secondary p-10">
              <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                01 · Misión
              </div>
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-clinical-blue text-white">
                <Compass className="size-5" />
              </div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-clinical-accent">
                Nuestra misión
              </h2>
              <p className="mt-4 text-2xl font-bold leading-snug tracking-tight text-clinical-blue md:text-3xl">
                “Reducir tiempos de diagnóstico puede salvar vidas.”
              </p>
              <p className="mt-6 text-sm leading-relaxed text-clinical-slate">
                Cada hora cuenta. Diseñamos nuestros procesos para que el informe
                llegue antes al médico tratante, porque acortar la espera mejora
                decisiones clínicas y resultados para el paciente.
              </p>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-border bg-secondary p-10">
              <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                02 · Propósito
              </div>
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-clinical-blue text-white">
                <Target className="size-5" />
              </div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-clinical-accent">
                Nuestro propósito
              </h2>
              <p className="mt-4 text-2xl font-bold leading-snug tracking-tight text-clinical-blue md:text-3xl">
                Expandir el liderazgo en toda la región LATAM con estándares de calidad y tiempos internacionales.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-clinical-slate">
                Combinamos experiencia médica, innovación tecnológica e
                infraestructura propia para posicionarnos como referencia regional
                en anatomía patológica.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Frase / quote */}
      <section className="bg-clinical-blue py-24 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-2xl font-semibold leading-snug md:text-3xl">
            “Somos pioneros en la incorporación de inteligencia artificial aplicada a la
            anatomía patológica en Argentina.”
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-clinical-accent">
            CAP Vighi
          </p>
          <Link
            to="/contacto"
            className="mt-12 inline-block rounded-lg bg-clinical-accent px-6 py-3 font-semibold text-clinical-blue hover:opacity-90"
          >
            Contactar al laboratorio
          </Link>
        </div>
      </section>

      {/* Valores (movidos debajo del quote) */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              Valores que nos definen
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Los pilares que sostienen nuestra práctica.
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            {valores.map((v) => (
              <article key={v.titulo} className="border-l-2 border-clinical-accent pl-8">
                <h3 className="mb-4 text-2xl font-bold tracking-tight">{v.titulo}</h3>
                <p className="text-clinical-slate leading-relaxed">{v.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
