import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { useState } from "react";
import { cn } from "@/lib/utils";
import neEmiliano from "@/assets/NuestroEquipo/NE-Emiliano_h.png";
import neAndrea from "@/assets/NuestroEquipo/NE-Andrea_h.png";
import neFederico from "@/assets/NuestroEquipo/NE-Federico_h.png";
import neMarysol from "@/assets/NuestroEquipo/NE-Marysol_h.png";
import neDiana from "@/assets/NuestroEquipo/NE-Diana_h.png";
import neMauro from "@/assets/NuestroEquipo/NE-Mauro_h.png";
import neTania from "@/assets/NuestroEquipo/NE-Tania_h.png";
import neDaniel from "@/assets/NuestroEquipo/NE-Daniel_h.png";
import neAndreaFH from "@/assets/NuestroEquipo/NE-AndreaFH_h.png";
import neMiguel from "@/assets/NuestroEquipo/NE-Miguel_h.png";
import neTobias from "@/assets/NuestroEquipo/NE-Tobias_h.png";
import neAntonella from "@/assets/NuestroEquipo/NE-Antonella_h.png";
import neJavier from "@/assets/NuestroEquipo/NE-Javier_h.png";
import neAdriana from "@/assets/NuestroEquipo/NE-Adriana_h.png";
import neLaura from "@/assets/NuestroEquipo/NE-Laura_h.png";

import {
  X,
  User,
  Settings,
  Microscope,
  TrendingUp,
  Lightbulb,
  Building2,
  FlaskConical,
  Stethoscope,
  Wrench,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/equipo")({
  head: () => ({
    meta: [
      { title: "Nuestro equipo — CAP Vighi" },
      { name: "description", content: "Equipo médico y técnico del Centro de Anatomía Patológica Dra. Susana Vighi." },
      { property: "og:title", content: "Nuestro equipo — CAP Vighi" },
      { property: "og:description", content: "Médicos patólogos, citotecnólogos y técnicos especializados." },
    ],
  }),
  component: EquipoPage,
});

// ─── Grid data ────────────────────────────────────────────────────────────────

type FormacionItem = { titulo: string; institucion?: string };
type Member = { nombre: string; rol: string; foto?: string; formacion?: FormacionItem[] };

const direccion: Member[] = [
  {
    nombre: "Emiliano Pastor",
    rol: "Director Ejecutivo",
    foto: neEmiliano,
    formacion: [
      { titulo: "Contador Público Nacional", institucion: "UBA" },
      { titulo: "Licenciado en Administración de Empresas", institucion: "UBA" },
      { titulo: "Máster en Finanzas Corporativas", institucion: "UCEMA" },
      { titulo: "Gerencia de Finanzas", institucion: "División Centro América — The Coca-Cola Company" },
      { titulo: "Gerencia de Planeamiento Estratégico", institucion: "Región BPU — The Coca-Cola Company" },
    ],
  },
  {
    nombre: "Dra. Andrea Paparatto",
    rol: "Directora Médica",
    foto: neAndrea,
    formacion: [
      { titulo: "Médica Especialista en Anatomía Patológica", institucion: "Min. de Salud de la Nación — Certif. SAP · MN98395 / MP451876" },
      { titulo: "Médica Especialista en Citopatología", institucion: "Certificación SAC" },
      { titulo: "Médica Especialista en Uropatología" },
      { titulo: "Médica Especialista en Patología Osteoarticular" },
      { titulo: "Ex Secretaria de Actas SAP", institucion: "Período 2011–2013" },
      { titulo: "Ex Residente, Jefa de Residentes y Médica de Planta", institucion: "CEMIC" },
      { titulo: "Ex Patóloga Staff", institucion: "Centro de Patología Dr. Boris Elsner" },
      { titulo: "Visiting Fellow de Patología", institucion: "MD Anderson Cancer Center, Houston, Texas, USA" },
    ],
  },
];

