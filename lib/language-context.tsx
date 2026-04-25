"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { translations, type Locale } from "./i18n";

type TranslationValue = (typeof translations)[Locale];
const DEFAULT_LOCALE: Locale = "en";
const localeListeners = new Set<() => void>();

function isLocale(value: string | null): value is Locale {
  return value !== null && value in translations;
}

function subscribe(onStoreChange: () => void) {
  localeListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    localeListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const saved = window.localStorage.getItem("lang");
  return isLocale(saved) ? saved : DEFAULT_LOCALE;
}

function setStoredLocale(locale: Locale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("lang", locale);
  localeListeners.forEach((listener) => listener());
}

const LanguageContext = createContext<{
  locale: Locale;
  t: TranslationValue;
  setLocale: (l: Locale) => void;
}>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getLocaleSnapshot, () => DEFAULT_LOCALE);

  function setLocale(l: Locale) {
    setStoredLocale(l);
  }

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
