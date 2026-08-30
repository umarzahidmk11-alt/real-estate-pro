
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

type SettingsData = {
  siteName: string;
  email: string;
  phone: string;
  address: string;
};

const defaultSettings: SettingsData = {
  siteName: "EstatePro",
  email: "hello@estatepro.com",
  phone: "+92 300 1234567",
  address: "Lahore, Pakistan",
};

export default function Footer() {
  const [settings, setSettings] =
    useState<SettingsData>(defaultSettings);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

setSettings({
  siteName:
    data.settings?.siteName ||
    defaultSettings.siteName,

  email:
    data.settings?.email ||
    defaultSettings.email,

  phone:
    data.settings?.phone ||
    defaultSettings.phone,

  address:
    data.settings?.address ||
    defaultSettings.address,
});
      } catch (error) {
        console.error("Footer settings error:", error);
      }
    };

    loadSettings();
  }, []);

  return (
    <footer className="bg-gray-950 text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold">
                {settings.siteName.charAt(0).toUpperCase()}
              </div>

              <span className="text-2xl font-bold">
                {settings.siteName}
              </span>
            </Link>

            <p className="mt-5 max-w-sm leading-7 text-gray-400">
              Your trusted partner for finding premium properties,
              modern homes and smart real estate investments.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">

              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                𝕏
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-gray-400 transition hover:bg-blue-600 hover:text-white"
              >
                in
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-bold">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4 text-gray-400">

              <li>
                <Link
                  href="/"
                  className="transition hover:text-blue-500"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-blue-500"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="transition hover:text-blue-500"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="transition hover:text-blue-500"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-blue-500"
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>

          {/* Properties */}
          <div>

            <h3 className="text-lg font-bold">
              Properties
            </h3>

            <ul className="mt-6 space-y-4 text-gray-400">

              <li>
                <Link
                  href="/properties?type=House"
                  className="transition hover:text-blue-500"
                >
                  Houses
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=Apartment"
                  className="transition hover:text-blue-500"
                >
                  Apartments
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=Villa"
                  className="transition hover:text-blue-500"
                >
                  Villas
                </Link>
              </li>

              <li>
                <Link
                  href="/properties?type=Commercial"
                  className="transition hover:text-blue-500"
                >
                  Commercial
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="transition hover:text-blue-500"
                >
                  New Projects
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>

            <h3 className="text-lg font-bold">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">

              {/* Address */}
              <div className="flex gap-3">

                <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-500" />

                <p className="text-gray-400">
                  {settings.address}
                </p>

              </div>

              {/* Phone */}
              <div className="flex gap-3">

                <Phone className="mt-1 h-5 w-5 shrink-0 text-blue-500" />

                <a
                  href={`tel:${settings.phone}`}
                  className="text-gray-400 transition hover:text-white"
                >
                  {settings.phone}
                </a>

              </div>

              {/* Email */}
              <div className="flex gap-3">

                <Mail className="mt-1 h-5 w-5 shrink-0 text-blue-500" />

                <a
                  href={`mailto:${settings.email}`}
                  className="break-all text-gray-400 transition hover:text-white"
                >
                  {settings.email}
                </a>

              </div>

            </div>

            {/* Newsletter */}
            <div className="mt-7">

              <p className="mb-3 text-sm font-semibold">
                Get property updates
              </p>

              <div className="flex overflow-hidden rounded-xl border border-gray-800 bg-gray-900">

                <input
                  type="email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
                />

                <button
                  type="button"
                  aria-label="Subscribe"
                  className="flex items-center justify-center bg-blue-600 px-4 transition hover:bg-blue-700"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>

          <div className="flex gap-6">

            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms & Conditions
            </a>

          </div>

        </div>
      </div>

    </footer>
  );
}

