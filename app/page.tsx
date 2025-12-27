import type { Metadata } from "next";
import HomePage from "./home/page";

export const metadata: Metadata = {
  title: "GridWage - Global Payroll & Compliance Solutions",
  description: "Hire globally with zero entity setup. GridWage's EOR infrastructure handles local labour laws, contracts, payroll, and taxes with absolute precision.",
  openGraph: {
    title: "GridWage - Global Payroll & Compliance Solutions",
    description: "Hire globally with zero entity setup. GridWage's EOR infrastructure handles local labour laws, contracts, payroll, and taxes with absolute precision.",
    url: "https://gridwage.com",
    siteName: "GridWage",
    images: [
      {
        url: "https://gridwage.com/og-images/home.png",  // ← Starts with / (no dot)
        width: 1200,
        height: 630,
        alt: "GridWage Homepage",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://gridwage.com//og-images/home.png"],
  },
};

export default function Page() {
  return (
    <>
      <HomePage />
    </>
  );
}
