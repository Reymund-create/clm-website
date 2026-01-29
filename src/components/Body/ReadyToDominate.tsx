"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionLink = motion(Link);

const CTASection = () => {
  return (
    <section className="relative bg-[#050505] py-32 lg:py-48 overflow-hidden">
      
      {/* 1. BACKGROUND ACCENTS (Matching CoreServices style) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#267b9a]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1a1a1a_1px,transparent_0)] bg-[length:40px_40px] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        {/* SMALL BADGE */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#267b9a]/30 bg-[#267b9a]/5 text-[#267b9a] text-[10px] font-black uppercase tracking-[0.3em] mb-8">
          Next Steps
        </div>

        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-[1.1]">
          Ready to <span className="bg-gradient-to-r from-[#267b9a] to-[#40a9cf] bg-clip-text text-transparent italic font-light">Dominate</span> Your Market?
        </h2>

        <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Let&apos;s build an AI-powered SEO strategy that delivers real business growth and sustained digital visibility.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {/* ✅ PRIMARY BUTTON - INTEGRATED DESIGN */}
          <MotionLink
            href="/contact-us"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-3 bg-[#267b9a] text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-[0_15px_40px_-10px_rgba(38,123,154,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(38,123,154,0.6)] w-full sm:w-auto"
          >
            Book a Free Demo
            <span className="group-hover:translate-x-1 transition-transform duration-300 text-xl">
              →
            </span>
          </MotionLink>

          {/* SECONDARY BUTTON */}
          <MotionLink
            href="tel:630-447-8434"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-3 bg-zinc-900 border border-zinc-800 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 hover:bg-zinc-800 w-full sm:w-auto"
          >
            Speak to an Expert
          </MotionLink>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;