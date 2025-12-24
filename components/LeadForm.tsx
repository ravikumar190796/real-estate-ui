"use client";

import { FormEvent, useState } from "react";

type Props = {
  propertyId?: string;
  compact?: boolean;
};

export default function LeadForm({ propertyId, compact }: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const phone = String(formData.get("phone") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    if (!name || !phone) {
      setError("Name and phone are required");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          propertyId,
          source: propertyId ? "property" : "contact",
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to submit");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`card ${compact ? "p-4" : "p-6"} space-y-3`}
      aria-live="polite"
    >
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {propertyId ? "Enquire about this property" : "Talk to an advisor"}
        </h3>
        <p className="text-sm text-slate-600">
          Get a call-back with availability, pricing, and site visit slots.
        </p>
      </div>
      <input
        name="name"
        placeholder="Full name"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <input
        name="phone"
        placeholder="Phone number"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email (optional)"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <textarea
        name="message"
        placeholder="Share your requirements"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        rows={compact ? 3 : 4}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        className="btn-primary w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting..." : "Request a call"}
      </button>
      {status === "success" ? (
        <p className="text-sm text-green-600">Thanks! We will reach out shortly.</p>
      ) : null}
    </form>
  );
}

