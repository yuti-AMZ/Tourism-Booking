import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function DestinationsSection() {
  const destinations = await prisma.destination.findMany({
    orderBy: { rating: "desc" },
    take: 3,
  });

  return (
    <section id="destinations" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">Top Destinations</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link key={destination.id} href={`/destinations/${destination.slug}`}>
              <div className="group overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative overflow-hidden">
                  {destination.images?.[0] ? (
                    <Image
                      src={destination.images[0]}
                      alt={destination.title}
                      width={640}
                      height={192}
                      unoptimized
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center bg-muted text-lg font-bold">Map</div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                    {destination.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="mb-1 text-lg font-semibold">{destination.title}</h3>
                  <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{destination.location}</p>
                  <div className="flex items-center gap-2 text-xs text-yellow-500">
                    <span>* {destination.rating?.toFixed(1) ?? "N/A"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/destinations" className="font-medium text-primary underline">
            See all destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
