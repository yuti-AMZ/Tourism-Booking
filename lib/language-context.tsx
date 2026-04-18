"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { translations, type Locale } from "./i18n";

const LanguageContext = createContext<{
  locale: Locale;
  t: typeof translations.en;
  setLocale: (l: Locale) => void;
}>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Locale | null;
    if (saved && translations[saved]) setLocaleState(saved);
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("lang", l);
  }

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
