import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import SearchFilters from "@/components/destinations/search-filters";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ q?: string; category?: string; minPrice?: string; maxPrice?: string; minRating?: string }>;
}

export default async function DestinationsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const destinations = await prisma.destination.findMany({
    where: {
      ...(sp.q && {
        OR: [
          { title: { contains: sp.q, mode: "insensitive" } },
          { location: { contains: sp.q, mode: "insensitive" } },
          { description: { contains: sp.q, mode: "insensitive" } },
        ],
      }),
      ...(sp.category && { category: sp.category }),
      ...(sp.minPrice || sp.maxPrice ? {
        price: {
          ...(sp.minPrice && { gte: parseFloat(sp.minPrice) }),
          ...(sp.maxPrice && { lte: parseFloat(sp.maxPrice) }),
        },
      } : {}),
      ...(sp.minRating && { rating: { gte: parseFloat(sp.minRating) } }),
    },
    orderBy: { rating: "desc" },
  });

  return (
    <div className="min-h-screen">
      <div className="relative text-center text-white overflow-hidden" style={{ height: "60vh", minHeight: "320px" }}>
        <img
          src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1400&auto=format&fit=crop"
          alt="Ethiopia"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">Explore Ethiopia</h1>
          <p className="text-white/70 mt-3 text-base max-w-lg">Discover ancient wonders, breathtaking landscapes, and vibrant cultures</p>
        </div>
      </div>

      <Suspense>
        <SearchFilters />
      </Suspense>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-sm text-muted-foreground mb-5">
          {destinations.length} destination{destinations.length !== 1 ? "s" : ""} found
          {sp.q && <span> for &quot;<strong>{sp.q}</strong>&quot;</span>}
        </p>

        {destinations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No destinations match your search.</p>
            <Link href="/destinations" className="text-primary text-sm underline mt-2 inline-block">Clear filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <Link key={d.id} href={`/destinations/${d.slug}`}>
                <div className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-200 group">
                  <div className="relative overflow-hidden">
                    {d.images[0] ? (
                      <img src={d.images[0]} alt={d.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center text-4xl">📍</div>
                    )}
                    <span className="absolute top-3 left-3 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {d.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <h2 className="font-semibold text-base">{d.title}</h2>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-primary text-primary" />{d.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />{d.location}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-bold text-primary">${d.price}<span className="text-xs font-normal text-muted-foreground"> / night</span></p>
                      <span className="text-xs text-primary font-medium">View →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
