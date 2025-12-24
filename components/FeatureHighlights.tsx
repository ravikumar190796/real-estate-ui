const features = [
  {
    title: "Trusted advisory",
    desc: "RERA compliant advisors with 18+ years of on-ground experience.",
  },
  {
    title: "Pan-India inventory",
    desc: "Apartments, villas, plots, and Grade-A commercial assets across metros.",
  },
  {
    title: "360° due diligence",
    desc: "Title checks, pricing intelligence, bank approvals, and site visits handled.",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="container py-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="badge">Why buyers choose Skyline</div>
        <h2 className="text-3xl font-semibold text-slate-900">Clarity, speed, and better deals</h2>
        <p className="text-slate-600">
          We shortlist the right projects, negotiate hard, and keep paperwork watertight so you invest with confidence.
        </p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="card p-6 space-y-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              •
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{f.title}</h3>
            <p className="text-sm text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