const subdireccion: Member[] = [
  {
    nombre: "Dr. Federico Ferrando",
    rol: "Sub-Dirección",
    foto: neFederico,
    formacion: [
      { titulo: "Médico Especialista en Anatomía Patológica", institucion: "Min. de Salud de la Nación · MN112223" },
      { titulo: "Especializado en Patología Ginecológica", institucion: "CAP Vighi" },
      { titulo: "Ex Docente de Anatomía Patológica", institucion: "Escuela de Técnicos de Histología" },
      { titulo: "Ex Residente", institucion: "Hospital Ramos Mejía" },
    ],
  },
  {
    nombre: "Dra. Marysol Costoya",
    rol: "Sub-Dirección",
    foto: neMarysol,
    formacion: [
      { titulo: "Médica Especialista en Anatomía Patológica", institucion: "Min. de Salud de la Nación — Certif. SAP · MN123151" },
      { titulo: "Especializada en Patología Ginecológica", institucion: "CAP Vighi" },
      { titulo: "Médica Especialista en Citopatología", institucion: "Certificación SAC" },
      { titulo: "Ex Residente", institucion: "Hospital de Clínicas — UBA" },
    ],
  },
];

const especialistas: Member[] = [
  {
    nombre: "Dra. Diana Miserendino",
    rol: "Nefropatología · Gastroenteropatología",
    foto: neDiana,
    formacion: [
      { titulo: "Médica Especialista en Anatomía Patológica", institucion: "Min. de Salud de la Nación — Certif. SAP · MN100367 / MP23630-2" },
      { titulo: "Médica Especialista en Nefropatología" },
      { titulo: "Médica Especialista en Gastroenteropatología" },
      { titulo: "Ex Patóloga Staff", institucion: "Centro de Patología Dr. Boris Elsner" },
      { titulo: "Ex Residente, Jefa de Residentes e Instructora Nefropatóloga", institucion: "Hospital JM Ramos Mejía" },
    ],
  },
  {
    nombre: "Dr. Mauro García Montenegro",
    rol: "Hematopatología",
    foto: neMauro,
    formacion: [
      { titulo: "Médico Especialista en Anatomía Patológica", institucion: "Min. de Salud de la Nación · MN154271" },
      { titulo: "Médico Especialista en Hematopatología Diagnóstica Integral", institucion: "Ex-Fellow Fundaleu (2015–2020)" },
      { titulo: "MSc en Biología Molecular Médica", institucion: "Facultad de Farmacia y Bioquímica — UBA" },
      { titulo: "Vicepresidente SOLAHP", institucion: "Soc. Latinoamericana de Hematopatología (2025–2027)" },
      { titulo: "Médico Concurrente Lab. Genética de Neoplasias Linfoides", institucion: "IMEX-CONICET — Academia Nacional de Medicina" },
      { titulo: "Visiting Fellow", institucion: "Hospital Universitario Marqués de Valdecilla — IDIVAL, España (2019)" },
    ],
  },
];

const cuerpoMedico: Member[] = [
  {
    nombre: "Dra. Tania Rodriguez",
    rol: "Médica Anatomopatóloga",
    foto: neTania,
    formacion: [
      { titulo: "Médica Especialista en Anatomía Patológica", institucion: "MN188687" },
      { titulo: "Postgrado de Anatomía Patológica", institucion: "Hospital Universitario Dr. Carlos Arvelo, Caracas (Venezuela)" },
      { titulo: "Especialidad en Medicina Legal", institucion: "Inst. Universitario de la Policía Federal Argentina" },
      { titulo: "Ex Patóloga Staff", institucion: "Hospital Luisa C. de Gandulfo (Lomas de Zamora)" },
    ],
  },
  {
    nombre: "Dr. Daniel Vila Melgarejo",
    rol: "Patología Forense",
    foto: neDaniel,
    formacion: [
      { titulo: "Médico Especialista en Anatomía Patológica", institucion: "Min. de Salud de la Nación — Certif. SAP · MN159165" },
      { titulo: "Diplomatura en Patología Forense", institucion: "UCA" },
      { titulo: "Ex Residente", institucion: "Hospital HIGA San Martín — Universidad Mayor de San Simón" },
      { titulo: "Fellow en Patología", institucion: "Hospital Británico" },
    ],
  },
  {
    nombre: "Dra. Andrea Flores Herbas",
    rol: "Patología Forense y Pediátrica",
    foto: neAndreaFH,
    formacion: [
      { titulo: "Médica Especialista en Anatomía Patológica", institucion: "Min. de Salud de la Nación — Certif. SAP · MN1631960" },
      { titulo: "Diplomatura en Patología Forense", institucion: "UCA" },
      { titulo: "Ex Residente", institucion: "Hospital HIGA San Martín — Universidad Mayor de San Simón" },
      { titulo: "Becaria en Patología Pediátrica", institucion: "Hospital Garrahan" },
    ],
  },
];

