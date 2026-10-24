import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  MapPinIcon,
  SquarePenIcon,
  StarIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Destination } from "@/lib/destinations";

const API_URL = "http://localhost:5000/destinations";

/* Rating and reviews are not part of the API payload yet — presentation-only
   fallbacks, consistent with destination-card. Add them to the payload to
   make this real. */
const RATING = 4.5;
const REVIEW_COUNT = 24;

/* Perks shown on the booking card (presentation-only until the backend
   models them). */
const INCLUDED_FEATURES = [
  "Free cancellation up to 7 days",
  "Travel insurance Included",
  "24/7 customer support",
];

/* Highlight picks per category for the two-column checklist
   (presentation-only until the backend models them). */
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

/* Formats the API's ISO date (2026-10-28) as 10/28/2026 without timezone
   side effects; falls back to the raw string. */
function formatDeparture(departureDate: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(departureDate);
  if (!match) return departureDate;
  return `${match[2]}/${match[3]}/${match[1]}`;
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let destination: Destination | null = null;

  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    const payload: unknown = await res.json();
    if (payload && typeof payload === "object" && "name" in payload) {
      destination = payload as Destination;
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
          <Button variant="outline">
            <SquarePenIcon data-icon="inline-start" className="size-3.5" />
            Edit
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/destinations" />}
          >
            <XIcon data-icon="inline-start" className="size-3.5" />
            Cancel
          </Button>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative mt-4 aspect-[16/7] overflow-hidden rounded-lg">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {/* Destination info, overview and highlights */}
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
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="mt-1 text-4xl font-bold text-cyan-600">
              ${destination.price}
            </p>
            <p className="text-xs text-muted-foreground">per person</p>

            <div className="mt-5">
              <label
                htmlFor="departure-date"
                className="mb-1.5 block text-xs font-medium text-muted-foreground"
              >
                Departure date
              </label>
              <Input
                id="departure-date"
                readOnly
                value={formatDeparture(destination.departureDate)}
                className="h-10 cursor-default bg-muted/60"
              />
            </div>

            {/* Presentational until a booking flow exists. */}
            <Button className="mt-5 h-10 w-full bg-cyan-600 text-white hover:bg-cyan-700">
              Book Now
              <ArrowRightIcon data-icon="inline-end" />
            </Button>

            <ul className="mt-6 space-y-2.5">
              {INCLUDED_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <CheckIcon className="size-4 shrink-0 text-cyan-600" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
