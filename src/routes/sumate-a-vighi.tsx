import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { seoText } from "@/i18n";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Stethoscope,
  Microscope,
  ClipboardList,
  BookOpen,
  HeartHandshake,
  Cpu,
  TrendingUp,
  Building2,
  CalendarClock,
  Award,
  Sparkles,
  Users,
  ShieldCheck,
  GraduationCap,
  Dna,
  Activity,
  Mail,
} from "lucide-react";

export const Route = createFileRoute("/sumate-a-vighi")({
  head: () => ({
    meta: [
      { title: seoText("seo.sumate.title") },
      { name: "description", content: seoText("seo.sumate.description") },
      { property: "og:title", content: seoText("seo.sumate.ogTitle") },
      { property: "og:description", content: seoText("seo.sumate.ogDescription") },
      { property: "og:url", content: "/sumate-a-vighi" },
    ],
    links: [{ rel: "canonical", href: "/sumate-a-vighi" }],
  }),
  component: SumatePage,
});

type Item = { titulo: string; texto: string };

// ─── Scroll reveal (respeta prefers-reduced-motion vía Tailwind motion-safe:) ──

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        visible ? "opacity-100 translate-y-0" : "motion-safe:opacity-0 motion-safe:translate-y-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

const valoresIcons = [Award, Sparkles, Users, ShieldCheck, GraduationCap];
const perfilesIcons = [Stethoscope, Microscope, ClipboardList, BookOpen];
const beneficiosIcons = [HeartHandshake, Cpu, TrendingUp, Building2, CalendarClock];

// ─── Rotador de valores tipo carrusel (uno a la vez, en loop continuo) ────────