const citotecnicos: Member[] = [
  {
    nombre: "Miguel Domenniani",
    rol: "Citotécnico",
    foto: neMiguel,
    formacion: [
      { titulo: "Matrícula MN241914" },
      { titulo: "Citotecnólogo Universitario", institucion: "Instituto Universitario CEMIC (IUC)" },
    ],
  },
  {
    nombre: "Tobias Pardo",
    rol: "Citotécnico",
    foto: neTobias,
    formacion: [
      { titulo: "Matrícula MN 377" },
      { titulo: "Citotecnólogo Universitario", institucion: "Instituto Universitario CEMIC (IUC)" },
    ],
  },
];

const responsables: Member[] = [
  { nombre: "Antonella Pandolfi", rol: "Asistente de Dirección", foto: neAntonella },
  { nombre: "Javier Pecollo", rol: "Supervisor de Procesos", foto: neJavier },
];

const coordinadores: Member[] = [
  { nombre: "Adriana Lopez", rol: "Coordinadora de Citología", foto: neAdriana },
  { nombre: "Laura Ureta", rol: "Coordinadora de Inmunohistoquímica", foto: neLaura },
];

// ─── Grid components ──────────────────────────────────────────────────────────

function MemberCard({ m }: { m: Member }) {
  const [flipped, setFlipped] = useState(false);
  const initials = m.nombre
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div
      className="relative h-[295px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* ── Frente ── */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-border bg-background"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Foto / placeholder */}
          <div className="relative flex-1 overflow-hidden">
            {m.foto ? (
              <img src={m.foto} alt={m.nombre} className="h-full w-full object-contain object-center" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-clinical-blue/8 to-clinical-accent/12">
                <span className="select-none text-5xl font-black tracking-tight text-clinical-blue/20">{initials}</span>
              </div>
            )}
            {/* Hint de flip */}
            <div className="absolute bottom-2 right-2 rounded-full bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              ver más
            </div>
          </div>
          {/* Nombre y rol */}
          <div className="border-t border-border px-5 py-4">
            <h3 className="text-sm font-bold leading-tight tracking-tight">{m.nombre}</h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-clinical-accent">{m.rol}</p>
          </div>
        </div>

        {/* ── Dorso ── */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-clinical-accent/30 bg-background p-5"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="mb-4 border-b border-border pb-3">
            <h3 className="text-sm font-bold leading-tight tracking-tight">{m.nombre}</h3>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-clinical-accent">{m.rol}</p>
          </div>
          {m.formacion && m.formacion.length > 0 ? (
            <ul className="flex-1 space-y-2.5 overflow-y-auto">
              {m.formacion.map((f, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="mt-1.5 inline-block size-1 shrink-0 rounded-full bg-clinical-accent" />
                  <div>
                    <p className="text-xs font-semibold leading-snug">{f.titulo}</p>
                    {f.institucion && (
                      <p className="mt-0.5 text-[11px] leading-snug text-clinical-slate">{f.institucion}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-clinical-slate">Información no disponible.</p>
          )}
          <p className="mt-3 text-right text-[10px] text-clinical-slate/50">click para volver</p>
        </div>
      </div>
    </div>
  );
}

function GridSection({ label, members }: { label: string; members: Member[] }) {
  return (
    <section>
      <div className="mb-8 flex items-center gap-4">
        <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">{label}</span>
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-clinical-slate">
          {String(members.length).padStart(2, "0")}
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <MemberCard key={m.nombre} m={m} />
        ))}
      </div>
    </section>
  );
}

function GridView() {
  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 space-y-20">
        <GridSection label="Dirección" members={direccion} />
        <GridSection label="Sub-Dirección" members={subdireccion} />
        <GridSection label="Médicos Especialistas" members={especialistas} />
        <GridSection label="Cuerpo Médico" members={cuerpoMedico} />
        <GridSection label="Citotécnicos" members={citotecnicos} />
        <GridSection label="Responsables de Área" members={responsables} />
        <GridSection label="Coordinadores" members={coordinadores} />
      </div>
    </div>
  );
}


