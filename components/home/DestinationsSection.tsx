// Destinations section (list preview)
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DestinationsSection() {
  const destinations = await prisma.destination.findMany({
    orderBy: { rating: "desc" },
    take: 3,
  });
  return (
    <section id="destinations" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Destinations</h2>
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
        <div className="text-center mt-8">
          <Link href="/destinations" className="text-primary underline font-medium">See all destinations</Link>
        </div>
      </div>
    </section>
  );
}
