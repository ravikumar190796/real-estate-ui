"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="card p-4 grid gap-3 md:grid-cols-5">
      <input
        placeholder="Location"
        className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        defaultValue={searchParams.get("location") || ""}
        onChange={(e) => updateQuery("location", e.target.value)}
      />
      <select
        className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        defaultValue={searchParams.get("type") || ""}
        onChange={(e) => updateQuery("type", e.target.value)}
      >
        <option value="">Property type</option>
        <option>Apartment</option>
        <option>Villa</option>
        <option>Plot</option>
        <option>Commercial</option>
      </select>
      <select
        className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        defaultValue={searchParams.get("status") || ""}
        onChange={(e) => updateQuery("status", e.target.value)}
      >
        <option value="">Status</option>
        <option value="Available">Available</option>
        <option value="Sold">Sold</option>
      </select>
      <input
        placeholder="Min budget (₹)"
        className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        defaultValue={searchParams.get("minPrice") || ""}
        onBlur={(e) => updateQuery("minPrice", e.target.value)}
      />
      <input
        placeholder="Max budget (₹)"
        className="rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        defaultValue={searchParams.get("maxPrice") || ""}
        onBlur={(e) => updateQuery("maxPrice", e.target.value)}
      />
    </div>
  );
}

