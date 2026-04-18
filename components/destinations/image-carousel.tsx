"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";

export default function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (images.length === 0) {
    return (
      <div className="w-full h-72 bg-gradient-to-br from-green-700 to-yellow-500 rounded-2xl flex items-center justify-center text-6xl">
        🇪🇹
      </div>
    );
  }

  if (images.length === 1) {
    return <img src={images[0]} alt={title} className="w-full h-72 object-cover rounded-2xl" />;
  }

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((src, i) => (
            <div key={i} className="flex-none w-full">
              <img src={src} alt={`${title} ${i + 1}`} className="w-full h-72 object-cover" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
