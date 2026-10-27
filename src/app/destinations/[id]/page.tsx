import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import type { IDestination } from "@/lib/destinations";
import { EditDestination } from "@/components/destination/EditDestination";
import DeleteDestination from "@/components/destination/DeleteDestination";
import BookingSection from "@/components/booking/BookingSection";

const API_URL = "http://localhost:5000/destinations";

const RATING = 4.5;
const REVIEW_COUNT = 24;

const HIGHLIGHTS: Record<string, string[]> = {
  Beach: [
    "Beachfront accommodation",
    "Snorkeling the house reef",
    "Sunset beach dinner experience",
    "Island boat cruise",
    "Coastal spa treatment",
    "Pool access all day",
  ],
  Wildlife: [
    "Guided jungle safari tour",
    "Birdwatching at dawn",
    "Nature trails with a local guide",
    "River cruise through the reserve",
    "Camp-side bonfire evening",
    "Sunrise viewpoint hike",
  ],
  Cultural: [
    "Guided heritage site tour",
    "Traditional craft workshop",
    "Local food tasting walk",
    "Historic temple visits",
    "Folk music evening",
    "Old town walking tour",
  ],
  Adventure: [
    "Whitewater rafting session",
    "Zipline across the valley",
    "Rock climbing with guides",
    "Sunrise trek to the peak",
    "Kayak the river rapids",
    "Night safari drive",
  ],
  Mountain: [
    "Guided summit day hike",
    "Cable car scenic ride",
    "Alpine lake viewpoint",
    "Mountain village homestay",
    "Photography walk at dusk",
    "Evening by the fireplace",
  ],
  "City Break": [
    "Old quarter walking tour",
    "Rooftop dining experience",
    "Bazaar and market visit",
    "Museum passes included",
    "Sunset river cruise",
    "Local nightlife tour",
  ],
};

const DEFAULT_HIGHLIGHTS = [
  "Guided local tour",
  "All entry tickets included",
  "Hotel pickup and drop-off",
  "Daily breakfast included",
];

function formatDuration(duration: string) {
  const days = Number(duration);
  if (!Number.isFinite(days) || days <= 0) return duration;
  const nights = Math.max(days - 1, 0);
  return `${days} Days / ${nights} Nights`;
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let destination: IDestination | null = null;

  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const payload: unknown = await res.json();
    if (payload && typeof payload === "object" && "name" in payload) {
      destination = payload as IDestination;
    }
  } catch {
    /* API unreachable, unknown id, or a malformed payload → 404 page.
       TODO: dedicated "service unavailable" state once the backend
       contract distinguishes missing ids from outages. */
  }

  if (!destination) {
    notFound();
  }

  const highlights = HIGHLIGHTS[destination.category] ?? DEFAULT_HIGHLIGHTS;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Destinations
        </Link>
        <div className="flex items-center gap-2">
          {/* Static until an edit destination flow exists. */}

          <EditDestination destination={destination}></EditDestination>
          <DeleteDestination destination={destination}></DeleteDestination>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-4 aspect-16/7 overflow-hidden rounded-lg">
        {destination.imageUrl ? (
          <Image
            src={destination.imageUrl}
            alt={destination.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            No image available
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {/* IDestination info, overview and highlights */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-4" />
              {destination.country}
            </span>
            <span className="rounded-full border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
              {destination.category}
            </span>
          </div>

          <h1 className="mt-2 text-4xl font-semibold md:text-5xl">
            {destination.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <StarIcon className="size-4 fill-current" />
              <span className="font-semibold">{RATING}</span>
              <span className="text-muted-foreground">
                ({REVIEW_COUNT} reviews)
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CalendarIcon className="size-4" />
              {formatDuration(destination.duration)}
            </span>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {destination.description}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold">Highlights</h2>
            <ul className="mt-3 grid gap-y-2.5 sm:grid-cols-2 sm:gap-x-10">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2 text-sm">
                  <CheckIcon className="size-4 shrink-0 text-cyan-600" />
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Booking card */}
        <BookingSection destination={destination}></BookingSection>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
