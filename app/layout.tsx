import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export const metadata: Metadata = {
  title: "Skyline Estates | Premium Properties in India",
  description:
    "Discover premium residential and commercial properties across India. Book site visits, talk to experts, and invest with confidence.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Skyline Estates | Premium Properties",
    description: "High-conversion real estate experience built for lead generation.",
    url: siteUrl,
    siteName: "Skyline Estates",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Skyline Estates",
      },
    ],
  },
  alternates: { canonical: siteUrl },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Skyline Estates",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  areaServed: "India",
  telephone: "+91-9876543210",
  sameAs: ["https://www.facebook.com", "https://www.instagram.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-50 text-slate-900 antialiased`}
      >
        <Script id="org-schema" type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </Script>
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`}
            </Script>
          </>
        ) : null}
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
