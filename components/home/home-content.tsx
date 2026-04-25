"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/language-context";

const highlights = [
  {
    img: "/images/lalibela.jpg",
    title: "Lalibela",
    desc: "11 medieval rock-hewn churches carved from solid rock - a UNESCO World Heritage Site.",
  },
  {
    img: "/images/denakil.jpg",
    title: "Danakil Depression",
    desc: "One of the hottest and most otherworldly landscapes on Earth.",
  },
  {
    img: "/images/omo.jpg",
    title: "Omo Valley",
    desc: "Home to over 50 indigenous tribes with rich, living traditions.",
  },
];

export default function HomeContent() {
  const { t } = useLang();

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative flex h-screen flex-col items-center justify-center px-4 text-center">
        <Image
          src="/images/home-hero.jpg"
          alt="Ethiopia"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-white/60">
            Ethiopia - {t.home.tagline}
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
            {t.home.title}
            <br />
            <span className="text-primary">{t.home.highlight}</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{t.home.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/destinations">
              <Button size="lg" className="gap-2 px-8 font-semibold">
                {t.home.explore} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-white/50 px-8 text-white hover:bg-white/10">
                {t.home.getStarted}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-1 text-xs text-white/40">
          <span>scroll</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">{t.home.whyTitle}</h2>
          <p className="mx-auto max-w-2xl leading-relaxed text-muted-foreground">{t.home.whySubtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
              <Image src={item.img} alt={item.title} width={640} height={176} className="h-44 w-full object-cover" />
              <div className="p-5">
                <h3 className="mb-1 text-base font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
