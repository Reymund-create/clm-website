"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    q: "What is AI SEO or AI-First SEO?",
    a: "AI-First SEO (AIO) uses artificial intelligence, schema optimization, and generative content to improve rankings across both search engines and AI Overviews like Google’s AI Search Experience.",
  },
  {
    q: "How does Confluence Local Marketing use AI?",
    a: "Every AI tool we deploy is guided by human oversight to ensure accuracy, authenticity, and compliance with Google quality standards.",
  },
  {
    q: "Can AI SEO help my business rank higher in maps?",
    a: "Yes. Our AI-powered local SEO focuses on NAP consistency, Maps optimization, and structured data to improve visibility across Google and voice-based assistants.",
  },
  {
    q: "What’s the difference between SEO and AIO?",
    a: "Traditional SEO optimizes for search engines. AIO optimizes for both search engines and AI discovery models that power AI Overviews and generative results.",
  },
  {
    q: "Do you offer review management?",
    a: "Yes. We provide GBP reputation management, review monitoring, and removal of fake or policy-violating feedback.",
  },
  {
    q: "What is programmatic SEO?",
    a: "Programmatic SEO uses automation to create optimized pages and schema at scale — perfect for businesses with multiple services or locations.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-zinc-50 pt-24 pb-32 lg:pb-48 overflow-hidden">

      {/* Soft Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#267b9a]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        {/* Heading Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tighter mb-6">
            Everything You <span className="text-[#267b9a] italic font-light">Need to Know.</span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Everything you need to know about AI SEO (AIO) and how we use it to grow your business.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={false}
                className={`group border transition-all duration-500 rounded-[2rem] overflow-hidden ${isOpen
                    ? "bg-white border-[#267b9a]/30 shadow-xl shadow-zinc-200"
                    : "bg-white/50 border-zinc-200 hover:border-zinc-300 hover:bg-white"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-8 py-7 text-left outline-none"
                >
                  <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-[#267b9a]" : "text-zinc-700 group-hover:text-zinc-900"
                    }`}>
                    {item.q}
                  </span>

                  <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen
                      ? "bg-[#267b9a] border-[#267b9a] text-white rotate-180"
                      : "border-zinc-200 text-zinc-400 rotate-0"
                    }`}>
                    <FaChevronDown size={12} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-8 pb-8">
                        <div className="h-[1px] w-full bg-gradient-to-r from-zinc-100 to-transparent mb-6" />
                        <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-3xl">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}