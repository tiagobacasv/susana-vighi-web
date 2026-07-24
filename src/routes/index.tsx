import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/SiteLayout";
import { Microscope, FlaskConical, ScanLine } from "lucide-react";
import heroImg from "@/assets/hero-option-1.jpg";
import histoImg from "@/assets/service-histopathology.jpg";
import immunoImg from "@/assets/service-immuno.jpg";
import cytoImg from "@/assets/service-cytology.jpg";

const coberturasLogos = Object.values(
  import.meta.glob("@/assets/Coberturas/*.{png,jpg,jpeg}", { eager: true, import: "default" }),
) as string[];

const centrosLogos = Object.values(
  import.meta.glob("@/assets/CentrosMedicos/*.{png,jpg,jpeg}", { eager: true, import: "default" }),
) as string[];

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
  { key: "pap", value: "3" },
  { key: "biopsy", value: "6" },
  { key: "ihq", value: "7" },
  { key: "biopsyIhq", value: "9" },
] as const;

const services = [
  { key: "histo", img: histoImg, Icon: Microscope },
  { key: "ihq", img: immunoImg, Icon: FlaskConical },
  { key: "cyto", img: cytoImg, Icon: ScanLine },
] as const;

const pillars = [
  { n: "01", key: "celeridad" },
  { n: "02", key: "calidad" },
  { n: "03", key: "equipo" },
  { n: "04", key: "tecnologia" },
] as const;

function LogoMarquee({ logos, direction }: { logos: string[]; direction: "left" | "right" }) {
  return (
    <div
      className="marquee-row relative overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={
          "flex w-max items-center gap-10 " +
          (direction === "left" ? "animate-marquee-left" : "animate-marquee-right")
        }
      >
        {[...logos, ...logos].map((src, i) => (
          <div
            key={i}
            className="flex h-16 w-32 shrink-0 items-center justify-center rounded-lg border border-border bg-background p-3"
          >
            <img src={src} alt="" loading="lazy" className="max-h-full max-w-full object-contain grayscale opacity-70 transition-all hover:grayscale-0 hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const { t } = useTranslation();
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="z-10">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-clinical-accent/30 bg-clinical-accent/10 px-3 py-1">
                <span className="size-1.5 animate-pulse rounded-full bg-clinical-accent" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-clinical-blue">
                  {t("home.hero.badge")}
                </span>
              </div>
              <h1 className="mb-8 text-5xl font-bold leading-[0.95] tracking-tighter text-balance md:text-7xl">
                {t("home.hero.titleA")} <br />
                <span className="text-clinical-accent">{t("home.hero.titleB")}</span>
              </h1>
              <p className="mb-10 max-w-lg text-xl leading-relaxed text-clinical-slate">
                {t("home.hero.description")}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/especialidades"
                  className="rounded-lg bg-clinical-blue px-8 py-4 font-semibold text-primary-foreground transition-all hover:shadow-xl"
                >
                  {t("home.hero.ctaSpecialties")}
                </Link>
                <Link
                  to="/contacto"
                  className="rounded-lg border border-border bg-background px-8 py-4 font-semibold text-foreground transition-all hover:bg-secondary"
                >
                  {t("home.hero.ctaContact")}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 rotate-3">
                <img
                  src={heroImg}
                  alt={t("home.hero.imgAlt")}
                  width={1280}
                  height={1280}
                  className="size-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-background p-6 shadow-xl">
                <div className="text-3xl font-bold text-clinical-blue">24–72hs</div>
                <div className="font-mono text-xs uppercase tracking-wider text-clinical-slate">
                  {t("home.hero.turnaroundBadge")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turnaround */}
      <section className="border-y border-border bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-baseline justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-clinical-slate">
              {t("home.turnaround.eyebrow")}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-clinical-slate md:block">
              {t("home.turnaround.unit")}
            </span>
          </div>
          <div className="grid gap-12 md:grid-cols-4 text-center">
            {turnaround.map((tt) => (
              <div key={tt.key}>
                <div className="mb-6 h-1 w-12 bg-clinical-accent mx-auto" />
                <div className="mb-2 text-5xl font-bold tracking-tight">
                  {tt.value}
                  <span className="ml-1 text-2xl text-clinical-slate">d</span>
                </div>
                <div className="text-sm font-semibold text-foreground">
                  {t(`home.turnaround.items.${tt.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                {t("home.services.eyebrow")}
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                {t("home.services.title")}
              </h2>
              <p className="mt-6 text-lg text-clinical-slate">
                {t("home.services.description")}
              </p>
            </div>
            <Link
              to="/especialidades"
              className="group flex items-center gap-2 font-semibold italic text-clinical-blue hover:not-italic"
            >
              {t("home.services.seeAll")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-3 items-stretch">
            {services.map((s) => (
              <article
                key={s.key}
                className="group flex flex-col rounded-2xl border border-border p-8 transition-all hover:border-clinical-accent hover:shadow-2xl hover:shadow-clinical-accent/10"
              >
                <div className="mb-6 flex size-12 items-center justify-center rounded-lg border border-border bg-secondary transition-colors group-hover:border-clinical-accent/30 group-hover:bg-clinical-accent/10">
                  <s.Icon className="size-5 text-clinical-blue transition-colors group-hover:text-clinical-accent" />
                </div>
                <h3 className="mb-4 text-xl font-bold">{t(`home.services.${s.key}.title`)}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-clinical-slate">
                  {t(`home.services.${s.key}.desc`)}
                </p>
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={s.img}
                    alt={t(`home.services.${s.key}.title`)}
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

      {/* Pillars */}
      <section className="bg-clinical-blue py-32 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-20 max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
              {t("home.pillars.eyebrow")}
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              {t("home.pillars.title")}
            </h2>
            <p className="mt-6 max-w-3xl text-lg text-white/60">
              {t("home.pillars.description")}
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div
                key={p.n}
                className="group bg-clinical-blue p-10 transition-colors hover:bg-white/5"
              >
                <div className="mb-8 font-mono text-sm text-clinical-accent">{p.n}</div>
                <h3 className="mb-4 text-xl font-bold tracking-tight">
                  {t(`home.pillars.${p.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {t(`home.pillars.${p.key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coberturas strip */}
      <section className="border-y border-border bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                {t("home.coverage.eyebrow")}
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                {t("home.coverage.title")}
              </h2>
              <p className="mt-4 text-clinical-slate">
                {t("home.coverage.description")}
              </p>
            </div>
            <Link
              to="/coberturas"
              className="group flex items-center gap-2 font-semibold italic text-clinical-blue hover:not-italic"
            >
              {t("home.coverage.seeAll")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-14 space-y-6">
          <LogoMarquee logos={coberturasLogos} direction="left" />
          <LogoMarquee logos={centrosLogos} direction="right" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="mt-20 mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t("home.cta.title")}
            </h2>
          </div>
          <div>
            <p className="text-lg text-clinical-slate">{t("home.cta.description")}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/equipo"
                className="rounded-lg bg-clinical-blue px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
              >
                {t("home.cta.team")}
              </Link>
              <Link
                to="/sistema-gestion"
                className="rounded-lg border border-border px-6 py-3 font-semibold hover:bg-secondary"
              >
                {t("home.cta.quality")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
