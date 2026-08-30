"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  PlusCircle,
  Settings,
  LogOut,
  X,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Properties",
    href: "/admin/properties",
    icon: Building2,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    name: "Add Property",
    href: "/admin/properties?add=true",
    icon: PlusCircle,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

type ContactMessage = {
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

export default function AdminSidebar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // ===============================
  // GET UNREAD MESSAGE COUNT
  // ===============================

  const fetchUnreadMessages = async () => {
    try {
      const response = await fetch("/api/contact", {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = await response.json();

      if (Array.isArray(data)) {
        const unread = data.filter(
          (message: ContactMessage) => !message.read
        ).length;

        setUnreadCount(unread);
      }
    } catch (error) {
      console.error(
        "Unread messages error:",
        error
      );
    }
  };

  // ===============================
  // INITIAL LOAD + AUTO REFRESH
  // ===============================

  useEffect(() => {
    fetchUnreadMessages();

    const interval = setInterval(() => {
      fetchUnreadMessages();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ===============================
  // REFRESH WHEN OPENING MESSAGES
  // ===============================

  useEffect(() => {
    if (pathname === "/admin/messages") {
      fetchUnreadMessages();
    }
  }, [pathname]);

  // ===============================
  // LOGOUT
  // ===============================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) return;

    document.cookie =
      "admin_logged_in=; path=/; max-age=0";

    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* ===============================
          MOBILE MENU BUTTON
      =============================== */}

      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-xl bg-gray-900 p-3 text-white shadow-lg lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* ===============================
          MOBILE OVERLAY
      =============================== */}

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ===============================
          SIDEBAR
      =============================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* ===============================
            LOGO
        =============================== */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">

          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              RE
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Real Estate
              </h1>

              <p className="text-xs font-medium text-gray-400">
                Admin Panel
              </p>
            </div>
          </Link>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* ===============================
            NAVIGATION
        =============================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Main Menu
          </p>

          <div className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(
                      item.href.split("?")[0]
                    );

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >

                  <Icon className="h-5 w-5 shrink-0" />

                  <span className="flex-1">
                    {item.name}
                  </span>

                  {/* ===============================
                      UNREAD MESSAGE BADGE
                  =============================== */}

                  {item.name === "Messages" &&
                    unreadCount > 0 && (
                      <span
                        className={`flex min-w-6 items-center justify-center rounded-full px-2 py-1 text-xs font-bold ${
                          isActive
                            ? "bg-white text-blue-600"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {unreadCount > 99
                          ? "99+"
                          : unreadCount}
                      </span>
                    )}

                </Link>
              );
            })}

          </div>

        </nav>

        {/* ===============================
            ADMIN ACCOUNT
        =============================== */}

        <div className="border-t border-gray-100 p-4">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
              A
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-bold text-gray-900">
                Administrator
              </p>

              <p className="truncate text-xs text-gray-500">
                Admin Account
              </p>

            </div>

          </div>

          {/* ===============================
              LOGOUT
          =============================== */}

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}