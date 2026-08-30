"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

type Property = {
  id: number;
  title: string;
  purpose: string;
  type: string;
  location: string;
  price: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  image?: string;
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Filters
  // =========================

  const [search, setSearch] = useState("");
  const [purpose, setPurpose] = useState("All");
  const [type, setType] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  // =========================
  // Fetch Properties
  // =========================

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/properties", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load properties");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid properties data");
      }

      setProperties(data);
    } catch (err) {
      console.error("Properties Error:", err);
      setError("Unable to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // =========================
  // Property Types
  // =========================

  const propertyTypes = useMemo(() => {
    const types = properties
      .map((property) => property.type)
      .filter(Boolean);

    return ["All", ...Array.from(new Set(types))];
  }, [properties]);

  // =========================
  // Filter Properties
  // =========================

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Search
    const searchText = search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((property) => {
        return (
          property.title.toLowerCase().includes(searchText) ||
          property.location.toLowerCase().includes(searchText) ||
          property.type.toLowerCase().includes(searchText)
        );
      });
    }

    // Purpose
    if (purpose !== "All") {
      result = result.filter(
        (property) => property.purpose === purpose
      );
    }

    // Type
    if (type !== "All") {
      result = result.filter(
        (property) => property.type === type
      );
    }

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => {
        return extractPrice(a.price) - extractPrice(b.price);
      });
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => {
        return extractPrice(b.price) - extractPrice(a.price);
      });
    }

    if (sortBy === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [properties, search, purpose, type, sortBy]);

  // =========================
  // Extract Price
  // =========================

  function extractPrice(price: string) {
    const numbers = price.replace(/,/g, "").match(/[\d.]+/);

    if (!numbers) {
      return 0;
    }

    const value = Number(numbers[0]);

    if (price.toLowerCase().includes("arab")) {
      return value * 100000000;
    }

    if (price.toLowerCase().includes("crore")) {
      return value * 10000000;
    }

    if (price.toLowerCase().includes("lakh")) {
      return value * 100000;
    }

    return value;
  }

  // =========================
  // Clear Filters
  // =========================

  const clearFilters = () => {
    setSearch("");
    setPurpose("All");
    setType("All");
    setSortBy("default");
  };

  const hasFilters =
    search !== "" ||
    purpose !== "All" ||
    type !== "All" ||
    sortBy !== "default";

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <Link
              href="/"
              className="flex w-fit items-center gap-2 font-semibold text-gray-600 transition hover:text-blue-600"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-10">
            <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <div className="h-64 animate-pulse bg-gray-200" />

                <div className="space-y-4 p-6">
                  <div className="h-6 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-7 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-12 animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <Link
              href="/"
              className="flex w-fit items-center gap-2 font-semibold text-gray-600 transition hover:text-blue-600"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <X className="h-8 w-8 text-red-600" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Something went wrong
            </h2>

            <p className="mt-3 text-gray-500">
              {error}
            </p>

            <button
              onClick={fetchProperties}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* =========================
          Header
      ========================= */}

      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            href="/"
            className="flex w-fit items-center gap-2 font-semibold text-gray-600 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>

          <div className="mt-7">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Property Listings
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900 md:text-5xl">
              Find Your Perfect Property
            </h1>

            <p className="mt-3 max-w-2xl text-gray-500">
              Explore our latest properties for sale and rent in
              prime locations.
            </p>
          </div>
        </div>
      </div>

      {/* =========================
          Filters
      ========================= */}

      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
            <SlidersHorizontal className="h-5 w-5 text-blue-600" />
            Search & Filters
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-4">
            {/* Search */}

            <div className="relative lg:col-span-2">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, location or type..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Purpose */}

            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-10 font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All Purposes</option>
                <option value="Buy">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Type */}

            <div className="relative">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-10 font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                {propertyTypes.map((propertyType) => (
                  <option
                    key={propertyType}
                    value={propertyType}
                  >
                    {propertyType === "All"
                      ? "All Property Types"
                      : propertyType}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Bottom Filter Row */}

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-56">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="default">Sort: Default</option>
                <option value="newest">Newest First</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          Results
      ========================= */}

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1
                ? "Property"
                : "Properties"}{" "}
              Found
            </h2>

            {hasFilters && (
              <p className="mt-1 text-sm text-gray-500">
                Showing results based on your filters.
              </p>
            )}
          </div>

          <p className="text-sm text-gray-400">
            {properties.length} total listings
          </p>
        </div>

        {/* =========================
            Property Cards
        ========================= */}

        {filteredProperties.length > 0 ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <article
                key={property.id}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image */}

                <div className="relative h-64 overflow-hidden bg-gray-200">
                  {property.image ? (
                    <img
                      src={property.image}
                      alt={property.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-medium text-gray-400">
                      No Image Available
                    </div>
                  )}

                  {/* Gradient */}

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Type */}

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-gray-800 shadow-lg backdrop-blur">
                    {property.type}
                  </span>

                  {/* Purpose */}

                  <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-lg">
                    {property.purpose}
                  </span>
                </div>

                {/* Content */}

                <div className="p-6">
                  <h2 className="line-clamp-1 text-xl font-bold text-gray-900">
                    {property.title}
                  </h2>

                  {/* Location */}

                  <div className="mt-3 flex items-start gap-2 text-gray-500">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                    <span className="line-clamp-1 text-sm">
                      {property.location}
                    </span>
                  </div>

                  {/* Price */}

                  <p className="mt-5 text-2xl font-bold text-blue-600">
                    {property.price}
                  </p>

                  {/* Details */}

                  <div className="mt-5 grid grid-cols-3 border-t border-gray-100 pt-5">
                    <div className="flex flex-col items-center border-r border-gray-100 text-gray-500">
                      <BedDouble className="h-5 w-5" />

                      <span className="mt-1 text-sm font-bold text-gray-800">
                        {property.bedrooms}
                      </span>

                      <span className="text-xs text-gray-400">
                        Beds
                      </span>
                    </div>

                    <div className="flex flex-col items-center border-r border-gray-100 text-gray-500">
                      <Bath className="h-5 w-5" />

                      <span className="mt-1 text-sm font-bold text-gray-800">
                        {property.bathrooms}
                      </span>

                      <span className="text-xs text-gray-400">
                        Baths
                      </span>
                    </div>

                    <div className="flex flex-col items-center text-gray-500">
                      <Maximize className="h-5 w-5" />

                      <span className="mt-1 max-w-[80px] truncate text-sm font-bold text-gray-800">
                        {property.area}
                      </span>

                      <span className="text-xs text-gray-400">
                        Area
                      </span>
                    </div>
                  </div>

                  {/* Button */}

                  <Link
                    href={`/properties/${property.id}`}
                    className="mt-6 flex w-full items-center justify-center rounded-xl bg-gray-900 py-3.5 font-semibold text-white transition hover:bg-blue-600"
                  >
                    View Property Details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* =========================
             No Results
          ========================= */

          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Search className="h-8 w-8 text-gray-400" />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              No Properties Found
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-500">
              We couldn't find any properties matching your
              search or selected filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-7 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* =========================
          Footer
      ========================= */}

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-sm text-gray-400">
            Find your perfect property with our latest listings.
          </p>
        </div>
      </footer>
    </main>
  );
}