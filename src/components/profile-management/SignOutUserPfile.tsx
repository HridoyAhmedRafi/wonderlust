"use client";
import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignOutUserPfile = () => {
  const handleSignout = () => {
    signOut();
    toast.success("You have been signed out");
    redirect("/sign-in");
  };

  return (
    <div>
      <button
        onClick={handleSignout}
        type="button"
        className="cursor-pointer inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors"
      >
        <LogOut className="size-4" />
        Log Out
      </button>
    </div>
  );
};

export default SignOutUserPfile;
