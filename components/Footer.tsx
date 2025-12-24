export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-900 to-blue-600 text-white flex items-center justify-center text-lg font-bold">
              SE
            </div>
            Skyline Estates
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Residential and commercial experts helping investors secure high-performing assets across India.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><a href="/about">About</a></li>
            <li><a href="/properties">Properties</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>+91 98765 43210</li>
            <li>hello@skylineestates.in</li>
            <li>Mumbai · Bengaluru · NCR</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Compliance</h4>
          <p className="mt-3 text-sm text-slate-600">
            RERA compliant advisors. Transparent paperwork, diligence-first approach, and zero hidden charges.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Skyline Estates. All rights reserved.
      </div>
    </footer>
  );
}

