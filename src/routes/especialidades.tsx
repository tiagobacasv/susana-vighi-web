import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import histoImg from "@/assets/service-histopathology.jpg";
import immunoImg from "@/assets/service-immuno.jpg";
import cytoImg from "@/assets/service-cytology.jpg";

export const Route = createFileRoute("/especialidades")({
  head: () => ({
    meta: [
      { title: "Especialidades — CAP Vighi" },
      { name: "description", content: "Histopatología, inmunohistoquímica, citología y patología digital." },
      { property: "og:title", content: "Especialidades — CAP Vighi" },
      { property: "og:description", content: "Servicios diagnósticos del Centro de Anatomía Patológica Dra. Susana Vighi." },
    ],
  }),
  component: EspecialidadesPage,
});

const items = [
  {
    titulo: "Histopatología",
    desc: "Procesamiento y diagnóstico de biopsias y piezas quirúrgicas con coloraciones de rutina y técnicas especiales.",
    tiempo: "6 días hábiles",
    img: histoImg,
  },
  {
    titulo: "Inmunohistoquímica",
    desc: "Determinación de marcadores diagnósticos, pronósticos y predictivos para oncología de precisión.",
    tiempo: "7 días hábiles",
    img: immunoImg,
  },
  {
    titulo: "Citología — Papanicolaou",
    desc: "Screening cervicovaginal con lectura especializada y entrega ágil.",
    tiempo: "3 días hábiles",
    img: cytoImg,
  },
  {
    titulo: "Citología por punción (PAAF)",
    desc: "Estudio de muestras obtenidas por punción aspirativa de órganos sólidos.",
    tiempo: "6 días hábiles",
    img: cytoImg,
  },
];

function EspecialidadesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Especialidades"
        title="Diagnóstico anatomopatológico integral."
        description="Cubrimos el espectro completo de la especialidad con tiempos de entrega ágiles y trazabilidad de extremo a extremo."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 space-y-16">
          {items.map((it, idx) => (
            <article
              key={it.titulo}
              className={
                "grid items-center gap-12 md:grid-cols-2 " +
                (idx % 2 === 1 ? "md:[&>div:first-child]:order-2" : "")
              }
            >
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
                <img src={it.img} alt={it.titulo} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                  {String(idx + 1).padStart(2, "0")} · Servicio
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{it.titulo}</h2>
                <p className="mt-5 text-clinical-slate leading-relaxed">{it.desc}</p>
                <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-secondary px-4 py-2">
                  <span className="size-1.5 rounded-full bg-clinical-accent" />
                  <span className="font-mono text-xs uppercase tracking-widest text-clinical-blue">
                    Tiempo de entrega · {it.tiempo}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
