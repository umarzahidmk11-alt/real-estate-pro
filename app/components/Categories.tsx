"use client";

import Link from "next/link";
import {
  Home,
  Building2,
  Castle,
  Store,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Houses",
    type: "House",
    description:
      "Find beautiful family homes in prime locations.",
    count: "120+ Properties",
    icon: Home,
  },
  {
    title: "Apartments",
    type: "Apartment",
    description:
      "Modern apartments designed for comfortable living.",
    count: "85+ Properties",
    icon: Building2,
  },
  {
    title: "Villas",
    type: "Villa",
    description:
      "Luxury villas with premium facilities and spaces.",
    count: "60+ Properties",
    icon: Castle,
  },
  {
    title: "Commercial",
    type: "Commercial",
    description:
      "High-value commercial properties for your business.",
    count: "45+ Properties",
    icon: Store,
  },
];

export default function Categories() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            SECTION HEADING
        ========================= */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            Explore Properties
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Browse By Category
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-500">
            Explore properties based on your needs and find the
            perfect place for living, investment or business.
          </p>

        </div>

        {/* =========================
            CATEGORY CARDS
        ========================= */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.title}
                className="group rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
              >

                {/* Icon */}

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition duration-300 group-hover:bg-blue-600">
                  <Icon className="h-8 w-8 text-blue-600 transition duration-300 group-hover:text-white" />
                </div>

                {/* Title */}

                <h3 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h3>

                {/* Description */}

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
                  {category.description}
                </p>

                {/* Property Count */}

                <p className="mt-5 font-semibold text-blue-600">
                  {category.count}
                </p>

                {/* View Properties */}

                <Link
                  href={`/properties?type=${encodeURIComponent(
                    category.type
                  )}`}
                  className="mt-6 flex w-fit items-center gap-2 font-semibold text-gray-800 transition-all duration-300 group-hover:gap-3 group-hover:text-blue-600"
                >
                  View Properties

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}