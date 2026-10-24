import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center md:py-32">
      <p className="text-8xl font-bold text-cyan-600 md:text-9xl">404</p>
      <h1 className="mt-4 text-4xl font-semibold">Page Not Found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Sorry, we couldn&apos;t find the page you are looking for. It may have
        been moved or no longer exists.
      </p>
      <Button
        nativeButton={false}
        size="lg"
        className="mt-8 bg-cyan-600 px-6 text-white hover:bg-cyan-700"
        render={<Link href="/" />}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Back to Home
      </Button>
    </div>
  );
}
