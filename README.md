# CAP Vighi — Sitio web

Sitio institucional del Centro de Anatomía Patológica Dra. Susana Vighi. Bilingüe (ES/EN), server-rendered, desplegado en Cloudflare Workers.

Esta guía es para cualquiera que agarre el proyecto de cero. Es la única fuente de documentación del repo — no hay READMEs sueltos en subcarpetas. Complementa (no repite) lo que ya explica `CLAUDE.md` (convenciones para agentes de IA).

## Stack

- **TanStack Start** (SSR) + **TanStack Router** (file-based routing) + **React 19**
- **Tailwind CSS v4** + **shadcn/ui** (`src/components/ui/`)
- **i18next** / **react-i18next** para ES/EN
- Deploy: **Cloudflare Workers** vía `wrangler.json` (`dist/server` + `dist/client`)

## Comandos

```bash
npm run dev      # servidor de desarrollo (puerto 8080)
npm run build    # build de producción
npm run lint      # ESLint
npm run format    # Prettier (escribe in-place)
```

**Usamos `npm`, no `bun`.** Queda un `bun.lock` del scaffold inicial, pero en la práctica `bun install` rompe dependencias nativas (esbuild/rolldown) en este entorno — quedó `npm` como estándar de trabajo real.

No hay test suite configurado.

**Sobre el deploy:** `npm run build` genera `dist/server/` + `dist/client/` (vía Nitro, preset `cloudflare-module`, configurado en `vite.config.ts`). Nitro escribe su propio `dist/server/wrangler.json` con el `main`/`assets` correctos para ese build — es ese archivo (no el `wrangler.json` de la raíz) el que manda al desplegar, por ejemplo con `npx nitro deploy --prebuilt` desde `dist/server/`. El `wrangler.json` de la raíz sirve como config base (nombre, `compatibility_date`) pero Nitro pisa `main`/`assets` a propósito — vas a ver un par de `WARN` al respecto en el build, son esperables.

## Mapa del proyecto

```
src/
  routes/           Una página = un archivo (convención abajo). __root.tsx es el shell global.
  components/
    SiteLayout.tsx   Navbar + Footer + <PageHero>. Envuelve el contenido de cada ruta.
    ui/              shadcn/ui (npx shadcn add <componente> para sumar más)
  i18n/
    index.ts          Setup de i18next + seoText() (ver abajo)
    locales/es.json    Español — idioma por defecto
    locales/en.json    Inglés
  hooks/
    use-lang.ts        Sincroniza i18next ↔ localStorage ↔ <html lang>
  lib/
    constants.ts        Constantes compartidas (ej. URL del sistema de gestión)
    *.server.ts          Server-only, nunca se bundlea al cliente
  assets/                Imágenes reales (equipo, sede, coberturas, tecnología)
public/                  Estáticos servidos tal cual: PDFs descargables, robots.txt
scripts/pdf/             Generadores en Python de los PDFs de /derivantes (ver abajo)
```

## Rutas

TanStack Start usa **file-based routing**: cada archivo `.tsx` en `src/routes/` es una página, el nombre de archivo define la URL. No crear `src/pages/`, `src/routes/_app/index.tsx` ni `app/layout.tsx` — son convenciones de Next.js/Remix que no aplican acá. El único layout raíz es `src/routes/__root.tsx` (app shell: `QueryClientProvider`, `<head>` global, páginas de error/404 — no le saques el `<Outlet />`).

| Archivo | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dinámico — `$` a secas, sin llaves) |
| `posts/{-$category}.tsx` | `/posts/:category?` (segmento opcional) |
| `files/$.tsx` | `/files/*` (splat — se lee con el param `_splat`, nunca `*`) |
| `_layout.tsx` | ruta de layout (renderiza hijos vía `<Outlet />`) |
| `__root.tsx` | app shell — envuelve todas las páginas |

`src/routeTree.gen.ts` lo genera automáticamente el plugin del router — no tocarlo a mano.

Cada ruta envuelve su contenido en `<SiteLayout>` (`src/components/SiteLayout.tsx`), que pone navbar, footer y opcionalmente un `<PageHero>` para el header de páginas internas.

## i18n — cómo está armado

Todo el copy vive en `src/i18n/locales/{es,en}.json`, un único árbol de claves por idioma. **Los dos archivos tienen que tener exactamente la misma forma** (mismas claves, mismos largos de array) — si agregás una sección, agregala en los dos.

**Dentro de un componente**, usá el hook normal:

```tsx
const { t } = useTranslation();
t("home.hero.title")
```

**Dentro de un `head()` de ruta**, `useTranslation()` no sirve — usá `seoText()` de `@/i18n`:

```tsx
head: () => ({
  meta: [{ title: seoText("seo.home.title") }],
}),
```

¿Por qué? `head()` puede correr en el servidor antes de que i18next termine de inicializarse (aunque los recursos sean inline). `seoText()` esquiva el problema leyendo el JSON crudo directo, sin pasar por el estado interno de i18next. **No reemplaces `seoText()` por `i18n.t()` en un `head()`** — va a devolver la key cruda ("seo.home.title") en la primera carga de páginas no visitadas.

