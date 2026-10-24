import { Skeleton } from "@/components/ui/skeleton";

/* The home route is fully static, so this rarely surfaces — it covers the
   first-load window by echoing the banner block plus section headline bars. */
export default function Loading() {
  return (
    <div className="w-full">
      <Skeleton className="h-[calc(100svh-4rem)] min-h-[560px] w-full rounded-none" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-16 text-center">
        <Skeleton className="h-8 w-72 max-w-full" />
        <Skeleton className="mt-4 h-4 w-96 max-w-full" />
        <Skeleton className="mt-2.5 h-4 w-80 max-w-full" />
        <div className="mt-10 flex gap-4">
          <Skeleton className="h-11 w-36" />
          <Skeleton className="h-11 w-36" />
        </div>
      </div>
    </div>
  );
}
