"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    q: "What is AI SEO or AI-First SEO?",
    a: "AI-First SEO (AIO) uses artificial intelligence, schema optimization, and generative content to improve rankings across both search engines and AI Overviews like Google’s AI Search Experience.",
  },
  {
    q: "How does Confluence Local Marketing use AI responsibly?",
    a: "Every AI tool we deploy is guided by human oversight to ensure accuracy, authenticity, and compliance with Google quality standards.",
  },
  {
    q: "Can AI SEO help my business rank higher in local maps and “near me” searches?",
    a: "Yes. Our AI-powered local SEO focuses on NAP consistency, Maps optimization, and structured data to improve visibility across Google and voice-based assistants.",
  },
  {
    q: "What’s the difference between SEO and AIO?",
    a: "Traditional SEO optimizes for search engines. AIO optimizes for both search engines and AI discovery models that power AI Overviews and generative results.",
  },
  {
    q: "Do you offer review management and removal?",
    a: "Yes. We provide GBP reputation management, review monitoring, and removal of fake or policy-violating feedback.",
  },
  {
    q: "What is programmatic SEO and why is it important?",
    a: "Programmatic SEO uses automation to create optimized pages and schema at scale — perfect for businesses with multiple services or locations.",
  },
  {
    q: "Can you manage my website and social media too?",
    a: "Absolutely. We offer website design, content development, and AI-driven social media marketing for full brand consistency.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white text-[#0b1a1f] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-[#267b9a]">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about AI SEO (AIO) and how we use it to grow your business.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <motion.div
              key={index}
              layout
              transition={{
                layout: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
              }}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg">{item.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openIndex === index ? (
                    <FaMinus className="text-[#267b9a]" />
                  ) : (
                    <FaPlus className="text-[#267b9a]" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5 text-gray-700 bg-[#f9f9f9]"
                  >
                    {item.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
