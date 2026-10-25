import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CtaImage from "@/app/assets/CTA.png";

const Cta = () => {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src={CtaImage} alt="" fill className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div className="flex flex-col items-center px-6 py-16 text-center text-white md:py-20">
        <h2 className="text-4xl font-medium md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-sm text-white/85 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Button className="mt-8 h-11 bg-white px-7 text-sm uppercase text-neutral-950 hover:bg-white/90 hover:text-neutral-950">
          Book Your Trip Today
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default Cta;
