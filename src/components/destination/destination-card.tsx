import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CalendarIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";
import type { IDestination } from "@/lib/destinations";

/* Rating is not part of the API payload yet; 4.5 matches the mock.
   Add `rating` to the payload to make this real. */
const RATING = 4.5;

function formatDuration(duration: string) {
  const days = Number(duration);
  if (!Number.isFinite(days) || days <= 0) return duration;
  const nights = Math.max(days - 1, 0);
  return `${days} Days/${nights} Nights`;
}

const DestinationCard = ({ destination }: { destination: IDestination }) => {
  return (
    <article>
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
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
        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white py-1 pr-2.5 pl-3 text-xs font-semibold text-foreground shadow-sm">
          {RATING}
          <StarIcon className="size-3 fill-current" />
        </span>
      </div>

      <div className="mt-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPinIcon className="size-3.5" />
          {destination.country}
        </div>

        <div className="mt-1.5 flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold">{destination.name}</h3>
          <p className="text-sm font-semibold whitespace-nowrap">
            ${destination.price}
            <span className="text-xs font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <CalendarIcon className="size-3.5" />
          {formatDuration(destination.duration)}
        </div>

        <Link
          href={`destinations/${destination._id}`}
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold tracking-wide text-cyan-600 uppercase transition-colors hover:text-cyan-700"
        >
          Book Now
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>
    </article>
  );
};

export default DestinationCard;
