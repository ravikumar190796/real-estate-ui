import Link from "next/link";

export type Property = {
  _id: string;
  title: string;
  price: number;
  location: string;
  type: string;
  status: string;
  coverImage?: string;
  images?: string[];
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  description?: string;
  amenities?: string[];
  coordinates?: { lat?: number; lng?: number };
};

export default function PropertyCard({ property }: { property: Property }) {
  const image = property.coverImage || property.images?.[0] || "/window.svg";
  const priceLabel = property.price ? `₹${property.price.toLocaleString("en-IN")}` : "Price on request";

  return (
    <div className="card overflow-hidden">
      <div className="relative h-52 w-full bg-slate-100">
        <img src={image} alt={property.title} className="h-full w-full object-cover" />
        <div className="absolute left-3 top-3 badge">{property.type}</div>
        <div className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          {property.status}
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{property.title}</h3>
        </div>
        <p className="text-sm text-slate-600">{property.location}</p>
        <div className="flex flex-wrap gap-3 text-xs text-slate-600">
          {property.bedrooms ? <span>{property.bedrooms} Bed</span> : null}
          {property.bathrooms ? <span>{property.bathrooms} Bath</span> : null}
          {property.size ? <span>{property.size} sq.ft</span> : null}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold text-slate-900">{priceLabel}</span>
          <Link
            href={`/properties/${property._id}`}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
}