### Datos "mixtos" (foto/ícono + texto traducible)

Cuando una lista tiene cosas no traducibles (nombre de una persona, un import de imagen, un componente de ícono) junto con texto traducible (rol, descripción), el patrón del proyecto es:

- Un array `*Base` en el `.tsx` con lo no traducible (`{ nombre, foto }`)
- Un array paralelo en el JSON con lo traducible (`{ rol, formacion }`), **mismo orden, mismo largo**
- Una función `mergeMembers()` (o similar) que los combina en el render

Mirá `equipo.tsx` (`cuerpoMedicoBase` + `t("equipo.members.cuerpoMedico")`) o `lugar.tsx` (`pisoFotoSrcs` + `t("lugar.pisos")`) como referencia antes de inventar un patrón nuevo.

### ⚠️ Gotcha: reiniciar el dev server después de agregar claves nuevas

Si agregás una clave de i18n nueva y la usás enseguida, es común ver este error en consola al navegar:

```
Hydration failed because the server rendered text didn't match the client
```

El HTML que arma el servidor en la primera carga usa una copia en caché del módulo del JSON; el cliente ya tiene la versión nueva. El texto normal React lo "arregla" solo al hidratar (por eso a veces ni se nota), pero **atributos** (`title`, `aria-label`) no se autocorrigen y quedan mostrando la key cruda hasta que reiniciás. Solución: parar y volver a correr `npm run dev` (un refresh del navegador no alcanza). No es un bug del código — es caché del server de desarrollo.

## Paleta de marca

Tokens en `src/styles.css` (formato OKLCH, expuestos como utilities de Tailwind: `bg-clinical-blue`, `text-clinical-accent`, etc.):

| Token | Uso |
|---|---|
| `clinical-blue` | Violeta oscuro — títulos, navbar, footer, botones CTA |
| `clinical-accent` | Violeta brillante — highlights, eyebrows, estados activos |
| `clinical-slate` | Texto secundario/muted |

**Ojo:** estos tokens son una aproximación de diseño web, no calcan 1:1 los valores oficiales del manual de marca (`public/brandbook-cap-vighi.pdf`). La paleta *oficial* medida de ese PDF es:

```
#440059  Principal        #D39DED  Acento
#572089  Secundario       #ECD3F8  Acento (claro)
#000000  Textos           #F1F1F1 / #FEFEFE  Fondos
```

Los PDFs generados en `scripts/pdf/` usan estos hex oficiales directamente (no los tokens CSS), porque para un documento institucional que puede imprimirse se decidió ir a la fuente del manual de marca en vez de la interpretación web. Si en algún momento se unifica la paleta, hay que decidir cuál gana.

## Los PDFs de `/derivantes`

`/derivantes` ofrece dos descargas, cada una en ES y EN (4 archivos en `public/`):

- **Instructivo para médicos derivantes** (`instructivo-derivantes(-en).pdf`, 5 páginas) — circuito de derivación, requisitos por tipo de estudio, tiempos de entrega, contacto.
- **Formulario de derivación de muestra** (`formulario-derivacion(-en).pdf`, 1 página) — formulario imprimible en blanco.

Se generan con Python + [ReportLab](https://www.reportlab.com/), scripts en `scripts/pdf/`:

```bash
pip install reportlab
cd scripts/pdf
python build_instructivo_es.py   # -> public/instructivo-derivantes.pdf
python build_instructivo_en.py   # -> public/instructivo-derivantes-en.pdf
python build_formulario_es.py    # -> public/formulario-derivacion.pdf
python build_formulario_en.py    # -> public/formulario-derivacion-en.pdf
```

Si cambia algún dato (protocolo, teléfono, matrícula, campo del formulario), el contenido está hardcodeado dentro de cada script — no hay una fuente de datos compartida con el sitio web todavía. Editá el script correspondiente y volvé a correrlo; el PDF resultante pisa el archivo en `public/` (que sí está trackeado en git).

`derivantes.tsx` elige el PDF según el idioma activo (`useLang()`), armando el nombre de archivo con el sufijo `-en` cuando corresponde — si agregás un tercer idioma algún día, ese es el lugar para tocar.

## Cosas que ya se decidieron (no las reabras sin una buena razón)

- **"Insurance"**, no "Coverage", para lo que en español es "Coberturas" — es el término internacionalmente correcto, se unificó a propósito (nombre de archivo/ruta sigue siendo `coberturas.tsx`, la clave interna es `insurance`).
- **"CAP Vighi"** a secas en el footer/derechos de autor, en los dos idiomas — no el nombre largo.
- Los `head().scripts` de TanStack Router son **planos**, no `{ attrs: {...} }`:
  ```ts
  scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }]
  ```
  (`headContentUtils.js` de la librería hace `{ children, ...script }` y spreadea el resto directo en `attrs` — un shape anidado se pierde silenciosamente).
- No se pushea directo — cualquier cambio se revisa antes de subir a remoto.
