import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin, Microscope, FlaskConical, Beaker, Snowflake, Scissors, Layers, Sparkles, Cpu } from "lucide-react";

import tecProcesadores from "@/assets/Tecnologia/procesadores.jpg";
import tecCorte from "@/assets/Tecnologia/corte.jpg";
import tecColoreador from "@/assets/Tecnologia/coloreador.jpg";
import tecCriostato from "@/assets/Tecnologia/criostato.jpg";

// Planta Baja
import pbS1 from "@/assets/NuestroLugar/PB/Slider01_h.jpg";
import pbS2 from "@/assets/NuestroLugar/PB/Slider02_h.jpg";
import pbS3 from "@/assets/NuestroLugar/PB/Slider03_h.jpg";
import pbS4 from "@/assets/NuestroLugar/PB/Slider04_h.jpg";
import pbS5 from "@/assets/NuestroLugar/PB/Slider05_h.jpg";

// Primer Piso
import p1S1 from "@/assets/NuestroLugar/1P/Slider01_h.jpg";
import p1S2 from "@/assets/NuestroLugar/1P/Slider02_h.jpg";
import p1S3 from "@/assets/NuestroLugar/1P/Slider03_h.jpg";
import p1S4 from "@/assets/NuestroLugar/1P/Slider04_h.jpg";
import p1S5 from "@/assets/NuestroLugar/1P/Slider05_h.jpg";

// Segundo Piso
import p2S1 from "@/assets/NuestroLugar/2P/Slider01_h.jpg";
import p2S2 from "@/assets/NuestroLugar/2P/Slider02_h.jpg";
import p2S3 from "@/assets/NuestroLugar/2P/Slider03_h.jpg";
import p2S4 from "@/assets/NuestroLugar/2P/Slider04_h.jpg";
import p2S5 from "@/assets/NuestroLugar/2P/Slider05_h.jpg";

// Tercer Piso
import p3S1 from "@/assets/NuestroLugar/3P/Slider01_h.jpg";
import p3S2 from "@/assets/NuestroLugar/3P/Slider02_h.jpg";
import p3S3 from "@/assets/NuestroLugar/3P/Slider03_h.jpg";
import p3S4 from "@/assets/NuestroLugar/3P/Slider04_h.jpg";
import p3S5 from "@/assets/NuestroLugar/3P/Slider05_h.jpg";

export const Route = createFileRoute("/lugar")({
  head: () => ({
    meta: [
      { title: "Nuestro lugar — CAP Vighi" },
      { name: "description", content: "Edificio especialmente diseñado para la actividad de Anatomía Patológica, cumpliendo estándares de calidad y seguridad." },
      { property: "og:title", content: "Nuestro lugar — CAP Vighi" },
      { property: "og:description", content: "Cuatro pisos diseñados para la precisión diagnóstica y la trazabilidad." },
    ],
  }),
  component: LugarPage,
});

const pisos = [
  {
    nivel: "PB",
    nombre: "Planta Baja",
    desc: "Acceso principal y gestión operativa del centro.",
    areas: ["Recepción", "Gerencia Administrativa", "Administración", "Facturación y Sistemas", "Comedor"],
    fotos: [
      { src: pbS1, label: "Recepción" },
      { src: pbS2, label: "Gerencia Administrativa" },
      { src: pbS3, label: "Administración" },
      { src: pbS4, label: "Facturación y Sistemas" },
      { src: pbS5, label: "Comedor" },
    ],
  },
  {
    nivel: "1°",
    nombre: "Primer Piso",
    desc: "Área de dirección médica y staff de patólogos.",
    areas: ["Dirección Médica", "Sala de Reuniones", "Sub-Dirección Médica", "Sector Patólogos Staff"],
    fotos: [
      { src: p1S1, label: "Dirección Médica" },
      { src: p1S2, label: "Sala de Reuniones" },
      { src: p1S3, label: "Sub-Dirección Médica" },
      { src: p1S4, label: "Sector Patólogos Staff" },
      { src: p1S5, label: "Sector Patólogos Staff" },
    ],
  },
  {
    nivel: "2°",
    nombre: "Segundo Piso — Laboratorio",
    desc: "Procesamiento integral de muestras histológicas con flujo ordenado y trazable.",
    areas: ["Sector de Corte", "Sector de Inclusión", "Sector de Inmunohistoquímica", "Sector de Procesamiento y Coloración", "Sector de Macroscopía"],
    fotos: [
      { src: p2S1, label: "Sector de Corte" },
      { src: p2S2, label: "Sector de Inclusión" },
      { src: p2S3, label: "Sector de Inmunohistoquímica" },
      { src: p2S4, label: "Sector de Procesamiento y Coloración" },
      { src: p2S5, label: "Sector de Macroscopía" },
    ],
  },
  {
    nivel: "3°",
    nombre: "Tercer Piso",
    desc: "Gestión estratégica, capacitación y espacios de reunión.",
    areas: ["Sala de Reuniones", "Dirección Ejecutiva"],
    fotos: [
      { src: p3S1, label: "Sala de Reuniones" },
      { src: p3S2, label: "Sala de Reuniones" },
      { src: p3S3, label: "Sala de Reuniones" },
      { src: p3S4, label: "Dirección Ejecutiva" },
      { src: p3S5, label: "Dirección Ejecutiva" },
    ],
  },
];

