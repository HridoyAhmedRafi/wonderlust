"use client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { Input } from "../ui/input";
import { IDestination } from "@/lib/destinations";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const INCLUDED_FEATURES = [
  "Free cancellation up to 7 days",
  "Travel insurance Included",
  "24/7 customer support",
];

const BookingSection = ({ destination }: { destination: IDestination }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const hanldeBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const departureDate = (
      e.currentTarget.elements.namedItem("departureDate") as HTMLInputElement
    ).value;

    const { _id, ...destinationFields } = destination;
    const data = {
      username: user?.name,
      image: user?.image,
      email: user?.email,
      ...destinationFields,
      destinationId: _id,
      departureDate: departureDate,
      bookingDate: new Date(),
    };

    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log("Status:", res.status);
    const backendRes = await res.json();
    // console.log("Response:", backendRes);
    if (backendRes.acknowledged === true) {
      toast.success("Booking done");
    }
    if (backendRes.status) {
      toast.error("Alrady added");
    }
  };

  return (
    <div>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Starting from</p>
          <p className="mt-1 text-4xl font-bold text-cyan-600">
            ${destination.price}
          </p>
          <p className="text-xs text-muted-foreground">per person</p>

          <form onSubmit={hanldeBook}>
            <div className="mt-5">
              <label
                htmlFor="departure-date"
                className="mb-1.5 block text-xs font-medium text-muted-foreground"
              >
                Departure date
              </label>
              <Input
                type="date"
                name="departureDate"
                id="departure-date"
                defaultValue={destination.departureDate}
                className="h-10 cursor-default bg-muted/60"
              />
            </div>

            {/* Presentational until a booking flow exists. */}
            <Button
              type="submit"
              className=" cursor-pointer mt-5 h-10 w-full bg-cyan-600 text-white hover:bg-cyan-700"
            >
              Book Now
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </form>

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
  );
};

export default BookingSection;
