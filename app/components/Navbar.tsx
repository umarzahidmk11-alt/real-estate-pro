"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Building2 } from "lucide-react";

type SettingsData = {
  siteName: string;
  tagline: string;
};

const defaultSettings: SettingsData = {
  siteName: "EstatePro",
  tagline: "Find your perfect property",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

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

          tagline:
            data.settings?.tagline ||
            defaultSettings.tagline,
        });
      } catch (error) {
        console.error("Navbar settings error:", error);
      }
    };

    loadSettings();
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Buy", href: "/properties?purpose=Buy" },
    { name: "Rent", href: "/properties?purpose=Rent" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-white/20 bg-black/20 shadow-2xl backdrop-blur-xl">

          {/* Main Navbar */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">

            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg transition duration-300 group-hover:scale-105 group-hover:bg-blue-500">
                <Building2 className="h-6 w-6 text-white" />
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-bold leading-tight text-white">
                  {settings.siteName}
                </h1>

                <p className="text-[10px] font-medium uppercase tracking-wider text-white/60">
                  {settings.tagline}
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden items-center gap-6 lg:flex">
              {links.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative py-2 text-sm font-medium text-white/90 transition duration-200 hover:text-white"
                >
                  {item.name}

                 <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-blue-400 transition-all duration-300 hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop Button */}
            <Link
              href="/properties"
              className="hidden rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-500/30 md:block"
            >
              Post Property
            </Link>

            {/* Mobile Button */}
            <button
              type="button"
              aria-label={
                isOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isOpen}
              onClick={() =>
                setIsOpen((current) => !current)
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 md:hidden"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="border-t border-white/10 bg-black/20 px-4 pb-5 pt-4 md:hidden">

              <nav className="flex flex-col gap-1">
                {links.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <Link
                href="/properties"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-500"
              >
                Post Property
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}