// ─── Organogram data ──────────────────────────────────────────────────────────

interface NodeDef {
  id: string;
  title: string;
  name?: string;
  Icon: React.ElementType;
  primary?: boolean;
  details: string[];
}

const ND: Record<string, NodeDef> = {
  de: { id: "de", title: "Dirección Ejecutiva", name: "Emiliano Pastor", Icon: User, primary: true, details: ["Contador Público Nacional (UBA)", "Lic. en Administración de Empresas (UBA)", "Máster en Finanzas Corporativas (UCEMA)", "Experiencia en Coca-Cola Company"] },
  ad: { id: "ad", title: "Asistente de Dirección", name: "Antonella Pandolfi", Icon: Settings, details: [] },
  ti: { id: "ti", title: "Tecnología e Innovación", Icon: Lightbulb, details: ["Pioneros en la incorporación de IA aplicada a la Anatomía Patológica en Argentina", "Patología digital integrada al flujo de trabajo"] },
  dm: { id: "dm", title: "Dirección Médica", name: "Dra. Andrea Paparatto", Icon: Stethoscope, primary: true, details: ["Especialista en Anatomía Patológica (MN98395 / MP451876)", "Especialista en Citopatología y Uropatología", "Ex Visiting Fellow en MD Anderson Cancer Center, Houston"] },
  sp: { id: "sp", title: "Supervisión de Procesos", name: "Javier Pecollo", Icon: Settings, details: [] },
  ga: { id: "ga", title: "Gerencia Administrativa", Icon: Building2, details: [] },
  gc: { id: "gc", title: "Gerencia Comercial", name: "Nicolás Santillán", Icon: TrendingUp, details: [] },
  sm: { id: "sm", title: "Subdirección Médica", name: "Costoya / Ferrando", Icon: User, details: ["Dra. Marysol Costoya — Especialista en Anatomía Patológica (MN123151) · Patología Ginecológica y Citopatología", "Dr. Federico Ferrando — Especialista en Anatomía Patológica (MN112223) · Patología Ginecológica"] },
  rc: { id: "rc", title: "Citos y BPs", Icon: Microscope, details: ["Miguel Domenniani — Citotécnico", "Tobias Pardo — Citotécnico"] },
  aa: { id: "aa", title: "Área Administrativa", Icon: Building2, details: [] },
  al: { id: "al", title: "Área Logística", Icon: Settings, details: [] },
  am: { id: "am", title: "Área Médica", Icon: Stethoscope, details: ["Dra. Diana Miserendino — Nefropatología y Gastroenteropatología (MN100367)", "Dr. Mauro García Montenegro — Hematopatología (MN154271) · Vicepresidente SOLAHP 2025–2027", "Dra. Tania Rodriguez (MN188687)", "Dr. Daniel Vila Melgarejo — Patología Forense (MN159165)", "Dra. Andrea Flores Herbas — Patología Forense y Pediátrica (MN1631960)"] },
  at: { id: "at", title: "Área Técnica", Icon: Wrench, details: [] },
  ai: { id: "ai", title: "Área Inmunohistoquímica", Icon: FlaskConical, details: ["Adriana Lopez — Coordinadora de Citología", "Laura Ureta — Coordinadora de Inmunohistoquímica"] },
};

// ─── Organogram components ────────────────────────────────────────────────────

