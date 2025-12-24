"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/admin/login", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-slate-900 to-blue-600 text-white flex items-center justify-center text-lg font-bold">
            SE
          </div>
          <div>
            <div>Skyline Estates</div>
            <p className="text-xs text-slate-500">Luxury & Commercial Realty</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-slate-900 ${
                pathname === item.href ? "text-slate-900 font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a className="btn-primary text-sm" href="tel:+919876543210">
            Call +91 98765 43210
          </a>
        </nav>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="text-lg font-semibold text-slate-800">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open ? (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="container flex flex-col py-3 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-700"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a className="btn-primary text-center" href="tel:+919876543210">
              Call +91 98765 43210
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

