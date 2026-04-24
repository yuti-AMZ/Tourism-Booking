import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { rating: "desc" },
  });
  return (
    <div className="min-h-screen bg-background">
      <div className="relative text-center text-white overflow-hidden" style={{ height: "60vh", minHeight: "320px" }}>
        <img
          src="/images/ethio landscape.jpg"
          alt="Ethiopia"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">All Destinations</h1>
          <p className="text-white/70 mt-3 text-base max-w-lg">Discover ancient wonders, breathtaking landscapes, and vibrant cultures</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-sm text-muted-foreground mb-5">
          {destinations.length} destination{destinations.length !== 1 ? "s" : ""} found
        </p>
        {destinations.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No destinations found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <Link key={d.id} href={`/destinations/${d.slug}`}>
                <div className="rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 duration-200 group">
                  <div className="relative overflow-hidden">
                    {d.images?.[0] ? (
                      <img src={d.images[0]} alt={d.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center text-4xl">📍</div>
                    )}
                    <span className="absolute top-3 left-3 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      {d.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-1">{d.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{d.location}</p>
                    <div className="flex items-center gap-2 text-yellow-500 text-xs">
                      <span>★ {d.rating?.toFixed(1) ?? "N/A"}</span>
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
