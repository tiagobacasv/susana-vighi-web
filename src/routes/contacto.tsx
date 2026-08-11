import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { seoText } from "@/i18n";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { Phone, Mail, MapPin, Clock, Briefcase, FileText, Calculator, HeartPulse, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: seoText("seo.contacto.title") },
      { name: "description", content: seoText("seo.contacto.description") },
      { property: "og:title", content: seoText("seo.contacto.ogTitle") },
      { property: "og:description", content: seoText("seo.contacto.ogDescription") },
      { property: "og:url", content: "/contacto" },
    ],
    links: [{ rel: "canonical", href: "/contacto" }],
  }),
  component: ContactoPage,
});

const telefonos = [
  { num: "(5411) 4551-7752", href: "tel:+541145517752" },
  { num: "(5411) 4551-7267", href: "tel:+541145517267" },
  { num: "(5411) 2035-9667", href: "tel:+541120359667" },
];

const emails = [
  { email: "anatomia.patologica@susanavighi.com.ar", Icon: Mail },
  { email: "presupuestosvighi@susanavighi.com.ar", Icon: Calculator },
  { email: "solicituddeservicio@susanavighi.com.ar", Icon: FileText },
  { email: "cv@susanavighi.com.ar", Icon: Briefcase },
];

function ContactoPage() {
  const { t } = useTranslation();
  const emailLabels = t("contacto.emails.items", { returnObjects: true }) as { label: string }[];

  return (
    <SiteLayout>
      <PageHero
        variant="contact"
        eyebrow={t("contacto.hero.eyebrow")}
        title={t("contacto.hero.title")}
        description={t("contacto.hero.description")}
      />

      {/* Bloque principal: datos + formulario */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Columna datos */}
            <div className="space-y-6 lg:col-span-3">
              {/* Teléfonos */}
              <article className="rounded-2xl border border-border bg-secondary p-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-clinical-blue text-white">
                    <Phone className="size-4" />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                    {t("contacto.phones.title")}
                  </h3>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                  {telefonos.map((tel) => (
                    <li key={tel.num}>
                      <a
                        href={tel.href}
                        className="block rounded-xl border border-border bg-background px-4 py-3 text-center text-base font-semibold text-clinical-blue transition-colors hover:border-clinical-accent hover:text-clinical-accent"
                      >
                        {tel.num}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Emails */}
              <article className="rounded-2xl border border-border bg-secondary p-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-clinical-blue text-white">
                    <Mail className="size-4" />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                    {t("contacto.emails.title")}
                  </h3>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {emails.map((e, i) => (
                    <li key={e.email}>
                      <a
                        href={`mailto:${e.email}`}
                        className="group flex items-start gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-clinical-accent"
                      >
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-clinical-accent/15 text-clinical-accent">
                          <e.Icon className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-mono uppercase tracking-widest text-clinical-slate">
                            {emailLabels[i]?.label}
                          </div>
                          <div className="mt-1 truncate text-sm font-medium text-clinical-blue group-hover:text-clinical-accent">
                            {e.email}
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </article>

              {/* Dirección + horarios */}
              <div className="grid gap-6 md:grid-cols-2">
                <article className="rounded-2xl border border-border bg-secondary p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-clinical-blue text-white">
                      <MapPin className="size-4" />
                    </div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                      {t("contacto.address.title")}
                    </h3>
                  </div>
                  <p className="mt-5 text-base font-semibold text-clinical-blue">
                    Concepción Arenal 3732
                  </p>
                  <p className="text-sm text-clinical-slate">
                    {t("contacto.address.line2")}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Concepci%C3%B3n+Arenal+3732,+CABA,+Argentina"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-clinical-accent hover:underline"
                  >
                    {t("contacto.address.mapLink")}
                  </a>
                </article>

                <article className="rounded-2xl border border-border bg-secondary p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-clinical-blue text-white">
                      <Clock className="size-4" />
                    </div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                      {t("contacto.hours.title")}
                    </h3>
                  </div>
                  <p className="mt-5 text-base font-semibold text-clinical-blue">
                    {t("contacto.hours.days")}
                  </p>
                  <p className="text-sm text-clinical-slate">{t("contacto.hours.time")}</p>
                </article>
              </div>
            </div>

            {/* Columna formulario */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col space-y-4 rounded-2xl border border-border bg-secondary p-8 lg:col-span-2"
            >
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                  {t("contacto.form.title")}
                </h3>
                <p className="mt-2 text-sm text-clinical-slate">
                  {t("contacto.form.description")}
                </p>
              </div>
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  {t("contacto.form.name")}
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-clinical-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  {t("contacto.form.email")}
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-clinical-accent focus:outline-none"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                  {t("contacto.form.message")}
                </label>
                <textarea
                  rows={5}
                  className="w-full flex-1 resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-clinical-accent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-clinical-blue px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
              >
                {t("contacto.form.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mapa embebido */}
      <section className="border-t border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                {t("contacto.map.eyebrow")}
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                {t("contacto.map.address")}
              </h2>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Ubicación CAP Vighi"
              src="https://www.google.com/maps?q=Concepci%C3%B3n+Arenal+3732,+CABA,+Argentina&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>
      </section>

      {/* Accesos rápidos */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/pacientes"
              className="group rounded-2xl border border-border bg-secondary p-10 transition-colors hover:border-clinical-accent"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue text-white">
                <HeartPulse className="size-5" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-clinical-blue">
                {t("contacto.quickAccess.pacientes.title")}
              </h3>
              <p className="mt-3 text-sm text-clinical-slate">
                {t("contacto.quickAccess.pacientes.description")}
              </p>
              <span className="mt-6 inline-block text-sm font-medium text-clinical-accent group-hover:underline">
                {t("contacto.quickAccess.pacientes.link")}
              </span>
            </Link>
            <Link
              to="/derivantes"
              className="group rounded-2xl border border-border bg-secondary p-10 transition-colors hover:border-clinical-accent"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue text-white">
                <ClipboardList className="size-5" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-clinical-blue">
                {t("contacto.quickAccess.derivantes.title")}
              </h3>
              <p className="mt-3 text-sm text-clinical-slate">
                {t("contacto.quickAccess.derivantes.description")}
              </p>
              <span className="mt-6 inline-block text-sm font-medium text-clinical-accent group-hover:underline">
                {t("contacto.quickAccess.derivantes.link")}
              </span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
