"use client";

import { useState } from "react";
import {
  X,
  Home,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  FileText,
  BedDouble,
  Bath,
  Maximize,
} from "lucide-react";

type AddPropertyModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddPropertyModal({
  open,
  onClose,
  onSuccess,
}: AddPropertyModalProps) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    purpose: "Buy",
    type: "House",
    location: "",
    price: "",
    area: "",
    bedrooms: 3,
    bathrooms: 2,
    image: "",
    description: "",
  });

  if (!open) {
    return null;
  }

  const updateField = (
    field: string,
    value: string | number
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to add property.");
        return;
      }

      alert("Property added successfully!");

      setFormData({
        title: "",
        purpose: "Buy",
        type: "House",
        location: "",
        price: "",
        area: "",
        bedrooms: 3,
        bathrooms: 2,
        image: "",
        description: "",
      });

      onSuccess();
    } catch (error) {
      console.error("Add property error:", error);

      alert("Something went wrong while adding the property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      {/* Modal */}
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* =========================
            Header
        ========================= */}

        <div className="flex items-center justify-between border-b bg-white px-6 py-5">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-100 p-3">
              <Home className="h-6 w-6 text-blue-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Property
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the property details below
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X className="h-6 w-6" />
          </button>

        </div>

        {/* =========================
            Form
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto px-6 py-6"
        >

          <div className="space-y-6">

            {/* Property Title */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Property Title
              </label>

              <div className="relative">

                <Home className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(event) =>
                    updateField("title", event.target.value)
                  }
                  placeholder="Modern Luxury Villa"
                  className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Purpose + Type */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Purpose
                </label>

                <select
                  value={formData.purpose}
                  onChange={(event) =>
                    updateField("purpose", event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Buy">Buy</option>
                  <option value="Rent">Rent</option>
                </select>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Property Type
                </label>

                <select
                  value={formData.type}
                  onChange={(event) =>
                    updateField("type", event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Plot">Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>

              </div>

            </div>

            {/* Location */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Location
              </label>

              <div className="relative">

                <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  required
                  type="text"
                  value={formData.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  placeholder="DHA Phase 6, Lahore"
                  className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

            {/* Price + Area */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price
                </label>

                <div className="relative">

                  <DollarSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    type="text"
                    value={formData.price}
                    onChange={(event) =>
                      updateField("price", event.target.value)
                    }
                    placeholder="PKR 8.5 Crore"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Area
                </label>

                <div className="relative">

                  <Maximize className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    type="text"
                    value={formData.area}
                    onChange={(event) =>
                      updateField("area", event.target.value)
                    }
                    placeholder="1 Kanal"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

            </div>

            {/* Bedrooms + Bathrooms */}

            <div className="grid gap-5 md:grid-cols-2">

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bedrooms
                </label>

                <div className="relative">

                  <BedDouble className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    min="0"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(event) =>
                      updateField(
                        "bedrooms",
                        Number(event.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bathrooms
                </label>

                <div className="relative">

                  <Bath className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    min="0"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(event) =>
                      updateField(
                        "bathrooms",
                        Number(event.target.value)
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

              </div>

            </div>

            {/* Image URL */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Property Image URL
              </label>

              <div className="relative">

                <ImageIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                <input
                  type="url"
                  value={formData.image}
                  onChange={(event) =>
                    updateField("image", event.target.value)
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

              <p className="mt-2 text-xs text-gray-400">
                Paste a direct image URL.
              </p>

            </div>

            {/* Description */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <div className="relative">

                <FileText className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

                <textarea
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value
                    )
                  }
                  placeholder="Describe the property, its features and location..."
                  className="w-full resize-none rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>

          </div>

          {/* =========================
              Footer Buttons
          ========================= */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Adding Property..." : "Add Property"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}