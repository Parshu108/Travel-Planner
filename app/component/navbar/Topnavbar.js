"use client";

import { useState } from "react";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Explore", href: "/explore" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

const Navbar=()=> {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand-900/10 bg-sand-50/90 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-teal-600">
            <Plane className="h-4 w-4 text-sand-50" strokeWidth={2} />
          </div>
          <span className="text-base font-medium text-sand-900">
            ai-traveler
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-sand-900/70 transition-colors hover:text-teal-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="/component/route/login"
            className="text-sm font-medium text-sand-900/70 hover:text-teal-600"
          >
            Log in
          </a>
          <Button
            asChild
            className="h-9 bg-coral-500 px-4 font-medium text-sand-50 hover:bg-coral-900"
          >
            <a href="/component/route/signup">Start planning</a>
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sand-900 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="border-t border-sand-900/10 bg-sand-50 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-sand-900/70 hover:text-teal-600"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-sand-900/10 pt-4">
              <a
                href="/component/route/login"
                className="text-sm font-medium text-sand-900/70 hover:text-teal-600"
                onClick={() => setOpen(false)}
              >
                Log in
              </a>
              <Button
                asChild
                className="h-9 w-full bg-coral-500 font-medium text-sand-50 hover:bg-coral-900"
              >
                <a href="/component/route/signup">Start planning</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
