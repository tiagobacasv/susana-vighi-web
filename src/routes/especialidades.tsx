import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import {
  FlaskConical,
  Microscope,
  Dna,
  Activity,
  Sparkles,
  ScanLine,
  Layers,
  ChevronRight,
  Snowflake,
  Droplets,
  FileSearch,
  Stethoscope,
  ArrowUp,
  Grid2x2,
  PlusCircle,
} from "lucide-react";
import { useEffect, useState, type ElementType } from "react";

export const Route = createFileRoute("/especialidades")({
  head: () => ({
    meta: [
      { title: "Especialidades — CAP Vighi" },
      {
        name: "description",
        content:
          "Biología Molecular, Inmunohistoquímica y Técnicas de Alta Complejidad: citometría de flujo, inmunofluorescencia y microscopía electrónica.",
      },
      { property: "og:title", content: "Especialidades — CAP Vighi" },
      {
        property: "og:description",
        content:
          "Diagnóstico anatomopatológico integral: biología molecular, inmunohistoquímica y técnicas de alta complejidad.",
      },
    ],
  }),
  component: EspecialidadesPage,
});

type EspMeta = {
  slug: "biologia-molecular" | "inmunohistoquimica" | "tecnicas-alta-complejidad" | "histopatologia" | "citologia";
  numero: string;
  Icon: ElementType;
  hasDestacados?: boolean;
  hasPaneles?: boolean;
  subIcons?: ElementType[];
};

const especialidadesMeta: EspMeta[] = [
  { slug: "biologia-molecular", numero: "01", Icon: Dna, hasDestacados: true },
  { slug: "inmunohistoquimica", numero: "02", Icon: FlaskConical, hasPaneles: true },
  { slug: "tecnicas-alta-complejidad", numero: "03", Icon: Layers, subIcons: [Activity, Sparkles, ScanLine] },
  { slug: "histopatologia", numero: "04", Icon: Microscope },
  { slug: "citologia", numero: "05", Icon: ScanLine },
];

const complementariosIcons = [Snowflake, Droplets, FileSearch, Stethoscope];

