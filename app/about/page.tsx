"use client";

import TextReveal from "@/app/Components/UI/TextReveal";


export default function About(){
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Triggers on Page Load */}
      <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600">
        <TextReveal 
          className="text-[12vw] md:text-[6vw] font-black text-white text-center"
          triggerOnLoad={true}
          delay={0.5}
          duration={1.2}
          stagger={0.15}
        >
          Welcome to
        </TextReveal>
        
        <TextReveal 
          className="text-[12vw] md:text-[6vw] font-black text-white text-center"
          triggerOnLoad={true}
          delay={1.0}
          duration={1.2}
          stagger={0.15}
        >
          GridWage
        </TextReveal>

        <TextReveal 
          className="text-[4vw] md:text-[1.5vw] text-white/90 text-center mt-8"
          triggerOnLoad={true}
          delay={1.5}
          duration={0.8}
        >
          Scroll down to see animations
        </TextReveal>
      </section>

      {/* Section 1 - Basic Scroll Trigger */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl">
          <TextReveal 
            className="text-[8vw] md:text-[4vw] font-bold text-gray-900 mb-8"
            delay={0}
            duration={1.0}
            stagger={0.1}
          >
            Basic Scroll Animation
          </TextReveal>
          
          <TextReveal 
            className="text-[4vw] md:text-[1.2vw] text-gray-600 leading-relaxed"
            delay={0.3}
            duration={0.8}
            stagger={0.05}
            lineHeight="1.8"
          >
            This text appears when you scroll to it. The animation is triggered when the element reaches 85% from the top of the viewport.
          </TextReveal>
        </div>
      </section>

      {/* Section 2 - Fast Animation */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-white">
        <div className="max-w-4xl">
          <TextReveal 
            className="text-[8vw] md:text-[4vw] font-bold text-blue-600 mb-8"
            delay={0}
            duration={0.6}
            stagger={0.05}
          >
            Fast Reveal Effect
          </TextReveal>
          
          <TextReveal 
            className="text-[4vw] md:text-[1.2vw] text-gray-700"
            delay={0.2}
            duration={0.5}
            stagger={0.03}
          >
            Quick and snappy animation with shorter duration and minimal stagger delay.
          </TextReveal>
        </div>
      </section>

      {/* Section 3 - Slow Dramatic */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl">
          <TextReveal 
            className="text-[8vw] md:text-[4vw] font-bold text-purple-600 mb-8"
            delay={0}
            duration={2.0}
            stagger={0.2}
          >
            Slow Dramatic Reveal
          </TextReveal>
          
          <TextReveal 
            className="text-[4vw] md:text-[1.2vw] text-gray-700"
            delay={0.5}
            duration={1.5}
            stagger={0.15}
          >
            This animation takes its time, creating a more dramatic and elegant entrance effect.
          </TextReveal>
        </div>
      </section>

      {/* Section 4 - Multiple Headlines Stacked */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-black text-white">
        <div className="max-w-6xl text-center">
          <TextReveal 
            className="text-[10vw] md:text-[5vw] font-black mb-4"
            delay={0}
            duration={1.0}
            stagger={0.1}
          >
            Hire Globally
          </TextReveal>
          
          <TextReveal 
            className="text-[10vw] md:text-[5vw] font-black mb-4"
            delay={0.3}
            duration={1.0}
            stagger={0.1}
          >
            Pay Locally
          </TextReveal>
          
          <TextReveal 
            className="text-[10vw] md:text-[5vw] font-black mb-8"
            delay={0.6}
            duration={1.0}
            stagger={0.1}
          >
            Stay Compliant
          </TextReveal>

          <TextReveal 
            className="text-[4vw] md:text-[1.5vw] text-white/80"
            delay={0.9}
            duration={0.8}
          >
            The future of global employment
          </TextReveal>
        </div>
      </section>

      {/* Section 5 - Left Aligned Content */}
      <section className="min-h-screen flex items-center px-8 md:px-16">
        <div className="max-w-5xl">
          <TextReveal 
            className="text-[3vw] md:text-[1vw] font-semibold text-green-600 uppercase tracking-wider mb-4"
            delay={0}
            duration={0.6}
          >
            Our Services
          </TextReveal>

          <TextReveal 
            className="text-[8vw] md:text-[4vw] font-bold text-gray-900 mb-8"
            delay={0.2}
            duration={1.2}
            stagger={0.1}
            lineHeight="1.2"
          >
            Employer of Record Solutions
          </TextReveal>
          
          <TextReveal 
            className="text-[4vw] md:text-[1.3vw] text-gray-600 leading-relaxed max-w-3xl"
            delay={0.5}
            duration={1.0}
            stagger={0.05}
            lineHeight="1.8"
          >
            GridWage's EOR infrastructure lets you onboard full-time employees anywhere, while we handle local labour laws, contracts, payroll, and taxes with absolute precision. Expand globally without the complexity.
          </TextReveal>
        </div>
      </section>

      {/* Section 6 - Gradient Text */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="max-w-4xl text-center">
          <TextReveal 
            className="text-[10vw] md:text-[5vw] font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            delay={0}
            duration={1.5}
            stagger={0.12}
          >
            Beautiful Gradient
          </TextReveal>
          
          <TextReveal 
            className="text-[10vw] md:text-[5vw] font-extrabold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            delay={0.4}
            duration={1.5}
            stagger={0.12}
          >
            Text Animations
          </TextReveal>
        </div>
      </section>

      {/* Section 7 - Two Column Layout */}
      <section className="min-h-screen flex items-center px-8 md:px-16 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <div>
            <TextReveal 
              className="text-[8vw] md:text-[3.5vw] font-bold text-gray-900 mb-6"
              delay={0}
              duration={1.0}
              stagger={0.1}
            >
              Why Choose GridWage?
            </TextReveal>
            
            <TextReveal 
              className="text-[4vw] md:text-[1.1vw] text-gray-600 leading-relaxed"
              delay={0.3}
              duration={0.8}
              stagger={0.05}
              lineHeight="1.7"
            >
              We make global hiring simple, compliant, and efficient. Our platform handles everything from contracts to payments.
            </TextReveal>
          </div>

          <div>
            <TextReveal 
              className="text-[8vw] md:text-[3.5vw] font-bold text-gray-900 mb-6"
              delay={0.2}
              duration={1.0}
              stagger={0.1}
            >
              Global Coverage
            </TextReveal>
            
            <TextReveal 
              className="text-[4vw] md:text-[1.1vw] text-gray-600 leading-relaxed"
              delay={0.5}
              duration={0.8}
              stagger={0.05}
              lineHeight="1.7"
            >
              Access talent in over 150 countries with full legal compliance and local expertise in every market.
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Section 8 - Quote Style */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-gray-900">
        <div className="max-w-5xl text-center">
          <TextReveal 
            className="text-[6vw] md:text-[2.5vw] font-light text-white/90 italic leading-relaxed"
            delay={0}
            duration={1.5}
            stagger={0.08}
            lineHeight="1.6"
          >
            "The best way to predict the future is to create it together, across borders and boundaries."
          </TextReveal>
          
          <TextReveal 
            className="text-[4vw] md:text-[1.2vw] text-white/60 mt-8"
            delay={0.8}
            duration={0.6}
          >
            — GridWage Team
          </TextReveal>
        </div>
      </section>

      {/* Section 9 - Statistics */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
          <div className="text-center">
            <TextReveal 
              className="text-[15vw] md:text-[5vw] font-black text-blue-600"
              delay={0}
              duration={1.0}
            >
              150+
            </TextReveal>
            <TextReveal 
              className="text-[4vw] md:text-[1.2vw] text-gray-700 mt-4"
              delay={0.3}
              duration={0.8}
            >
              Countries Covered
            </TextReveal>
          </div>

          <div className="text-center">
            <TextReveal 
              className="text-[15vw] md:text-[5vw] font-black text-green-600"
              delay={0.2}
              duration={1.0}
            >
              72%
            </TextReveal>
            <TextReveal 
              className="text-[4vw] md:text-[1.2vw] text-gray-700 mt-4"
              delay={0.5}
              duration={0.8}
            >
              Faster Expansion
            </TextReveal>
          </div>

          <div className="text-center">
            <TextReveal 
              className="text-[15vw] md:text-[5vw] font-black text-purple-600"
              delay={0.4}
              duration={1.0}
            >
              24/7
            </TextReveal>
            <TextReveal 
              className="text-[4vw] md:text-[1.2vw] text-gray-700 mt-4"
              delay={0.7}
              duration={0.8}
            >
              Support Available
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Section 10 - Final CTA */}
      <section className="min-h-screen flex items-center justify-center px-8 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl text-center">
          <TextReveal 
            className="text-[10vw] md:text-[5vw] font-black text-white mb-8"
            delay={0}
            duration={1.2}
            stagger={0.1}
          >
            Ready to Go Global?
          </TextReveal>
          
          <TextReveal 
            className="text-[5vw] md:text-[1.5vw] text-white/90 mb-12"
            delay={0.4}
            duration={0.8}
          >
            Start hiring internationally today
          </TextReveal>

          <div className="opacity-0 animate-fadeIn" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Extra scroll space */}
      <div className="h-20"></div>
    </div>
  );
}