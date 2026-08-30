
"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  Loader2,
  CheckCircle2,
  Trash2,
  RefreshCw,
  AlertCircle,
  X,
} from "lucide-react";

type Message = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string | null;
  propertyTitle?: string | null;
  createdAt: string;
  read?: boolean;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // =====================================
  // SAFE JSON READER
  // =====================================

  const getResponseData = async (response: Response) => {
    const text = await response.text();

    if (!text.trim()) {
      return null;
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error("Server returned an invalid response.");
    }
  };

  // =====================================
  // LOAD MESSAGES
  // =====================================

  const loadMessages = async () => {
    try {
      setError("");

      const response = await fetch("/api/contact", {
        method: "GET",
        cache: "no-store",
      });

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to load messages."
        );
      }

      // API can return:
      // [...]
      // OR
      // { messages: [...] }

      const messageList = Array.isArray(data)
        ? data
        : Array.isArray(data?.messages)
        ? data.messages
        : [];

      setMessages(messageList);
    } catch (error) {
      console.error("Messages loading error:", error);

      setMessages([]);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load messages. Please try again."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =====================================
  // INITIAL LOAD
  // =====================================

  useEffect(() => {
    loadMessages();
  }, []);

  // =====================================
  // REFRESH
  // =====================================

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadMessages();
  };

  // =====================================
  // MARK AS READ
  // =====================================

  const handleMarkRead = async (id: number) => {
    try {
      const response = await fetch("/api/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          read: true,
        }),
      });

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to mark message as read."
        );
      }

      setMessages((current) =>
        current.map((message) =>
          message.id === id
            ? {
                ...message,
                read: true,
              }
            : message
        )
      );
    } catch (error) {
      console.error("Mark read error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to mark this message as read."
      );
    }
  };

  // =====================================
  // DELETE MESSAGE
  // =====================================

  const handleDelete = async (id: number) => {
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
        body: JSON.stringify({
          id,
        }),
      });

      const data = await getResponseData(response);

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to delete message."
        );
      }

      setMessages((current) =>
        current.filter((message) => message.id !== id)
      );
    } catch (error) {
      console.error("Delete message error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to delete this inquiry."
      );
    }
  };

  // =====================================
  // FORMAT DATE
  // =====================================

  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleString("en-PK", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return date;
    }
  };

  // =====================================
  // STATISTICS
  // =====================================

  const totalMessages = messages.length;

  const unreadMessages = messages.filter(
    (message) => !message.read
  ).length;

  const readMessages = messages.filter(
    (message) => message.read
  ).length;

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-10 w-10 animate-spin text-blue-600" />

              <p className="mt-4 font-medium text-gray-500">
                Loading messages...
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
              Admin Panel
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Messages
            </h1>

            <p className="mt-3 text-gray-500">
              Manage property inquiries submitted by visitors.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {refreshing ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <RefreshCw className="h-5 w-5" />
            )}

            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* =====================================
            ERROR
        ===================================== */}

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <div className="flex-1">
              <p className="font-semibold">
                {error}
              </p>

              <button
                type="button"
                onClick={loadMessages}
                className="mt-2 text-sm font-bold underline"
              >
                Try Again
              </button>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              className="rounded-lg p-1 hover:bg-red-100"
              aria-label="Close error"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* =====================================
            STATS
        ===================================== */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          {/* Total */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Messages
                </p>

                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalMessages}
                </p>
              </div>

              <div className="rounded-2xl bg-blue-100 p-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>

            </div>
          </div>

          {/* Unread */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Unread
                </p>

                <p className="mt-2 text-3xl font-bold text-yellow-600">
                  {unreadMessages}
                </p>
              </div>

              <div className="rounded-2xl bg-yellow-100 p-4">
                <Mail className="h-6 w-6 text-yellow-600" />
              </div>

            </div>
          </div>

          {/* Read */}

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Read
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {readMessages}
                </p>
              </div>

              <div className="rounded-2xl bg-green-100 p-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>

            </div>
          </div>

        </div>

        {/* =====================================
            MESSAGES
        ===================================== */}

        <section className="mt-8">

          {messages.length === 0 ? (

            <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Mail className="h-8 w-8 text-gray-400" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No inquiries yet
              </h2>

              <p className="mt-2 text-gray-500">
                When visitors submit a property inquiry,
                it will appear here.
              </p>

              <button
                type="button"
                onClick={handleRefresh}
                className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Refresh Messages
              </button>

            </div>

          ) : (

            <div className="space-y-5">

              {messages.map((message) => (

                <article
                  key={message.id}
                  className={`rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md md:p-8 ${
                    message.read
                      ? "border-gray-100"
                      : "border-blue-200 bg-blue-50/20"
                  }`}
                >

                  {/* =====================================
                      TOP
                  ===================================== */}

                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <h2 className="text-xl font-bold text-gray-900">
                            {message.name || "Unknown Visitor"}
                          </h2>

                          {!message.read && (
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                              NEW
                            </span>
                          )}

                          {message.read && (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              READ
                            </span>
                          )}

                        </div>

                        <p className="mt-1 text-sm text-gray-500">
                          {formatDate(message.createdAt)}
                        </p>

                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex flex-wrap gap-2">

                      {!message.read && (
                        <button
                          type="button"
                          onClick={() =>
                            handleMarkRead(message.id)
                          }
                          className="flex items-center justify-center gap-2 rounded-xl border border-green-200 px-4 py-2 text-sm font-semibold text-green-600 transition hover:bg-green-50"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Mark Read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(message.id)
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>

                    </div>

                  </div>

                  {/* =====================================
                      CONTACT INFO
                  ===================================== */}

                  <div className="mt-6 grid gap-4 md:grid-cols-2">

                    {/* Email */}

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>

                      <a
                        href={`mailto:${message.email}`}
                        className="mt-2 block break-all font-semibold text-gray-900 hover:text-blue-600"
                      >
                        {message.email || "No email"}
                      </a>

                    </div>

                    {/* Phone */}

                    <div className="rounded-2xl bg-gray-50 p-4">

                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                        <Phone className="h-4 w-4" />
                        Phone
                      </div>

                      <a
                        href={`tel:${message.phone}`}
                        className="mt-2 block font-semibold text-gray-900 hover:text-green-600"
                      >
                        {message.phone || "No phone"}
                      </a>

                    </div>

                  </div>

                  {/* =====================================
                      PROPERTY
                  ===================================== */}

                  {message.propertyTitle && (

                    <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">

                      <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        Property Inquiry
                      </p>

                      <p className="mt-1 font-bold text-gray-900">
                        {message.propertyTitle}
                      </p>

                      {message.propertyId && (
                        <p className="mt-1 text-sm text-gray-500">
                          Property ID: {message.propertyId}
                        </p>
                      )}

                    </div>

                  )}

                  {/* =====================================
                      MESSAGE
                  ===================================== */}

                  <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-5">

                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      Message
                    </div>

                    <p className="mt-3 whitespace-pre-wrap leading-7 text-gray-700">
                      {message.message || "No message provided."}
                    </p>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div className="py-10 text-center">
          <p className="text-sm text-gray-400">
            Real Estate Admin Panel
          </p>
        </div>

      </div>
    </main>
  );
}

