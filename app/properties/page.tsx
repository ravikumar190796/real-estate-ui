"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import PropertyCard, { Property } from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { fetchProperties } from "@/lib/api";

function PropertiesPageContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const filters = useMemo(() => {
    const params: Record<string, string> = {};
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (location) params.location = location;
    if (type) params.type = type;
    if (status) params.status = status;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    return params;
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    fetchProperties(filters)
      .then(setProperties)
      .catch(() => setProperties([]))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="container py-12 space-y-8">
      <div className="flex flex-col gap-3">
        <div className="badge">Inventory</div>
        <h1 className="text-3xl font-semibold text-slate-900">Find your next investment</h1>
        <p className="text-slate-600">
          Filter by location, budget, and property type. Speak to us for off-market options.
        </p>
      </div>

      <PropertyFilters />

      <div className="grid gap-6 md:grid-cols-3">
        {loading ? (
          <p className="text-slate-600">Loading properties...</p>
        ) : properties.length ? (
          properties.map((property) => <PropertyCard key={property._id} property={property} />)
        ) : (
          <p className="text-slate-600">No properties match these filters. Try another search.</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="card p-6 space-y-3">
          <h3 className="text-xl font-semibold text-slate-900">Need custom options?</h3>
          <p className="text-slate-600">
            We maintain private inventory and early access launches with better pricing and payment plans.
          </p>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• Site visit scheduling</li>
            <li>• Rental yield and ROI analysis</li>
            <li>• Loan and paperwork assistance</li>
          </ul>
        </div>
        <LeadForm compact />
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="container py-12">
        <p className="text-slate-600">Loading...</p>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  );
}

