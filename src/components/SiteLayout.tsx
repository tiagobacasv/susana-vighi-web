import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logoImg from "@/assets/fav-icon.png";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/proposito", label: "Propósito" },
  { to: "/equipo", label: "Nuestro equipo" },
  { to: "/lugar", label: "Nuestro lugar" },
  { to: "/especialidades", label: "Especialidades" },
  { to: "/sistema-gestion", label: "Sistema de gestión" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-clinical-accent/30">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoImg} alt="CAP Vighi" className="h-12 w-auto object-contain" />
          <span className="text-base font-bold uppercase tracking-tight md:text-lg">
            CAP Vighi
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.12em] text-clinical-slate lg:flex">
          {navLinks.slice(1, -1).map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={
                  "transition-colors hover:text-foreground " +
                  (active ? "text-foreground" : "")
                }
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to="/contacto"
            className="rounded-full bg-clinical-blue px-5 py-2.5 text-[11px] text-primary-foreground transition-opacity hover:opacity-90"
          >
            Contacto
          </Link>
        </div>

        <button
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
          className="flex size-10 items-center justify-center rounded-md border border-border lg:hidden"
        >
          <span className="flex flex-col gap-1">
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
            <span className="block h-px w-5 bg-foreground" />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wide text-clinical-slate hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-20 bg-clinical-blue py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={logoImg} alt="CAP Vighi" className="h-16 w-auto object-contain" />
            <span className="text-lg font-bold uppercase tracking-tight">CAP Vighi</span>
          </div>
          <p className="mt-6 max-w-sm text-sm text-white/60">
            Centro de Anatomía Patológica Dra. Susana Vighi. Lideramos la
            especialidad con patología digital y los más altos estándares de calidad.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
            Secciones
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
            Contacto
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>Ciudad de Buenos Aires, Argentina</li>
            <li>
              <a href="mailto:info@susanavighi.com.ar" className="hover:text-primary-foreground">
                info@susanavighi.com.ar
              </a>
            </li>
            <li>Lun a Vie · 08:00 — 20:00</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 px-6 pt-8 text-[10px] uppercase tracking-widest text-white/40 md:flex-row">
        <span>© {new Date().getFullYear()} Centro de Anatomía Patológica Dra. Susana Vighi</span>
        <span>Sistema de gestión de calidad certificado</span>
      </div>
    </footer>
  );
}

export type HeroVariant =
  | "network"
  | "compass"
  | "team"
  | "place"
  | "cells"
  | "dashboard"
  | "contact"
  | "dna"
  | "microscope"
  | "molecules";

export function PageHero({
  eyebrow,
  title,
  description,
  variant = "network",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  variant?: HeroVariant;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary">
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2">
        <svg
          viewBox="0 0 560 380"
          className="absolute right-0 top-1/2 h-[120%] w-auto -translate-y-1/2"
          aria-hidden="true"
        >
          <HeroDecoration variant={variant} />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tighter text-balance md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg text-clinical-slate">{description}</p>
        )}
      </div>
    </section>
  );
}

