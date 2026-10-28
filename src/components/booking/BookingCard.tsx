"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  EyeIcon,
  TagIcon,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { IBooking } from "@/lib/bookings";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getClientToken } from "@/lib/getClientToken";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

const STATUS_STYLES = {
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2Icon,
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  pending: {
    label: "Pending",
    icon: ClockIcon,
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },
} as const;

const BookingCard = ({ booking }: { booking: IBooking }) => {
  const router = useRouter();
  const status = STATUS_STYLES[booking.status ?? "confirmed"];
  const StatusIcon = status.icon;

  const hanldeDelete = async () => {
    const token = await getClientToken();
    const res = await fetch(`http://localhost:5000/bookings/${booking._id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.acknowledged) {
      router.refresh();
      toast.success(`${booking.name} Removed successfully`);
    }
  };

  return (
    <article className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-sm sm:flex-row sm:gap-5 sm:p-5">
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:aspect-auto sm:w-64 sm:self-stretch">
        {booking.imageUrl ? (
          <Image
            src={booking.imageUrl}
            alt={booking.name}
            fill
            sizes="(min-width: 640px) 16rem, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full min-h-32 items-center justify-center text-sm text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset",
            status.className,
          )}
        >
          <StatusIcon className="size-4" />
          {status.label}
        </span>

        <h2
          className="mt-2 truncate text-2xl font-semibold"
          title={booking.name}
        >
          {booking.name?.trim() || "Untitled trip"}
        </h2>

        <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <CalendarIcon className="size-4 shrink-0" />
            Departure: {formatDate(booking.departureDate)}
          </p>
          <p className="flex items-center gap-2">
            <TagIcon className="size-4 shrink-0" />
            Booking ID:{" "}
            <span className="font-mono" title={booking._id}>
              #{booking._id.slice(-6)}
            </span>
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 sm:mt-auto sm:pt-4">
          <p className="text-3xl font-bold text-cyan-600">${booking.price}</p>

          <div className="flex w-full gap-3 sm:w-auto">
            <Button
              onClick={hanldeDelete}
              type="button"
              variant="outline"
              className="cursor-pointer h-9 flex-1 border-red-300 px-5 text-red-600 hover:bg-red-50 hover:text-red-700 sm:flex-none"
            >
              <Trash2Icon />
              Cancel
            </Button>

            <Link href={`/destinations/${booking.destinationId}`}>
              <Button
                // nativeButton={false}
                className="cursor-pointer h-9 flex-1 bg-cyan-600 px-6 text-white hover:bg-cyan-700 sm:flex-none"
                // render={<Link href={`'/destinations/${booking._id}`} />}
              >
                <EyeIcon />
                View
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BookingCard;
