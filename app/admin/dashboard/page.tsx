"use client";

import { useEffect, useState } from "react";
import AdminLeadTable from "@/components/AdminLeadTable";
import AdminPropertyForm from "@/components/AdminPropertyForm";
import PropertyCard, { Property } from "@/components/PropertyCard";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      router.push("/admin/login");
      return;
    }
    setToken(t);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    const load = async () => {
      const res = await fetch(`${apiUrl}/api/properties`);
      const data = await res.json();
      setProperties(data);
    };
    load();
  }, [token]);

  if (!token) {
    return null;
  }

  return (
    <div className="container py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="badge">Admin</div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        </div>
        <button
          className="text-sm text-red-600 font-semibold"
          onClick={() => {
            localStorage.removeItem("admin_token");
            router.push("/admin/login");
          }}
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AdminPropertyForm token={token} onCreated={() => router.refresh()} />
        <div className="md:col-span-2 card p-4">
          <h3 className="text-lg font-semibold mb-3">Latest properties</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {properties.slice(0, 4).map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        </div>
      </div>

      <AdminLeadTable token={token} />
    </div>
  );
}

