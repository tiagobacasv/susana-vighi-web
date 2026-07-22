import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
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

const bloques = [
  {
    Icon: HeartPulse,
    title: "¿Qué es una biopsia?",
    text: "Es el estudio microscópico de una muestra de tejido o células obtenida por un médico. Nuestros patólogos analizan la muestra para establecer un diagnóstico preciso que guíe el tratamiento.",
  },
  {
    Icon: Clock,
    title: "¿Cuánto demora el informe?",
    text: "La mayoría de los estudios se entregan entre 24 y 72 horas hábiles. Los estudios de mayor complejidad (inmunohistoquímica, biología molecular) pueden requerir plazos adicionales.",
  },
  {
    Icon: FileText,
    title: "¿Cómo retiro mi informe?",
    text: "El informe se entrega a tu médico derivante y también podés retirarlo personalmente en nuestra sede con DNI, o solicitarlo por mail acreditando identidad.",
  },
  {
    Icon: MapPin,
    title: "¿Dónde estamos?",
    text: "Concepción Arenal 3732, Ciudad Autónoma de Buenos Aires. Atención de lunes a viernes de 08:00 a 20:00 hs.",
  },
];

const faqs = [
  {
    q: "¿Necesito turno para dejar una muestra?",
    a: "No es necesario turno. Podés acercarte de lunes a viernes de 08:00 a 20:00 hs. Si es una pieza quirúrgica o material que requiere condiciones especiales, coordinamos el retiro por teléfono.",
  },
  {
    q: "¿Tengo que traer algo el día de la muestra?",
    a: "Sí: la orden médica original, tu DNI y la credencial de tu obra social o prepaga si corresponde. Si ya tenés estudios previos relacionados, traelos también.",
  },
  {
    q: "¿Cómo se entrega el resultado?",
    a: "El informe original se envía a tu médico derivante. Vos podés retirar una copia con tu DNI o pedirla por mail. No enviamos resultados por teléfono para preservar la confidencialidad.",
  },
  {
    q: "¿Trabajan con mi obra social o prepaga?",
    a: "Trabajamos con las principales obras sociales, prepagas y sanatorios del país. Consultá el listado completo en la sección Coberturas o llamanos para confirmar tu cobertura.",
  },
  {
    q: "¿Qué pasa si mi médico pide una segunda opinión?",
    a: "Recibimos consultas y segundas opiniones sobre material ya procesado en otro laboratorio. Traé los tacos de parafina y los preparados originales junto con el informe previo.",
  },
  {
    q: "¿Puedo pedir el mismo informe años después?",
    a: "Sí. Conservamos los preparados y tacos de parafina por los plazos que exige la normativa vigente. Podés solicitar una copia del informe o el material original acreditando identidad.",
  },
  {
    q: "¿Cómo cuidan mis datos?",
    a: "Trabajamos bajo la Ley 25.326 de Protección de Datos Personales. Tu información clínica es confidencial y solo se comparte con vos y con tu médico tratante.",
  },
];

function PacientesPage() {
  return (
    <SiteLayout>
      <PageHero
        variant="compass"
        eyebrow="Guía clara · Información al paciente"
        title="Acompañamos cada paso."
        description="Recibir un pedido de biopsia o citología puede generar dudas. Acá encontrás información clara sobre qué es cada estudio, cómo prepararte y cómo retirar tu informe."
      />

      {/* Bloques básicos */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {bloques.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-border bg-secondary p-10"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue text-white">
                  <b.Icon className="size-5" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-clinical-blue">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm text-clinical-slate">{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Portal / retiro de informes destacado */}
      <section className="border-y border-border bg-clinical-blue py-24 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              Retiro de informes
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Tu informe, disponible.
            </h2>
            <p className="mt-5 max-w-xl text-white/75">
              El informe original se envía directamente a tu médico derivante.
              También podés retirar una copia en nuestra sede o solicitarla por mail
              acreditando identidad. No entregamos resultados por teléfono para
              proteger tu confidencialidad.
            </p>
          </div>
          <div className="space-y-3 md:col-span-2">
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
                Presencial
              </div>
              <div className="mt-2 text-sm text-white/85">
                Concepción Arenal 3732, CABA · Lun a Vie 08:00 a 20:00
              </div>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/5 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
                Por mail
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
                Teléfono
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
              Preguntas frecuentes
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              Todo lo que tal vez te estés preguntando.
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-sm text-clinical-slate">
              ¿No encontrás lo que buscás?
            </p>
            <Link
              to="/contacto"
              className="mt-3 inline-block rounded-lg bg-clinical-blue px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Escribinos
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