function EspecialidadesPage() {
  const { t } = useTranslation();
  const subespecialidades = t("especialidades.subespecialidades", {
    returnObjects: true,
  }) as { area: string; items: string[] }[];
  const complementarios = t("especialidades.complementarios", {
    returnObjects: true,
  }) as { titulo: string; detalle: string }[];

  return (
    <SiteLayout>
      <PageHero
        variant="dna"
        eyebrow={t("especialidades.hero.eyebrow")}
        title={t("especialidades.hero.title")}
        description={t("especialidades.hero.description")}
      />

      {/* Índice */}
      <section id="indice" className="border-b border-border bg-background">
        <div className="px-6 py-10">
          <div className="flex gap-2 overflow-x-auto justify-center">
            {especialidadesMeta.map((e) => (
              <a
                key={e.slug}
                href={`#${e.slug}`}
                className="group flex items-center gap-2 rounded-lg border border-border px-4 py-3 transition-colors hover:border-clinical-accent hover:bg-secondary"
              >
                <e.Icon className="size-5 shrink-0 text-clinical-accent" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  {e.numero}
                </span>
                <span className="min-w-0 text-xs font-semibold leading-tight">
                  {t(`especialidades.items.${e.slug}.titulo`)}
                </span>
              </a>
            ))}
            <a
              href="#subespecialidades"
              className="group flex items-center gap-2 rounded-lg border border-border px-4 py-3 transition-colors hover:border-clinical-accent hover:bg-secondary"
            >
              <Grid2x2 className="size-5 shrink-0 text-clinical-accent" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                06
              </span>
              <span className="min-w-0 text-xs font-semibold leading-tight">
                {t("especialidades.indexLabels.sub")}
              </span>
            </a>
            <a
              href="#complementarios"
              className="group flex items-center gap-2 rounded-lg border border-border px-4 py-3 transition-colors hover:border-clinical-accent hover:bg-secondary"
            >
              <PlusCircle className="size-5 shrink-0 text-clinical-accent" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                07
              </span>
              <span className="min-w-0 text-xs font-semibold leading-tight">
                {t("especialidades.indexLabels.comp")}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Detalle */}
      <div className="bg-secondary/30">
        {especialidadesMeta.map((e, idx) => {
          const titulo = t(`especialidades.items.${e.slug}.titulo`);
          const resumen = t(`especialidades.items.${e.slug}.resumen`);
          const partnership = t(`especialidades.items.${e.slug}.partnership`, {
            defaultValue: "",
          });
          const destacados = e.hasDestacados
            ? (t(`especialidades.items.${e.slug}.destacados`, {
                returnObjects: true,
              }) as { titulo: string; detalle: string }[])
            : null;
          const paneles = e.hasPaneles
            ? (t(`especialidades.items.${e.slug}.paneles`, {
                returnObjects: true,
              }) as { titulo: string; detalle: string }[])
            : null;
          const subs = e.subIcons
            ? (t(`especialidades.items.${e.slug}.sub`, {
                returnObjects: true,
              }) as {
                titulo: string;
                descripcion: string;
                bullets?: string[];
                envio?: string[];
              }[])
            : null;

          return (
            <section
              key={e.slug}
              id={e.slug}
              className={
                "scroll-mt-24 py-20 " + (idx % 2 === 1 ? "bg-background" : "")
              }
            >
              <div className="mx-auto max-w-7xl px-6">
                <header className="mb-10 flex items-start gap-6">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-clinical-blue text-white shadow-lg shadow-clinical-blue/20">
                    <e.Icon className="size-7" />
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                      {e.numero} · {t("especialidades.indexLabels.specialty")}
                    </div>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                      {titulo}
                    </h2>
                    {partnership && (
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5">
                        <span className="size-1.5 rounded-full bg-clinical-accent" />
                        <span className="font-mono text-[10px] uppercase tracking-widest text-clinical-blue">
                          {t("especialidades.partnership")} · {partnership}
                        </span>
                      </div>
                    )}
                  </div>
                </header>

                <p className="max-w-4xl text-base leading-relaxed text-clinical-slate md:text-lg">
                  {resumen}
                </p>

                {destacados && (
                  <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {destacados.map((d) => (
                      <div
                        key={d.titulo}
                        className="rounded-xl border border-border bg-background p-6"
                      >
                        <h3 className="text-sm font-bold tracking-tight">
                          {d.titulo}
                        </h3>
                        <p className="mt-3 text-xs leading-relaxed text-clinical-slate">
                          {d.detalle}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {paneles && (
                  <div className="mt-12">
                    <h3 className="mb-6 font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                      {t("especialidades.panelsHeading")}
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {paneles.map((p) => (
                        <div
                          key={p.titulo}
                          className="flex gap-4 rounded-xl border border-border bg-background p-5"
                        >
                          <ChevronRight className="mt-0.5 size-4 shrink-0 text-clinical-accent" />
                          <div>
                            <h4 className="text-sm font-bold tracking-tight">
                              {p.titulo}
                            </h4>
                            <p className="mt-1.5 text-xs leading-relaxed text-clinical-slate">
                              {p.detalle}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {subs && e.subIcons && (
                  <div className="mt-12 space-y-6">
                    {subs.map((s, si) => {
                      const SIcon = e.subIcons![si];
                      return (
                        <article
                          key={s.titulo}
                          className="rounded-2xl border border-border bg-background p-7"
                        >
                          <header className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-clinical-accent/10">
                              <SIcon className="size-5 text-clinical-accent" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight">
                              {s.titulo}
                            </h3>
                          </header>
                          <p className="mt-4 text-sm leading-relaxed text-clinical-slate">
                            {s.descripcion}
                          </p>

                          {s.bullets && (
                            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                              {s.bullets.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-center gap-2 rounded-md bg-secondary px-3 py-2 text-xs font-medium"
                                >
                                  <span className="size-1 rounded-full bg-clinical-accent" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          )}

                          {s.envio && (
                            <div className="mt-5 rounded-lg border border-dashed border-border bg-secondary/50 p-4">
                              <p className="font-mono text-[10px] uppercase tracking-widest text-clinical-blue">
                                {t("especialidades.shippingLabel")}
                              </p>
                              <ul className="mt-2 space-y-1.5">
                                {s.envio.map((line, i) => (
                                  <li
                                    key={i}
                                    className="text-xs leading-relaxed text-clinical-slate"
                                  >
                                    · {line}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Subespecialidades diagnósticas */}
      <section
        id="subespecialidades"
        className="scroll-mt-24 border-t border-border bg-background py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("especialidades.sub.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("especialidades.sub.title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-clinical-slate">
              {t("especialidades.sub.description")}
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {subespecialidades.map((s) => (
              <div key={s.area} className="bg-background p-7">
                <h3 className="text-sm font-bold tracking-tight text-clinical-blue">
                  {s.area}
                </h3>
                <ul className="mt-4 space-y-2">
                  {s.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2 text-xs leading-relaxed text-clinical-slate"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-clinical-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios complementarios */}
      <section
        id="complementarios"
        className="scroll-mt-24 border-t border-border bg-secondary/40 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                {t("especialidades.comp.eyebrow")}
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                {t("especialidades.comp.title")}
              </h2>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-clinical-slate">
              {t("especialidades.comp.description")}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {complementarios.map((c, i) => {
              const Icon = complementariosIcons[i];
              return (
                <article
                  key={c.titulo}
                  className="flex gap-5 rounded-2xl border border-border bg-background p-7"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-clinical-accent/10">
                    <Icon className="size-5 text-clinical-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">
                      {c.titulo}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-clinical-slate">
                      {c.detalle}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA médicos derivantes */}
      <section className="border-t border-border bg-clinical-blue py-20 text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
            {t("especialidades.cta.eyebrow")}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {t("especialidades.cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/75">
            {t("especialidades.cta.description")}
          </p>
          <Link
            to="/derivantes"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-clinical-blue hover:bg-clinical-accent hover:text-white"
          >
            {t("especialidades.cta.button")}
          </Link>
        </div>
      </section>
      <BackToTop label={t("especialidades.backToTop")} />
    </SiteLayout>
  );
}

function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={
        "fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-clinical-blue text-white shadow-lg shadow-clinical-blue/30 transition-all hover:bg-clinical-accent hover:scale-105 " +
        (visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-3")
      }
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
