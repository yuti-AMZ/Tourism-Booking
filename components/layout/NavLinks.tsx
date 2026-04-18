"use client";

import Link from "next/link";
import { useLang } from "@/lib/language-context";

export default function NavLinks() {
  const { t } = useLang();

  const links = [
    { href: "/destinations", label: t.nav.destinations },
    { href: "/packages", label: t.nav.packages },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="text-muted-foreground hover:text-primary transition-colors">
          {l.label}
        </Link>
      ))}
    </>
  );
}
