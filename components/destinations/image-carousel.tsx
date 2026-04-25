"use client";

import Image from "next/image";
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
      <div className="flex h-72 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-green-700 to-yellow-500 text-2xl font-black tracking-[0.25em] text-white">
        ET
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={title}
        width={1200}
        height={288}
        unoptimized
        className="h-72 w-full rounded-2xl object-cover"
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="w-full flex-none">
              <Image
                src={src}
                alt={`${title} ${index + 1}`}
                width={1200}
                height={288}
                unoptimized
                className="h-72 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 rounded-full bg-black/40 p-2 text-white transition-colors hover:bg-black/60"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
