"use client";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-5 right-4 flex flex-col gap-3 z-40">
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="rounded-full bg-green-500 text-white shadow-lg px-4 py-3 font-semibold hover:scale-105 transition"
      >
        WhatsApp Us
      </a>
      <a
        href="tel:+919876543210"
        className="rounded-full bg-slate-900 text-white shadow-lg px-4 py-3 font-semibold hover:scale-105 transition"
      >
        Call Now
      </a>
    </div>
  );
}

