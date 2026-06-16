import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — CAP Vighi" },
      { name: "description", content: "Contacto del Centro de Anatomía Patológica Dra. Susana Vighi en Buenos Aires." },
      { property: "og:title", content: "Contacto — CAP Vighi" },
      { property: "og:description", content: "Estamos a disposición de pacientes y médicos derivantes." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contacto"
        title="Conversemos."
        description="Estamos a disposición de pacientes, médicos derivantes e instituciones para consultas, derivaciones y colaboraciones."
      />
      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-clinical-accent">Dirección</h3>
              <p className="mt-2 text-lg">Ciudad de Buenos Aires, Argentina</p>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-clinical-accent">Email</h3>
              <a href="mailto:info@susanavighi.com.ar" className="mt-2 block text-lg hover:text-clinical-accent">
                info@susanavighi.com.ar
              </a>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-clinical-accent">Horarios</h3>
              <p className="mt-2 text-lg">Lunes a Viernes · 08:00 — 20:00</p>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-2xl border border-border bg-secondary p-8">
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-clinical-slate">Nombre</label>
              <input type="text" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-clinical-accent focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-clinical-slate">Email</label>
              <input type="email" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-clinical-accent focus:outline-none" />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-clinical-slate">Mensaje</label>
              <textarea rows={5} className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-clinical-accent focus:outline-none" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-clinical-blue px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
              Enviar consulta
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
