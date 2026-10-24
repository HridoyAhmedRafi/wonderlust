import { Skeleton } from "@/components/ui/skeleton";

/* Streams in while the details page fetches its destination — mirrors the
   page layout so the swap-in looks seamless. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Top bar: back link + Edit / Cancel */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      {/* Hero image */}
      <Skeleton className="mt-4 aspect-[16/7] w-full rounded-lg" />

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {/* Destination info, overview and highlights */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="mt-3 h-10 w-72 max-w-full" />
          <div className="mt-4 flex items-center gap-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-28" />
          </div>

          <div className="mt-8">
            <Skeleton className="h-7 w-28" />
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2.5 h-4 w-3/4" />
          </div>

          <div className="mt-8">
            <Skeleton className="h-7 w-32" />
            <div className="mt-4 grid gap-y-3 sm:grid-cols-2 sm:gap-x-10">
              {[
                "w-full",
                "w-2/3",
                "w-3/4",
                "w-5/6",
                "w-2/3",
                "w-3/4",
              ].map((width, index) => (
                <Skeleton
                  key={index}
                  className={`h-4 ${width}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Booking card */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-10 w-32" />
            <Skeleton className="mt-2 h-3 w-16" />
            <div className="mt-6">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-2 h-10 w-full" />
            </div>
            <Skeleton className="mt-6 h-10 w-full" />
            <div className="mt-6 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
