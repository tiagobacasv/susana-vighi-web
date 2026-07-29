import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { seoText } from "@/i18n";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { Microscope } from "lucide-react";
import comunicarSaludLogo from "@/assets/comunicar-salud-logo.svg";

const fuenteLogos: Record<string, string> = {
  "Comunicar Salud": comunicarSaludLogo,
};

export const Route = createFileRoute("/novedades")({
  head: () => ({
    meta: [
      { title: seoText("seo.novedades.title") },
      { name: "description", content: seoText("seo.novedades.description") },
      { property: "og:title", content: seoText("seo.novedades.ogTitle") },
      { property: "og:description", content: seoText("seo.novedades.ogDescription") },
    ],
  }),
  component: NovedadesPage,
});

function NovedadesPage() {
  const { t } = useTranslation();
  const destacados = t("novedades.destacados", { returnObjects: true }) as {
    fecha: string;
    categoria: string;
    titulo: string;
    resumen: string;
    fuente?: string;
    quote?: string;
    cta?: string;
    url?: string;
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

      {/* Destacados / timeline */}
      <section className="py-24">
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
                  {d.fuente && (
                    <span className="flex items-center gap-1.5">
                      {fuenteLogos[d.fuente] && (
                        <img
                          src={fuenteLogos[d.fuente]}
                          alt=""
                          className="h-4 w-auto"
                        />
                      )}
                      <span className="text-sm font-semibold italic text-clinical-blue">
                        {d.fuente}
                      </span>
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-xl font-bold text-clinical-blue">
                  {d.titulo}
                </h3>
                {d.quote && (
                  <blockquote className="mt-4 border-l-2 border-clinical-accent/40 pl-4 text-base italic leading-relaxed text-clinical-slate">
                    "{d.quote}"
                  </blockquote>
                )}
                <p className="mt-2 text-sm text-clinical-slate">{d.resumen}</p>
                {d.url && d.cta && (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-4 ml-auto flex w-fit items-center gap-2 text-sm font-semibold italic text-clinical-blue hover:not-italic"
                  >
                    {d.cta}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                )}
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

