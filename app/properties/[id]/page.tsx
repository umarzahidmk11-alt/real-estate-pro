"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CheckCircle2,
  Mail,
  MapPin,
  Maximize,
  Phone,
  Send,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";

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
  image: string;
};

export default function PropertyDetailsPage() {
  const params = useParams();

  const id = params?.id;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  const [showContact, setShowContact] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadProperty = async () => {
      try {
        const response = await fetch(`/api/properties/${id}`);

        if (!response.ok) {
          throw new Error("Property not found");
        }

        const data = await response.json();

        setProperty(data);
      } catch (err) {
        console.error("Error loading property:", err);
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          propertyId: property?.id,
          propertyTitle: property?.title,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong");
      }

      setSuccess("Your inquiry has been sent successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to send inquiry."
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 font-medium text-gray-500">
            Loading property...
          </p>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Property Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            The property you are looking for does not exist.
          </p>

          <Link
            href="/properties"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <div className="border-b bg-white">
          <div className="mx-auto max-w-7xl px-6 py-5">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 font-semibold text-gray-600 transition hover:text-blue-600"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Properties
            </Link>
          </div>
        </div>

        {/* Property */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image */}
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-[420px] w-full object-cover"
                />

                <div className="absolute left-5 top-5 flex gap-3">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-lg">
                    {property.type}
                  </span>

                  <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    {property.purpose}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">
                      {property.title}
                    </h1>

                    <div className="mt-3 flex items-center gap-2 text-gray-500">
                      <MapPin className="h-5 w-5 text-blue-600" />

                      <span>{property.location}</span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-3xl font-bold text-blue-600">
                      {property.price}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      {property.purpose === "Rent"
                        ? "Monthly"
                        : "Property Price"}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-3 gap-4 border-y border-gray-100 py-6">
                  <div className="text-center">
                    <BedDouble className="mx-auto h-6 w-6 text-blue-600" />

                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {property.bedrooms}
                    </p>

                    <p className="text-sm text-gray-500">
                      Bedrooms
                    </p>
                  </div>

                  <div className="border-x border-gray-100 text-center">
                    <Bath className="mx-auto h-6 w-6 text-blue-600" />

                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {property.bathrooms}
                    </p>

                    <p className="text-sm text-gray-500">
                      Bathrooms
                    </p>
                  </div>

                  <div className="text-center">
                    <Maximize className="mx-auto h-6 w-6 text-blue-600" />

                    <p className="mt-2 text-xl font-bold text-gray-900">
                      {property.area}
                    </p>

                    <p className="text-sm text-gray-500">
                      Area
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Property Description
                  </h2>

                  <p className="mt-4 leading-8 text-gray-600">
                    {property.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Property Features
                  </h2>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Prime Location",
                      "Modern Design",
                      "Secure Environment",
                      "Quality Construction",
                      "Family Friendly",
                      "Excellent Investment",
                    ].map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-xl bg-gray-50 p-4"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500" />

                        <span className="font-medium text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div>
              <div className="sticky top-6 rounded-3xl bg-white p-7 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                  Interested?
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  Contact Our Agent
                </h2>

                <p className="mt-3 leading-7 text-gray-500">
                  Get more information about this property or schedule a
                  viewing with our property team.
                </p>

                <button
                  onClick={() => {
                    setShowContact(true);
                    setSuccess("");
                    setError("");
                  }}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                >
                  <Mail className="h-5 w-5" />
                  Send Inquiry
                </button>

                <a
                  href="tel:+923001234567"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-4 font-bold text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                >
                  <Phone className="h-5 w-5" />
                  Call Agent
                </a>

                <div className="mt-7 border-t border-gray-100 pt-6">
                  <p className="text-sm text-gray-400">
                    Property Reference
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    RE-{property.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Send Inquiry
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {property.title}
                </p>
              </div>

              <button
                onClick={() => setShowContact(false)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="03XX XXXXXXX"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Message
                </label>

                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="I am interested in this property..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Success */}
              {success && (
                <div className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
                  {success}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-5 w-5" />

                {sending ? "Sending..." : "Send Inquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}