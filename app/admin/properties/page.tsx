"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  RefreshCw,
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Trash2,
  ExternalLink,
  Plus,
  Pencil,
  Search,
  X,
} from "lucide-react";

import AddPropertyModal from "./components/AddPropertyModal";
import EditPropertyModal from "./components/EditPropertyModal";

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

/* =========================================================
   MAIN CONTENT
========================================================= */

function AdminPropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Modal
  const [showAddModal, setShowAddModal] = useState(false);

  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProperty, setSelectedProperty] =
    useState<Property | null>(null);

  // Search / Filters
  const [search, setSearch] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  /* =========================================================
     FETCH PROPERTIES
  ========================================================= */

  const fetchProperties = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/properties", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load properties");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setProperties(data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Properties Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD + ADD QUERY
  ========================================================= */

  useEffect(() => {
    fetchProperties();

    if (searchParams.get("add") === "true") {
      setShowAddModal(true);
      router.replace("/admin/properties");
    }
  }, [searchParams, router]);

  /* =========================================================
     DELETE PROPERTY
  ========================================================= */

  const deleteProperty = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/properties", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Failed to delete property."
        );
        return;
      }

      setProperties((currentProperties) =>
        currentProperties.filter(
          (property) => property.id !== id
        )
      );

      alert("Property deleted successfully!");
    } catch (error) {
      console.error(
        "Delete property error:",
        error
      );

      alert(
        "Something went wrong while deleting the property."
      );
    }
  };

  /* =========================================================
     OPEN EDIT MODAL
  ========================================================= */

  const openEditModal = (property: Property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  /* =========================================================
     CLOSE EDIT MODAL
  ========================================================= */

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedProperty(null);
  };

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalProperties = properties.length;

  const buyProperties = properties.filter(
    (property) => property.purpose === "Buy"
  ).length;

  const rentProperties = properties.filter(
    (property) => property.purpose === "Rent"
  ).length;

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredProperties = properties.filter(
    (property) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchText ||
        property.title
          .toLowerCase()
          .includes(searchText) ||
        property.location
          .toLowerCase()
          .includes(searchText) ||
        property.type
          .toLowerCase()
          .includes(searchText) ||
        property.purpose
          .toLowerCase()
          .includes(searchText) ||
        property.price
          .toLowerCase()
          .includes(searchText);

      const matchesPurpose =
        purposeFilter === "All" ||
        property.purpose === purposeFilter;

      const matchesType =
        typeFilter === "All" ||
        property.type === typeFilter;

      return (
        matchesSearch &&
        matchesPurpose &&
        matchesType
      );
    }
  );

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setPurposeFilter("All");
    setTypeFilter("All");
  };

  const hasFilters =
    search !== "" ||
    purposeFilter !== "All" ||
    typeFilter !== "All";

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Admin Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Properties
            </h1>

            <p className="mt-3 text-gray-500">
              Manage all properties listed on your website.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            {/* Refresh */}

            <button
              onClick={fetchProperties}
              disabled={loading}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-5 w-5 ${
                  loading
                    ? "animate-spin"
                    : ""
                }`}
              />

              Refresh
            </button>

            {/* Add Property */}

            <button
              onClick={() =>
                setShowAddModal(true)
              }
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />

              Add Property
            </button>

          </div>
        </div>

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {/* Total */}

          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Properties
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {loading
                    ? "—"
                    : totalProperties}
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

          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  For Sale
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {loading
                    ? "—"
                    : buyProperties}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Properties available to buy
                </p>
              </div>

              <div className="rounded-2xl bg-green-100 p-4">
                <Building2 className="h-7 w-7 text-green-600" />
              </div>

            </div>
          </div>

          {/* Rent */}

          <div className="rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  For Rent
                </p>

                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {loading
                    ? "—"
                    : rentProperties}
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Properties available to rent
                </p>
              </div>

              <div className="rounded-2xl bg-purple-100 p-4">
                <Building2 className="h-7 w-7 text-purple-600" />
              </div>

            </div>
          </div>

        </div>

        {/* =====================================================
            SEARCH & FILTERS
        ===================================================== */}

        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row">

            {/* Search */}

            <div className="relative flex-1">

              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search by title, location, price, type..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Purpose */}

            <select
              value={purposeFilter}
              onChange={(event) =>
                setPurposeFilter(
                  event.target.value
                )
              }
              className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Purposes
              </option>

              <option value="Buy">
                For Sale
              </option>

              <option value="Rent">
                For Rent
              </option>
            </select>

            {/* Type */}

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(
                  event.target.value
                )
              }
              className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm font-semibold text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="All">
                All Types
              </option>

              <option value="House">
                House
              </option>

              <option value="Villa">
                Villa
              </option>

              <option value="Apartment">
                Apartment
              </option>

              <option value="Plot">
                Plot
              </option>

              <option value="Commercial">
                Commercial
              </option>
            </select>

          </div>

          {/* Filter Info */}

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-gray-500">

              Showing{" "}

              <span className="font-bold text-gray-900">
                {filteredProperties.length}
              </span>

              {" "}of{" "}

              <span className="font-bold text-gray-900">
                {properties.length}
              </span>

              {" "}properties

            </p>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                <X className="h-4 w-4" />

                Clear Filters
              </button>
            )}

          </div>
        </div>

        {/* =====================================================
            PROPERTY LIST
        ===================================================== */}

        <div className="mt-10">

          {/* Loading */}

          {loading ? (

            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

              <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600" />

              <p className="mt-4 text-gray-500">
                Loading properties...
              </p>

            </div>

          ) : filteredProperties.length === 0 ? (

            /* Empty / No Results */

            <div className="rounded-3xl bg-white p-16 text-center shadow-sm">

              <Building2 className="mx-auto h-12 w-12 text-gray-300" />

              <h2 className="mt-5 text-xl font-bold text-gray-900">

                {properties.length === 0
                  ? "No Properties Found"
                  : "No Matching Properties"}

              </h2>

              <p className="mt-2 text-gray-500">

                {properties.length === 0
                  ? "Add your first property to get started."
                  : "Try changing your search or filters."}

              </p>

              {properties.length === 0 ? (

                <button
                  onClick={() =>
                    setShowAddModal(true)
                  }
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5" />

                  Add Property
                </button>

              ) : (

                <button
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />

                  Clear Filters
                </button>

              )}

            </div>

          ) : (

            /* Property Cards */

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredProperties.map(
                (property) => (

                  <div
                    key={property.id}
                    className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >

                    {/* Image */}

                    <div className="relative h-56 bg-gray-200">

                      {property.image ? (

                        <img
                          src={property.image}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-gray-400">
                          <Building2 className="h-10 w-10" />
                        </div>

                      )}

                      {/* Type */}

                      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-gray-800 shadow">
                        {property.type}
                      </span>

                      {/* Purpose */}

                      <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow">
                        {property.purpose}
                      </span>

                    </div>

                    {/* Content */}

                    <div className="p-6">

                      <h2 className="line-clamp-1 text-xl font-bold text-gray-900">
                        {property.title}
                      </h2>

                      {/* Location */}

                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                        <MapPin className="h-4 w-4 shrink-0 text-blue-600" />

                        <span className="truncate">
                          {property.location}
                        </span>

                      </div>

                      {/* Price */}

                      <p className="mt-4 text-xl font-bold text-blue-600">
                        {property.price}
                      </p>

                      {/* Details */}

                      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-gray-100 pt-5">

                        {/* Bedrooms */}

                        <div className="text-center">

                          <BedDouble className="mx-auto h-5 w-5 text-gray-500" />

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {property.bedrooms}
                          </p>

                          <p className="text-xs text-gray-400">
                            Beds
                          </p>

                        </div>

                        {/* Bathrooms */}

                        <div className="text-center">

                          <Bath className="mx-auto h-5 w-5 text-gray-500" />

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {property.bathrooms}
                          </p>

                          <p className="text-xs text-gray-400">
                            Baths
                          </p>

                        </div>

                        {/* Area */}

                        <div className="text-center">

                          <Maximize className="mx-auto h-5 w-5 text-gray-500" />

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {property.area}
                          </p>

                          <p className="text-xs text-gray-400">
                            Area
                          </p>

                        </div>

                      </div>

                      {/* Actions */}

                      <div className="mt-6 grid grid-cols-3 gap-3">

                        {/* View */}

                        <a
                          href={`/properties/${property.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                        >
                          <ExternalLink className="h-4 w-4" />

                          View
                        </a>

                        {/* Edit */}

                        <button
                          onClick={() =>
                            openEditModal(property)
                          }
                          className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />

                          Edit
                        </button>

                        {/* Delete */}

                        <button
                          onClick={() =>
                            deleteProperty(
                              property.id
                            )
                          }
                          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />

                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          ADD PROPERTY MODAL
      ===================================================== */}

      <AddPropertyModal
        open={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
        onSuccess={() => {
          setShowAddModal(false);
          fetchProperties();
        }}
      />

      {/* =====================================================
          EDIT PROPERTY MODAL
      ===================================================== */}

      {selectedProperty && (
        <EditPropertyModal
          property={selectedProperty}
          onClose={closeEditModal}
          onUpdated={(updatedProperty) => {
            setProperties((prev) =>
              prev.map((property) =>
                property.id ===
                updatedProperty.id
                  ? updatedProperty
                  : property
              )
            );

            closeEditModal();
          }}
        />
      )}

    </main>
  );
}

/* =========================================================
   PAGE WRAPPER
   Fixes Next.js useSearchParams() build error
========================================================= */

export default function AdminPropertiesPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-blue-600" />

            <p className="mt-4 text-gray-500">
              Loading properties...
            </p>
          </div>
        </main>
      }
    >
      <AdminPropertiesContent />
    </Suspense>
  );
}