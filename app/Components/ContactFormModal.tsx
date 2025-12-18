"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ContactFormModal Component
 * Modal with contact form
 */
export default function ContactFormModal({
  isOpen,
  onClose,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-[5vw] md:p-[2vw]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[3vw] md:rounded-[1.5vw] p-[8vw] md:p-[3vw] w-full max-w-[90vw] md:max-w-[40vw] max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-[4vw] right-[4vw] md:top-[1.5vw] md:right-[1.5vw] text-[var(--gray-0)] hover:text-[var(--text)] transition-colors"
              >
                <svg
                  className="w-[6vw] h-[6vw] md:w-[2vw] md:h-[2vw]"
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

              {/* Form Header */}
              <h3 className="text-[6vw] md:text-[2vw] font-bold text-[var(--text)] mb-[2vw] md:mb-[1vw]">
                Get in Touch
              </h3>
              <p className="text-[4vw] md:text-[1vw] text-[var(--gray-0)] mb-[6vw] md:mb-[2vw]">
                Fill out the form below and we'll get back to you soon.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-[4vw] md:space-y-[1.5vw]">
                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[3.5vw] md:text-[0.9vw] font-medium text-[var(--text)] mb-[2vw] md:mb-[0.5vw]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-[4vw] py-[3vw] md:px-[1.5vw] md:py-[0.8vw] text-[4vw] md:text-[1vw] border-[0.3vw] md:border-[0.15vw] border-gray-300 rounded-[2vw] md:rounded-[0.8vw] focus:outline-none focus:border-[#7C3AED] transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[3.5vw] md:text-[0.9vw] font-medium text-[var(--text)] mb-[2vw] md:mb-[0.5vw]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-[4vw] py-[3vw] md:px-[1.5vw] md:py-[0.8vw] text-[4vw] md:text-[1vw] border-[0.3vw] md:border-[0.15vw] border-gray-300 rounded-[2vw] md:rounded-[0.8vw] focus:outline-none focus:border-[#7C3AED] transition-colors"
                  />
                </div>

                {/* Company Input */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-[3.5vw] md:text-[0.9vw] font-medium text-[var(--text)] mb-[2vw] md:mb-[0.5vw]"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-[4vw] py-[3vw] md:px-[1.5vw] md:py-[0.8vw] text-[4vw] md:text-[1vw] border-[0.3vw] md:border-[0.15vw] border-gray-300 rounded-[2vw] md:rounded-[0.8vw] focus:outline-none focus:border-[#7C3AED] transition-colors"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[3.5vw] md:text-[0.9vw] font-medium text-[var(--text)] mb-[2vw] md:mb-[0.5vw]"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-[4vw] py-[3vw] md:px-[1.5vw] md:py-[0.8vw] text-[4vw] md:text-[1vw] border-[0.3vw] md:border-[0.15vw] border-gray-300 rounded-[2vw] md:rounded-[0.8vw] focus:outline-none focus:border-[#7C3AED] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-[6vw] py-[3vw] md:px-[2vw] md:py-[0.8vw] rounded-full text-[4vw] md:text-[1vw] font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
