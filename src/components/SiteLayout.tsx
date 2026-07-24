import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import logoImg from "@/assets/fav-icon.png";
import { useLang } from "@/hooks/use-lang";

const navKeys = [
  { to: "/", key: "home" },
  { to: "/proposito", key: "purpose" },
  { to: "/equipo", key: "team" },
  { to: "/lugar", key: "place" },
  { to: "/especialidades", key: "specialties" },
  { to: "/derivantes", key: "referring" },
  { to: "/pacientes", key: "patients" },
  { to: "/coberturas", key: "coverage" },
  { to: "/sistema-gestion", key: "quality" },
  { to: "/novedades", key: "news" },
  { to: "/contacto", key: "contact" },
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

function LangToggle({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  const { lang, toggleLang } = useLang();
  const nextLabel = lang === "es" ? "EN" : "ES";
  return (
    <button
      onClick={toggleLang}
      aria-label={t("lang.aria")}
      className={
        compact
          ? "rounded-md border border-border px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-clinical-slate hover:text-foreground"
          : "rounded-full border border-border px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-clinical-slate transition-colors hover:border-clinical-accent hover:text-foreground"
      }
    >
      {nextLabel}
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between px-8 2xl:px-16">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoImg} alt="CAP Vighi" className="h-12 w-auto object-contain" />
          <span className="text-base font-bold uppercase tracking-tight md:text-lg">
            CAP Vighi
          </span>
        </Link>

        <div className="hidden items-center gap-8 text-[10px] font-semibold uppercase tracking-[0.1em] text-clinical-slate xl:flex">
          {navKeys.slice(1, -1).map((l) => {
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
                {t(`nav.${l.key}`)}
              </Link>
            );
          })}
          <Link
            to="/contacto"
            className="rounded-full bg-clinical-blue px-5 py-2.5 text-[11px] text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("nav.contact")}
          </Link>
          <LangToggle />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LangToggle compact />
          <button
            aria-label={t("nav.openMenu")}
            onClick={() => setOpen((v) => !v)}
            className="flex size-10 items-center justify-center rounded-md border border-border"
          >
            <span className="flex flex-col gap-1">
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navKeys.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium uppercase tracking-wide text-clinical-slate hover:bg-secondary hover:text-foreground"
              >
                {t(`nav.${l.key}`)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="mt-20 bg-clinical-blue py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={logoImg} alt="CAP Vighi" className="h-16 w-auto object-contain" />
            <span className="text-lg font-bold uppercase tracking-tight">CAP Vighi</span>
          </div>
          <p className="mt-6 max-w-sm text-sm text-white/60">
            {t("footer.tagline")}
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
            {t("footer.sections")}
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            {navKeys.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-primary-foreground">
                  {t(`nav.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-clinical-accent">
            {t("footer.contact")}
          </h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li>{t("footer.location")}</li>
            <li>
              <a href="mailto:info@susanavighi.com.ar" className="hover:text-primary-foreground">
                info@susanavighi.com.ar
              </a>
            </li>
            <li>{t("footer.hours")}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 px-6 pt-8 text-[10px] uppercase tracking-widest text-white/40 md:flex-row">
        <span>© {new Date().getFullYear()} {t("footer.rights")}</span>
        <span>{t("footer.quality")}</span>
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
  | "molecules"
  | "partners"
  | "referral"
  | "heartbeat"
  | "publications";

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

  if (variant === "partners") {
    // Grilla de nodos institucionales conectados (red de coberturas)
    const nodes: Array<[number, number]> = [
      [200, 90], [320, 70], [440, 100], [500, 170],
      [180, 190], [300, 190], [420, 200],
      [220, 290], [340, 300], [460, 280],
      [160, 100], [500, 80],
    ];
    const links: Array<[number, number]> = [
      [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 6], [4, 5], [5, 6],
      [4, 7], [5, 8], [6, 9], [7, 8], [8, 9], [0, 10], [2, 11],
    ];
    return (
      <g>
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke={i % 2 === 0 ? A : B}
            strokeWidth="0.7"
            opacity="0.2"
          />
        ))}
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <rect
              x={x - 16}
              y={y - 16}
              width="32"
              height="32"
              rx="8"
              fill="none"
              stroke={i % 3 === 0 ? A : B}
              strokeWidth="1"
              opacity="0.3"
            />
            <rect
              x={x - 7}
              y={y - 7}
              width="14"
              height="14"
              rx="3"
              fill={i % 3 === 0 ? A : B}
              opacity="0.5"
            />
          </g>
        ))}
      </g>
    );
  }

  if (variant === "referral") {
    // Flujo de derivación: documento viajando entre dos instituciones
    return (
      <g>
        {/* Nodo origen (institución derivante) */}
        <rect x="150" y="150" width="70" height="80" rx="8" fill="none" stroke={B} strokeWidth="1.2" opacity="0.35" />
        <line x1="165" y1="170" x2="205" y2="170" stroke={B} strokeWidth="1" opacity="0.3" />
        <line x1="165" y1="185" x2="205" y2="185" stroke={B} strokeWidth="1" opacity="0.3" />
        <line x1="165" y1="200" x2="195" y2="200" stroke={B} strokeWidth="1" opacity="0.3" />

        {/* Nodo destino (CAP Vighi) */}
        <rect x="440" y="130" width="80" height="90" rx="8" fill="none" stroke={A} strokeWidth="1.4" opacity="0.4" />
        <circle cx="480" cy="160" r="12" fill="none" stroke={A} strokeWidth="1.2" opacity="0.5" />
        <circle cx="480" cy="160" r="5" fill={A} opacity="0.6" />
        <line x1="460" y1="195" x2="500" y2="195" stroke={A} strokeWidth="1" opacity="0.35" />
        <line x1="460" y1="205" x2="500" y2="205" stroke={A} strokeWidth="1" opacity="0.35" />

        {/* Ruta punteada de derivación */}
        <path
          d="M 225 185 Q 330 100 440 175"
          fill="none"
          stroke={A}
          strokeWidth="1.2"
          strokeDasharray="2 6"
          opacity="0.4"
        />

        {/* Documento en tránsito */}
        <g transform="translate(320, 130)">
          <rect x="-16" y="-20" width="32" height="40" rx="4" fill="var(--clinical-bg)" stroke={A} strokeWidth="1.2" opacity="0.85" />
          <line x1="-9" y1="-9" x2="9" y2="-9" stroke={A} strokeWidth="1" opacity="0.5" />
          <line x1="-9" y1="0" x2="9" y2="0" stroke={A} strokeWidth="1" opacity="0.5" />
          <line x1="-9" y1="9" x2="3" y2="9" stroke={A} strokeWidth="1" opacity="0.5" />
        </g>

        {/* Puntos satélite (red de derivantes) */}
        <circle cx="130" cy="270" r="4" fill={B} opacity="0.35" />
        <circle cx="200" cy="290" r="3.5" fill={B} opacity="0.3" />
        <circle cx="530" cy="260" r="4" fill={A} opacity="0.3" />
        <circle cx="490" cy="290" r="3.5" fill={A} opacity="0.28" />
        <line x1="150" y1="230" x2="130" y2="270" stroke={B} strokeWidth="0.6" opacity="0.2" />
        <line x1="185" y1="230" x2="200" y2="290" stroke={B} strokeWidth="0.6" opacity="0.2" />
        <line x1="480" y1="220" x2="530" y2="260" stroke={A} strokeWidth="0.6" opacity="0.2" />
        <line x1="460" y1="220" x2="490" y2="290" stroke={A} strokeWidth="0.6" opacity="0.2" />
      </g>
    );
  }

  if (variant === "heartbeat") {
    // Línea de pulso cardíaco (EKG) con corazón — cuidado al paciente
    return (
      <g>
        {/* Línea base de pulso */}
        <path
          d="M 100 220 L 200 220 L 225 220 L 240 160 L 260 280 L 280 190 L 300 220 L 340 220
             L 365 220 L 380 160 L 400 280 L 420 190 L 440 220 L 540 220"
          fill="none"
          stroke={A}
          strokeWidth="1.6"
          opacity="0.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Segunda línea tenue (eco) */}
        <path
          d="M 100 260 L 210 260 L 230 260 L 245 230 L 260 290 L 275 260 L 340 260
             L 360 260 L 375 235 L 390 285 L 405 260 L 540 260"
          fill="none"
          stroke={B}
          strokeWidth="1"
          opacity="0.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Corazón */}
        <path
          d="M320 110 C 305 95 280 100 280 122 C 280 142 320 165 320 165 C 320 165 360 142 360 122 C 360 100 335 95 320 110 Z"
          fill={A}
          opacity="0.5"
        />
        {/* Puntos de foco a lo largo de la línea */}
        <circle cx="240" cy="160" r="3" fill={A} opacity="0.6" />
        <circle cx="380" cy="160" r="3" fill={A} opacity="0.6" />
      </g>
    );
  }

  if (variant === "publications") {
    // Libro abierto con páginas — publicaciones y actividad académica
    return (
      <g>
        {/* Tapa/lomo del libro */}
        <path
          d="M 320 100 L 320 280"
          stroke={B}
          strokeWidth="1.4"
          opacity="0.35"
        />
        {/* Página izquierda */}
        <path
          d="M 320 110 C 270 95 210 100 175 118 L 175 270 C 210 253 270 248 320 263 Z"
          fill="none"
          stroke={A}
          strokeWidth="1.2"
          opacity="0.4"
        />
        <line x1="195" y1="145" x2="290" y2="132" stroke={A} strokeWidth="0.8" opacity="0.3" />
        <line x1="195" y1="165" x2="290" y2="153" stroke={A} strokeWidth="0.8" opacity="0.3" />
        <line x1="195" y1="185" x2="290" y2="174" stroke={A} strokeWidth="0.8" opacity="0.3" />
        <line x1="195" y1="205" x2="260" y2="197" stroke={A} strokeWidth="0.8" opacity="0.25" />

        {/* Página derecha */}
        <path
          d="M 320 110 C 370 95 430 100 465 118 L 465 270 C 430 253 370 248 320 263 Z"
          fill="none"
          stroke={B}
          strokeWidth="1.2"
          opacity="0.4"
        />
        <line x1="350" y1="132" x2="445" y2="145" stroke={B} strokeWidth="0.8" opacity="0.3" />
        <line x1="350" y1="153" x2="445" y2="165" stroke={B} strokeWidth="0.8" opacity="0.3" />
        <line x1="350" y1="174" x2="445" y2="185" stroke={B} strokeWidth="0.8" opacity="0.3" />
        <line x1="350" y1="197" x2="415" y2="205" stroke={B} strokeWidth="0.8" opacity="0.25" />

        {/* Birrete académico flotante */}
        <g transform="translate(480, 90)">
          <path d="M -22 0 L 0 -10 L 22 0 L 0 10 Z" fill={A} opacity="0.45" />
          <line x1="16" y1="4" x2="16" y2="20" stroke={A} strokeWidth="1" opacity="0.4" />
          <circle cx="16" cy="21" r="2" fill={A} opacity="0.5" />
        </g>

        {/* Estrellas/destellos de novedad */}
        <circle cx="150" cy="90" r="2.5" fill={B} opacity="0.4" />
        <circle cx="500" cy="230" r="2.5" fill={A} opacity="0.35" />
        <circle cx="140" cy="230" r="2" fill={A} opacity="0.3" />
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
      {/* Halo del nodo central */}
      <circle cx="280" cy="190" r="34" fill={A} opacity="0.08" />
      <circle cx="280" cy="190" r="34" fill="none" stroke={A} strokeWidth="0.6" opacity="0.25" />
      <rect
        x="260"
        y="170"
        width="40"
        height="40"
        rx="10"
        fill="none"
        stroke={A}
        strokeWidth="1.5"
        opacity="0.6"
      />
      <rect x="270" y="180" width="20" height="20" rx="5" fill={A} opacity="0.85" />

      {[
        [380, 110, 14, A],
        [420, 210, 14, A],
        [340, 290, 12, B],
        [180, 120, 12, B],
        [190, 270, 12, B],
        [490, 90, 10, A],
        [460, 160, 9, A],
        [510, 190, 8, A],
        [440, 310, 9, B],
        [280, 60, 8, B],
        [130, 320, 8, B],
        [530, 150, 7, A],
        [510, 340, 7, B],
      ].map(([x, y, size, color], i) => (
        <g key={i}>
          <rect
            x={(x as number) - (size as number) / 2}
            y={(y as number) - (size as number) / 2}
            width={size}
            height={size}
            rx={(size as number) / 4}
            fill="none"
            stroke={color as string}
            strokeWidth="1"
            opacity="0.3"
          />
          <rect
            x={(x as number) - (size as number) / 4}
            y={(y as number) - (size as number) / 4}
            width={(size as number) / 2}
            height={(size as number) / 2}
            rx={(size as number) / 8}
            fill={color as string}
            opacity="0.55"
          />
        </g>
      ))}
    </g>
  );
}

