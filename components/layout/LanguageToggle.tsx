"use client";

import { useLang } from "@/lib/language-context";

export default function LanguageToggle() {
  const { locale, setLocale } = useLang();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "am" : "en")}
      className="flex items-center gap-1 text-xs font-semibold border border-border rounded-lg px-2 py-1 hover:bg-muted transition-colors"
      title="Toggle language"
    >
      {locale === "en" ? (
        <><span>🇪🇹</span> አማ</>
      ) : (
        <><span>🇬🇧</span> EN</>
      )}
    </button>
  );
}
