import Link from "next/link";
import LeadForm from "./LeadForm";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-700 text-white">
      <div className="absolute inset-0 opacity-20 bg-[url('/globe.svg')] bg-cover bg-center" />
      <div className="container relative py-20 md:py-28 grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-6">
          <div className="badge bg-white/10 text-white border border-white/20">
            RERA compliant • Pan-India network
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            Premium homes & commercial assets that appreciate faster.
          </h1>
          <p className="text-lg text-slate-200">
            From luxury residences to high-yield commercial spaces, our experts shortlist the best-performing projects and handhold you from discovery to registration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link className="btn-primary" href="/contact">
              Book a call
            </Link>
            <a
              href="https://wa.me/919876543210"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-white font-semibold hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-200">
            <div>
              <div className="text-xl font-bold">850+</div>
              Transactions closed
            </div>
            <div>
              <div className="text-xl font-bold">18+ years</div>
              Advisor experience
            </div>
            <div>
              <div className="text-xl font-bold">₹1,200 Cr</div>
              Assets managed
            </div>
          </div>
        </div>
        <LeadForm compact />
      </div>
    </section>
  );
}

