"use client";

import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0a0a] to-[#000000] text-white py-28 overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1a1a1a_1px,transparent_0)] bg-[length:24px_24px] opacity-30" />

      {/* Glow accent */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#267b9a]/25 rounded-full blur-3xl opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to <span className="text-[#267b9a]">Dominate</span> Your Market?
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Let`&apos;`s build an AI-powered SEO strategy that delivers real business growth.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#267b9a] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1f667f] transition-all shadow-[0_0_20px_rgba(38,123,154,0.5)]"
          >
            Book a Free Demo
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="border border-[#267b9a] text-[#267b9a] px-8 py-3 rounded-lg font-medium hover:bg-[#267b9a]/10 transition-all"
          >
            Contact Us
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
