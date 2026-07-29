import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import es from "./locales/es.json";
import en from "./locales/en.json";

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        es: { translation: es },
        en: { translation: en },
      },
      lng: "es",
      fallbackLng: "es",
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      initImmediate: false,
    });
}

export default i18n;

export const SUPPORTED_LANGS = ["es", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const LANG_STORAGE_KEY = "capvighi.lang";

// Raw resource bundles, for reading translations outside React/i18next's
// async-init lifecycle (e.g. route `head()` functions, which the router
// can invoke before i18next has finished initializing on the server).
export const resources = { es, en } as const;

/**
 * Synchronous, init-independent language read for use in route `head()`.
 * Mirrors the same localStorage key useLang() persists to, so head() and
 * the rendered page body always agree on language.
 */
export function getCurrentLang(): Lang {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // ignore storage errors
  }
  return "es";
}

/** Reads a dot-path (e.g. "seo.home.title") out of the raw resource bundle for the current language. */
export function seoText(path: string): string {
  const lang = getCurrentLang();
  let node: unknown = resources[lang];
  for (const key of path.split(".")) {
    if (node && typeof node === "object" && key in (node as Record<string, unknown>)) {
      node = (node as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof node === "string" ? node : path;
}
