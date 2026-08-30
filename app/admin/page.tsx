"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Mail,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
  RefreshCw,
  Home,
  KeyRound,
  MapPin,
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

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  createdAt: string;
  read: boolean;
};

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // =====================================
  // LOAD DASHBOARD DATA
  // =====================================

  const loadDashboard = async () => {
    try {
      setRefreshing(true);

      const [propertiesResponse, inquiriesResponse] =
        await Promise.all([
          fetch("/api/properties", {
            cache: "no-store",
          }),

          fetch("/api/contact", {
            cache: "no-store",
          }),
        ]);

      if (propertiesResponse.ok) {
        const propertiesData =
          await propertiesResponse.json();

        if (Array.isArray(propertiesData)) {
          setProperties(propertiesData);
        }
      }

      if (inquiriesResponse.ok) {
        const inquiriesData =
          await inquiriesResponse.json();

        if (Array.isArray(inquiriesData)) {
          setInquiries(inquiriesData);
        }
      }
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // =====================================
  // STATISTICS
  // =====================================

  const totalProperties =
    properties.length;

  const buyProperties =
    properties.filter(
      (property) =>
        property.purpose === "Buy"
    ).length;

  const rentProperties =
    properties.filter(
      (property) =>
        property.purpose === "Rent"
    ).length;

  const totalInquiries =
    inquiries.length;

  const unreadInquiries =
    inquiries.filter(
      (inquiry) => !inquiry.read
    ).length;

  const readInquiries =
    inquiries.filter(
      (inquiry) => inquiry.read
    ).length;

  // =====================================
  // RECENT DATA
  // =====================================

  const recentProperties =
    [...properties]
      .sort(
        (a, b) =>
          Number(b.id) - Number(a.id)
      )
      .slice(0, 5);

  const recentInquiries =
    [...inquiries]
      .sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      )
      .slice(0, 5);

  // =====================================
  // DATE FORMAT
  // =====================================

  const formatDate = (
    date: string
  ) => {
    try {
      return new Date(
        date
      ).toLocaleDateString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="text-center">
              <RefreshCw className="mx-auto h-10 w-10 animate-spin text-blue-600" />

              <p className="mt-4 font-medium text-gray-500">
                Loading dashboard...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Admin Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Overview
            </h1>

            <p className="mt-3 text-gray-500">
              Manage your real estate website
              from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={loadDashboard}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-5 w-5 ${
                  refreshing
                    ? "animate-spin"
                    : ""
                }`}
              />

              Refresh
            </button>

            <Link
              href="/admin/properties"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />

              Add Property
            </Link>

          </div>
        </div>

        {/* =====================================
            MAIN STATISTICS
        ===================================== */}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total Properties */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Properties
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {totalProperties}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  All listed properties
                </p>
              </div>

              <div className="rounded-2xl bg-blue-100 p-4">
                <Building2 className="h-7 w-7 text-blue-600" />
              </div>

            </div>

          </div>

          {/* Buy */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  For Sale
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {buyProperties}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Properties for buying
                </p>
              </div>

              <div className="rounded-2xl bg-green-100 p-4">
                <Home className="h-7 w-7 text-green-600" />
              </div>

            </div>

          </div>

          {/* Rent */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  For Rent
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {rentProperties}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Properties for rent
                </p>
              </div>

              <div className="rounded-2xl bg-purple-100 p-4">
                <KeyRound className="h-7 w-7 text-purple-600" />
              </div>

            </div>

          </div>

          {/* Inquiries */}

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Inquiries
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {totalInquiries}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Customer messages
                </p>
              </div>

              <div className="rounded-2xl bg-orange-100 p-4">
                <Mail className="h-7 w-7 text-orange-600" />
              </div>

            </div>

          </div>

        </div>

        {/* =====================================
            INQUIRY SUMMARY
        ===================================== */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Unread */}

          <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-yellow-100 p-4">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-yellow-700">
                    Unread Inquiries
                  </p>

                  <p className="mt-1 text-3xl font-bold text-yellow-900">
                    {unreadInquiries}
                  </p>
                </div>

              </div>

              <Link
                href="/admin/messages"
                className="flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-600"
              >
                View
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>

          {/* Read */}

          <div className="rounded-3xl border border-green-200 bg-green-50 p-6">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-green-100 p-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Read Inquiries
                  </p>

                  <p className="mt-1 text-3xl font-bold text-green-900">
                    {readInquiries}
                  </p>
                </div>

              </div>

              <Link
                href="/admin/messages"
                className="flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
              >
                View
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

          </div>

        </div>

        {/* =====================================
            RECENT SECTION
        ===================================== */}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          {/* =================================
              RECENT PROPERTIES
          ================================= */}

          <section className="rounded-3xl border border-gray-100 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Properties
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest properties added
                </p>
              </div>

              <Link
                href="/admin/properties"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            <div className="divide-y divide-gray-100">

              {recentProperties.length === 0 ? (

                <div className="p-10 text-center">

                  <Building2 className="mx-auto h-10 w-10 text-gray-300" />

                  <p className="mt-3 font-medium text-gray-500">
                    No properties yet.
                  </p>

                  <Link
                    href="/admin/properties"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Property
                  </Link>

                </div>

              ) : (

                recentProperties.map(
                  (property) => (

                    <div
                      key={property.id}
                      className="flex items-center gap-4 p-5 transition hover:bg-gray-50"
                    >

                      {/* Image */}

                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">

                        {property.image ? (

                          <img
                            src={property.image}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />

                        ) : (

                          <div className="flex h-full items-center justify-center">
                            <Building2 className="h-7 w-7 text-gray-300" />
                          </div>

                        )}

                      </div>

                      {/* Info */}

                      <div className="min-w-0 flex-1">

                        <h3 className="truncate font-bold text-gray-900">
                          {property.title}
                        </h3>

                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">

                          <MapPin className="h-3.5 w-3.5" />

                          <span className="truncate">
                            {property.location}
                          </span>

                        </div>

                        <p className="mt-1 text-sm font-bold text-blue-600">
                          {property.price}
                        </p>

                      </div>

                      {/* Badge */}

                      <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 sm:block">
                        {property.purpose}
                      </span>

                    </div>

                  )
                )

              )}

            </div>

          </section>

          {/* =================================
              RECENT INQUIRIES
          ================================= */}

          <section className="rounded-3xl border border-gray-100 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-gray-100 p-6">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Inquiries
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest customer messages
                </p>
              </div>

              <Link
                href="/admin/messages"
                className="flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>

            </div>

            <div className="divide-y divide-gray-100">

              {recentInquiries.length === 0 ? (

                <div className="p-10 text-center">

                  <Mail className="mx-auto h-10 w-10 text-gray-300" />

                  <p className="mt-3 font-medium text-gray-500">
                    No inquiries yet.
                  </p>

                  <Link
                    href="/admin/messages"
                    className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    View Inquiries
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                </div>

              ) : (

                recentInquiries.map(
                  (inquiry) => (

                    <div
                      key={inquiry.id}
                      className={`p-5 transition hover:bg-gray-50 ${
                        !inquiry.read
                          ? "bg-blue-50/40"
                          : ""
                      }`}
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="min-w-0">

                          <div className="flex items-center gap-2">

                            <h3 className="truncate font-bold text-gray-900">
                              {inquiry.name}
                            </h3>

                            {!inquiry.read && (
                              <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                                NEW
                              </span>
                            )}

                          </div>

                          <p className="mt-1 truncate text-sm text-gray-500">
                            {inquiry.email}
                          </p>

                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                            {inquiry.message}
                          </p>

                        </div>

                        <span className="shrink-0 text-xs text-gray-400">
                          {formatDate(
                            inquiry.createdAt
                          )}
                        </span>

                      </div>

                    </div>

                  )
                )

              )}

            </div>

          </section>

        </div>

        {/* =====================================
            QUICK ACTIONS
        ===================================== */}

        <section className="mt-10">

          <h2 className="text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              href="/admin/properties"
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Building2 className="h-7 w-7 text-blue-600" />

              <h3 className="mt-4 font-bold text-gray-900">
                Manage Properties
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add, edit or delete properties.
              </p>

              <ArrowRight className="mt-4 h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
            </Link>

            <Link
              href="/admin/messages"
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Mail className="h-7 w-7 text-orange-600" />

              <h3 className="mt-4 font-bold text-gray-900">
                View Inquiries
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Check customer messages.
              </p>

              <ArrowRight className="mt-4 h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-orange-600" />
            </Link>

            <Link
              href="/admin/settings"
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <KeyRound className="h-7 w-7 text-purple-600" />

              <h3 className="mt-4 font-bold text-gray-900">
                Website Settings
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Manage website configuration.
              </p>

              <ArrowRight className="mt-4 h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-purple-600" />
            </Link>

            <Link
              href="/properties"
              target="_blank"
              className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <Home className="h-7 w-7 text-green-600" />

              <h3 className="mt-4 font-bold text-gray-900">
                View Website
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Open public property listings.
              </p>

              <ArrowRight className="mt-4 h-5 w-5 text-gray-400 transition group-hover:translate-x-1 group-hover:text-green-600" />
            </Link>

          </div>

        </section>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="py-10 text-center">

          <p className="text-sm text-gray-400">
            Real Estate Admin Dashboard
          </p>

        </div>

      </div>
    </main>
  );
}