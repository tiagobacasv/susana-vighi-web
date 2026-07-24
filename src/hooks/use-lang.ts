import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANG_STORAGE_KEY, SUPPORTED_LANGS, type Lang } from "@/i18n";

/**
 * Hook that syncs i18next language with localStorage and <html lang>.
 * Reads the saved preference on mount (client-only) and exposes a setter.
 */
export function useLang() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
      if (stored && SUPPORTED_LANGS.includes(stored) && stored !== i18n.language) {
        i18n.changeLanguage(stored);
      }
    } catch {
      // ignore storage errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  const setLang = (lang: Lang) => {
    i18n.changeLanguage(lang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(i18n.language === "es" ? "en" : "es");
  };

  return { lang: i18n.language as Lang, setLang, toggleLang };
}
