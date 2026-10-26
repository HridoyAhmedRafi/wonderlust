import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "cn";
import { CircleUser } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

const SessionButton = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex items-center gap-1 md:gap-2">
      {user ? (
        <Link
          href="/profile"
          aria-label="Profile"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-2 px-2",
          )}
        >
          {user.image ? (
            <Image
              src={user.image}
              width={60}
              height={60}
              alt="Profile"
              className="size-7 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-7 items-center justify-center rounded-full bg-[#00B8DB] text-white font-semibold uppercase">
              {user.name?.charAt(0) || "U"}
            </div>
          )}

          {/* md-এর নিচে শুধু প্রথম অক্ষর */}
          <span className="flex size-7 items-center justify-center rounded-full bg-[#00B8DB] text-white font-semibold uppercase md:hidden">
            {user.name?.charAt(0) || "U"}
          </span>

          {/* md ও তার উপরে পুরো নাম */}
          <span className="hidden md:inline rounded-md bg-[#00B8DB] px-3 py-1.5 text-white font-medium">
            {user.name}
          </span>
        </Link>
      ) : (
        <>
          <Link
            href="/profile"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "gap-1.5 px-2",
            )}
          >
            <CircleUser className="size-4" />
            <span className="hidden sm:inline">Profile</span>
          </Link>

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            Login
          </Link>

          <Link
            href="/sign-up"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};
export default SessionButton;
