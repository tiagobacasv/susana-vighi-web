import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

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
          <span className="flex size-9 items-center justify-center rounded-md bg-clinical-blue">
            <span className="size-3 bg-clinical-accent" />
          </span>
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
            <span className="flex size-9 items-center justify-center rounded-md bg-white/10">
              <span className="size-3 bg-clinical-accent" />
            </span>
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
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
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
