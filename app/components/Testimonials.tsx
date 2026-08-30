"use client";

import {
  Star,
  Quote,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Property Investor",
    review:
      "EstatePro made the whole property search extremely easy. I found a great investment property without wasting time.",
    initials: "AK",
  },
  {
    name: "Sara Ahmed",
    role: "Home Buyer",
    review:
      "The team was professional and helpful throughout the process. I found my dream home exactly where I wanted.",
    initials: "SA",
  },
  {
    name: "Usman Malik",
    role: "Business Owner",
    review:
      "I was looking for a commercial property and EstatePro helped me find several excellent options within my budget.",
    initials: "UM",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gray-950 px-6 py-24 text-white">

      {/* =========================
          BACKGROUND DECORATION
      ========================= */}

      <div className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* =========================
            HEADING
        ========================= */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

            <p className="text-sm font-bold uppercase tracking-widest text-blue-400">
              Client Reviews
            </p>
          </div>

          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-400">
            Real experiences from people who trusted EstatePro
            with their property journey.
          </p>

        </div>

        {/* =========================
            REVIEWS
        ========================= */}

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((testimonial) => (

            <div
              key={testimonial.name}
              className="group relative flex flex-col rounded-3xl border border-gray-800 bg-gray-900/80 p-8 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-900/20"
            >

              {/* Quote */}
              <div className="absolute right-7 top-7 rounded-xl bg-blue-500/10 p-3">
                <Quote className="h-7 w-7 text-blue-500" />
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-7 flex-1 text-base leading-7 text-gray-300">
                "{testimonial.review}"
              </p>

              {/* User */}
              <div className="mt-8 flex items-center gap-4 border-t border-gray-800 pt-6">

                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 font-bold text-white shadow-lg">
                  {testimonial.initials}
                </div>

                {/* Name */}
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-white">
                    {testimonial.name}
                  </h3>

                  <p className="mt-0.5 text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* =========================
            RATING AREA
        ========================= */}

        <div className="mt-14 flex flex-col items-center justify-center gap-6 rounded-3xl border border-gray-800 bg-gray-900/60 px-6 py-8 text-center sm:flex-row sm:text-left">

          {/* Rating */}
          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10">
              <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
            </div>

            <div>
              <p className="text-2xl font-bold text-white">
                4.9/5
              </p>

              <div className="mt-1 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="hidden h-12 w-px bg-gray-800 sm:block" />

          {/* Text */}
          <div className="flex-1">
            <p className="font-semibold text-white">
              Loved by our clients
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Trusted service, professional guidance and
              quality property options.
            </p>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm font-semibold text-green-400">
            <ShieldCheck className="h-5 w-5" />
            Trusted Service
          </div>

        </div>

        {/* =========================
            BOTTOM CTA
        ========================= */}

        <div className="mt-12 text-center">

          <p className="text-gray-400">
            Ready to find your next property?
          </p>

          <Link
            href="/properties"
            className="group mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-xl"
          >
            Explore Properties

            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>

        </div>

      </div>
    </section>
  );
}