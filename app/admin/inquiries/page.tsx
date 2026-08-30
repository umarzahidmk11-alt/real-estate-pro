"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  Mail,
  Phone,
  User,
  Trash2,
  CheckCircle2,
  Clock,
  Building2,
} from "lucide-react";

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

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH INQUIRIES
  // =========================

  const fetchInquiries = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load inquiries");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setInquiries(data);
      } else {
        setInquiries([]);
      }
    } catch (error) {
      console.error("Fetch inquiries error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  // =========================
  // MARK AS READ
  // =========================

  const markAsRead = async (id: number) => {
    try {
      const response = await fetch("/api/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to mark inquiry as read.");
        return;
      }

      setInquiries((current) =>
        current.map((inquiry) =>
          inquiry.id === id
            ? { ...inquiry, read: true }
            : inquiry
        )
      );
    } catch (error) {
      console.error("Mark read error:", error);
      alert("Something went wrong.");
    }
  };

  // =========================
  // DELETE INQUIRY
  // =========================

  const deleteInquiry = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to delete inquiry.");
        return;
      }

      setInquiries((current) =>
        current.filter((inquiry) => inquiry.id !== id)
      );

      alert("Inquiry deleted successfully!");
    } catch (error) {
      console.error("Delete inquiry error:", error);
      alert("Something went wrong while deleting the inquiry.");
    }
  };

  // =========================
  // STATISTICS
  // =========================

  const totalInquiries = inquiries.length;

  const unreadInquiries = inquiries.filter(
    (inquiry) => !inquiry.read
  ).length;

  const readInquiries = inquiries.filter(
    (inquiry) => inquiry.read
  ).length;

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-PK", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Admin Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Inquiries
            </h1>

            <p className="mt-3 text-gray-500">
              Manage messages and inquiries received from your website.
            </p>
          </div>

          <button
            onClick={fetchInquiries}
            disabled={loading}
            className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-5 w-5 ${
                loading ? "animate-spin" : ""
              }`}
            />

            Refresh
          </button>

        </div>

        {/* =========================
            STATISTICS
        ========================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Total */}

          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Inquiries
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {loading ? "—" : totalInquiries}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  All received messages
                </p>
              </div>

              <div className="rounded-2xl bg-blue-100 p-4">
                <Mail className="h-7 w-7 text-blue-600" />
              </div>

            </div>

          </div>

          {/* Unread */}

          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Unread
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {loading ? "—" : unreadInquiries}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Need your attention
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-100 p-4">
                <Clock className="h-7 w-7 text-yellow-600" />
              </div>

            </div>

          </div>

          {/* Read */}

          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Read
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {loading ? "—" : readInquiries}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Already reviewed
                </p>
              </div>

              <div className="rounded-2xl bg-green-100 p-4">
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              </div>

            </div>

          </div>

        </div>

        {/* =========================
            INQUIRIES LIST
        ========================= */}

        <div className="mt-10">

          {loading ? (

            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

              <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600" />

              <p className="mt-4 text-gray-500">
                Loading inquiries...
              </p>

            </div>

          ) : inquiries.length === 0 ? (

            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

              <Mail className="mx-auto h-12 w-12 text-gray-300" />

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No Inquiries Yet
              </h2>

              <p className="mt-2 text-gray-500">
                Customer inquiries will appear here.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {inquiries.map((inquiry) => (

                <div
                  key={inquiry.id}
                  className={`rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
                    inquiry.read
                      ? "border-gray-100"
                      : "border-blue-200 bg-blue-50/30"
                  }`}
                >

                  {/* Top */}

                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h2 className="text-xl font-bold text-gray-900">
                            {inquiry.name}
                          </h2>

                          {!inquiry.read && (
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                              NEW
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-sm text-gray-400">
                          {formatDate(inquiry.createdAt)}
                        </p>

                      </div>

                    </div>

                    {/* Actions */}

                    <div className="flex flex-wrap gap-2">

                      {!inquiry.read && (
                        <button
                          onClick={() =>
                            markAsRead(inquiry.id)
                          }
                          className="flex items-center gap-2 rounded-xl border border-green-200 px-4 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Mark Read
                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteInquiry(inquiry.id)
                        }
                        className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>

                    </div>

                  </div>

                  {/* Contact Info */}

                  <div className="mt-6 grid gap-3 border-t border-gray-100 pt-5 md:grid-cols-2">

                    <a
                      href={`mailto:${inquiry.email}`}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Mail className="h-5 w-5 text-blue-600" />

                      <span className="truncate">
                        {inquiry.email}
                      </span>
                    </a>

                    <a
                      href={`tel:${inquiry.phone}`}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                    >
                      <Phone className="h-5 w-5 text-green-600" />

                      <span>
                        {inquiry.phone}
                      </span>
                    </a>

                  </div>

                  {/* Property */}

                  {inquiry.propertyTitle && (
                    <div className="mt-4 flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">

                      <Building2 className="h-5 w-5 shrink-0 text-blue-600" />

                      <div>
                        <p className="text-xs font-medium text-gray-400">
                          Property Inquiry
                        </p>

                        <p className="text-sm font-semibold text-gray-800">
                          {inquiry.propertyTitle}
                        </p>
                      </div>

                    </div>
                  )}

                  {/* Message */}

                  <div className="mt-5 rounded-2xl bg-gray-50 p-5">

                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                      Message
                    </p>

                    <p className="whitespace-pre-wrap leading-7 text-gray-700">
                      {inquiry.message}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </main>
  );
}