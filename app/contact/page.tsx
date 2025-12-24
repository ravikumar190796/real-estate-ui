import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Contact | Skyline Estates",
  description: "Book a site visit or speak to our advisors.",
};

export default function ContactPage() {
  return (
    <div className="container py-12 grid gap-10 md:grid-cols-2">
      <div className="space-y-4">
        <div className="badge">Get in touch</div>
        <h1 className="text-3xl font-semibold text-slate-900">We respond within one business day</h1>
        <p className="text-slate-600">
          Tell us what you are looking for and we will share shortlists, pricing, and site visit slots.
        </p>
        <div className="card p-5 space-y-2">
          <div className="text-sm text-slate-600">Call</div>
          <a href="tel:+919876543210" className="text-lg font-semibold text-slate-900">
            +91 98765 43210
          </a>
          <div className="text-sm text-slate-600 pt-3">WhatsApp</div>
          <a href="https://wa.me/919876543210" className="text-lg font-semibold text-slate-900">
            Chat with an advisor
          </a>
          <div className="text-sm text-slate-600 pt-3">Email</div>
          <div className="text-lg font-semibold text-slate-900">hello@skylineestates.in</div>
          <div className="text-sm text-slate-600 pt-3">Offices</div>
          <div className="text-slate-800 font-semibold">Mumbai · Bengaluru · NCR</div>
        </div>
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Visit us</h3>
          <iframe
            className="w-full h-64 rounded-lg border border-slate-200"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.888672007594!2d72.87765577524747!3d19.06868035212875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c90fef4df7f1%3A0x1f667ddb5ccf31c3!2sBKC!5e0!3m2!1sen!2sin!4v1704697928772!5m2!1sen!2sin"
          />
        </div>
      </div>
      <LeadForm />
    </div>
  );
}