function OrgModal({ node, onClose }: { node: NodeDef; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-background p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-border text-clinical-slate hover:bg-secondary">
          <X className="size-4" />
        </button>
        <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-clinical-blue/10">
          <node.Icon className="size-6 text-clinical-blue" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">{node.title}</h2>
        {node.name && <p className="mt-1 text-sm font-semibold text-clinical-accent">{node.name}</p>}
        {node.details.length > 0 ? (
          <ul className="mt-6 space-y-2">
            {node.details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-clinical-slate">
                <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-clinical-accent" />
                {d}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-clinical-slate">Información no disponible.</p>
        )}
      </div>
    </div>
  );
}

const VLine = ({ h = "h-8" }: { h?: string }) => (
  <div className={cn("mx-auto w-px bg-clinical-accent/30", h)} />
);

function OrgCard({ node, onClick, compact = false }: { node: NodeDef; onClick: () => void; compact?: boolean }) {
  const { Icon, title, name, primary } = node;
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full cursor-pointer flex-col items-center rounded-xl border text-center transition-all hover:shadow-lg",
        compact ? "px-1 py-2" : "min-w-[150px] w-full px-3 py-3",
        primary
          ? "border-clinical-blue bg-clinical-blue hover:shadow-clinical-blue/20"
          : "border-border bg-background hover:border-clinical-accent hover:shadow-clinical-accent/10"
      )}
    >
      <div className={cn("mb-1.5 flex items-center justify-center rounded-full", compact ? "size-6" : "size-8", primary ? "bg-white/20" : "bg-secondary group-hover:bg-clinical-accent/10")}>
        <Icon className={cn(compact ? "size-3" : "size-4", primary ? "text-white" : "text-clinical-blue")} />
      </div>
      <div className={cn("font-bold uppercase leading-tight tracking-wide", compact ? "text-[9px]" : "text-[10px]", primary ? "text-white" : "text-foreground")}>
        {title}
      </div>
      {name && <div className={cn("mt-0.5 leading-tight", compact ? "text-[8px]" : "text-[9px]", primary ? "text-white/70" : "text-clinical-slate")}>{name}</div>}
    </button>
  );
}

function LevelBadge({ n, label, sub }: { n: string; label: string; sub?: string }) {
  return (
    <div className="flex shrink-0 flex-col gap-0.5">
      <span className="inline-flex items-center rounded-full bg-clinical-blue px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
        NIVEL {n}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-widest text-clinical-slate">{label}</span>
      {sub && <p className="max-w-[72px] text-[8px] leading-tight text-clinical-slate/60">{sub}</p>}
    </div>
  );
}

