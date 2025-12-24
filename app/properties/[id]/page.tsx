import LeadForm from "@/components/LeadForm";
import { fetchPropertyById } from "@/lib/api";
import Link from "next/link";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props) {
  const property = await fetchPropertyById(params.id).catch(() => null);
  if (!property) {
    return { title: "Property not found" };
  }
  return {
    title: `${property.title} | Skyline Estates`,
    description: `${property.title} in ${property.location} priced at ₹${property.price?.toLocaleString("en-IN")}`,
  };
}

export default async function PropertyDetails({ params }: Props) {
  const property = await fetchPropertyById(params.id);
  const priceLabel = property.price ? `₹${property.price.toLocaleString("en-IN")}` : "Price on request";

  return (
    <div className="container py-10 space-y-10">
      <Link href="/properties" className="text-sm text-blue-600 font-semibold">
        ← Back to listings
      </Link>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            {(property.images || [property.coverImage]).filter(Boolean).map((img) => (
              <div key={img} className="h-52 w-full overflow-hidden rounded-xl bg-slate-100">
                <img src={img!} alt={property.title} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="badge">{property.type}</div>
            <h1 className="text-3xl font-semibold text-slate-900">{property.title}</h1>
            <p className="text-slate-600">{property.location}</p>
            <div className="text-2xl font-semibold text-slate-900">{priceLabel}</div>
          </div>
          <div className="card p-5 space-y-3">
            <h3 className="text-lg font-semibold">Overview</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{property.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-slate-700">
              {property.bedrooms ? <div>Bedrooms: {property.bedrooms}</div> : null}
              {property.bathrooms ? <div>Bathrooms: {property.bathrooms}</div> : null}
              {property.size ? <div>Area: {property.size} sq.ft</div> : null}
              <div>Status: {property.status}</div>
            </div>
          </div>
          {property.amenities?.length ? (
            <div className="card p-5 space-y-3">
              <h3 className="text-lg font-semibold">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((a) => (
                  <span key={a} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          {property.coordinates?.lat && property.coordinates?.lng ? (
            <div className="card p-5 space-y-3">
              <h3 className="text-lg font-semibold">Location</h3>
              <iframe
                className="w-full h-72 rounded-lg border border-slate-200"
                loading="lazy"
                src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&output=embed`}
              />
            </div>
          ) : null}
        </div>
        <div className="space-y-4">
          <LeadForm propertyId={property._id} />
          <div className="card p-4 space-y-2">
            <h4 className="text-md font-semibold text-slate-900">Quick actions</h4>
            <a href="https://wa.me/919876543210" className="btn-primary w-full text-center">
              WhatsApp Advisor
            </a>
            <a href="tel:+919876543210" className="w-full text-center rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-900">
              Call +91 98765 43210
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

