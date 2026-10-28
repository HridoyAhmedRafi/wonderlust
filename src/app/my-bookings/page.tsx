import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CircleAlertIcon } from "lucide-react";

import BookingCard from "@/components/booking/BookingCard";
import { Button } from "@/components/ui/button";
import type { IBooking } from "@/lib/bookings";
import { auth } from "@/lib/auth";
import { getServerToken } from "@/lib/getServerToken";

export const metadata: Metadata = {
  title: "My Bookings",
};

const API_URL = "http://localhost:5000/bookings";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const token = await getServerToken();

  let bookings: IBooking[] | null = null;

  try {
    if (!token) {
      throw new Error("Authentication token missing");
    }

    const res = await fetch(`${API_URL}/${encodeURIComponent(user.email)}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    const payload: unknown = await res.json();

    bookings = Array.isArray(payload) ? (payload as IBooking[]) : null;
  } catch {
    // Backend unreachable or malformed response.
    bookings = null;
  }

  const header = (
    <div>
      <h1 className="text-5xl">My Bookings</h1>
      <p className="mt-2 text-muted-foreground">
        Manage and review your upcoming travel plans
      </p>
    </div>
  );

  if (bookings === null) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        {header}
        <div className="mt-8 flex flex-col items-center rounded-xl border bg-card px-4 py-16 text-center shadow-sm">
          <CircleAlertIcon className="size-12 text-destructive" />
          <h2 className="mt-4 text-2xl font-semibold">Something went wrong</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            We couldn&apos;t load your bookings right now. The server may be
            offline — please try again later.
          </p>
          <Button
            nativeButton={false}
            size="lg"
            className="mt-6 bg-cyan-600 px-6 text-white hover:bg-cyan-700"
            render={<Link href="/" />}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-8">
        {header}
        <div className="mt-8 flex flex-col items-center rounded-xl border bg-card px-4 py-16 text-center shadow-sm">
          <h2 className="text-2xl font-semibold">No bookings yet</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Your upcoming trips will appear here once you book a destination.
          </p>
          <Button
            nativeButton={false}
            size="lg"
            className="mt-6 bg-cyan-600 px-6 text-white hover:bg-cyan-700"
            render={<Link href="/destinations" />}
          >
            Explore Destinations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {header}
      <div className="mt-8 grid gap-4">
        {bookings.map((booking) => (
          <BookingCard key={booking._id} booking={booking} />
        ))}
      </div>
    </div>
  );
};

export default MyBookingsPage;
