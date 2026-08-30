"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  const [tagline, setTagline] = useState(
    "Find your perfect property"
  );

  useEffect(() => {
    const loadTagline = async () => {
      try {
        const response = await fetch("/api/settings", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data?.settings?.tagline) {
          setTagline(data.settings.tagline);
        }
      } catch (error) {
        console.error("Failed to load tagline:", error);
      }
    };

    loadTagline();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-500 px-6 pt-32 pb-28 sm:px-8 lg:min-h-[85vh] lg:px-12">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-900/30 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl items-center">

        <div className="max-w-4xl text-white">

          {/* Small Label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            PREMIUM REAL ESTATE
          </div>

          {/* Main Heading */}
          <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Find Your
            <span className="block text-cyan-200">
              Dream Property
            </span>
          </h1>

          {/* Dynamic Tagline */}
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
            {tagline}
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/properties"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-blue-700 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <Search className="h-5 w-5" />
              Explore Properties
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#about"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/50 bg-white/5 px-7 py-3.5 font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white hover:text-blue-700"
            >
              Learn More
            </Link>

          </div>

          {/* Trust Points */}
          <div className="mt-10 flex flex-col gap-4 text-sm text-white/80 sm:flex-row sm:items-center sm:gap-7">

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-200" />
              Verified Properties
            </div>

            <div className="hidden h-5 w-px bg-white/30 sm:block" />

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-200" />
              Trusted Agents
            </div>

            <div className="hidden h-5 w-px bg-white/30 sm:block" />

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-cyan-200" />
              Premium Locations
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}