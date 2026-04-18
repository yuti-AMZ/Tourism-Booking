"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  { src: "https://images.unsplash.com/photo-1580746738099-b2d4b5d4b9b4?w=800&auto=format&fit=crop", caption: "Lalibela Rock-Hewn Churches", category: "Heritage" },
  { src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&auto=format&fit=crop", caption: "Simien Mountains", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop", caption: "Danakil Depression", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&auto=format&fit=crop", caption: "Omo Valley Tribes", category: "Culture" },
  { src: "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&auto=format&fit=crop", caption: "Lake Tana Monasteries", category: "Heritage" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop", caption: "Addis Ababa City", category: "City" },
  { src: "https://images.unsplash.com/photo-1508264165352-cb2ecb3f9bfc?w=800&auto=format&fit=crop", caption: "Ethiopian Highlands", category: "Landscape" },
  { src: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&auto=format&fit=crop", caption: "Traditional Coffee Ceremony", category: "Culture" },
  { src: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&auto=format&fit=crop", caption: "Ethiopian Wildlife", category: "Wildlife" },
  { src: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&auto=format&fit=crop", caption: "Ancient Ruins", category: "Heritage" },
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
        <img src="https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=1400&auto=format&fit=crop" alt="Gallery" className="absolute inset-0 w-full h-full object-cover" />
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
