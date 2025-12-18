import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import "./globals.css";
import { LoadingProvider } from "./Components/UI/LoadingContext";
import Header from "./Components/UI/Header";
import LoadingScreen from "./Components/UI/LoadingScreen";

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
  description: "Hire globally with zero entity setup. GridWage's EOR infrastructure handles local labour laws, contracts, payroll, and taxes with absolute precision.",
  icons: {
    icon: "/fav.svg",
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
        style={{
          fontFamily: 'var(--font-plus-jakarta), Plus Jakarta Sans, sans-serif'
        }}
      >
        <LoadingProvider>
          <LoadingScreen />
          <Header />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
