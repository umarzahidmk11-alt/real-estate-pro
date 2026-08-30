"use client";

import { useState } from "react";
import { Search, MapPin, Home, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [purpose, setPurpose] = useState("Buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All Properties");
  const [price, setPrice] = useState("Any Price");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (purpose) {
      params.set("purpose", purpose);
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    if (type !== "All Properties") {
      params.set("type", type);
    }

    if (price !== "Any Price") {
      params.set("price", price);
    }

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative z-20 -mt-10 px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl md:p-7">

          {/* Buy / Rent */}
          <div className="mb-6 flex gap-2">
            {["Buy", "Rent"].map((item) => (
              <button
                key={item}
                onClick={() => setPurpose(item)}
                className={`rounded-xl px-7 py-3 font-semibold transition ${
                  purpose === item
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* Location */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <MapPin className="h-5 w-5 text-blue-600" />

              <div className="w-full">
                <label className="block text-xs font-medium text-gray-400">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Lahore, Islamabad..."
                  className="mt-1 w-full bg-transparent text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Property Type */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <Home className="h-5 w-5 text-blue-600" />

              <div className="w-full">
                <label className="block text-xs font-medium text-gray-400">
                  Property Type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-medium text-gray-800 outline-none"
                >
                  <option>All Properties</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                </select>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
              <SlidersHorizontal className="h-5 w-5 text-blue-600" />

              <div className="w-full">
                <label className="block text-xs font-medium text-gray-400">
                  Price Range
                </label>

                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1 w-full bg-transparent text-sm font-medium text-gray-800 outline-none"
                >
                  <option>Any Price</option>
                  <option>Under 1 Crore</option>
                  <option>1 - 3 Crore</option>
                  <option>3 - 5 Crore</option>
                  <option>5+ Crore</option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="flex min-h-[64px] items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
            >
              <Search className="h-5 w-5" />
              Search Properties
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}