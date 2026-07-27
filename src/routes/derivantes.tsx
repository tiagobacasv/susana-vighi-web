import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import {
  ClipboardList,
  Beaker,
  Truck,
  FileDown,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/derivantes")({
  head: () => ({
    meta: [
      { title: "Médicos derivantes — CAP Vighi" },
      {
        name: "description",
        content:
          "Instructivo para médicos derivantes: toma, fijación y envío de muestras, requisitos por tipo de estudio, formularios y contactos de coordinación médica.",
      },
      { property: "og:title", content: "Médicos derivantes — CAP Vighi" },
      {
        property: "og:description",
        content:
          "Protocolos, requisitos y coordinación para el envío de muestras al Centro de Anatomía Patológica Dra. Susana Vighi.",
      },
    ],
  }),
  component: DerivantesPage,
});

const pasosMeta = [
  { n: "01", Icon: ClipboardList },
  { n: "02", Icon: Beaker },
  { n: "03", Icon: Truck },
  { n: "04", Icon: CheckCircle2 },
];

function DerivantesPage() {
  const { t } = useTranslation();
  const pasos = t("derivantes.pasos", { returnObjects: true }) as {
    titulo: string;
    texto: string;
  }[];
  const requisitos = t("derivantes.requisitos", { returnObjects: true }) as {
    tipo: string;
    items: string[];
  }[];

  return (
    <SiteLayout>
      <PageHero
        variant="referral"
        eyebrow={t("derivantes.hero.eyebrow")}
        title={t("derivantes.hero.title")}
        description={t("derivantes.hero.description")}
      />

      {/* Pasos */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("derivantes.circuit.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("derivantes.circuit.title")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pasosMeta.map((p, i) => (
              <article
                key={p.n}
                className="relative rounded-2xl border border-border bg-secondary p-8"
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  {p.n}
                </div>
                <div className="mt-4 flex size-11 items-center justify-center rounded-lg bg-clinical-blue text-white">
                  <p.Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-clinical-blue">
                  {pasos[i]?.titulo}
                </h3>
                <p className="mt-2 text-sm text-clinical-slate">
                  {pasos[i]?.texto}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Requisitos por estudio */}
      <section className="border-t border-border bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("derivantes.requirements.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("derivantes.requirements.title")}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requisitos.map((r) => (
              <article
                key={r.tipo}
                className="rounded-2xl border border-border bg-background p-8"
              >
                <h3 className="text-base font-bold text-clinical-blue">
                  {r.tipo}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-clinical-slate">
                  {r.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-clinical-accent" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-clinical-accent/30 bg-clinical-accent/5 p-6">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-clinical-accent" />
            <p className="text-sm text-clinical-slate">
              {t("derivantes.warning")}
            </p>
          </div>
        </div>
      </section>

      {/* Descargas + contacto coordinación */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-border bg-secondary p-10">
              <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue text-white">
                <FileDown className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-clinical-blue">
                {t("derivantes.forms.title")}
              </h3>
              <p className="mt-2 text-sm text-clinical-slate">
                {t("derivantes.forms.description")}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/formulario-derivacion.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-lg bg-clinical-blue px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  <FileDown className="size-4" />
                  {t("derivantes.forms.download")}
                </a>
                <a
                  href="mailto:solicituddeservicio@susanavighi.com.ar"
                  className="inline-flex items-center gap-2 rounded-lg border border-clinical-blue px-5 py-3 text-sm font-semibold text-clinical-blue hover:bg-clinical-blue hover:text-primary-foreground"
                >
                  <Mail className="size-4" />
                  {t("derivantes.forms.request")}
                </a>
              </div>
            </article>

            <article className="rounded-2xl border border-border bg-secondary p-10">
              <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                {t("derivantes.coord.eyebrow")}
              </div>
              <h3 className="mt-3 text-xl font-bold text-clinical-blue">
                {t("derivantes.coord.title")}
              </h3>
              <div className="mt-6 space-y-3 text-sm">
                <a
                  href="tel:+541145517752"
                  className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 hover:border-clinical-accent"
                >
                  <Phone className="size-4 text-clinical-accent" />
                  <span className="font-semibold text-clinical-blue">
                    (5411) 4551-7752
                  </span>
                  <span className="ml-auto text-clinical-slate">
                    {t("derivantes.coord.linesLabel")}
                  </span>
                </a>
                <a
                  href="mailto:anatomia.patologica@susanavighi.com.ar"
                  className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 hover:border-clinical-accent"
                >
                  <Mail className="size-4 text-clinical-accent" />
                  <span className="truncate font-semibold text-clinical-blue">
                    anatomia.patologica@susanavighi.com.ar
                  </span>
                </a>
              </div>
              <Link
                to="/contacto"
                className="mt-6 inline-block text-sm font-medium text-clinical-accent hover:underline"
              >
                {t("derivantes.coord.seeAll")}
              </Link>
            </article>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
