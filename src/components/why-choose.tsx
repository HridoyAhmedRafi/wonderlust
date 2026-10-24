import Image from "next/image";
import HeadsetIcon from "@/app/assets/Headset.png";
import MapTrifoldIcon from "@/app/assets/MapTrifold.png";
import ShieldCheckIcon from "@/app/assets/ShieldCheck.png";

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: MapTrifoldIcon,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: HeadsetIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-cyan-50 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
        <h2 className="text-4xl font-medium md:text-5xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Your trusted partner for exceptional travel experiences
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="border border-border/60 bg-card p-6 text-left shadow-sm"
            >
              <Image
                src={feature.icon}
                alt=""
                className="h-8 w-8"
                aria-hidden
              />
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
