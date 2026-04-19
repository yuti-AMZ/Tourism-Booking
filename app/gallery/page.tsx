"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "/images/lalibela.jpg", caption: "Lalibela Rock-Hewn Churches", category: "Heritage" },
  { src: "/images/Simien Mountains, Ethiopia.jpg", caption: "Simien Mountains", category: "Landscape" },
  { src: "/images/denakil.jpg", caption: "Danakil Depression", category: "Landscape" },
  { src: "/images/omo.jpg", caption: "Omo Valley Tribes", category: "Culture" },
  { src: "/images/gondar.jpg", caption: "Gondar Royal Enclosure", category: "Heritage" },
  { src: "/images/entonto.jpg", caption: "Entoto Hills, Addis Ababa", category: "City" },
  { src: "/images/ethio landscape.jpg", caption: "Ethiopian Highlands", category: "Landscape" },
  { src: "/images/harar.jpg", caption: "Harar Old City", category: "Culture" },
  { src: "/images/Bale Mountains.jpg", caption: "Bale Mountains", category: "Wildlife" },
  { src: "/images/Axum.jpg", caption: "Axum Obelisks", category: "Heritage" },
  { src: "/images/Axum1.jpg", caption: "Ancient Axum", category: "Heritage" },
  { src: "/images/flag-ethiopia.jpg", caption: "Ethiopian Flag", category: "Culture" },
];

const categories = ["All", "Heritage", "Landscape", "Culture", "Wildlife", "City"];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);

  function prev() { if (lightbox === null) return; setLightbox((lightbox - 1 + filtered.length) % filtered.length); }
  function next() { if (lightbox === null) return; setLightbox((lightbox + 1) % filtered.length); }

  return (
    <div className="min-h-screen">
      <section className="relative text-center text-white" style={{ height: "60vh", minHeight: "300px" }}>
        <img src="/images/omo.jpg" alt="Gallery" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mb-3">Gallery</h1>
          <p className="text-white/70 max-w-xl mx-auto">Stunning photos from across Ethiopia. Click any image to open a larger view.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-8 pb-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                active === cat ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((photo, i) => (
            <div key={i} className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square" onClick={() => setLightbox(i)}>
              <img src={photo.src} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full w-fit mb-1">{photo.category}</span>
                <p className="text-white text-xs font-medium">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2" onClick={() => setLightbox(null)}>
            <X className="w-5 h-5" />
          </button>
          <button className="absolute left-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="max-w-3xl w-full">
            <img src={filtered[lightbox].src} alt={filtered[lightbox].caption} className="w-full max-h-[75vh] object-contain rounded-xl" />
            <div className="text-center mt-3">
              <p className="text-white text-sm">{filtered[lightbox].caption}</p>
              <p className="text-white/50 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
            </div>
          </div>
          <button className="absolute right-4 text-white bg-white/20 hover:bg-white/30 rounded-full p-2" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