type Foto = { src: string; label: string };

function CoverflowCarousel({ fotos, nombre }: { fotos: Foto[]; nombre: string }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = fotos.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % n), [n]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  const getStyle = (i: number): React.CSSProperties => {
    let diff = i - current;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    const abs = Math.abs(diff);
    const dir = diff >= 0 ? 1 : -1;

    if (abs === 0) return { transform: "scale(1) translateX(0%) rotateY(0deg)", zIndex: 10, opacity: 1, filter: "none" };
    if (abs === 1) return { transform: `scale(0.72) translateX(${dir * 68}%) rotateY(${dir * -38}deg)`, zIndex: 6, opacity: 0.8, filter: "brightness(0.7)" };
    if (abs === 2) return { transform: `scale(0.52) translateX(${dir * 118}%) rotateY(${dir * -48}deg)`, zIndex: 3, opacity: 0.45, filter: "brightness(0.5)" };
    return { opacity: 0, zIndex: 0, transform: `translateX(${dir * 150}%)` };
  };

  return (
    <div
      className="relative flex h-[460px] items-center justify-center overflow-hidden md:h-[680px]"
      style={{ perspective: "1100px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {fotos.map((foto, i) => {
        const style = getStyle(i);
        let diff = i - current;
        if (diff > n / 2) diff -= n;
        if (diff < -n / 2) diff += n;
        const isCenter = diff === 0;
        return (
          <div
            key={i}
            onClick={() => !isCenter && setCurrent(i)}
            style={{ ...style, transition: "all 0.65s cubic-bezier(0.4,0,0.2,1)", position: "absolute", width: "86%", transformOrigin: "center center" }}
            className={`overflow-hidden rounded-2xl shadow-2xl ${!isCenter ? "cursor-pointer" : ""}`}
          >
            <img
              src={foto.src}
              alt={`${nombre} — ${foto.label}`}
              className="aspect-[4/3] w-full object-cover"
            />
            <div
              className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-5 transition-opacity duration-500"
              style={{ opacity: isCenter ? 1 : 0 }}
            >
              <div className="flex items-center gap-2 self-start rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/20">
                <MapPin className="size-3 shrink-0 text-clinical-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-white">{foto.label}</span>
              </div>
            </div>
          </div>
        );
      })}

      <button onClick={prev} className="absolute left-3 z-20 flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40">
        <ChevronLeft className="size-5" />
      </button>
      <button onClick={next} className="absolute right-3 z-20 flex size-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40">
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {fotos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

function PisoCard({ piso, reverse }: { piso: typeof pisos[0]; reverse: boolean }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-2xl border border-border md:flex-row ${reverse ? "md:flex-row-reverse" : ""}`}>
      <div className="md:w-3/5">
        <CoverflowCarousel fotos={piso.fotos} nombre={piso.nombre} />
      </div>
      <div className="flex flex-col justify-center gap-6 p-10 md:w-2/5">
        <span className="inline-flex w-fit items-center rounded-full bg-clinical-blue px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-white">
          {piso.nivel}
        </span>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{piso.nombre}</h2>
          <p className="mt-2 text-clinical-slate">{piso.desc}</p>
        </div>
        <ul className="space-y-2">
          {piso.areas.map((area) => (
            <li key={area} className="flex items-center gap-2 text-sm text-clinical-slate">
              <span className="size-1.5 shrink-0 rounded-full bg-clinical-accent" />
              {area}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Aparato = { Icon: typeof Layers; title: string; desc: string; foto?: string };

const aparatologia: Aparato[] = [
  { Icon: Layers, title: "Procesador de tejidos", desc: "Deshidratación e inclusión automatizada con trazabilidad por lote.", foto: tecProcesadores },
  { Icon: Scissors, title: "Micrótomos de precisión", desc: "Cortes uniformes de 3–5 µm para histología de rutina y técnicas especiales.", foto: tecCorte },
  { Icon: Snowflake, title: "Criostato", desc: "Cortes por congelación para biopsias intraoperatorias.", foto: tecCriostato },
  { Icon: Beaker, title: "Coloreador automático", desc: "Tinciones H&E y especiales estandarizadas, sin variabilidad manual.", foto: tecColoreador },
  { Icon: FlaskConical, title: "Plataforma de Inmunohistoquímica", desc: "Marcación automatizada con control de anticuerpos y kits validados." },
  { Icon: Microscope, title: "Microscopios de alta resolución", desc: "Ópticas de investigación con cámaras digitales para documentación." },
  { Icon: Cpu, title: "Scanner de patología digital", desc: "Digitalización de preparados a 40x para revisión, consulta y IA." },
  { Icon: Sparkles, title: "Equipamiento auxiliar", desc: "Baños de flotación, dispensadores de parafina y estufas calibradas." },
];

function AparatoCard({ a }: { a: Aparato }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative aspect-square cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* ── Frente ── */}
        <div
          className="absolute inset-0 flex flex-col bg-background p-8"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-6 flex size-11 items-center justify-center rounded-lg bg-clinical-blue">
            <a.Icon className="size-5 text-white" />
          </div>
          <h3 className="mb-2 text-base font-bold tracking-tight">{a.title}</h3>
          <p className="text-sm leading-relaxed text-clinical-slate">{a.desc}</p>
          {a.foto && (
            <div className="absolute bottom-4 right-4 rounded-full bg-clinical-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-clinical-accent">
              ver foto
            </div>
          )}
        </div>

        {/* ── Dorso ── */}
        <div
          className="absolute inset-0 overflow-hidden bg-secondary"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {a.foto ? (
            <img src={a.foto} alt={a.title} className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-clinical-blue/8 to-clinical-accent/12">
              <a.Icon className="size-10 text-clinical-blue/25" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 py-4">
            <h3 className="text-sm font-bold leading-tight tracking-tight text-white">{a.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function AparatologiaSection() {
  return (
    <section className="border-t border-border bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
            Aparatología
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Tecnología dedicada a cada etapa del proceso.
          </h2>
          <p className="mt-6 text-lg text-clinical-slate">
            Equipamiento de alta complejidad seleccionado para asegurar consistencia,
            trazabilidad y precisión desde la recepción de la muestra hasta el informe final.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {aparatologia.map((a) => (
            <AparatoCard key={a.title} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LugarPage() {
  return (
    <SiteLayout>
      <PageHero variant="place"
        eyebrow="Infraestructura · Aparatología · Recorrido"
        title="Un edificio diseñado para la Anatomía Patológica."
        description="Especialmente construido para desarrollar la actividad diagnóstica cumpliendo con los estándares de calidad y seguridad requeridos."
      />
      <section className="py-24">
        <div className="mx-auto max-w-7xl space-y-8 px-6">
          {pisos.map((piso, i) => (
            <PisoCard key={piso.nivel} piso={piso} reverse={i % 2 !== 0} />
          ))}
        </div>
      </section>
      <AparatologiaSection />
    </SiteLayout>
  );
}