function HeroDecoration({ variant }: { variant: HeroVariant }) {
  const A = "var(--clinical-accent)";
  const B = "var(--clinical-blue)";

  if (variant === "compass") {
    // Misión · Propósito · Valores — brújula / dianas concéntricas
    return (
      <g>
        {[140, 110, 80, 50, 24].map((r, i) => (
          <circle
            key={r}
            cx="340"
            cy="190"
            r={r}
            fill="none"
            stroke={i % 2 ? B : A}
            strokeWidth="0.6"
            opacity={0.12 + i * 0.04}
          />
        ))}
        <circle cx="340" cy="190" r="6" fill={A} opacity="0.6" />
        {/* Cardinal ticks */}
        <line x1="340" y1="30" x2="340" y2="60" stroke={A} strokeWidth="0.8" opacity="0.35" />
        <line x1="340" y1="320" x2="340" y2="350" stroke={A} strokeWidth="0.8" opacity="0.35" />
        <line x1="180" y1="190" x2="210" y2="190" stroke={A} strokeWidth="0.8" opacity="0.35" />
        <line x1="470" y1="190" x2="500" y2="190" stroke={A} strokeWidth="0.8" opacity="0.35" />
        {/* Aguja */}
        <line x1="340" y1="190" x2="430" y2="110" stroke={B} strokeWidth="1.2" opacity="0.5" />
        <circle cx="430" cy="110" r="4" fill={B} opacity="0.7" />
      </g>
    );
  }

  if (variant === "team") {
    // Constelación de personas
    const people: Array<[number, number, number]> = [
      [200, 130, 1], [280, 90, 0.9], [360, 140, 1], [440, 100, 0.85],
      [240, 220, 0.95], [330, 240, 1], [420, 220, 0.9], [500, 180, 0.8],
      [180, 300, 0.85], [290, 320, 0.9], [400, 310, 0.95], [490, 280, 0.8],
    ];
    return (
      <g>
        {people.map(([x, y], i) => {
          const next = people[(i + 1) % people.length];
          return (
            <line
              key={`l${i}`}
              x1={x}
              y1={y}
              x2={next[0]}
              y2={next[1]}
              stroke={i % 2 ? A : B}
              strokeWidth="0.5"
              opacity="0.15"
            />
          );
        })}
        {people.map(([x, y, s], i) => (
          <g key={i} opacity={0.35 + s * 0.25}>
            <circle cx={x} cy={y - 6 * s} r={4 * s} fill={i % 3 === 0 ? A : B} />
            <path
              d={`M ${x - 8 * s} ${y + 12 * s} q ${8 * s} -${10 * s} ${16 * s} 0`}
              fill="none"
              stroke={i % 3 === 0 ? A : B}
              strokeWidth={1.2 * s}
              strokeLinecap="round"
            />
          </g>
        ))}
      </g>
    );
  }

  if (variant === "place") {
    // Plano arquitectónico — rejilla + habitaciones
    return (
      <g opacity="0.55">
        <defs>
          <pattern id="floorGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 0 24" fill="none" stroke={A} strokeWidth="0.3" opacity="0.35" />
          </pattern>
        </defs>
        <rect x="120" y="60" width="400" height="280" fill="url(#floorGrid)" />
        {/* Salas */}
        <rect x="140" y="80" width="140" height="110" fill="none" stroke={B} strokeWidth="1" opacity="0.45" />
        <rect x="300" y="80" width="200" height="70" fill="none" stroke={B} strokeWidth="1" opacity="0.45" />
        <rect x="300" y="170" width="90" height="150" fill="none" stroke={B} strokeWidth="1" opacity="0.45" />
        <rect x="410" y="170" width="90" height="150" fill="none" stroke={B} strokeWidth="1" opacity="0.45" />
        <rect x="140" y="210" width="140" height="110" fill="none" stroke={B} strokeWidth="1" opacity="0.45" />
        {/* Marcadores */}
        <circle cx="210" cy="135" r="4" fill={A} opacity="0.7" />
        <circle cx="400" cy="115" r="4" fill={A} opacity="0.7" />
        <circle cx="345" cy="245" r="4" fill={A} opacity="0.7" />
        <circle cx="455" cy="245" r="4" fill={A} opacity="0.7" />
        <circle cx="210" cy="265" r="4" fill={A} opacity="0.7" />
      </g>
    );
  }

  if (variant === "cells") {
    // Histo / IHQ / Citología — agrupaciones celulares
    const cells: Array<[number, number, number]> = [
      [220, 130, 26], [285, 110, 18], [340, 150, 30], [400, 120, 20],
      [460, 160, 24], [510, 130, 14], [195, 200, 22], [260, 195, 32],
      [330, 230, 24], [395, 215, 28], [460, 240, 20], [515, 215, 16],
      [225, 285, 28], [300, 300, 22], [370, 290, 30], [440, 310, 22],
      [500, 290, 18],
    ];
    return (
      <g>
        {cells.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={i % 3 === 0 ? A : B} opacity="0.08" />
            <circle cx={x} cy={y} r={r} fill="none" stroke={i % 3 === 0 ? A : B} strokeWidth="0.7" opacity="0.35" />
            <circle cx={x} cy={y} r={r * 0.35} fill={i % 3 === 0 ? A : B} opacity="0.55" />
          </g>
        ))}
      </g>
    );
  }

  if (variant === "dashboard") {
    // Sistema de gestión — barras + línea de tendencia
    const bars = [60, 95, 75, 130, 110, 160, 140, 185, 170, 210, 195, 230];
    return (
      <g>
        {/* Ejes */}
        <line x1="160" y1="320" x2="520" y2="320" stroke={B} strokeWidth="0.8" opacity="0.35" />
        <line x1="160" y1="80" x2="160" y2="320" stroke={B} strokeWidth="0.8" opacity="0.35" />
        {/* Gridlines */}
        {[120, 180, 240, 300].map((y) => (
          <line key={y} x1="160" y1={y} x2="520" y2={y} stroke={A} strokeWidth="0.3" opacity="0.18" />
        ))}
        {/* Bars */}
        {bars.map((h, i) => {
          const x = 175 + i * 28;
          return (
            <rect
              key={i}
              x={x}
              y={320 - h}
              width="16"
              height={h}
              fill={i % 2 ? A : B}
              opacity={0.18 + (i / bars.length) * 0.25}
            />
          );
        })}
        {/* Línea de tendencia */}
        <polyline
          points={bars.map((h, i) => `${175 + i * 28 + 8},${320 - h - 14}`).join(" ")}
          fill="none"
          stroke={A}
          strokeWidth="1.4"
          opacity="0.7"
        />
        {bars.map((h, i) => (
          <circle key={i} cx={175 + i * 28 + 8} cy={320 - h - 14} r="2.5" fill={A} opacity="0.85" />
        ))}
      </g>
    );
  }

  if (variant === "contact") {
    // Pin de ubicación + ondas de señal
    return (
      <g>
        {[40, 75, 115, 160, 210].map((r, i) => (
          <circle
            key={r}
            cx="360"
            cy="220"
            r={r}
            fill="none"
            stroke={A}
            strokeWidth="0.6"
            opacity={0.28 - i * 0.04}
          />
        ))}
        {/* Pin */}
        <path
          d="M360 130 C 335 130 320 150 320 175 C 320 205 360 245 360 245 C 360 245 400 205 400 175 C 400 150 385 130 360 130 Z"
          fill={B}
          opacity="0.55"
        />
        <circle cx="360" cy="175" r="11" fill={A} opacity="0.95" />
        <circle cx="360" cy="175" r="5" fill="var(--clinical-bg)" opacity="0.95" />
        {/* Sombra */}
        <ellipse cx="360" cy="260" rx="34" ry="5" fill={B} opacity="0.18" />
      </g>
    );
  }

  if (variant === "dna") {
    // Hélice de ADN
    const helix: Array<[number, number]> = [];
    for (let i = 0; i < 13; i++) {
      const y = 20 + i * 27;
      const x = 340 + Math.sin(i * 0.8) * 60;
      helix.push([x, y]);
    }
    return (
      <g>
        {/* Eje central */}
        <line x1="340" y1="10" x2="340" y2="370" stroke={B} strokeWidth="0.6" opacity="0.25" />
        {/* Hélice izquierda */}
        <polyline
          points={helix.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none"
          stroke={A}
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Hélice derecha (espejo) */}
        <polyline
          points={helix.map(([x, y]) => `${680 - x},${y}`).join(" ")}
          fill="none"
          stroke={B}
          strokeWidth="1"
          opacity="0.4"
        />
        {/* Puentes */}
        {helix.map(([x, y], i) => (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={680 - x}
            y2={y}
            stroke={i % 2 === 0 ? A : B}
            strokeWidth="0.5"
            opacity="0.18"
          />
        ))}
        {/* Nodos */}
        {helix.map(([x, y], i) => (
          <circle key={`c${i}`} cx={x} cy={y} r="3" fill={i % 2 === 0 ? A : B} opacity="0.35" />
        ))}
        {helix.map(([x, y], i) => (
          <circle key={`m${i}`} cx={680 - x} cy={y} r="3" fill={i % 2 === 0 ? A : B} opacity="0.35" />
        ))}
      </g>
    );
  }

  if (variant === "microscope") {
    // Lentes y elementos ópticos
    return (
      <g>
        {/* Lente principal (grande) */}
        <circle cx="340" cy="200" r="65" fill="none" stroke={A} strokeWidth="1.5" opacity="0.25" />
        <circle cx="340" cy="200" r="65" fill={A} opacity="0.02" />
        {/* Lentes secundarias */}
        <circle cx="240" cy="140" r="35" fill="none" stroke={B} strokeWidth="1" opacity="0.2" />
        <circle cx="440" cy="160" r="40" fill="none" stroke={B} strokeWidth="1" opacity="0.2" />
        <circle cx="280" cy="280" r="30" fill="none" stroke={A} strokeWidth="0.8" opacity="0.18" />
        <circle cx="400" cy="290" r="32" fill="none" stroke={A} strokeWidth="0.8" opacity="0.18" />
        {/* Líneas de luz */}
        <line x1="340" y1="80" x2="340" y2="135" stroke={A} strokeWidth="0.6" opacity="0.3" />
        <line x1="340" y1="265" x2="340" y2="320" stroke={A} strokeWidth="0.6" opacity="0.3" />
        {/* Puntos de foco */}
        <circle cx="340" cy="200" r="4" fill={A} opacity="0.6" />
        <circle cx="240" cy="140" r="2" fill={B} opacity="0.5" />
        <circle cx="440" cy="160" r="2" fill={B} opacity="0.5" />
      </g>
    );
  }

  if (variant === "molecules") {
    // Moléculas flotantes
    const nodes: Array<[number, number, number]> = [
      [200, 110, 8], [300, 140, 10], [380, 100, 6], [480, 130, 9],
      [220, 210, 7], [350, 230, 11], [420, 200, 8], [520, 240, 6],
      [260, 300, 9], [380, 310, 7], [450, 280, 10], [550, 320, 6],
    ];
    return (
      <g>
        {/* Enlaces moleculares */}
        {nodes.map((node, i) => {
          const next = nodes[(i + 1) % nodes.length];
          return (
            <line
              key={`bond${i}`}
              x1={node[0]}
              y1={node[1]}
              x2={next[0]}
              y2={next[1]}
              stroke={i % 3 === 0 ? A : B}
              strokeWidth="0.5"
              opacity="0.12"
            />
          );
        })}
        {/* Átomos */}
        {nodes.map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={i % 3 === 0 ? A : B} opacity="0.12" />
            <circle cx={x} cy={y} r={r} fill="none" stroke={i % 3 === 0 ? A : B} strokeWidth="0.6" opacity="0.35" />
            <circle cx={x} cy={y} r={r * 0.4} fill={i % 3 === 0 ? A : B} opacity="0.55" />
          </g>
        ))}
      </g>
    );
  }

  // Default: network of nodes
  return (
    <g>
      <line x1="280" y1="190" x2="380" y2="110" stroke={A} strokeWidth="0.8" opacity="0.25" />
      <line x1="280" y1="190" x2="420" y2="210" stroke={A} strokeWidth="0.8" opacity="0.25" />
      <line x1="280" y1="190" x2="340" y2="290" stroke={A} strokeWidth="0.8" opacity="0.20" />
      <line x1="280" y1="190" x2="180" y2="120" stroke={B} strokeWidth="0.8" opacity="0.18" />
      <line x1="280" y1="190" x2="190" y2="270" stroke={B} strokeWidth="0.8" opacity="0.18" />
      <line x1="380" y1="110" x2="490" y2="90" stroke={A} strokeWidth="0.6" opacity="0.18" />
      <line x1="380" y1="110" x2="460" y2="160" stroke={A} strokeWidth="0.6" opacity="0.18" />
      <line x1="420" y1="210" x2="510" y2="190" stroke={A} strokeWidth="0.6" opacity="0.18" />
      <line x1="420" y1="210" x2="460" y2="160" stroke={A} strokeWidth="0.6" opacity="0.15" />
      <line x1="340" y1="290" x2="440" y2="310" stroke={B} strokeWidth="0.6" opacity="0.15" />
      <line x1="340" y1="290" x2="420" y2="210" stroke={A} strokeWidth="0.6" opacity="0.12" />
      <line x1="180" y1="120" x2="280" y2="60" stroke={B} strokeWidth="0.6" opacity="0.14" />
      <line x1="190" y1="270" x2="130" y2="320" stroke={B} strokeWidth="0.6" opacity="0.14" />
      <line x1="490" y1="90" x2="530" y2="150" stroke={A} strokeWidth="0.5" opacity="0.13" />
      <line x1="440" y1="310" x2="510" y2="340" stroke={B} strokeWidth="0.5" opacity="0.12" />
      <circle cx="280" cy="190" r="10" fill={A} opacity="0.35" />
      <circle cx="280" cy="190" r="5" fill={A} opacity="0.65" />
      <circle cx="380" cy="110" r="7" fill={A} opacity="0.45" />
      <circle cx="380" cy="110" r="3.5" fill={A} opacity="0.70" />
      <circle cx="420" cy="210" r="7" fill={A} opacity="0.40" />
      <circle cx="420" cy="210" r="3.5" fill={A} opacity="0.65" />
      <circle cx="340" cy="290" r="6" fill={B} opacity="0.35" />
      <circle cx="340" cy="290" r="3" fill={B} opacity="0.60" />
      <circle cx="180" cy="120" r="6" fill={B} opacity="0.30" />
      <circle cx="180" cy="120" r="3" fill={B} opacity="0.55" />
      <circle cx="190" cy="270" r="6" fill={B} opacity="0.30" />
      <circle cx="190" cy="270" r="3" fill={B} opacity="0.55" />
      <circle cx="490" cy="90" r="5" fill={A} opacity="0.35" />
      <circle cx="490" cy="90" r="2.5" fill={A} opacity="0.60" />
      <circle cx="460" cy="160" r="4.5" fill={A} opacity="0.30" />
      <circle cx="460" cy="160" r="2" fill={A} opacity="0.55" />
      <circle cx="510" cy="190" r="4" fill={A} opacity="0.28" />
      <circle cx="510" cy="190" r="2" fill={A} opacity="0.50" />
      <circle cx="440" cy="310" r="4.5" fill={B} opacity="0.28" />
      <circle cx="440" cy="310" r="2" fill={B} opacity="0.50" />
      <circle cx="280" cy="60" r="4" fill={B} opacity="0.25" />
      <circle cx="280" cy="60" r="2" fill={B} opacity="0.48" />
      <circle cx="130" cy="320" r="4" fill={B} opacity="0.22" />
      <circle cx="130" cy="320" r="2" fill={B} opacity="0.44" />
      <circle cx="530" cy="150" r="3.5" fill={A} opacity="0.22" />
      <circle cx="510" cy="340" r="3.5" fill={B} opacity="0.20" />
    </g>
  );
}

