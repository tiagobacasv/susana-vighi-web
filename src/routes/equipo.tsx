import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { seoText } from "@/i18n";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { useState } from "react";
import { cn } from "@/lib/utils";
import teamWorkImg from "@/assets/NuestroEquipo/TeamWork.png";
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
  Mail,
  Quote,
} from "lucide-react";

export const Route = createFileRoute("/equipo")({
  head: () => ({
    meta: [
      { title: seoText("seo.equipo.title") },
      { name: "description", content: seoText("seo.equipo.description") },
      { property: "og:title", content: seoText("seo.equipo.ogTitle") },
      { property: "og:description", content: seoText("seo.equipo.ogDescription") },
      { property: "og:url", content: "/equipo" },
    ],
    links: [{ rel: "canonical", href: "/equipo" }],
  }),
  component: EquipoPage,
});

// ─── Grid data ────────────────────────────────────────────────────────────────

type FormacionItem = { titulo: string; institucion?: string };
type Member = { nombre: string; rol: string; foto?: string; formacion?: FormacionItem[] };
type MemberTr = { rol: string; formacion?: FormacionItem[] };
type MemberBase = { nombre: string; foto?: string };

const direccionBase: MemberBase[] = [
  { nombre: "Emiliano Pastor", foto: neEmiliano },
  { nombre: "Dra. Andrea Paparatto", foto: neAndrea },
];

const subdireccionBase: MemberBase[] = [
  { nombre: "Dr. Federico Ferrando", foto: neFederico },
  { nombre: "Dra. Marysol Costoya", foto: neMarysol },
];

const especialistasBase: MemberBase[] = [
  { nombre: "Dra. Diana Miserendino", foto: neDiana },
  { nombre: "Dr. Mauro García Montenegro", foto: neMauro },
];

const cuerpoMedicoBase: MemberBase[] = [
  { nombre: "Dra. Tania Rodriguez", foto: neTania },
  { nombre: "Dr. Daniel Vila Melgarejo", foto: neDaniel },
  { nombre: "Dra. Andrea Flores Herbas", foto: neAndreaFH },
];

const citotecnicosBase: MemberBase[] = [
  { nombre: "Miguel Domenniani", foto: neMiguel },
  { nombre: "Tobias Pardo", foto: neTobias },
];

const responsablesBase: MemberBase[] = [
  { nombre: "Antonella Pandolfi", foto: neAntonella },
  { nombre: "Javier Pecollo", foto: neJavier },
];

const coordinadoresBase: MemberBase[] = [
  { nombre: "Adriana Lopez", foto: neAdriana },
  { nombre: "Laura Ureta", foto: neLaura },
];

function mergeMembers(base: MemberBase[], tr: MemberTr[]): Member[] {
  return base.map((b, i) => ({ ...b, rol: tr[i]?.rol ?? "", formacion: tr[i]?.formacion }));
}

// ─── Grid components ──────────────────────────────────────────────────────────

function MemberCard({ m }: { m: Member }) {
  const { t } = useTranslation();
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
              {t("equipo.hints.verMas")}
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
            <p className="text-xs text-clinical-slate">{t("equipo.hints.infoNoDisponible")}</p>
          )}
          <p className="mt-3 text-right text-[10px] text-clinical-slate/50">{t("equipo.hints.clickVolver")}</p>
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
  const { t } = useTranslation();
  const groups = t("equipo.groups", { returnObjects: true }) as Record<string, string>;
  const membersTr = t("equipo.members", { returnObjects: true }) as Record<string, MemberTr[]>;

  const direccion = mergeMembers(direccionBase, membersTr.direccion);
  const subdireccion = mergeMembers(subdireccionBase, membersTr.subdireccion);
  const especialistas = mergeMembers(especialistasBase, membersTr.especialistas);
  const cuerpoMedico = mergeMembers(cuerpoMedicoBase, membersTr.cuerpoMedico);
  const citotecnicos = mergeMembers(citotecnicosBase, membersTr.citotecnicos);
  const responsables = mergeMembers(responsablesBase, membersTr.responsables);
  const coordinadores = mergeMembers(coordinadoresBase, membersTr.coordinadores);

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 space-y-20">
        <GridSection label={groups.direccion} members={direccion} />
        <GridSection label={groups.subdireccion} members={subdireccion} />
        <GridSection label={groups.especialistas} members={especialistas} />
        <GridSection label={groups.cuerpoMedico} members={cuerpoMedico} />
        <GridSection label={groups.citotecnicos} members={citotecnicos} />
        <GridSection label={groups.responsables} members={responsables} />
        <GridSection label={groups.coordinadores} members={coordinadores} />
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

type NodeBase = { id: string; name?: string; Icon: React.ElementType; primary?: boolean };
type NodeTr = { title: string; details: string[] };

