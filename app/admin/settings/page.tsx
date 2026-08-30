
"use client";

import { useEffect, useState } from "react";
import {
  Save,
  RotateCcw,
  Settings,
  Globe,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  ShieldCheck,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

type SettingsData = {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  maintenanceMode: boolean;
  contactForm: boolean;
};

const defaultSettings: SettingsData = {
  siteName: "Real Estate",
  tagline: "Find your perfect property",
  email: "admin@example.com",
  phone: "+92 300 1234567",
  address: "Lahore, Pakistan",
  currency: "PKR",
  maintenanceMode: false,
  contactForm: true,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] =
    useState<SettingsData>(defaultSettings);

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Load Settings From API
  // =========================

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/settings", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load settings.");
      }

      const data = await response.json();

if (!data.success) {
  throw new Error(
    data.message || "Failed to load settings."
  );
}

setSettings({
  ...defaultSettings,
  ...(data.settings || {}),
});
    } catch (error) {
      console.error("Failed to load settings:", error);

      setError(
        "Unable to load settings. Please refresh the page and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Initial Load
  // =========================

  useEffect(() => {
    loadSettings();
  }, []);

  // =========================
  // Handle Input
  // =========================

  const handleChange = (
    field: keyof SettingsData,
    value: string | boolean
  ) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);
    setError("");
  };

  // =========================
  // Save Settings
  // =========================

