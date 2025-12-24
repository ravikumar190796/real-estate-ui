import LeadForm from "@/components/LeadForm";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { fetchProperties } from "@/lib/api";

type Props = {
  searchParams: {
    location?: string;
    type?: string;
    status?: string;
    minPrice?: string;
    maxPrice?: string;
  };
};

export const metadata = {
  title: "Properties | Skyline Estates",
  description: "Browse curated apartments, villas, plots, and commercial assets.",
};

export default async function PropertiesPage({ searchParams }: Props) {
  const properties = await fetchProperties(searchParams).catch(() => []);

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
        {properties.length ? (
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

