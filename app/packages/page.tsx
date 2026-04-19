"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const packages = [
  { id: 1, title: "Lalibela Pilgrimage & Rock Churches", description: "Explore the 11 UNESCO-listed rock-hewn churches of Lalibela, attend a traditional Orthodox ceremony, and walk the ancient pilgrimage routes.", duration: "4-7", theme: "culture", days: "4 Days", price: 480, image: "/images/lalibela.jpg", highlights: ["Rock-hewn churches tour", "Orthodox ceremony", "Local guide"] },
  { id: 2, title: "Simien Mountains Trek", description: "Trek through dramatic escarpments and deep valleys. Spot Gelada baboons, Ethiopian wolves, and Walia ibex in their natural habitat.", duration: "4-7", theme: "adventure", days: "6 Days", price: 570, image: "/images/Simien-mountains.jpg", highlights: ["Guided mountain trek", "Wildlife spotting", "Camping under stars"] },
  { id: 3, title: "Danakil Depression Expedition", description: "Venture into one of Earth's most extreme landscapes — sulfur springs, lava lakes, and vast salt flats in the Afar region.", duration: "2-3", theme: "adventure", days: "3 Days", price: 390, image: "/images/denakil.jpg", highlights: ["Erta Ale lava lake", "Salt flat walk", "Afar village visit"] },
  { id: 4, title: "Omo Valley Tribal Experience", description: "Immerse yourself in the cultures of 50+ indigenous tribes — the Mursi, Hamar, and Karo peoples of southern Ethiopia.", duration: "8plus", theme: "culture", days: "8 Days", price: 950, image: "/images/omo.jpg", highlights: ["Mursi tribe visit", "Hamar bull jumping", "Local market tours"] },
  { id: 5, title: "Bale Mountains Wildlife Safari", description: "Track the endangered Ethiopian wolf and mountain nyala across the Sanetti Plateau — Africa's largest Afroalpine ecosystem.", duration: "4-7", theme: "wildlife", days: "5 Days", price: 620, image: "/images/Bale Mountains.jpg", highlights: ["Ethiopian wolf tracking", "Harenna forest walk", "Bird watching"] },
  { id: 6, title: "Addis Ababa City & Coffee Tour", description: "Discover Ethiopia's vibrant capital — the National Museum, Merkato market, Holy Trinity Cathedral, and a traditional coffee ceremony.", duration: "2-3", theme: "culture", days: "2 Days", price: 160, image: "/images/entonto.jpg", highlights: ["National Museum (Lucy)", "Coffee ceremony", "Merkato market"] },
  { id: 7, title: "Gondar Royal Enclosure", description: "Explore the 'Camelot of Africa' — six castles and palaces of Ethiopia's imperial capital, a UNESCO World Heritage Site.", duration: "2-3", theme: "culture", days: "3 Days", price: 270, image: "/images/gondar.jpg", highlights: ["Royal Enclosure tour", "Debre Berhan Selassie church", "Fasilides Bath"] },
  { id: 8, title: "Ethiopia Grand Tour", description: "The ultimate Ethiopia experience — Addis Ababa, Lalibela, Gondar, Simien Mountains, and the Omo Valley in one epic journey.", duration: "8plus", theme: "culture", days: "14 Days", price: 1800, image: "/images/ethio landscape.jpg", highlights: ["All major sites", "Domestic flights", "Expert guide throughout"] },
];

export default function PackagesPage() {
  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("all");
  const [theme, setTheme] = useState("all");
  const [applied, setApplied] = useState({ search: "", duration: "all", theme: "all" });

  function applyFilters() { setApplied({ search, duration, theme }); }
  function clearFilters() { setSearch(""); setDuration("all"); setTheme("all"); setApplied({ search: "", duration: "all", theme: "all" }); }

  const filtered = useMemo(() => packages.filter((p) => {
    const matchSearch = !applied.search || p.title.toLowerCase().includes(applied.search.toLowerCase()) || p.description.toLowerCase().includes(applied.search.toLowerCase());
    const matchDuration = applied.duration === "all" || p.duration === applied.duration;
    const matchTheme = applied.theme === "all" || p.theme === applied.theme;
    return matchSearch && matchDuration && matchTheme;
  }), [applied]);

  return (
    <div className="min-h-screen">
      <section className="relative text-center text-white" style={{ height: "60vh", minHeight: "300px" }}>
        <Image
          src="/images/Simien-mountains.jpg"
          alt="Ethiopia"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-3">Travel Packages</h1>
          <p className="text-white/70 max-w-xl mx-auto">Curated itineraries across Ethiopia — customizable by duration, theme, and budget.</p>
        </div>
      </section>

      <section className="bg-card border-b py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-50">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-8" placeholder="Search packages..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && applyFilters()} />
            </div>
          </div>
          <label className="sr-only" htmlFor="duration-select">Duration</label>
          <select
            id="duration-select"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-input rounded-lg px-3 py-1.5 text-sm bg-background outline-none focus:ring-2 focus:ring-ring"
            aria-label="Duration"
          >
            <option value="all">Any Duration</option>
            <option value="2-3">2–3 days</option>
            <option value="4-7">4–7 days</option>
            <option value="8plus">8+ days</option>
          </select>
          <label className="sr-only" htmlFor="theme-select">Theme</label>
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="border border-input rounded-lg px-3 py-1.5 text-sm bg-background outline-none focus:ring-2 focus:ring-ring"
            aria-label="Theme"
          >
            <option value="all">All Themes</option>
            <option value="adventure">Adventure</option>
            <option value="culture">Culture</option>
            <option value="wildlife">Wildlife</option>
          </select>
          <Button onClick={applyFilters}>Search</Button>
          <Button onClick={clearFilters} variant="outline">Clear</Button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No packages match your filters.</p>
            <button onClick={clearFilters} className="mt-3 text-primary text-sm underline">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pkg) => (
              <div key={pkg.id} className="border rounded-xl overflow-hidden bg-card hover:shadow-lg transition-all hover:-translate-y-1 duration-200 flex flex-col">
                <div className="relative">
                  <div className="w-full h-44 relative">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <span className="absolute top-3 left-3 text-xs bg-primary text-primary-foreground px-2.5 py-1 rounded-full capitalize">
                    {pkg.theme}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-base mb-1">{pkg.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{pkg.description}</p>
                  <ul className="space-y-1 mb-4">
                    {pkg.highlights.map((h) => (
                      <li key={h} className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />{h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {pkg.days}</span>
                      <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> From ${pkg.price}</span>
                    </div>
                    <Link href="/contact">
                      <span className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
