import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BannerImage from "@/app/assets/Banner.png";

const searchFields = [
  { title: "Location", hint: "Address, City Or Zip" },
  { title: "Date/Duration", hint: "Anytime/5 Days" },
  { title: "Budget", hint: "$0-$3000" },
  { title: "People", hint: "5-10" },
];

const Banner = () => {
  return (
    <section className="relative min-h-140 h-[calc(100svh-4rem)]">
      <Image
        src={BannerImage}
        alt=""
        fill
        priority
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/30 via-black/10 to-black/40" />

      {/* Headline + calls to action */}
      <div className="flex flex-col items-center px-6 pt-20 text-center text-white md:pt-28">
        <h1 className="text-5xl leading-[1.1] font-medium md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-md text-sm text-white/85 md:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-11 bg-cyan-500 px-7 text-sm uppercase hover:bg-cyan-600"
          >
            Explore Now
            <ArrowRight />
          </Button>
          <Button
            size="lg"
            className="h-11 bg-white/25 px-7 text-sm uppercase text-white backdrop-blur-sm hover:bg-white/35 hover:text-white"
          >
            View Destination
          </Button>
        </div>
      </div>

      {/* Search strip */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="grid divide-y divide-white/15 bg-slate-900/70 text-white backdrop-blur-sm md:grid-cols-5 md:divide-x md:divide-y-0">
          {searchFields.map((field) => (
            <div key={field.title} className="px-6 py-4 text-left">
              <p className="text-sm font-medium">{field.title}</p>
              <p className="mt-1 text-xs text-white/60">{field.hint}</p>
            </div>
          ))}
          <div className="p-2 md:p-0">
            <Button className="h-12 w-full rounded-none bg-cyan-500 text-sm font-medium hover:bg-cyan-600 md:h-full md:px-0">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
