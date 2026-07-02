import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { ShieldCheck, Building2, ArrowRight } from "lucide-react";
import osde from "@/assets/Coberturas/osde_logo.png";
import medicus from "@/assets/Coberturas/logo-medicus.jpg";
import swissMedical from "@/assets/Coberturas/smg_logo.png";
import galeno from "@/assets/Coberturas/logo-galeno.png";
import unionPersonal from "@/assets/Coberturas/logo-up.png";
import omint from "@/assets/Coberturas/logo-omint.png";
import luisPasteur from "@/assets/Coberturas/logo_luis_pasteur.png";
import ospjn from "@/assets/Coberturas/os-poder-judicial-destaque.png";
import cmPueyrredon from "@/assets/Coberturas/logo-cmpueyrredon.jpg";
import ospoce from "@/assets/Coberturas/logoOspoce.png";
import williamHope from "@/assets/Coberturas/william-hope.png";
import osdipp from "@/assets/Coberturas/osdipp_logo.png";
import sancorSalud from "@/assets/Coberturas/sancor-salud.png";
import apsot from "@/assets/Coberturas/logo-apsot.png";
import ospic from "@/assets/Coberturas/ospic-300x126.png";
import osetya from "@/assets/Coberturas/osetya.png";
import iadt from "@/assets/CentrosMedicos/logo-iadt_escudo.png";
import otamendi from "@/assets/CentrosMedicos/logo-otamendi.png";
import iqdc from "@/assets/CentrosMedicos/logo-iqdc.jpg";
import monteGrande from "@/assets/CentrosMedicos/logo-CMG.jpg";
import trinidadPalermo from "@/assets/CentrosMedicos/logo-tp.png";
import trinidadRamosMejia from "@/assets/CentrosMedicos/logo-trm.png";
import trinidadMitre from "@/assets/CentrosMedicos/logo-tmitre.png";
import trinidadMedicalCenter from "@/assets/CentrosMedicos/logo-tmc.png";
import suizoArgentina from "@/assets/CentrosMedicos/logo-suizo.png";
import delosArcos from "@/assets/CentrosMedicos/logo-sarcos.png";
import zabala from "@/assets/CentrosMedicos/logo-zabala.png";
import agote from "@/assets/CentrosMedicos/logo-agote.png";
import providencia from "@/assets/CentrosMedicos/logo-providencia.jpg";
import aramburu from "@/assets/CentrosMedicos/logo-aramburu.png";
import amebpba from "@/assets/CentrosMedicos/logo-amebpba.png";
import independencia from "@/assets/CentrosMedicos/logo-cpi.png";
import vilella from "@/assets/CentrosMedicos/logo-cmv.png";
import luccau from "@/assets/CentrosMedicos/logo-luccau.jpg";
import halitus from "@/assets/CentrosMedicos/logo-halitus.jpg";
import idim from "@/assets/CentrosMedicos/logo-idim.jpg";
import lpBelgrano from "@/assets/CentrosMedicos/logo-LPB.jpg";
import lpCongreso from "@/assets/CentrosMedicos/logo-LPC.jpg";
import lpLomas from "@/assets/CentrosMedicos/logo-LPLZ.jpg";
import lpMartinez from "@/assets/CentrosMedicos/logo-LPM.jpg";
import lpRamos from "@/assets/CentrosMedicos/logo-LPRM.jpg";
import pregna from "@/assets/CentrosMedicos/logo-pregna.png";
import monserrat from "@/assets/CentrosMedicos/logo-cmmonserrat.jpg";
import ifer from "@/assets/CentrosMedicos/logo-ifer.png";
import fecunditas from "@/assets/CentrosMedicos/logo-fecunditas.png";
import cegyr from "@/assets/CentrosMedicos/logo-cegyr.png";
import cer from "@/assets/CentrosMedicos/logo-cer.png";
import ivi from "@/assets/CentrosMedicos/logo-ivi.png";

export const Route = createFileRoute("/coberturas")({
  head: () => ({
    meta: [
      { title: "Coberturas y centros — CAP Vighi" },
      {
        name: "description",
        content:
          "Obras sociales, prepagas y centros de salud con los que trabajamos en anatomía patológica.",
      },
      { property: "og:title", content: "Coberturas y centros — CAP Vighi" },
      {
        property: "og:description",
        content:
          "Red de obras sociales, medicina prepaga y clínicas asociadas a CAP Vighi.",
      },
    ],
  }),
  component: CoberturasPage,
});

const coberturasLogos = [
  osde,
  medicus,
  swissMedical,
  galeno,
  unionPersonal,
  omint,
  luisPasteur,
  ospjn,
  cmPueyrredon,
  ospoce,
  williamHope,
  osdipp,
  sancorSalud,
  apsot,
  ospic,
  osetya,
];

const clinicasSanatorios = [
  iadt,
  otamendi,
  iqdc,
  monteGrande,
  trinidadPalermo,
  trinidadRamosMejia,
  trinidadMitre,
  trinidadMedicalCenter,
  suizoArgentina,
  delosArcos,
  zabala,
  agote,
  providencia,
  aramburu,
  amebpba,
  independencia,
];

const centrosMedicos = [
  vilella,
  luccau,
  halitus,
  idim,
  lpBelgrano,
  lpCongreso,
  lpLomas,
  lpMartinez,
  lpRamos,
  pregna,
  monserrat,
  ifer,
  fecunditas,
  cegyr,
  cer,
  ivi,
];

function LogoGrid({ logos }: { logos: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {logos.map((src, i) => (
        <div
          key={i}
          className="flex h-24 items-center justify-center rounded-xl border border-border bg-background p-4 transition-colors hover:border-clinical-accent"
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
}

function CoberturasPage() {
  return (
    <SiteLayout>
      <PageHero
        variant="network"
        eyebrow="Coberturas · Red de centros"
        title="Trabajamos con las principales coberturas y centros de salud."
        description="Coordinamos la recepción y el circuito administrativo con obras sociales, medicina prepaga y clínicas de referencia."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue">
              <ShieldCheck className="size-5 text-white" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                01
              </span>
              <h2 className="text-2xl font-bold tracking-tight">
                Obras sociales y prepagas
              </h2>
            </div>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-clinical-slate">
            Consultá por autorizaciones y modalidad de cobertura para cada estudio.
          </p>
          <LogoGrid logos={coberturasLogos} />
        </div>
      </section>

      <section className="border-t border-border bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-clinical-blue">
              <Building2 className="size-5 text-white" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-clinical-accent">
                02
              </span>
              <h2 className="text-2xl font-bold tracking-tight">
                Centros y sanatorios asociados
              </h2>
            </div>
          </div>
          <p className="mb-8 max-w-2xl text-sm text-clinical-slate">
            Recibimos muestras derivadas de las principales instituciones médicas del área metropolitana.
          </p>

          <h3 className="mb-6 font-mono text-xs uppercase tracking-widest text-clinical-slate">
            Clínicas y Sanatorios
          </h3>
          <LogoGrid logos={clinicasSanatorios} />

          <h3 className="mb-6 mt-14 font-mono text-xs uppercase tracking-widest text-clinical-slate">
            Centros Médicos
          </h3>
          <LogoGrid logos={centrosMedicos} />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-clinical-slate">
            ¿No encontrás tu obra social? Consultanos, incorporamos nuevas coberturas periódicamente.
          </p>
          <Link
            to="/contacto"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-clinical-blue px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
          >
            Consultar cobertura
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
