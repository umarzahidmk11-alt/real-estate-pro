"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Home,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function PostProperty() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    type: "",
    location: "",
    price: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setSubmitted(false);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);
    setError("");

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmitted(true);

      setFormData({
        title: "",
        purpose: "",
        type: "",
        location: "",
        price: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit property"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Link
            href="/"
            className="flex w-fit items-center gap-2 font-semibold text-gray-600 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Heading */}
      <section className="mx-auto max-w-4xl px-6 py-12">

        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <Home className="h-8 w-8" />
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            Post Your Property
          </h1>

          <p className="mt-3 text-gray-500">
            Add your property details and reach potential buyers and tenants.
          </p>
        </div>

        {/* Success */}
        {submitted && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-5 text-green-700">
            <CheckCircle2 className="h-6 w-6 shrink-0" />

            <div>
              <p className="font-bold">
                Property submitted successfully!
              </p>

              <p className="text-sm">
                Your property has been sent to the server.
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <AlertCircle className="h-6 w-6 shrink-0" />

            <div>
              <p className="font-bold">
                Submission failed
              </p>

              <p className="text-sm">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl md:p-10"
        >

          {/* Basic Information */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Basic Information
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tell us about your property.
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">

            {/* Title */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Property Title
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-blue-500">
                <FileText className="h-5 w-5 text-blue-600" />

                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Modern Luxury Villa"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Purpose */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Purpose
              </label>

              <select
                required
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">Select Purpose</option>
                <option value="Buy">Sell / Buy</option>
                <option value="Rent">Rent</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Property Type
              </label>

              <select
                required
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">Select Type</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            {/* Location */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-blue-500">
                <MapPin className="h-5 w-5 text-blue-600" />

                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. DHA Phase 6, Lahore"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Price
              </label>

              <input
                required
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="text"
                placeholder="e.g. PKR 5 Crore"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Area */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Property Area
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 focus-within:border-blue-500">
                <Maximize className="h-5 w-5 text-blue-600" />

                <input
                  required
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. 10 Marla"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Bedrooms
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                <BedDouble className="h-5 w-5 text-blue-600" />

                <input
                  required
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  placeholder="5"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Bathrooms
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3">
                <Bath className="h-5 w-5 text-blue-600" />

                <input
                  required
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  type="number"
                  min="0"
                  placeholder="6"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

          </div>

          {/* Description */}
          <div className="mt-8">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Property Description
            </label>

            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Describe your property..."
              className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Image */}
          <div className="mt-8">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Property Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm"
            />

            <p className="mt-2 text-xs text-gray-400">
              Image upload will be connected later.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Posting Property...
              </>
            ) : (
              <>
                <Home className="h-5 w-5" />
                Post Property
              </>
            )}
          </button>

        </form>
      </section>
    </main>
  );
}