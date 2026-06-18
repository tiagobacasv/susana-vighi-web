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

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-secondary">
      {/* Decorative pathology field-of-view */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2">
        <svg
          viewBox="0 0 520 380"
          className="absolute right-[-8%] top-1/2 h-[130%] w-auto -translate-y-1/2"
          aria-hidden="true"
        >
          {/* Outer microscope rings */}
          <circle cx="260" cy="190" r="175" fill="none" stroke="var(--clinical-accent)" strokeWidth="1" opacity="0.22" />
          <circle cx="260" cy="190" r="152" fill="none" stroke="var(--clinical-blue)" strokeWidth="0.6" opacity="0.12" />
          <circle cx="260" cy="190" r="130" fill="none" stroke="var(--clinical-accent)" strokeWidth="0.4" strokeDasharray="4 6" opacity="0.15" />

          {/* Reticle crosshair */}
          <line x1="260" y1="30" x2="260" y2="350" stroke="var(--clinical-accent)" strokeWidth="0.5" opacity="0.12" />
          <line x1="95" y1="190" x2="425" y2="190" stroke="var(--clinical-accent)" strokeWidth="0.5" opacity="0.12" />

          {/* Main cell — center */}
          <circle cx="260" cy="190" r="32" fill="var(--clinical-accent)" opacity="0.10" />
          <circle cx="260" cy="190" r="20" fill="var(--clinical-accent)" opacity="0.08" />
          <circle cx="260" cy="190" r="7"  fill="var(--clinical-accent)" opacity="0.45" />

          {/* Cell top-left */}
          <circle cx="172" cy="138" r="24" fill="var(--clinical-blue)" opacity="0.09" />
          <circle cx="172" cy="138" r="6"  fill="var(--clinical-blue)" opacity="0.4" />

          {/* Cell top-right */}
          <circle cx="348" cy="122" r="19" fill="var(--clinical-accent)" opacity="0.10" />
          <circle cx="348" cy="122" r="5"  fill="var(--clinical-accent)" opacity="0.42" />

          {/* Cell bottom-left */}
          <circle cx="195" cy="268" r="26" fill="var(--clinical-blue)" opacity="0.08" />
          <circle cx="195" cy="268" r="6"  fill="var(--clinical-blue)" opacity="0.38" />

          {/* Cell bottom-right */}
          <circle cx="330" cy="262" r="21" fill="var(--clinical-accent)" opacity="0.09" />
          <circle cx="330" cy="262" r="5"  fill="var(--clinical-accent)" opacity="0.38" />

          {/* Small satellite cells */}
          <circle cx="136" cy="218" r="13" fill="var(--clinical-blue)"   opacity="0.07" />
          <circle cx="136" cy="218" r="3"  fill="var(--clinical-blue)"   opacity="0.35" />
          <circle cx="388" cy="205" r="15" fill="var(--clinical-accent)"  opacity="0.07" />
          <circle cx="388" cy="205" r="4"  fill="var(--clinical-accent)"  opacity="0.35" />
          <circle cx="290" cy="82"  r="11" fill="var(--clinical-blue)"   opacity="0.07" />
          <circle cx="290" cy="82"  r="3"  fill="var(--clinical-blue)"   opacity="0.32" />
          <circle cx="222" cy="310" r="10" fill="var(--clinical-accent)"  opacity="0.07" />
          <circle cx="222" cy="310" r="2"  fill="var(--clinical-accent)"  opacity="0.32" />
        </svg>

        {/* Fade to left so no corte brusco con el texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/60 to-transparent" />
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
