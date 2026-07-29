import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { seoText } from "@/i18n";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { Gauge, Radar, Activity } from "lucide-react";
import sistemaAsset from "@/assets/sistema-gestion.jpg";

export const Route = createFileRoute("/sistema-gestion")({
  head: () => ({
    meta: [
      { title: seoText("seo.sistemaGestion.title") },
      { name: "description", content: seoText("seo.sistemaGestion.description") },
      { property: "og:title", content: seoText("seo.sistemaGestion.ogTitle") },
      { property: "og:description", content: seoText("seo.sistemaGestion.ogDescription") },
    ],
  }),
  component: SistemaGestionPage,
});

// ───────────────────────────────────────────────────────────────────────────────

type Metric = { label: string; value: string; sub?: string };
type PilarTr = { titulo: string; subtitulo: string; desc: string; metrics: Metric[] };

const pilarIcons = [Gauge, Radar, Activity];

// ───────────────────────────────────────────────────────────────────────────────

function SistemaGestionPage() {
  const { t } = useTranslation();
  const stages = t("sistemaGestion.platform.stages", { returnObjects: true }) as string[];
  const pilares = t("sistemaGestion.pilares", { returnObjects: true }) as PilarTr[];

  return (
    <SiteLayout>
      <PageHero
        variant="dashboard"
        eyebrow={t("sistemaGestion.hero.eyebrow")}
        title={t("sistemaGestion.hero.title")}
        description={t("sistemaGestion.hero.description")}
      />

      {/* Imagen referencial del sistema */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-5 md:items-center">
            <div className="md:col-span-2">
              <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                {t("sistemaGestion.platform.eyebrow")}
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                {t("sistemaGestion.platform.title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-clinical-slate">
                {t("sistemaGestion.platform.description")}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {stages.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium text-clinical-blue"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:col-span-3">
              <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm">
                <img
                  src={sistemaAsset}
                  alt={t("sistemaGestion.platform.imgAlt")}
                  loading="lazy"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-5xl">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                {t("sistemaGestion.pillars.eyebrow")}
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {t("sistemaGestion.pillars.title")}
              </h2>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-clinical-slate">
              {t("sistemaGestion.pillars.description")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pilares.map((p, i) => {
              const Icon = pilarIcons[i];
              return (
                <article
                  key={p.titulo}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background p-8 transition-colors hover:border-clinical-accent"
                >
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-clinical-blue text-white shadow-sm">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-clinical-blue">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-snug text-clinical-accent">
                    {p.subtitulo}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-clinical-slate">
                    {p.desc}
                  </p>

                  <div className="mt-8 flex justify-center gap-6 border-t border-border">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col items-center pt-4 text-center" style={m.sub ? { marginBottom: "-15px" } : undefined}>
                        <span className="text-2xl font-bold tracking-tight text-clinical-blue">
                          {m.value}
                        </span>
                        <span className="text-[11px] font-medium uppercase tracking-wide text-clinical-slate">
                          {m.label}
                        </span>
                        {m.sub && (
                          <span className="text-[10px] text-clinical-slate/80">
                            {m.sub}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="border-t border-border bg-background py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
            {t("sistemaGestion.closing.eyebrow")}
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
            {t("sistemaGestion.closing.title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-clinical-slate">
            {t("sistemaGestion.closing.description")}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
