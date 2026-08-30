"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ArrowRight,
} from "lucide-react";

type Property = {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  image?: string;
};

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/properties", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load properties.");
        }

        const data = await response.json();

        setProperties(data || []);
      } catch (error) {
        console.error("Failed to load properties:", error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  return (
    <section className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
              Premium Properties
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
              Featured Properties
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-gray-500">
              Explore our handpicked selection of premium homes,
              apartments and investment properties.
            </p>
          </div>

          {/* View All */}
          <Link
            href="/properties"
            className="flex items-center gap-2 font-semibold text-blue-600 transition hover:gap-3"
          >
            View All Properties
            <ArrowRight className="h-5 w-5" />
          </Link>

        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[500px] animate-pulse rounded-3xl bg-white shadow-sm"
              />
            ))}

          </div>
        )}

        {/* Empty State */}
        {!loading && properties.length === 0 && (
          <div className="rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">

            <h3 className="text-2xl font-bold text-gray-900">
              No Properties Available
            </h3>

            <p className="mt-3 text-gray-500">
              There are currently no properties available.
            </p>

          </div>
        )}

        {/* Property Cards */}
        {!loading && properties.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {properties.slice(0, 6).map((property) => (

              <div
                key={property.id}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Image */}
                <div className="relative h-64 overflow-hidden">

                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
                      No Image Available
                    </div>
                  )}

                  {/* Property Type */}
                  <div className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-lg">
                    {property.type}
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                    Featured
                  </div>

                </div>

                {/* Card Content */}
                <div className="p-6">

                  <h3 className="text-2xl font-bold text-gray-900">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="mt-3 flex items-center gap-2 text-gray-500">

                    <MapPin className="h-4 w-4 shrink-0 text-blue-600" />

                    <span className="text-sm">
                      {property.location}
                    </span>

                  </div>

                  {/* Price */}
                  <div className="mt-5 text-2xl font-bold text-blue-600">
                    {property.price}
                  </div>

                  {/* Property Details */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">

                    <div className="flex items-center gap-2 text-gray-500">
                      <BedDouble className="h-5 w-5" />
                      <span>{property.bedrooms} Beds</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                      <Bath className="h-5 w-5" />
                      <span>{property.bathrooms} Baths</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-500">
                      <Maximize className="h-5 w-5" />
                      <span>{property.area}</span>
                    </div>

                  </div>

                  {/* View Details */}
                  <Link
                    href={`/properties/${property.id}`}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3.5 font-semibold text-white transition hover:bg-blue-600"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}