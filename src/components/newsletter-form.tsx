"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex h-10 w-full items-center rounded-sm bg-white/10 pr-2"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter email"
        aria-label="Email address"
        className="h-full w-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/50"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="shrink-0 cursor-pointer rounded-sm p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
      >
        <ArrowUpRight className="size-4" />
      </button>
    </form>
  );
};

export default NewsletterForm;
