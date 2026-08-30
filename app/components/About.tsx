"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Building2,
  Users,
  Home,
  Award,
  ShieldCheck,
  Handshake,
} from "lucide-react";

const stats = [
  {
    icon: Home,
    value: "2,500+",
    label: "Properties",
  },
  {
    icon: Users,
    value: "1,800+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    value: "10+",
    label: "Years Experience",
  },
  {
    icon: Building2,
    value: "50+",
    label: "Locations",
  },
];

const features = [
  "Verified property listings",
  "Professional real estate guidance",
  "Trusted support from start to finish",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gray-50 px-6 py-24"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-cyan-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Main Content */}
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* =========================
              LEFT - IMAGE
          ========================= */}

          <div className="relative">

            {/* Decorative Shape */}
            <div className="absolute -left-5 -top-5 h-32 w-32 rounded-3xl bg-blue-100" />

            <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-3xl bg-cyan-100" />

            {/* Image */}
            <div className="group relative z-10 overflow-hidden rounded-[2rem] shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85"
                alt="Modern luxury property"
                className="h-[420px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[500px]"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Image Label */}
              <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-white shadow-xl backdrop-blur-md">
                <p className="text-sm font-medium text-white/80">
                  Trusted Real Estate
                </p>

                <p className="mt-1 text-lg font-bold">
                  Find Your Perfect Place
                </p>
              </div>
            </div>

            {/* Experience Card */}
            <div className="absolute -bottom-8 -right-2 z-20 rounded-2xl bg-blue-600 px-7 py-5 text-white shadow-2xl sm:-right-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                  <Award className="h-6 w-6 text-white" />
                </div>

                <div>
                  <p className="text-3xl font-bold leading-none">
                    10+
                  </p>

                  <p className="mt-1 text-sm text-blue-100">
                    Years of Experience
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* =========================
              RIGHT - CONTENT
          ========================= */}

          <div>

            {/* Label */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />

              <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                About EstatePro
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl">

              Making Real Estate

              <span className="block text-blue-600">
                Simple & Successful
              </span>

            </h2>

            {/* Description */}
            <p className="mt-6 text-lg leading-8 text-gray-600">
              EstatePro helps people find the right property with
              confidence. From modern homes to premium investment
              opportunities, we make the property search simple,
              transparent and convenient.
            </p>

            <p className="mt-4 leading-7 text-gray-500">
              Our experienced team understands the local market and
              works hard to connect buyers, sellers and investors with
              properties that match their goals.
            </p>

            {/* =========================
                FEATURES
            ========================= */}

            <div className="mt-8 space-y-4">

              {features.map((feature) => (
                <div
                  key={feature}
                  className="group flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 transition duration-300 group-hover:bg-blue-600">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 transition duration-300 group-hover:text-white" />
                  </div>

                  <span className="font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}

            </div>

            {/* =========================
                TRUST POINTS
            ========================= */}

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <ShieldCheck className="h-7 w-7 text-blue-600" />

                <h3 className="mt-3 font-bold text-gray-900">
                  Trusted Service
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Reliable property services built around your needs.
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                <Handshake className="h-7 w-7 text-blue-600" />

                <h3 className="mt-3 font-bold text-gray-900">
                  Expert Support
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Professional guidance throughout your property journey.
                </p>

              </div>

            </div>

            {/* =========================
                BUTTON
            ========================= */}

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-7 py-3.5 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-600 hover:shadow-xl"
            >
              Learn More About Us

              <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </Link>

          </div>
        </div>

        {/* =========================
            STATS
        ========================= */}

        <div className="mt-24 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl sm:p-6"
              >

                {/* Icon */}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition duration-300 group-hover:bg-blue-600">
                  <Icon className="h-6 w-6 text-blue-600 transition duration-300 group-hover:text-white" />
                </div>

                {/* Number */}
                <h3 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                  {stat.value}
                </h3>

                {/* Label */}
                <p className="mt-1 text-sm text-gray-500">
                  {stat.label}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}