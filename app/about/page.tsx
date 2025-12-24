export const metadata = {
  title: "About | Skyline Estates",
  description: "Trusted residential and commercial real estate advisors in India.",
};

export default function AboutPage() {
  return (
    <div className="container py-12 space-y-8">
      <div className="max-w-3xl space-y-3">
        <div className="badge">About Skyline Estates</div>
        <h1 className="text-3xl font-semibold text-slate-900">Experience that de-risks your purchase</h1>
        <p className="text-slate-600">
          Skyline Estates is a team of seasoned advisors across Mumbai, Bengaluru, Pune, NCR, and Hyderabad. We specialize
          in luxury residential, plotted development, and Grade-A commercial assets with strong rental yields. From the
          first shortlist to registration, our diligence-first approach keeps deals transparent and fast.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6 space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">On-ground intel</h3>
          <p className="text-sm text-slate-600">
            We source inventory directly from developers and channel partners, ensuring early access to pricing and payment plans.
          </p>
        </div>
        <div className="card p-6 space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Compliance first</h3>
          <p className="text-sm text-slate-600">
            RERA registered operations, title checks with empaneled lawyers, and bank approvals validated before we recommend a project.
          </p>
        </div>
        <div className="card p-6 space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">Post-sale support</h3>
          <p className="text-sm text-slate-600">
            Tenant discovery, interiors partners, and property management to keep your asset performing after purchase.
          </p>
        </div>
      </div>
    </div>
  );
}

