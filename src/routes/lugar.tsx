import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import heroImg from "@/assets/hero-histology.jpg";

export const Route = createFileRoute("/lugar")({
  head: () => ({
    meta: [
      { title: "Nuestro lugar — CAP Vighi" },
      { name: "description", content: "Instalaciones del Centro de Anatomía Patológica Dra. Susana Vighi en Buenos Aires." },
      { property: "og:title", content: "Nuestro lugar — CAP Vighi" },
      { property: "og:description", content: "Un espacio diseñado para la precisión diagnóstica y la trazabilidad." },
    ],
  }),
  component: LugarPage,
});

function LugarPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Nuestro lugar"
        title="Un espacio diseñado para la precisión."
        description="Instalaciones planificadas para optimizar el flujo de muestras, garantizar la trazabilidad y sostener la incorporación continua de nueva tecnología."
      />
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
            <img src={heroImg} alt="Recepción CAP Vighi" loading="lazy" width={800} height={1000} className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="space-y-8 self-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Recepción y atención</h2>
              <p className="mt-3 text-clinical-slate">Espacio diferenciado para pacientes y para la entrega de muestras de médicos derivantes.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Laboratorio histológico</h2>
              <p className="mt-3 text-clinical-slate">Procesamiento, inclusión, microtomía y coloración con flujo ordenado y trazable.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Patología digital</h2>
              <p className="mt-3 text-clinical-slate">Escaneo de portaobjetos en alta resolución para diagnóstico digital, archivo e interconsulta.</p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
