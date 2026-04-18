"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/language-context";

export default function HomeContent() {
  const { t } = useLang();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full screen video hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4" style={{ height: "100vh" }}>

        {/* Video background — replace src with your own video URL */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&auto=format&fit=crop"
        >
          {/* Add your video source here — see instructions below */}
          {/* <source src="/videos/ethiopia.mp4" type="video/mp4" /> */}
        </video>

        {/* Fallback image shown while video loads or if no video source */}
        <img
          src="https://images.unsplash.com/photo-1580746738099-b2d4b5d4b9b4?w=1400&auto=format&fit=crop"
          alt="Ethiopia"
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-white/60 font-semibold tracking-widest uppercase text-xs mb-4">
            ኢትዮጵያ — {t.home.tagline}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {t.home.title}<br />
            <span className="text-sky-300">{t.home.highlight}</span>
          </h1>
          <p className="text-white/75 text-lg max-w-xl mx-auto mb-10">
            {t.home.subtitle}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/destinations">
              <Button size="lg" className="font-bold px-8 text-base">
                {t.home.explore}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-white/60 text-white hover:bg-white/10 px-8 text-base">
                {t.home.getStarted}
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40 text-xs animate-bounce">
          <span>scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-primary py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-primary-foreground font-semibold text-sm">
          <span>🏛️ Ancient History</span>
          <span>🦁 Wildlife Safari</span>
          <span>⛪ Rock-Hewn Churches</span>
          <span>☕ Birthplace of Coffee</span>
          <span>🏔️ Simien Mountains</span>
        </div>
      </section>

      {/* Why Ethiopia */}
      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-3 text-primary">{t.home.whyTitle}</h2>
        <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">{t.home.whySubtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1580746738099-b2d4b5d4b9b4?w=600&auto=format&fit=crop", title: "Lalibela", desc: "11 medieval rock-hewn churches carved from solid rock" },
            { img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&auto=format&fit=crop", title: "Danakil Depression", desc: "One of the hottest and most otherworldly places on Earth" },
            { img: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&auto=format&fit=crop", title: "Omo Valley", desc: "Home to over 50 indigenous tribes with rich traditions" },
          ].map((item) => (
            <div key={item.title} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-card">
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
