"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WanderlastLogo from "@/app/assets/Wanderlast.png";
import SessionButton from "../user-session/SessionButton";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Admin", href: "#" },
];

/* "#" placeholders never count as active; detail pages keep their parent
   link highlighted (e.g. /destinations/<id> → Destinations). */
const isNavLinkActive = (href: string, pathname: string) =>
  href === "#"
    ? false
    : href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="relative flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left: mobile toggle + desktop nav links */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon-sm" }),
            "md:hidden",
          )}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-foreground/70",
                isNavLinkActive(link.href, pathname) &&
                  "text-cyan-700 hover:text-cyan-700 underline decoration-2 underline-offset-8",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Center: logo */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label="Wanderlast home"
        >
          <Image
            src={WanderlastLogo}
            alt="Wanderlast"
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* Right: account links */}
        <div>
          <SessionButton></SessionButton>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Main mobile"
          className="border-t border-border px-4 py-2 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block py-2.5 text-sm font-semibold",
                isNavLinkActive(link.href, pathname) && "text-cyan-700",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
