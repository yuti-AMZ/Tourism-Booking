export default function DestinationsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="h-4 w-32 bg-muted rounded animate-pulse mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-muted" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-1/4 mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
