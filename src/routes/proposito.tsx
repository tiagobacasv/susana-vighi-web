import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/proposito")({
  head: () => ({
    meta: [
      { title: "Propósito — CAP Vighi" },
      { name: "description", content: "Nuestro propósito: liderar la anatomía patológica con celeridad, calidad médica e innovación tecnológica." },
      { property: "og:title", content: "Propósito — CAP Vighi" },
      { property: "og:description", content: "Liderar la anatomía patológica con celeridad, calidad e innovación." },
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
        eyebrow="Propósito"
        title="Lideramos la especialidad de anatomía patológica."
        description="Nuestro propósito guía cada decisión: aportar valor clínico real a través de diagnósticos precisos, rápidos y trazables."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            {valores.map((v) => (
              <article key={v.titulo} className="border-l-2 border-clinical-accent pl-8">
                <h2 className="mb-4 text-2xl font-bold tracking-tight">{v.titulo}</h2>
                <p className="text-clinical-slate leading-relaxed">{v.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-clinical-blue py-24 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-2xl font-semibold leading-snug md:text-3xl">
            “Somos pioneros en la incorporación de inteligencia artificial aplicada a la
            anatomía patológica en Argentina.”
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-clinical-accent">
            Dra. Susana Vighi
          </p>
          <Link
            to="/contacto"
            className="mt-12 inline-block rounded-lg bg-clinical-accent px-6 py-3 font-semibold text-clinical-blue hover:opacity-90"
          >
            Contactar al laboratorio
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