function OrgView() {
  const [selected, setSelected] = useState<NodeDef | null>(null);
  const open = (node: NodeDef) => setSelected(node);

  const GuideLine = ({ n, label, sub }: { n?: string; label?: string; sub?: string }) => (
    <div className="mb-6 flex items-center gap-3">
      <div className="shrink-0 ml-3 flex flex-col items-center">
        {n && (
          <span className="inline-flex items-center rounded-full bg-clinical-blue px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
            NIVEL {n}
          </span>
        )}
        {label && (
          <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-clinical-slate">
            {label}
          </span>
        )}
        {sub && (
          <p className="mt-0.5 font-mono text-[8px] uppercase tracking-widest text-clinical-slate/50 text-center">
            {sub}
          </p>
        )}
      </div>
      <div className="flex-1 border-t border-dashed border-clinical-accent/25" />
    </div>
  );

  return (
    <>
      <div className="overflow-x-auto py-12">
        <div className="ml-0 min-w-[900px] w-full pl-2 pr-8">

          <GuideLine n="1" label="ESTRATÉGICO" />

          {/* ── NIVEL 1 ─────────────────────────────── */}
          <div className="mx-auto w-full max-w-5xl py-8">
            <div className="relative flex flex-col items-center">
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-clinical-accent/30" />

              <div className="relative z-10">
                <OrgCard node={ND.de} onClick={() => open(ND.de)} />
              </div>

              <div className="relative grid w-full grid-cols-3 items-center py-6">
                <div className="absolute left-[17%] right-[17%] top-1/2 h-px bg-clinical-accent/30" />
                <div className="z-10 flex justify-center">
                  <OrgCard node={ND.ad} onClick={() => open(ND.ad)} />
                </div>
                <div />
                <div className="z-10 flex justify-center">
                  <OrgCard node={ND.ti} onClick={() => open(ND.ti)} />
                </div>
              </div>

              <div className="relative z-10">
                <OrgCard node={ND.dm} onClick={() => open(ND.dm)} />
              </div>

              <div className="relative grid w-full grid-cols-3 items-center py-6">
                <div className="absolute left-1/2 right-[17%] top-1/2 h-px bg-clinical-accent/30" />
                <div />
                <div />
                <div className="z-10 flex justify-center">
                  <OrgCard node={ND.sp} onClick={() => open(ND.sp)} />
                </div>
              </div>

              <VLine h="h-8" />
            </div>
          </div>
          <GuideLine n="2" label="TÁCTICO"/>

          {/* ── NIVEL 2 ─────────────────────────────── */}
          <div className="w-full px-40 py-6">
            <div className="relative flex items-start gap-16">
              <div className="absolute left-[15%] right-[15%] top-0 h-px bg-clinical-accent/30" />
              {[ND.ga, ND.gc, ND.sm].map((node) => (
                <div key={node.id} className="flex flex-1 flex-col items-center">
                  <VLine h="h-6" />
                  <div className="w-full max-w-[180px]">
                    <OrgCard node={node} onClick={() => open(node)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <GuideLine n="3" label="OPERATIVO" />

          {/* ── NIVEL 3 ─────────────────────────────── */}
          <div className="w-full px-40 py-6">
            <div className="grid grid-cols-3 gap-16">

              <div className="flex flex-col items-center">
                <VLine h="h-8" />
                <div className="relative flex w-full items-start justify-center gap-4">
                  <div className="absolute left-[calc(50%-166px)] right-[calc(50%-166px)] top-0 h-px bg-clinical-accent/30" />
                  {[ND.rc, ND.aa, ND.al].map((node) => (
                    <div key={node.id} className="flex w-[150px] flex-col items-center">
                      <VLine h="h-5" />
                      <OrgCard node={node} onClick={() => open(node)} />
                    </div>
                  ))}
                </div>
              </div>

              <div />

              <div className="flex flex-col items-center">
                <VLine h="h-8" />
                <div className="relative flex w-full items-start justify-center gap-4">
                  <div className="absolute left-[calc(50%-166px)] right-[calc(50%-166px)] top-0 h-px bg-clinical-accent/30" />
                  {[ND.am, ND.at, ND.ai].map((node) => (
                    <div key={node.id} className="flex w-[150px] flex-col items-center">
                      <VLine h="h-5" />
                      <OrgCard node={node} onClick={() => open(node)} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <GuideLine />

          <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-widest text-clinical-slate/60">
            Hacé clic en cada nodo para ver más información
          </p>
        </div>
      </div>

      {selected && <OrgModal node={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function EquipoPage() {
  const [view, setView] = useState<"grid" | "org">("grid");

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Médicos · Técnicos · Gestión"
        title="Profesionales formados para el más alto estándar."
        description="Combinamos experiencia médica, gestión de calidad y especialización técnica para sostener un diagnóstico de excelencia."
      />

      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl gap-1 px-6 py-4">
          <button
            onClick={() => setView("grid")}
            className={cn("rounded-lg px-4 py-2 text-sm font-semibold transition-colors", view === "grid" ? "bg-clinical-blue text-primary-foreground" : "text-clinical-slate hover:bg-secondary")}
          >
            Vista grilla
          </button>
          <button
            onClick={() => setView("org")}
            className={cn("rounded-lg px-4 py-2 text-sm font-semibold transition-colors", view === "org" ? "bg-clinical-blue text-primary-foreground" : "text-clinical-slate hover:bg-secondary")}
          >
            Organigrama
          </button>
        </div>
      </div>

      {view === "grid" ? <GridView /> : <OrgView />}
    </SiteLayout>
  );
}
