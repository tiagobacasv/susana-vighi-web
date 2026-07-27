import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { BookOpen, Presentation, GraduationCap, Newspaper, Microscope } from "lucide-react";

export const Route = createFileRoute("/novedades")({
  head: () => ({
    meta: [
      { title: "Novedades y publicaciones — CAP Vighi" },
      {
        name: "description",
        content:
          "Actividad académica, publicaciones, participaciones en congresos y novedades técnicas del Centro de Anatomía Patológica Dra. Susana Vighi.",
      },
      { property: "og:title", content: "Novedades y publicaciones — CAP Vighi" },
      {
        property: "og:description",
        content:
          "Casos de interés académico, publicaciones y participaciones en congresos del equipo CAP Vighi.",
      },
    ],
  }),
  component: NovedadesPage,
});

const categorias = [
  {
    Icon: BookOpen,
    tag: "Publicaciones",
    title: "Trabajos y artículos del equipo",
    desc: "Producción científica en revistas nacionales e internacionales de anatomía patológica y disciplinas asociadas.",
  },
  {
    Icon: Presentation,
    tag: "Congresos",
    title: "Participación en congresos",
    desc: "Presentaciones, ponencias y trabajos libres del equipo en congresos de la especialidad.",
  },
  {
    Icon: GraduationCap,
    tag: "Docencia",
    title: "Formación y residencias",
    desc: "Rotaciones, ateneos y actividades académicas orientadas a la formación de nuevos patólogos.",
  },
  {
    Icon: Newspaper,
    tag: "Novedades técnicas",
    title: "Incorporaciones y actualizaciones",
    desc: "Nuevos marcadores incorporados, mejoras en la plataforma diagnóstica y actualizaciones de nuestros protocolos.",
  },
];

const destacados = [
  {
    fecha: "2025 · En curso",
    categoria: "Novedades técnicas",
    titulo: "Incorporación de nuevos paneles de inmunohistoquímica",
    resumen:
      "Ampliamos progresivamente el panel de marcadores disponibles para diagnóstico y estadificación oncológica, incluyendo determinaciones predictivas de tratamiento.",
  },
  {
    fecha: "2025",
    categoria: "Docencia",
    titulo: "Programa de rotaciones para residentes",
    resumen:
      "Recibimos residentes y becarios de instituciones de todo el país para rotaciones de subespecialidad en distintas áreas del laboratorio.",
  },
  {
    fecha: "Actividad continua",
    categoria: "Congresos",
    titulo: "Presencia académica del equipo",
    resumen:
      "Nuestros profesionales participan regularmente en congresos y jornadas de la Sociedad Argentina de Patología y sociedades internacionales afines.",
  },
];

function NovedadesPage() {
  const { t } = useTranslation();
  const casos = t("novedades.casos.items", { returnObjects: true }) as {
    area: string;
    text: string;
  }[];
  return (
    <SiteLayout>
      <PageHero
        variant="publications"
        eyebrow="Academia · Publicaciones · Docencia"
        title="Novedades y publicaciones."
        description="Compartimos la actividad académica, las publicaciones y las incorporaciones técnicas del equipo. Un espacio para seguir de cerca lo que hacemos más allá del diagnóstico."
      />

      {/* Categorías */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              Nuestra actividad
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Cuatro frentes.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {categorias.map((c) => (
              <article
                key={c.tag}
                className="flex gap-6 rounded-2xl border border-border bg-secondary p-8"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-clinical-blue text-white">
                  <c.Icon className="size-5" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
                    {c.tag}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-clinical-blue">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-clinical-slate">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Destacados / timeline */}
      <section className="border-t border-border bg-secondary/40 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              Últimas actualizaciones
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Lo que estamos haciendo.
            </h2>
          </div>
          <div className="space-y-6">
            {destacados.map((d) => (
              <article
                key={d.titulo}
                className="rounded-2xl border border-border bg-background p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                    {d.fecha}
                  </span>
                  <span className="rounded-full bg-clinical-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
                    {d.categoria}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-bold text-clinical-blue">
                  {d.titulo}
                </h3>
                <p className="mt-2 text-sm text-clinical-slate">{d.resumen}</p>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-clinical-slate">
            Estamos preparando la publicación completa de trabajos, ponencias y
            programa académico. Volvé pronto para actualizaciones.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
