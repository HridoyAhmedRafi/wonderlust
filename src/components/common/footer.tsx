import { X } from "lucide-react";
import NewsletterForm from "@/components/common/newsletter-form";

const quickLinks = ["Home", "Destinations", "My Bookings", "My Profile"];
const supportLinks = ["Help Center", "Terms of Service", "Privacy Policy"];
const contactLinks = ["786 901 1622", "info@wanderlast.com"];

/* lucide v2 removed brand icons, so X (LinkedIn) and Instagram are inline
   stroke SVGs; `X` from lucide stands in for the X (Twitter) logo. */
const socialLinks = [
  {
    label: "X (Twitter)",
    icon: (
      <X className="size-4" strokeWidth={2.5} aria-hidden />
    ),
  },
  {
    label: "LinkedIn",
    icon: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg
        className="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
];

function LinkColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-xs font-semibold tracking-wider text-white/90 uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2 className="text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
          Wanderlast
        </h2>
        <p className="mt-4 text-sm text-white/70">
          Your gateway to extraordinary travel experiences around the world.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xs font-semibold tracking-wider text-white/90 uppercase">
              Newsletter
            </h3>
            <p className="mt-3 text-xs text-white/60">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <NewsletterForm />
          </div>
          <LinkColumn title="Quick Links" items={quickLinks} />
          <LinkColumn title="Support" items={supportLinks} />
          <LinkColumn title="Contact Us" items={contactLinks} />
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-white/60">
            © 2026 Wanderlast. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="text-white/80 transition-colors hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
