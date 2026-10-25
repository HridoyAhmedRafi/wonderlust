import Link from "next/link";
import { CircleAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import DestinationCard from "@/components/destination/destination-card";
import { IDestination } from "@/lib/destinations";

const API_URL = "http://localhost:5000/destinations";

const DestinationsPage = async () => {
  let destinations: IDestination[] | null = null;

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const payload: unknown = await res.json();
    destinations = Array.isArray(payload) ? (payload as IDestination[]) : null;
  } catch {
    /* Backend unreachable or malformed response — the page renders an error
       state below instead of inventing data. */
    destinations = null;
  }

  if (destinations === null) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center">
        <CircleAlertIcon className="size-12 text-destructive" />
        <h1 className="mt-4 text-4xl font-semibold">Something went wrong</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          We couldn&apos;t load the destinations right now. The server may be
          offline — please try again later.
        </p>
        <Button
          nativeButton={false}
          size="lg"
          className="mt-8 bg-cyan-600 px-6 text-white hover:bg-cyan-700"
          render={<Link href="/" />}
        >
          Back to Home
        </Button>
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center">
        <h1 className="text-4xl font-semibold">No destinations yet</h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Destinations will appear here as soon as they are added.
        </p>
        <Button
          nativeButton={false}
          size="lg"
          className="mt-8 bg-cyan-600 px-6 text-white hover:bg-cyan-700"
          render={<Link href="/add-destination" />}
        >
          Add a Destination
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-5xl ">Explore All Destinations</h1>
      <p className="text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>
      <p className="mt-5 text-[18px] text-muted-foreground">
        Showing {destinations.length} destinations
      </p>
      <div className="mt-4 grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
