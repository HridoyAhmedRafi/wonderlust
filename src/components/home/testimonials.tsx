"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import SarahPhoto from "@/app/assets/person1.png";
import MichaelPhoto from "@/app/assets/person2.png";

const testimonials = [
  {
    quote:
      "“The Bali Trip Was Absolutely Magical. Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.”",
    name: "Michael Chen",
    location: "Singapore",
    photo: MichaelPhoto,
  },
  {
    quote:
      "“Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommended.”",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: SarahPhoto,
  },
  {
    quote:
      "“Santorini Was Even More Beautiful Than The Photos. Flawless Planning And A Pace That Matched Us Perfectly.”",
    name: "Michael Chen",
    location: "Singapore",
    photo: MichaelPhoto,
  },
  {
    quote:
      "“Kyoto In Cherry Blossom Season Was A Dream. Every Detail, Every Guide, Every Meal — Thoughtfully Arranged.”",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: SarahPhoto,
  },
];

function CarouselControls() {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon-lg"
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        aria-label="Previous testimonial"
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="outline"
        size="icon-lg"
        disabled={!canScrollNext}
        onClick={scrollNext}
        aria-label="Next testimonial"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <Carousel opts={{ align: "start", loop: true }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-medium md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>
            <CarouselControls />
          </div>
          <CarouselContent className="mt-8 items-stretch">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.quote}
                className="basis-full md:basis-1/2"
              >
                <article className="flex h-full gap-5 rounded-lg border border-border bg-card p-6">
                  <blockquote className="flex-1 text-sm leading-relaxed font-medium">
                    {testimonial.quote}
                    <footer className="mt-8">
                      <p className="text-xs font-semibold text-cyan-600">
                        — {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </footer>
                  </blockquote>
                  <Image
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="aspect-[4/5] w-32 shrink-0 self-start rounded-md object-cover md:w-36"
                  />
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
