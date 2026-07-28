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

const categoriaIcons = [BookOpen, Presentation, GraduationCap, Newspaper];

function NovedadesPage() {
  const { t } = useTranslation();
  const categorias = t("novedades.categorias", { returnObjects: true }) as {
    tag: string;
    title: string;
    desc: string;
  }[];
  const destacados = t("novedades.destacados", { returnObjects: true }) as {
    fecha: string;
    categoria: string;
    titulo: string;
    resumen: string;
  }[];
  const casos = t("novedades.casos.items", { returnObjects: true }) as {
    area: string;
    text: string;
  }[];
  return (
    <SiteLayout>
      <PageHero
        variant="publications"
        eyebrow={t("novedades.hero.eyebrow")}
        title={t("novedades.hero.title")}
        description={t("novedades.hero.description")}
      />

      {/* Categorías */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("novedades.activity.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("novedades.activity.title")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {categorias.map((c, i) => {
              const Icon = categoriaIcons[i];
              return (
                <article
                  key={c.tag}
                  className="flex gap-6 rounded-2xl border border-border bg-secondary p-8"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-clinical-blue text-white">
                    <Icon className="size-5" />
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Destacados / timeline */}
      <section className="border-t border-border bg-secondary/40 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("novedades.updates.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("novedades.updates.title")}
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
            {t("novedades.comingSoon")}
          </p>
        </div>
      </section>

      {/* Casos clínicos destacados */}
      <section className="border-t border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("novedades.casos.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("novedades.casos.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-clinical-slate">
              {t("novedades.casos.description")}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {casos.map((c) => (
              <article
                key={c.area}
                className="rounded-2xl border border-border bg-secondary p-7"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue text-white">
                  <Microscope className="size-5" />
                </div>
                <div className="mt-5 font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
                  {c.area}
                </div>
                <p className="mt-2 text-sm text-clinical-slate">{c.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-sm text-clinical-slate">
            {t("novedades.casos.soon")}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

