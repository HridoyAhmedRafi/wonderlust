import { Skeleton } from "@/components/ui/skeleton";

/* Streams in while the listing fetches destinations — mirrors
   destinations/page.tsx and destination-card. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <Skeleton className="h-11 w-96 max-w-full" />
      <Skeleton className="mt-3 h-4 w-80 max-w-full" />
      <Skeleton className="mt-6 h-5 w-44" />

      <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}>
            <Skeleton className="aspect-[16/10] w-full rounded-lg" />
            <div className="mt-3">
              <Skeleton className="h-3.5 w-24" />
              <div className="mt-2.5 flex items-baseline justify-between gap-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="mt-2.5 h-3.5 w-28" />
              <Skeleton className="mt-3.5 h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
