const testimonials = [
  {
    name: "Anjali & Karan (Mumbai)",
    feedback:
      "They shortlisted 4 projects that matched our brief and negotiated a better launch price. The team managed all paperwork smoothly.",
  },
  {
    name: "Rohit, NRI Investor",
    feedback:
      "Their weekly updates and due diligence reports were detailed. I closed a commercial floor in 3 weeks with solid rental yield.",
  },
  {
    name: "Global Pharma (Bengaluru)",
    feedback:
      "We needed 20,000 sq.ft. on a tight timeline. Skyline sourced options fast and secured a tenant-improvement package from the developer.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-900 text-white py-16">
      <div className="container space-y-8">
        <div>
          <div className="badge bg-white/10 border border-white/20 text-white">Client Stories</div>
          <h2 className="text-3xl font-semibold mt-3">Proof you can trust.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card bg-white/5 border-white/10 text-white p-6 space-y-4">
              <p className="text-sm leading-relaxed text-slate-100">“{t.feedback}”</p>
              <div className="text-sm font-semibold">{t.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

