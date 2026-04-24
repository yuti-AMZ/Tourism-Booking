"use client";
// Gallery section (photo grid)
import { useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/lalibela.jpg", caption: "Lalibela Rock-Hewn Churches", category: "Heritage" },
  { src: "/images/Simien-mountains.jpg", caption: "Simien Mountains", category: "Landscape" },
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

export default function GallerySection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? photos : photos.filter((p) => p.category === active);
  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((p, i) => (
            <div key={i} className="rounded-lg overflow-hidden border bg-card">
              <Image src={p.src} alt={p.caption} width={300} height={200} className="object-cover w-full h-40" />
              <div className="p-2 text-xs text-center text-muted-foreground">{p.caption}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
