"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface Toast {
  message: string;
  type: "success" | "error";
}

export default function ContactFormModal({
  isOpen,
  onClose,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setToast(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("message", formData.message);

      const response = await fetch("/contact-form.php", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();

      if (data.success) {
        setToast({ message: data.message, type: "success" });
        setFormData({ name: "", email: "", company: "", message: "" });
        setTimeout(onClose, 2500);
      } else {
        setToast({
          message: data.message || "Submission failed",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Form error:", error);
      setToast({ message: "Network error. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    [formData]
  );

  const hideToast = () => setToast(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Toast */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: "2vw" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "2vw" }}
                className="fixed bottom-[4vw] left-1/2 -translate-x-1/2 z-[10000] px-[4vw] py-[2vw] md:px-[2vw] md:py-[1vw] rounded-[2vw] md:rounded-[0.8vw] shadow-2xl border max-w-[80vw] md:max-w-[36vw] text-[3vw] md:text-[0.95vw] leading-[1.3] bg-emerald-500 text-white border-emerald-300"
                onClick={hideToast}
              >
                {toast.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: "3vw" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: "3vw" }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="fixed inset-0 flex items-center justify-center z-[9999] p-[4vw] md:p-[2vw]"
          >
            {/* Card: full on mobile, ~20% smaller on desktop via max-w */}
            <div className="w-full max-w-[94vw] md:max-w-[60vw] rounded-[4vw] md:rounded-[1.4vw] overflow-hidden bg-white shadow-2xl flex flex-col md:flex-row">
              {/* Left: image – desktop only, narrower */}
              <div className="hidden md:block relative w-[28vw] h-[44vw] max-h-[90vh]">
                <Image
                  src="/cta/form.png"
                  alt="Get in touch"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
                <div className="absolute bottom-[1.8vw] left-[1.8vw] right-[1.8vw] text-white">
                  <h3 className="text-[1.7vw] font-bold leading-[1.2] mb-[0.7vw]">
                    Ready to transform your{" "}
                    <span className="text-[#E879F9]">global workforce?</span>
                  </h3>
                  <p className="text-[0.95vw] opacity-90 leading-[1.5]">
                    Let&apos;s discuss how we can help you scale borderlessly.
                  </p>
                </div>
              </div>

              {/* Right: form – 20% smaller desktop sizing */}
              <div className="relative w-full md:w-[32vw] px-[6vw] py-[6vw] md:px-[2.4vw] md:py-[2.1vw] flex flex-col md:h-[44vw] md:max-h-[90vh]">
                {/* Close button */}
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="absolute top-[4vw] right-[4vw] md:top-[1.4vw] md:right-[1.4vw] text-[var(--gray-0)] hover:text-[var(--text)] transition-colors"
                >
                  <svg
                    className="w-[4.5vw] h-[4.5vw] md:w-[1.4vw] md:h-[1.4vw]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Header */}
                <div className="mb-[5vw] md:mb-[1.6vw] md:pr-[1.6vw]">
                  <h3 className="text-[6vw] md:text-[2vw] font-bold text-[var(--text)] leading-[1.2] mb-[2vw] md:mb-[0.6vw]">
                    Get in Touch
                  </h3>
                  <p className="text-[3.5vw] md:text-[0.95vw] text-[var(--gray-0)] leading-[1.6]">
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[3.2vw] md:gap-[1.15vw] flex-1"
                >
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[3.2vw] md:text-[0.95vw] font-medium text-[var(--text)] mb-[1.4vw] md:mb-[0.45vw]"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-0 py-[1.4vw] md:py-[0.6vw] text-[3.4vw] md:text-[0.95vw] border-0 border-b-[0.15vw] md:border-b-[0.08vw] border-gray-300 focus:border-[#7C3AED] focus:outline-none bg-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[3.2vw] md:text-[0.95vw] font-medium text-[var(--text)] mb-[1.4vw] md:mb-[0.45vw]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-0 py-[1.4vw] md:py-[0.6vw] text-[3.4vw] md:text-[0.95vw] border-0 border-b-[0.15vw] md:border-b-[0.08vw] border-gray-300 focus:border-[#7C3AED] focus:outline-none bg-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-[3.2vw] md:text-[0.95vw] font-medium text-[var(--text)] mb-[1.4vw] md:mb-[0.45vw]"
                    >
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-0 py-[1.4vw] md:py-[0.6vw] text-[3.4vw] md:text-[0.95vw] border-0 border-b-[0.15vw] md:border-b-[0.08vw] border-gray-300 focus:border-[#7C3AED] focus:outline-none bg-transparent"
                      placeholder="Your company"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex-1 flex flex-col">
                    <label
                      htmlFor="message"
                      className="block text-[3.2vw] md:text-[0.95vw] font-medium text-[var(--text)] mb-[1.4vw] md:mb-[0.45vw]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-0 py-[1.4vw] md:py-[0.6vw] text-[3.4vw] md:text-[0.95vw] border-0 border-b-[0.15vw] md:border-b-[0.08vw] border-gray-300 focus:border-[#7C3AED] focus:outline-none bg-transparent resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {/* Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting ? {} : { scale: 0.98 }}
                    className="w-full mt-[3vw] md:mt-[0.7vw] bg-[var(--brand-500)] hover:bg-[#6D28D9] text-white py-[2.6vw] md:py-[0.8vw] rounded-[999px] text-[3.6vw] md:text-[0.95vw] font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
