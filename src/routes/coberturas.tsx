import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { ShieldCheck, Building2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/coberturas")({
  head: () => ({
    meta: [
      { title: "Coberturas y centros — CAP Vighi" },
      {
        name: "description",
        content:
          "Obras sociales, prepagas y centros de salud con los que trabajamos en anatomía patológica.",
      },
      { property: "og:title", content: "Coberturas y centros — CAP Vighi" },
      {
        property: "og:description",
        content:
          "Red de obras sociales, medicina prepaga y clínicas asociadas a CAP Vighi.",
      },
    ],
  }),
  component: CoberturasPage,
});

const obrasSociales = [
  "OSDE",
  "Swiss Medical",
  "Galeno",
  "Medifé",
  "Omint",
  "Medicus",
  "Accord Salud",
  "Sancor Salud",
  "Federada Salud",
  "OSPACA",
  "OSPAT",
  "OSDEPYM",
  "OSPIP",
  "OSPSA",
  "IOMA",
  "PAMI",
];

const centros = [
  "Sanatorio Otamendi",
  "Sanatorio Anchorena",
  "Sanatorio de Los Arcos",
  "Sanatorio Güemes",
  "Hospital Alemán",
  "Clínica del Sol",
  "Clínica Bazterrica",
  "Clínica Santa Isabel",
  "Instituto Argentino de Diagnóstico y Tratamiento",
  "Centro Rossi",
  "Diagnóstico Maipú",
  "Fundación Favaloro",
];

function CoberturasPage() {
  return (
    <SiteLayout>
      <PageHero
        variant="contact"
        eyebrow="Coberturas · Red de centros"
        title="Trabajamos con las principales coberturas y centros de salud."
        description="Coordinamos la recepción y el circuito administrativo con obras sociales, medicina prepaga y clínicas de referencia."
      />

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-clinical-surface p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue">
                <ShieldCheck className="size-5 text-white" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                  01
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Obras sociales y prepagas
                </h2>
              </div>
            </div>
            <p className="mb-8 text-sm text-clinical-slate">
              Consultá por autorizaciones y modalidad de cobertura para cada estudio.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {obrasSociales.map((o) => (
                <li
                  key={o}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-clinical-accent" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-clinical-surface p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue">
                <Building2 className="size-5 text-white" />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                  02
                </span>
                <h2 className="text-2xl font-bold tracking-tight">
                  Centros y sanatorios asociados
                </h2>
              </div>
            </div>
            <p className="mb-8 text-sm text-clinical-slate">
              Recibimos muestras derivadas de las principales instituciones médicas del área metropolitana.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {centros.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium"
                >
                  <span className="size-1.5 shrink-0 rounded-full bg-clinical-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl px-6 text-center">
          <p className="text-clinical-slate">
            ¿No encontrás tu obra social? Consultanos, incorporamos nuevas coberturas periódicamente.
          </p>
          <Link
            to="/contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-clinical-blue px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            Consultar cobertura
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
