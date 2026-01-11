// app/demo/page.tsx
import DemoForm from "./components/DemoForm";

export const metadata = {
  title: "Book a Demo | GridWage",
  description: "See how GridWage can transform your global workforce management. Schedule a personalized demo with our team.",
  openGraph: {
    title: "Book a Demo | GridWage",
    description: "See how GridWage can transform your global workforce management.",
    url: "https://gridwage.com/demo",
    siteName: "GridWage",
    images: [
      {
        url: "https://gridwage.com/og-demo.png",
        width: 1200,
        height: 630,
        alt: "Book a Demo - GridWage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Demo | GridWage",
    description: "See how GridWage can transform your global workforce management.",
    images: ["https://gridwage.com/og-demo.png"],
    creator: "@gridwage",
  },
};

export default function DemoPage() {
  return (

      <div className="grid-container items-center max-sm:py-[16vw] md:pt-[0vw] ">
        {/* Left Side - Form */}
        <div className="col-span-12 md:col-span-6 md:pl-[8.4vw]">
          <div className="mb-[4.8vw] md:mb-[2.4vw]">
            <h1 className="text-[6.4vw] md:text-[2.88vw] font-semibold mb-[1.6vw] md:mb-[0.8vw] leading-tight">
              Book Your Demo
            </h1>
            <p className="text-[3.2vw] md:text-[0.96vw] text-[var(--gray-0)] leading-relaxed">
              See how GridWage can transform your global workforce management.
            </p>
          </div>
          <DemoForm />
        </div>

        {/* Right Side - Image */}
        <div className="col-span-12 md:col-span-6 hidden md:block ">
          <div className="sticky relative top-[8vw]">
            <div className="relative absolute left-[0vw] h-[100vh] w-[48vw] aspect-[4/4] overflow-hidden bg-gradient-to-br from-[var(--brand-100)] to-[var(--brand-50)]">
              <img
                src="/cta/form.jpg"
                alt="Global workforce management"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-[4vw] left-[1.6vw] right-[1.6vw]">
                <div className="grid grid-cols-3 gap-[0.8vw]">
                  <div className="bg-white/90 backdrop-blur-sm rounded-[0.64vw] p-[0.96vw]">
                    <div className="text-[1.6vw] font-bold text-[var(--brand-600)]">150+</div>
                    <div className="text-[0.64vw] text-[var(--gray-0)]">Countries</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-[0.64vw] p-[0.96vw]">
                    <div className="text-[1.6vw] font-bold text-[var(--brand-600)]">10K+</div>
                    <div className="text-[0.64vw] text-[var(--gray-0)]">Companies</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm rounded-[0.64vw] p-[0.96vw]">
                    <div className="text-[1.6vw] font-bold text-[var(--brand-600)]">99.9%</div>
                    <div className="text-[0.64vw] text-[var(--gray-0)]">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}
