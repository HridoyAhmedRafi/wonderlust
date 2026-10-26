"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { CircleUser, LogOut } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SessionButton = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = () => {
    signOut();
  };
  return (
    <div className="flex items-center gap-1 md:gap-2">
      {user ? (
        <Popover>
          <PopoverTrigger
            className="cursor-pointer"
            render={
              <button
                type="button"
                aria-label="Open profile menu"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-2 px-2",
                )}
              >
                <Avatar className="size-10">
                  <AvatarImage
                    src={user.image as string}
                    alt={user.name ?? "Profile"}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="bg-[#00B8DB] font-semibold text-white">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <span className="flex size-7 items-center justify-center rounded-full bg-[#00B8DB] font-semibold uppercase text-white md:hidden">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>

                <span className="hidden rounded-md bg-[#00B8DB] px-3 py-1.5 font-medium text-white md:inline">
                  {user.name}
                </span>
              </button>
            }
          />

          <PopoverContent align="end" className="w-50 p-1">
            <div className="rounded-sm px-3 py-2 text-sm hover:bg-accent">
              <p>{user?.name}</p>
              <p>{user?.email}</p>
            </div>
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-sm px-3 py-1 text-sm hover:bg-accent"
            >
              <CircleUser className="size-4" />
              Profile
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-sm px-3 py-1 text-sm text-red-500 hover:bg-accent"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </PopoverContent>
        </Popover>
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
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
            })}
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default SessionButton;