const handleSave = async () => {
  try {
    setSaving(true);
    setSaved(false);
    setError("");

    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    const text = await response.text();

    console.log("Settings API status:", response.status);
    console.log("Settings API response:", text);

    let data;

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(
        "Settings API returned an invalid response."
      );
    }

    if (!response.ok) {
      throw new Error(
        data?.message || "Failed to save settings."
      );
    }

    if (data.settings) {
      setSettings({
        ...defaultSettings,
        ...data.settings,
      });
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  } catch (error) {
    console.error("Failed to save settings:", error);

    setError(
      error instanceof Error
        ? error.message
        : "Settings could not be saved. Please try again."
    );
  } finally {
    setSaving(false);
  }
};

  // =========================
  // Reset Settings
  // =========================

  const handleReset = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset all settings to their default values?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setResetting(true);
      setSaved(false);
      setError("");

      const response = await fetch("/api/settings", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to reset settings."
        );
      }

      setSettings({
        ...defaultSettings,
        ...(data.settings || {}),
      });

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to reset settings:", error);

      setError(
        "Settings could not be reset. Please try again."
      );
    } finally {
      setResetting(false);
    }
  };

  // =========================
  // Loading Screen
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <Settings className="mx-auto h-10 w-10 animate-spin text-blue-600" />

              <p className="mt-4 font-medium text-gray-500">
                Loading settings...
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* =========================
            Header
        ========================= */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Admin Settings
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Settings
            </h1>

            <p className="mt-3 text-gray-500">
              Manage your website configuration and preferences.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            {/* Reset */}

            <button
              onClick={handleReset}
              disabled={resetting || saving}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <RotateCcw className="h-5 w-5" />
              )}

              {resetting ? "Resetting..." : "Reset"}
            </button>

            {/* Save */}

            <button
              onClick={handleSave}
              disabled={saving || resetting}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}

              {saving ? "Saving..." : "Save Settings"}
            </button>

          </div>
        </div>

        {/* =========================
            Success Message
        ========================= */}

        {saved && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
            <CheckCircle2 className="h-5 w-5 shrink-0" />

            <p className="font-semibold">
              Settings saved successfully.
            </p>
          </div>
        )}

        {/* =========================
            Error Message
        ========================= */}

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />

            <p className="font-semibold">
              {error}
            </p>
          </div>
        )}

        {/* =========================
            Website Settings
        ========================= */}

        <section className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">

            <div className="rounded-2xl bg-blue-100 p-4">
              <Globe className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Website Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Basic information about your real estate website.
              </p>
            </div>

          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {/* Site Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Website Name
              </label>

              <input
                type="text"
                value={settings.siteName}
                onChange={(e) =>
                  handleChange("siteName", e.target.value)
                }
                placeholder="Real Estate"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Tagline */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Website Tagline
              </label>

              <input
                type="text"
                value={settings.tagline}
                onChange={(e) =>
                  handleChange("tagline", e.target.value)
                }
                placeholder="Find your perfect property"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

          </div>
        </section>

        {/* =========================
            Contact Information
        ========================= */}

        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">

            <div className="rounded-2xl bg-green-100 p-4">
              <Phone className="h-7 w-7 text-green-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Contact Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Contact details displayed throughout the website.
              </p>
            </div>

          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {/* Email */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail className="h-4 w-4 text-gray-400" />
                Email Address
              </label>

              <input
                type="email"
                value={settings.email}
                onChange={(e) =>
                  handleChange("email", e.target.value)
                }
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Phone className="h-4 w-4 text-gray-400" />
                Phone Number
              </label>

              <input
                type="text"
                value={settings.phone}
                onChange={(e) =>
                  handleChange("phone", e.target.value)
                }
                placeholder="+92 300 1234567"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Address */}

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MapPin className="h-4 w-4 text-gray-400" />
                Office Address
              </label>

              <input
                type="text"
                value={settings.address}
                onChange={(e) =>
                  handleChange("address", e.target.value)
                }
                placeholder="Lahore, Pakistan"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

          </div>
        </section>

        {/* =========================
            Regional Settings
        ========================= */}

        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">

            <div className="rounded-2xl bg-purple-100 p-4">
              <DollarSign className="h-7 w-7 text-purple-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Regional Settings
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Configure the currency used on your website.
              </p>
            </div>

          </div>

          <div className="mt-8 max-w-md">

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Currency
            </label>

            <select
              value={settings.currency}
              onChange={(e) =>
                handleChange("currency", e.target.value)
              }
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="PKR">
                PKR - Pakistani Rupee
              </option>

              <option value="USD">
                USD - US Dollar
              </option>

              <option value="AED">
                AED - UAE Dirham
              </option>

              <option value="GBP">
                GBP - British Pound
              </option>
            </select>

          </div>
        </section>

        {/* =========================
            Website Controls
        ========================= */}

        <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-center gap-4 border-b border-gray-100 pb-6">

            <div className="rounded-2xl bg-orange-100 p-4">
              <ShieldCheck className="h-7 w-7 text-orange-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Website Controls
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Control important website features.
              </p>
            </div>

          </div>

          <div className="mt-8 space-y-5">

            {/* Contact Form */}

            <div className="flex items-center justify-between gap-5 rounded-2xl border border-gray-100 p-5">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-blue-100 p-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Contact Form
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Allow visitors to send inquiries through the website.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  handleChange(
                    "contactForm",
                    !settings.contactForm
                  )
                }
                aria-label="Toggle contact form"
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  settings.contactForm
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    settings.contactForm
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

            {/* Maintenance Mode */}

            <div className="flex items-center justify-between gap-5 rounded-2xl border border-gray-100 p-5">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-red-100 p-3">
                  <Settings className="h-5 w-5 text-red-600" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Maintenance Mode
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Temporarily place the website into maintenance mode.
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  handleChange(
                    "maintenanceMode",
                    !settings.maintenanceMode
                  )
                }
                aria-label="Toggle maintenance mode"
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  settings.maintenanceMode
                    ? "bg-red-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    settings.maintenanceMode
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>

            </div>

          </div>
        </section>

        {/* =========================
            Bottom Save Area
        ========================= */}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-3xl bg-gray-900 p-6 sm:flex-row">

          <div>
            <h3 className="font-bold text-white">
              Save your changes
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Your settings are stored through the website API.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || resetting}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}

            {saving ? "Saving..." : "Save Settings"}
          </button>

        </div>

        {/* =========================
            Footer
        ========================= */}

        <div className="py-8 text-center">
          <p className="text-sm text-gray-400">
            Real Estate Admin Panel
          </p>
        </div>

      </div>
    </main>
  );
}

