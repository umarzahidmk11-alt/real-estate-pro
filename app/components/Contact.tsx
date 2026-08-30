"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";

type SettingsData = {
  email: string;
  phone: string;
  address: string;
  contactForm: boolean;
};

const defaultSettings: SettingsData = {
  email: "hello@estatepro.com",
  phone: "+92 300 1234567",
  address: "Lahore, Pakistan",
  contactForm: true,
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const defaultForm: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function Contact() {
  const [settings, setSettings] =
    useState<SettingsData>(defaultSettings);

  const [form, setForm] =
    useState<FormData>(defaultForm);

  const [loadingSettings, setLoadingSettings] =
    useState(true);

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  // =====================================
  // LOAD SETTINGS
  // =====================================

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

        const savedSettings =
          data.settings || data;

        setSettings({
          email:
            savedSettings.email ||
            defaultSettings.email,

          phone:
            savedSettings.phone ||
            defaultSettings.phone,

          address:
            savedSettings.address ||
            defaultSettings.address,

          contactForm:
            savedSettings.contactForm !== undefined
              ? Boolean(savedSettings.contactForm)
              : defaultSettings.contactForm,
        });
      } catch (error) {
        console.error(
          "Contact settings error:",
          error
        );
      } finally {
        setLoadingSettings(false);
      }
    };

    loadSettings();
  }, []);

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSuccess("");
    setError("");
  };

  // =====================================
  // SUBMIT FORM
  // =====================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    try {
     const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to send your message."
        );
      }

      setSuccess(
        "Your message has been sent successfully. We will contact you soon."
      );

      setForm(defaultForm);
    } catch (error) {
      console.error(
        "Contact form error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loadingSettings) {
    return (
      <section className="bg-gray-50 px-6 py-24">
        <div className="mx-auto flex min-h-[300px] max-w-7xl items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-9 w-9 animate-spin text-blue-600" />

            <p className="mt-4 text-sm font-medium text-gray-500">
              Loading contact information...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gray-50 px-6 py-24"
    >
      {/* Background decoration */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Contact Us
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Let&apos;s Talk About
            <span className="block text-blue-600">
              Your Property
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">
            Have a question about a property or
            looking for something specific? Our
            team is ready to help.
          </p>

        </div>

        {/* =====================================
            CONTENT
        ===================================== */}

        <div className="mt-14 grid gap-8 lg:grid-cols-3">

          {/* =====================================
              CONTACT INFO
          ===================================== */}

          <div className="relative overflow-hidden rounded-3xl bg-gray-950 p-8 text-white shadow-xl">

            {/* Decoration */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-600/20 blur-2xl" />

            <div className="relative">

              <div className="inline-flex rounded-2xl bg-blue-600 p-3">
                <Mail className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                Get in Touch
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                We&apos;re here to help you find the
                right property and answer any
                questions you may have.
              </p>

              <div className="mt-10 space-y-7">

                {/* Email */}

                <a
                  href={`mailto:${settings.email}`}
                  className="group flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 transition group-hover:bg-blue-600">
                    <Mail className="h-5 w-5 text-blue-400 transition group-hover:text-white" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-500">
                      Email
                    </p>

                    <p className="mt-1 break-all font-medium text-gray-200 transition group-hover:text-blue-400">
                      {settings.email}
                    </p>
                  </div>
                </a>

                {/* Phone */}

                <a
                  href={`tel:${settings.phone}`}
                  className="group flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 transition group-hover:bg-blue-600">
                    <Phone className="h-5 w-5 text-blue-400 transition group-hover:text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Phone
                    </p>

                    <p className="mt-1 font-medium text-gray-200 transition group-hover:text-blue-400">
                      {settings.phone}
                    </p>
                  </div>
                </a>

                {/* Address */}

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/20">
                    <MapPin className="h-5 w-5 text-blue-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">
                      Office
                    </p>

                    <p className="mt-1 font-medium text-gray-200">
                      {settings.address}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom note */}

              <div className="mt-10 border-t border-gray-800 pt-6">
                <p className="text-sm leading-6 text-gray-500">
                  Our team is available to assist
                  you with property buying, renting
                  and investment inquiries.
                </p>
              </div>

            </div>
          </div>

          {/* =====================================
              FORM
          ===================================== */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm lg:col-span-2 lg:p-10">

            {!settings.contactForm ? (

              <div className="flex min-h-[450px] items-center justify-center text-center">

                <div className="max-w-md">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                    <Mail className="h-8 w-8 text-gray-400" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-gray-900">
                    Contact Form Unavailable
                  </h3>

                  <p className="mt-3 leading-7 text-gray-500">
                    The contact form is currently
                    disabled. Please contact us
                    directly using the information
                    provided.
                  </p>

                </div>
              </div>

            ) : (

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* Form heading */}

                <div className="mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Send Us a Message
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Fill out the form and our team
                    will get back to you shortly.
                  </p>
                </div>

                {/* Success */}

                {success && (
                  <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-green-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                    <p className="font-medium">
                      {success}
                    </p>
                  </div>
                )}

                {/* Error */}

                {error && (
                  <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                    <p className="font-medium">
                      {error}
                    </p>
                  </div>
                )}

                {/* Name + Email */}

                <div className="grid gap-6 md:grid-cols-2">

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Your Name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(event) =>
                        handleChange(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(event) =>
                        handleChange(
                          "email",
                          event.target.value
                        )
                      }
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                </div>

                {/* Phone */}

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      handleChange(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="+92 300 1234567"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Message */}

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={(event) =>
                      handleChange(
                        "message",
                        event.target.value
                      )
                    }
                    placeholder="Tell us how we can help you..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={sending}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}