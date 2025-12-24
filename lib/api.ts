import { Property } from "@/components/PropertyCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchProperties(params: Record<string, string> = {}) {
  const url = new URL(`${API_URL}/api/properties`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return (await res.json()) as Property[];
}

export async function fetchPropertyById(id: string) {
  const res = await fetch(`${API_URL}/api/properties/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Property not found");
  return (await res.json()) as Property;
}

