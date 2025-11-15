"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "AI Analysis",
    desc: "We audit your current presence, analyze competitors, and identify opportunities using AI-powered tools.",
  },
  {
    number: "02",
    title: "Strategic Execution",
    desc: "Our team implements technical SEO, content optimization, and schema markup tailored to your business.",
  },
  {
    number: "03",
    title: "Continuous Growth",
    desc: "Track rankings in real-time while our AI adapts your strategy for sustained visibility and conversions.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-white text-gray-900 py-24 overflow-hidden">
      {/* Subtle pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f4f4f4_1px,transparent_0)] bg-[length:24px_24px] opacity-60" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Side - Heading */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            How It <span className="text-[#267b9a]">Works</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-md">
            Transform your digital presence through a clear, data-driven process powered by AI insight and strategy.
          </p>
        </motion.div>

        {/* Right Side - Steps */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative border-l border-[#267b9a40] pl-8 space-y-10"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-9 top-1 w-8 h-8 bg-[#267b9a] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_#267b9a55]">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle Accent Glow */}
      <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-[#267b9a]/20 rounded-full blur-3xl opacity-30" />
    </section>
  );
}
