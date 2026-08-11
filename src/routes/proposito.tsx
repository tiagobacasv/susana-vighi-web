import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { seoText } from "@/i18n";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { Target, Compass } from "lucide-react";

export const Route = createFileRoute("/proposito")({
  head: () => ({
    meta: [
      { title: seoText("seo.proposito.title") },
      { name: "description", content: seoText("seo.proposito.description") },
      { property: "og:title", content: seoText("seo.proposito.ogTitle") },
      { property: "og:description", content: seoText("seo.proposito.ogDescription") },
      { property: "og:url", content: "/proposito" },
    ],
    links: [{ rel: "canonical", href: "/proposito" }],
  }),
  component: PropositoPage,
});

type Valor = { titulo: string; texto: string };

function PropositoPage() {
  const { t } = useTranslation();
  const valores = t("proposito.valores.items", { returnObjects: true }) as Valor[];

  return (
    <SiteLayout>
      <PageHero
        variant="compass"
        eyebrow={t("proposito.hero.eyebrow")}
        title={t("proposito.hero.title")}
        description={t("proposito.hero.description")}
      />

      {/* Misión + Propósito */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <article className="group relative overflow-hidden rounded-2xl border border-border bg-secondary p-10">
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-clinical-blue text-white">
                <Compass className="size-5" />
              </div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-clinical-accent">
                {t("proposito.mission.title")}
              </h2>
              <p className="mt-4 text-2xl font-bold leading-snug tracking-tight text-clinical-blue md:text-3xl">
                {t("proposito.mission.quote")}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-clinical-slate">
                {t("proposito.mission.text")}
              </p>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-border bg-secondary p-10">
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-clinical-blue text-white">
                <Target className="size-5" />
              </div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-clinical-accent">
                {t("proposito.purpose.title")}
              </h2>
              <p className="mt-4 text-2xl font-bold leading-snug tracking-tight text-clinical-blue md:text-3xl">
                {t("proposito.purpose.quote")}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-clinical-slate">
                {t("proposito.purpose.text")}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Frase / quote */}
      <section className="bg-clinical-blue py-24 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-2xl font-semibold leading-snug md:text-3xl">
            {t("proposito.quoteSection.text")}
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-widest text-clinical-accent">
            CAP Vighi
          </p>
          <Link
            to="/contacto"
            className="mt-12 inline-block rounded-lg bg-clinical-accent px-6 py-3 font-semibold text-clinical-blue hover:opacity-90"
          >
            {t("proposito.quoteSection.cta")}
          </Link>
        </div>
      </section>

      {/* Valores (movidos debajo del quote) */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("proposito.valores.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("proposito.valores.title")}
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
