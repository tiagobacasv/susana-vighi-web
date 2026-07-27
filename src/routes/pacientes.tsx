import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { HeartPulse, Clock, FileText, MapPin, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/pacientes")({
  head: () => ({
    meta: [
      { title: "Información para pacientes — CAP Vighi" },
      {
        name: "description",
        content:
          "Qué es una biopsia, cómo prepararte, tiempos esperables, cómo retirar tu informe y respuestas a las preguntas más frecuentes de pacientes.",
      },
      { property: "og:title", content: "Información para pacientes — CAP Vighi" },
      {
        property: "og:description",
        content:
          "Guía clara y humana para pacientes: qué esperar, cómo prepararte y cómo retirar tu informe en el CAP Vighi.",
      },
    ],
  }),
  component: PacientesPage,
});

const iconos = [HeartPulse, Clock, FileText, MapPin];

function PacientesPage() {
  const { t } = useTranslation();
  const bloques = t("pacientes.bloques", { returnObjects: true }) as {
    title: string;
    text: string;
  }[];
  const faqs = t("pacientes.faqs", { returnObjects: true }) as {
    q: string;
    a: string;
  }[];

  return (
    <SiteLayout>
      <PageHero
        variant="heartbeat"
        eyebrow={t("pacientes.hero.eyebrow")}
        title={t("pacientes.hero.title")}
        description={t("pacientes.hero.description")}
      />

      {/* Bloques básicos */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {bloques.map((b, i) => {
              const Icon = iconos[i];
              return (
                <article
                  key={b.title}
                  className="rounded-2xl border border-border bg-secondary p-10"
                >
                  <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue text-white">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-clinical-blue">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-sm text-clinical-slate">{b.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portal / retiro de informes destacado */}
      <section className="border-y border-border bg-clinical-blue py-24 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("pacientes.portal.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("pacientes.portal.title")}
            </h2>
            <p className="mt-5 max-w-xl text-white/75">
              {t("pacientes.portal.description")}
            </p>
          </div>
          <div className="space-y-3 md:col-span-2">
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
                {t("pacientes.portal.in")}
              </div>
              <div className="mt-2 text-sm text-white/85">
                {t("pacientes.portal.inValue")}
              </div>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
                {t("pacientes.portal.mail")}
              </div>
              <a
                href="mailto:anatomia.patologica@susanavighi.com.ar"
                className="mt-2 block break-all text-sm text-white/85 hover:text-white"
              >
                anatomia.patologica@susanavighi.com.ar
              </a>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
                {t("pacientes.portal.phone")}
              </div>
              <a
                href="tel:+541145517752"
                className="mt-2 block text-sm text-white/85 hover:text-white"
              >
                (5411) 4551-7752
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("pacientes.faqEyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("pacientes.faqTitle")}
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-clinical-slate">
              {t("pacientes.faqFooter")}
            </p>
            <Link
              to="/contacto"
              className="mt-3 inline-block rounded-lg bg-clinical-blue px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {t("pacientes.faqCta")}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function FaqItem({
  q,
  a,
  defaultOpen = false,
}: {
  q: string;
  a: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-secondary">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-clinical-blue">{q}</span>
        {open ? (
          <Minus className="size-4 shrink-0 text-clinical-accent" />
        ) : (
          <Plus className="size-4 shrink-0 text-clinical-accent" />
        )}
      </button>
      {open && (
        <div className="border-t border-border bg-background px-6 py-5 text-sm text-clinical-slate">
          {a}
        </div>
      )}
    </div>
  );
}
