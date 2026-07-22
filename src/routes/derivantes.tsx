import { createFileRoute, Link } from "@tanstack/react-router";
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

const pasos = [
  {
    n: "01",
    Icon: ClipboardList,
    title: "Solicitud",
    text: "Completá el formulario con datos del paciente, diagnóstico presuntivo, estudios previos y datos del profesional derivante.",
  },
  {
    n: "02",
    Icon: Beaker,
    title: "Fijación de la muestra",
    text: "Formol al 10% tamponado en volumen 10:1 respecto al tejido. Recipiente rotulado con nombre y DNI del paciente.",
  },
  {
    n: "03",
    Icon: Truck,
    title: "Envío o retiro",
    text: "Retiro sin cargo dentro de CABA y GBA coordinando por teléfono. También recibimos envíos de todo el país.",
  },
  {
    n: "04",
    Icon: CheckCircle2,
    title: "Recepción y trazabilidad",
    text: "Cada muestra recibe código único de trazabilidad y confirmación de recepción al médico derivante.",
  },
];

const requisitos = [
  {
    tipo: "Biopsia por punción / endoscópica",
    items: [
      "Formol al 10% tamponado",
      "Rotulado con nombre y DNI",
      "Solicitud con localización anatómica precisa",
      "Adjuntar informe endoscópico si corresponde",
    ],
  },
  {
    tipo: "Pieza quirúrgica",
    items: [
      "Fijación inmediata en formol 10% (volumen 10:1)",
      "No cortar previo al envío salvo indicación",
      "Solicitud con dato clínico y quirúrgico completo",
      "Coordinar retiro dentro de las 24hs",
    ],
  },
  {
    tipo: "Citología ginecológica (PAP)",
    items: [
      "Extendido en portaobjeto identificado",
      "Fijación con spray citológico o alcohol 96°",
      "Datos clínicos: FUM, terapia hormonal, antecedentes",
    ],
  },
  {
    tipo: "Punción con aguja fina (PAAF)",
    items: [
      "Extendidos secados al aire (Diff-Quick) y fijados (Papanicolaou)",
      "Material en medio líquido para bloque celular si aplica",
      "Solicitud con localización, tamaño y ecografía",
    ],
  },
  {
    tipo: "Biopsia intraoperatoria (congelación)",
    items: [
      "Coordinar previamente por teléfono",
      "Muestra en fresco, sin fijar, en recipiente estéril",
      "Traslado inmediato al laboratorio",
    ],
  },
  {
    tipo: "Estudios moleculares / IHQ compleja",
    items: [
      "Muestra fijada en formol 10% (mínimo 6 hs, máximo 48 hs)",
      "Bloque de parafina con material representativo",
      "Solicitud detallando marcadores requeridos",
    ],
  },
];

function DerivantesPage() {
  return (
    <SiteLayout>
      <PageHero
        variant="referral"
        eyebrow="Protocolos · Requisitos · Coordinación"
        title="Para médicos derivantes."
        description="Todo lo que necesitás para enviarnos una muestra: protocolos de fijación, requisitos por tipo de estudio, formularios y contactos directos de coordinación médica."
      />

      {/* Pasos */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              Circuito de derivación
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              De la toma al informe.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p) => (
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
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-clinical-slate">{p.text}</p>
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
              Requisitos por tipo de estudio
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Preparación de la muestra.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requisitos.map((r) => (
              <article
                key={r.tipo}
                className="rounded-2xl border border-border bg-background p-8"
              >
                <h3 className="text-base font-bold text-clinical-blue">{r.tipo}</h3>
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
              Ante cualquier duda sobre fijación, transporte o tiempos, comunicate
              con nuestra coordinación médica antes de enviar la muestra.
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
                Formularios y protocolos
              </h3>
              <p className="mt-2 text-sm text-clinical-slate">
                Solicitá por mail el formulario de derivación, los protocolos de
                fijación y las guías por tipo de estudio.
              </p>
              <a
                href="mailto:solicituddeservicio@susanavighi.com.ar"
                className="mt-6 inline-block rounded-lg bg-clinical-blue px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Solicitar formularios
              </a>
            </article>

            <article className="rounded-2xl border border-border bg-secondary p-10">
              <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
                Coordinación médica
              </div>
              <h3 className="mt-3 text-xl font-bold text-clinical-blue">
                Hablemos directamente.
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
                  <span className="ml-auto text-clinical-slate">Líneas rotativas</span>
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
                Ver todos los datos de contacto →
              </Link>
            </article>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
