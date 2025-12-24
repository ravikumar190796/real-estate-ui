const stats = [
  { label: "Transactions closed", value: "850+" },
  { label: "Cities served", value: "10" },
  { label: "Avg. closure time", value: "18 days" },
  { label: "Repeat clients", value: "72%" },
];

export default function StatsBar() {
  return (
    <section className="container py-10">
      <div className="grid gap-6 rounded-2xl bg-white shadow-lg border border-slate-100 px-6 py-5 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="space-y-1">
            <div className="text-2xl font-semibold text-slate-900">{s.value}</div>
            <p className="text-sm text-slate-600">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

