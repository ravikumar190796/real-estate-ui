"use client";

import { FormEvent, useState } from "react";

type Props = { token: string; onCreated?: () => void };

export default function AdminPropertyForm({ token, onCreated }: Props) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputClass =
    "rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none w-full";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error("Failed");
      setMessage("Property created");
      form.reset();
      onCreated?.();
    } catch (err) {
      setMessage("Error creating property. Check fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 grid gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Add property</h3>
        {message ? <span className="text-sm text-green-700">{message}</span> : null}
      </div>
      <input name="title" placeholder="Title" className={inputClass} required />
      <textarea
        name="description"
        placeholder="Description"
        className={inputClass}
        rows={3}
        required
      />
      <input name="price" placeholder="Price (numeric)" className={inputClass} required />
      <input name="location" placeholder="Location" className={inputClass} required />
      <div className="grid md:grid-cols-2 gap-3">
        <select name="type" className={inputClass} required>
          <option value="">Type</option>
          <option>Apartment</option>
          <option>Villa</option>
          <option>Plot</option>
          <option>Commercial</option>
        </select>
        <select name="status" className={inputClass}>
          <option>Available</option>
          <option>Sold</option>
        </select>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <input name="bedrooms" placeholder="Bedrooms" className={inputClass} />
        <input name="bathrooms" placeholder="Bathrooms" className={inputClass} />
        <input name="size" placeholder="Size (sq.ft)" className={inputClass} />
      </div>
      <input name="amenities" placeholder="Amenities (comma separated)" className={inputClass} />
      <input name="lat" placeholder="Latitude" className={inputClass} />
      <input name="lng" placeholder="Longitude" className={inputClass} />
      <label className="text-sm text-slate-600">
        Upload images
        <input name="images" type="file" multiple className="block w-full text-sm" />
      </label>
      <label className="inline-flex items-center gap-2 text-sm text-slate-700">
        <input name="featured" type="checkbox" value="true" />
        Mark as featured
      </label>
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? "Saving..." : "Save property"}
      </button>
    </form>
  );
}