const NDBase: Record<string, NodeBase> = {
  de: { id: "de", name: "Emiliano Pastor", Icon: User, primary: true },
  ad: { id: "ad", name: "Antonella Pandolfi", Icon: Settings },
  ti: { id: "ti", Icon: Lightbulb },
  dm: { id: "dm", name: "Dra. Andrea Paparatto", Icon: Stethoscope, primary: true },
  sp: { id: "sp", name: "Javier Pecollo", Icon: Settings },
  ga: { id: "ga", Icon: Building2 },
  gc: { id: "gc", name: "Nicolás Santillán", Icon: TrendingUp },
  sm: { id: "sm", name: "Costoya / Ferrando", Icon: User },
  rc: { id: "rc", Icon: Microscope },
  aa: { id: "aa", Icon: Building2 },
  al: { id: "al", Icon: Settings },
  am: { id: "am", Icon: Stethoscope },
  at: { id: "at", Icon: Wrench },
  ai: { id: "ai", Icon: FlaskConical },
};

function buildND(nodesTr: Record<string, NodeTr>): Record<string, NodeDef> {
  const out: Record<string, NodeDef> = {};
  for (const key in NDBase) {
    out[key] = { ...NDBase[key], title: nodesTr[key]?.title ?? "", details: nodesTr[key]?.details ?? [] };
  }
  return out;
}

// ─── Organogram components ────────────────────────────────────────────────────

function OrgModal({ node, onClose }: { node: NodeDef; onClose: () => void }) {
  const { t } = useTranslation();
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
          <p className="mt-4 text-sm text-clinical-slate">{t("equipo.hints.infoNoDisponible")}</p>
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
  const { t } = useTranslation();
  const [selected, setSelected] = useState<NodeDef | null>(null);
  const open = (node: NodeDef) => setSelected(node);

  const nodesTr = t("equipo.org.nodes", { returnObjects: true }) as Record<string, NodeTr>;
  const ND = buildND(nodesTr);
  const nivelPrefix = t("equipo.org.nivel");
  const levels = t("equipo.org.levels", { returnObjects: true }) as Record<string, string>;

  const GuideLine = ({ n, label, sub }: { n?: string; label?: string; sub?: string }) => (
    <div className="mb-6 flex items-center gap-3">
      <div className="shrink-0 ml-3 flex flex-col items-center">
        {n && (
          <span className="inline-flex items-center rounded-full bg-clinical-blue px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
            {nivelPrefix} {n}
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

          <GuideLine n="1" label={levels["1"]} />

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
          <GuideLine n="2" label={levels["2"]}/>

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

          <GuideLine n="3" label={levels["3"]} />

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
            {t("equipo.org.footerHint")}
          </p>
        </div>
      </div>

      {selected && <OrgModal node={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function EquipoPage() {
  const { t } = useTranslation();
  const [view, setView] = useState<"grid" | "org">("grid");

  return (
    <SiteLayout>
      <PageHero
        variant="team"
        eyebrow={t("equipo.hero.eyebrow")}
        title={t("equipo.hero.title")}
        description={t("equipo.hero.description")}
      />

      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl gap-1 px-6 py-4">
          <button
            onClick={() => setView("grid")}
            className={cn("rounded-lg px-4 py-2 text-sm font-semibold transition-colors", view === "grid" ? "bg-clinical-blue text-primary-foreground" : "text-clinical-slate hover:bg-secondary")}
          >
            {t("equipo.viewToggle.grid")}
          </button>
          <button
            onClick={() => setView("org")}
            className={cn("rounded-lg px-4 py-2 text-sm font-semibold transition-colors", view === "org" ? "bg-clinical-blue text-primary-foreground" : "text-clinical-slate hover:bg-secondary")}
          >
            {t("equipo.viewToggle.org")}
          </button>
        </div>
      </div>

      {view === "grid" ? <GridView /> : <OrgView />}

      <JoinUs />
    </SiteLayout>
  );
}

function JoinUs() {
  const { t } = useTranslation();
  const roles = t("equipo.joinUs.roles", { returnObjects: true }) as string[];

  return (
    <section className="border-t border-border bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Texto principal */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("equipo.joinUs.eyebrow")}
            </div>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-clinical-blue md:text-5xl">
              {t("equipo.joinUs.title")}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-clinical-slate">
              {t("equipo.joinUs.description")}
            </p>
            <ul className="mt-8 space-y-3">
              {roles.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-clinical-slate">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-clinical-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Foto real del equipo trabajando */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-3xl shadow-xl">
            <img
              src={teamWorkImg}
              alt={t("equipo.joinUs.imgAlt")}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-6 pt-16">
              <Quote className="size-6 text-clinical-accent" />
              <div className="mt-2 text-center text-[15px] font-semibold italic leading-snug text-white drop-shadow-sm">
                {t("equipo.joinUs.quote")}
              </div>
              <Quote className="ml-auto size-6 rotate-180 text-clinical-accent" />
            </div>
          </div>
        </div>

        {/* Barra de postulación */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 sm:flex-row sm:items-center">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-slate">
              {t("equipo.joinUs.postulaciones")}
            </div>
            <a
              href="mailto:cv@susanavighi.com.ar"
              className="mt-2 flex items-center gap-2.5 text-xl font-bold text-clinical-blue transition-colors hover:text-clinical-accent"
            >
              <Mail className="size-5 shrink-0 text-clinical-accent" />
              <span className="break-all">cv@susanavighi.com.ar</span>
            </a>
          </div>
          <a
            href="mailto:cv@susanavighi.com.ar"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-clinical-blue px-7 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            {t("equipo.joinUs.postularme")}
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
