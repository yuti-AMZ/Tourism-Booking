import Image from "next/image";
import Link from "next/link";
import AddDestinationForm from "@/components/admin/add-destination-form";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DestinationsPage() {
  const session = await getAuthSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const destinations = await prisma.destination.findMany({
    orderBy: { rating: "desc" },
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden text-center text-white" style={{ height: "60vh", minHeight: "320px" }}>
        <Image
          src="/images/ethio landscape.jpg"
          alt="Ethiopia"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">All Destinations</h1>
          <p className="mt-3 max-w-lg text-base text-white/70">
            Discover ancient wonders, breathtaking landscapes, and vibrant cultures
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {isAdmin && (
          <section className="mb-10 rounded-2xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Admin</p>
                <h2 className="text-2xl font-bold">Add A Destination</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Submitting this form creates a new destination in the database immediately.
                </p>
              </div>
              <Link
                href="/admin/analytics"
                className="rounded-lg border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Analytics
              </Link>
            </div>
            <AddDestinationForm />
          </section>
        )}

        <p className="mb-5 text-sm text-muted-foreground">
          {destinations.length} destination{destinations.length !== 1 ? "s" : ""} found
        </p>

        {destinations.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No destinations found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <Link href={`/destinations/${destination.slug}`}>
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
                </Link>
                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {destination.slug}
                      </p>
                      <h3 className="mb-1 text-lg font-semibold">{destination.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-yellow-500">
                      <span>* {destination.rating?.toFixed(1) ?? "N/A"}</span>
                    </div>
                  </div>
                  <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">{destination.location}</p>
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base font-bold text-primary">
                      ${destination.price}
                      <span className="text-xs font-normal text-muted-foreground"> / night</span>
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href={`/destinations/${destination.slug}`}
                        className="rounded-lg border px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
                      >
                        Details
                      </Link>
                      <Link
                        href={`/destinations/${destination.slug}#booking`}
                        className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
