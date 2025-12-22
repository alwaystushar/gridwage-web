import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "./Components/UI/LoadingContext";
import Header from "./Components/UI/Header";
import LoadingScreen from "./Components/UI/LoadingScreen";
import GridwageFooter from "./Components/UI/GridwageFooter";
import ScrollToTop from "./Components/ScrollToTop";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "GridWage - Global Payroll & Compliance Solutions",
  description:
    "Hire globally with zero entity setup. GridWage's EOR infrastructure handles local labour laws, contracts, payroll, and taxes with absolute precision.",
  icons: {
    icon: "/fav.svg",
  },
  openGraph: {
    title: "GridWage - Global Payroll & Compliance Solutions",
    description:
      "Hire globally with zero entity setup. GridWage's EOR infrastructure handles local labour laws, contracts, payroll, and taxes with absolute precision.",
    url: "https://gridwage.com", // TODO: Replace with your actual domain
    siteName: "GridWage",
    images: [
      {
        url: ".og-images/home.png", // Place this image in /public folder
        width: 1200,
        height: 630,
        alt: "GridWage - Global Payroll & Compliance Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GridWage - Global Payroll & Compliance Solutions",
    description:
      "Hire globally with zero entity setup. GridWage's EOR infrastructure handles local labour laws, contracts, payroll, and taxes with absolute precision.",
    images: ["/og-gridwage.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${plusJakarta.variable} ${tajawal.variable} antialiased`}
      >
        <LoadingProvider>
          <LoadingScreen />
          <Header />
          {children}
          <GridwageFooter />
          <ScrollToTop />
        </LoadingProvider>
      </body>
    </html>
  );
}
