"use client";

import { useEffect, useState } from "react";

type Lead = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  status: string;
  source?: string;
  property?: { title: string; price: number; location: string };
};

export default function AdminLeadTable({ token }: { token: string }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/leads`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, [token]);

  if (loading) return <div className="card p-4">Loading leads...</div>;

  return (
    <div className="card p-4 overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Leads</h3>
        <span className="text-sm text-slate-500">{leads.length} total</span>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500">
            <th className="py-2">Name</th>
            <th>Phone</th>
            <th>Property</th>
            <th>Status</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-t border-slate-100">
              <td className="py-2 font-semibold text-slate-900">{lead.name}</td>
              <td>{lead.phone}</td>
              <td>
                {lead.property?.title ? (
                  <div>
                    <div className="font-medium">{lead.property.title}</div>
                    <div className="text-xs text-slate-500">{lead.property.location}</div>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500">General</span>
                )}
              </td>
              <td>{lead.status}</td>
              <td>{lead.source || "website"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

