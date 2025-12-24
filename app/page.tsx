"use client";

import { useEffect, useState } from "react";
import FeatureHighlights from "@/components/FeatureHighlights";
import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import PropertyCard, { Property } from "@/components/PropertyCard";
import StatsBar from "@/components/StatsBar";
import Testimonials from "@/components/Testimonials";
import { fetchProperties } from "@/lib/api";

export default function Home() {
  const [featured, setFeatured] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties({ featured: "true" })
      .then(setFeatured)
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Hero />
      <StatsBar />

      <section className="container py-14 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="badge">Featured picks</div>
            <h2 className="text-3xl font-semibold text-slate-900 mt-2">Handpicked to sell fast</h2>
          </div>
          <a href="/properties" className="text-sm font-semibold text-blue-600">
            View all
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {loading ? (
            <p className="text-slate-600">Loading featured properties...</p>
          ) : featured.length ? (
            featured.map((property) => <PropertyCard key={property._id} property={property} />)
          ) : (
            <p className="text-slate-600">No featured properties yet. Check back soon.</p>
          )}
        </div>
      </section>

      <FeatureHighlights />
      <Testimonials />

      <section className="container py-16 grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <div className="badge">Talk to an expert</div>
          <h2 className="text-3xl font-semibold text-slate-900">
            Get curated options that match your budget and timeline.
          </h2>
          <p className="text-slate-600">
            Share a few details and a senior advisor will call you with availability, rental yield numbers, and site visit options.
          </p>
          <ul className="space-y-2 text-slate-700">
            <li>• Zero brokerage for primary sales</li>
            <li>• Due diligence and loan assistance</li>
            <li>• Virtual or in-person site visits</li>
          </ul>
        </div>
        <LeadForm />
      </section>
    </>
  );
}
