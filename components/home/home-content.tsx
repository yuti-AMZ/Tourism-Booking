"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/language-context";
import { ArrowRight } from "lucide-react";

export default function HomeContent() {
  const { t } = useLang();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full screen hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4" style={{ height: "100vh" }}>
        <img
          src="/images/home-hero.jpg"
          alt="Ethiopia"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-white/60 font-medium tracking-widest uppercase text-xs mb-4">
            ኢትዮጵያ — {t.home.tagline}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {t.home.title}<br />
            <span className="text-primary">{t.home.highlight}</span>
          </h1>
          <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            {t.home.subtitle}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/destinations">
              <Button size="lg" className="font-semibold px-8 gap-2">
                {t.home.explore} <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 px-8">
                {t.home.getStarted}
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs animate-bounce">
          <span>scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-primary py-3">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-primary-foreground font-medium text-sm">
          <span>Ancient History</span>
          <span>Wildlife Safari</span>
          <span>Rock-Hewn Churches</span>
          <span>Birthplace of Coffee</span>
          <span>Simien Mountains</span>
        </div>
      </section>

      {/* Why Ethiopia */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">{t.home.whyTitle}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.home.whySubtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { img: "/images/lalibela.jpg", title: "Lalibela", desc: "11 medieval rock-hewn churches carved from solid rock — a UNESCO World Heritage Site." },
            { img: "/images/denakil.jpg", title: "Danakil Depression", desc: "One of the hottest and most otherworldly landscapes on Earth." },
            { img: "/images/omo.jpg", title: "Omo Valley", desc: "Home to over 50 indigenous tribes with rich, living traditions." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl overflow-hidden border bg-card hover:shadow-lg transition-all hover:-translate-y-1 duration-200">
              <img src={item.img} alt={item.title} className="w-full h-44 object-cover" />
              <div className="p-5">
                <h3 className="font-semibold text-base mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