function ValueRotator({ words }: { words: string[] }) {
  // Duplicamos el primero al final para poder deslizar hacia él y después
  // "teletransportarnos" de vuelta al índice 0 sin transición — el contenido
  // es idéntico en ambos casos, así que el salto es invisible.
  const slides = [...words, words[0]];
  const [index, setIndex] = useState(0);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimated(true);
      setIndex((i) => i + 1);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (index !== words.length) return;
    const t = setTimeout(() => {
      setAnimated(false);
      setIndex(0);
    }, 700);
    return () => clearTimeout(t);
  }, [index, words.length]);

  return (
    <div className="border-y border-white/10 bg-clinical-blue py-5 text-primary-foreground">
      <div className="mx-auto max-w-3xl overflow-hidden px-6">
        <div
          className={cn(
            "flex",
            animated &&
              "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-in-out",
          )}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((w, i) => (
            <div key={i} className="flex w-full shrink-0 items-center justify-center gap-3">
              <span className="size-1.5 shrink-0 rounded-full bg-clinical-accent" />
              <span className="text-center font-mono text-sm font-semibold uppercase tracking-[0.2em]">
                {w}
              </span>
              <span className="size-1.5 shrink-0 rounded-full bg-clinical-accent" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Línea de EKG (banda de impacto) ──────────────────────────────────────────

function HeartbeatLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 60" className={className} preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 30 H90 L100 30 L112 8 L124 52 L136 20 L146 30 H300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartbeatMarquee() {
  const items = Array.from({ length: 6 });
  const doubled = [...items, ...items];
  return (
    <div
      className="marquee-row absolute inset-0 opacity-[0.15]"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="flex h-full w-max items-center motion-safe:animate-marquee-left">
        {doubled.map((_, i) => (
          <HeartbeatLine key={i} className="h-16 w-[300px] shrink-0 text-white md:h-24" />
        ))}
      </div>
    </div>
  );
}

function SumatePage() {
  const { t } = useTranslation();
  const valores = t("sumate.valores.items", { returnObjects: true }) as Item[];
  const perfiles = t("sumate.perfiles.items", { returnObjects: true }) as Item[];
  const beneficios = t("sumate.beneficios.items", { returnObjects: true }) as Item[];

  return (
    <SiteLayout>
      <PageHero
        variant="team"
        eyebrow={t("sumate.hero.eyebrow")}
        title={t("sumate.hero.title")}
        description={t("sumate.hero.description")}
      />

      <ValueRotator words={valores.map((v) => v.titulo)} />

      {/* Filosofía */}
      <section className="overflow-hidden py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("sumate.filosofia.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance md:text-4xl">
              {t("sumate.filosofia.title")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-clinical-slate">
              {t("sumate.filosofia.texto")}
            </p>
          </Reveal>

          {/* Panel decorativo — íconos médicos flotando + pulso radar */}
          <div className="relative flex h-80 items-center justify-center md:h-[28rem]">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-clinical-accent/15 via-clinical-blue/10 to-transparent" />
            <div className="absolute size-56 rounded-full bg-clinical-accent/20 blur-3xl motion-safe:animate-drift-slow md:size-72" />

            {/* Anillos de pulso detrás del ícono central */}
            <span
              className="absolute size-32 rounded-full border-2 border-clinical-accent/50 motion-safe:animate-ping md:size-40"
              style={{ animationDuration: "2.4s" }}
            />
            <span
              className="absolute size-32 rounded-full border-2 border-clinical-blue/30 motion-safe:animate-ping md:size-40"
              style={{ animationDuration: "2.4s", animationDelay: "1.2s" }}
            />

            <div
              className="absolute left-[10%] top-[12%] flex size-16 items-center justify-center rounded-2xl border border-border bg-background shadow-xl motion-safe:animate-float-slow md:size-24"
              style={{ animationDelay: "0s" }}
            >
              <Stethoscope className="size-7 text-clinical-blue md:size-10" />
            </div>
            <div
              className="absolute right-[8%] top-[6%] flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-xl motion-safe:animate-float-slow md:size-20"
              style={{ animationDelay: "1.4s" }}
            >
              <Dna className="size-6 text-clinical-accent md:size-8" />
            </div>
            <div
              className="absolute bottom-[14%] left-[16%] flex size-14 items-center justify-center rounded-2xl border border-border bg-background shadow-xl motion-safe:animate-float-slow md:size-20"
              style={{ animationDelay: "2.6s" }}
            >
              <Activity className="size-6 text-clinical-accent md:size-8" />
            </div>
            <div
              className="absolute bottom-[8%] right-[12%] flex size-16 items-center justify-center rounded-2xl border border-border bg-background shadow-xl motion-safe:animate-float-slow md:size-24"
              style={{ animationDelay: "0.8s" }}
            >
              <Microscope className="size-7 text-clinical-blue md:size-10" />
            </div>

            <div className="relative flex size-32 items-center justify-center rounded-full bg-clinical-blue text-white shadow-2xl shadow-clinical-blue/30 md:size-40">
              <Users className="size-12 md:size-16" />
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("sumate.valores.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("sumate.valores.title")}
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {valores.map((v, i) => {
              const Icon = valoresIcons[i];
              return (
                <Reveal key={v.titulo} delay={i * 90}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-clinical-accent/50 hover:shadow-xl hover:shadow-clinical-accent/15">
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-clinical-blue to-clinical-accent transition-transform duration-300 group-hover:scale-x-100" />
                    <div className="flex size-11 items-center justify-center rounded-xl bg-clinical-blue text-white transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-base font-bold tracking-tight text-clinical-blue">
                      {v.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-clinical-slate">{v.texto}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Franja de impacto — pulso EKG */}
      <section className="relative overflow-hidden border-y border-white/10 bg-clinical-blue py-20 text-primary-foreground">
        <HeartbeatMarquee />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <Reveal>
            <p className="text-lg font-bold leading-snug md:whitespace-nowrap md:text-2xl">
              {t("sumate.pulse.quote")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Perfiles buscados */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("sumate.perfiles.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("sumate.perfiles.title")}
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {perfiles.map((p, i) => {
              const Icon = perfilesIcons[i];
              return (
                <Reveal key={p.titulo} delay={i * 90} className="h-full">
                  <article className="group flex h-full flex-col items-start rounded-2xl border border-border bg-secondary p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-clinical-accent/50 hover:bg-background hover:shadow-xl">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-clinical-accent/30 bg-background text-clinical-blue transition-all duration-300 group-hover:scale-110 group-hover:bg-clinical-blue group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 text-sm font-bold leading-snug tracking-tight text-clinical-blue">
                      {p.titulo}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-clinical-slate">{p.texto}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="border-t border-border bg-secondary/30 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-14 max-w-3xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
              {t("sumate.beneficios.eyebrow")}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              {t("sumate.beneficios.title")}
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-2">
            {beneficios.map((b, i) => {
              const Icon = beneficiosIcons[i];
              return (
                <Reveal key={b.titulo} delay={i * 80}>
                  <div className="group flex items-start gap-4 rounded-xl border border-border bg-background p-5 transition-colors duration-300 hover:border-clinical-accent/40">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-clinical-accent/10 text-clinical-accent transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-4.5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-tight text-clinical-blue">
                        {b.titulo}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-clinical-slate">{b.texto}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="rounded-2xl border border-border bg-secondary p-10 text-center md:p-14">
              <div className="font-mono text-[11px] uppercase tracking-widest text-clinical-accent">
                {t("sumate.cta.eyebrow")}
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-clinical-blue md:text-4xl">
                {t("sumate.cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-clinical-slate">
                {t("sumate.cta.description")}
              </p>
              <a
                href="mailto:cv@susanavighi.com.ar"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-clinical-blue px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <Mail className="size-4" />
                {t("sumate.cta.button")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
