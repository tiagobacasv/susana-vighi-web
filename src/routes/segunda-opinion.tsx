import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { seoText } from "@/i18n";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { FileSearch, PackageCheck, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/segunda-opinion")({
  head: () => ({
    meta: [
      { title: seoText("seo.segundaOpinion.title") },
      { name: "description", content: seoText("seo.segundaOpinion.description") },
      { property: "og:title", content: seoText("seo.segundaOpinion.ogTitle") },
      { property: "og:description", content: seoText("seo.segundaOpinion.ogDescription") },
      { property: "og:url", content: "/segunda-opinion" },
    ],
    links: [{ rel: "canonical", href: "/segunda-opinion" }],
  }),
  component: SegundaOpinionPage,
});

type Paso = { titulo: string; texto: string };

function SegundaOpinionPage() {
  const { t } = useTranslation();
  const pasos = t("segundaOpinion.circuito.items", { returnObjects: true }) as Paso[];
  const requisitos = t("segundaOpinion.requisitos.items", { returnObjects: true }) as string[];
  const casos = t("segundaOpinion.casos.items", { returnObjects: true }) as string[];

  return (
    <SiteLayout>
      <PageHero
        variant="microscope"
        eyebrow={t("segundaOpinion.hero.eyebrow")}
        title={t("segundaOpinion.hero.title")}
        description={t("segundaOpinion.hero.description")}
      />

      {/* Cuándo pedirla */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                {t("segundaOpinion.casos.eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {t("segundaOpinion.casos.title")}
              </h2>
              <p className="mt-5 text-clinical-slate">{t("segundaOpinion.casos.text")}</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {casos.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 rounded-xl border border-border bg-secondary p-5 text-sm text-clinical-slate"
                >
                  <FileSearch className="mt-0.5 size-4 shrink-0 text-clinical-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Circuito */}
      <section className="border-y border-border bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("segundaOpinion.circuito.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("segundaOpinion.circuito.title")}
            </h2>
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p, i) => (
              <li key={p.titulo} className="bg-background p-8">
                <div className="font-mono text-xs font-bold text-clinical-accent">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-clinical-blue">
                  {p.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-clinical-slate">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Requisitos + contacto */}
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border p-10">
            <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-clinical-blue text-white">
              <PackageCheck className="size-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              {t("segundaOpinion.requisitos.title")}
            </h2>
            <ul className="mt-6 space-y-3">
              {requisitos.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-clinical-slate">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-clinical-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-clinical-blue p-10 text-white">
            <h2 className="text-2xl font-bold tracking-tight">
              {t("segundaOpinion.contacto.title")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {t("segundaOpinion.contacto.text")}
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:anatomia.patologica@susanavighi.com.ar"
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-5 text-sm transition hover:bg-white/10"
              >
                <Mail className="size-4 shrink-0 text-clinical-accent" />
                anatomia.patologica@susanavighi.com.ar
              </a>
              <a
                href="tel:+541145517752"
                className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-5 text-sm transition hover:bg-white/10"
              >
                <Phone className="size-4 shrink-0 text-clinical-accent" />
                (5411) 4551-7752
              </a>
            </div>
            <Link
              to="/derivantes"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-clinical-blue hover:opacity-90"
            >
              {t("segundaOpinion.contacto.cta")}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
