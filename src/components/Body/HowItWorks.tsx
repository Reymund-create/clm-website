"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={containerRef} className="relative bg-zinc-50 pt-24 pb-32 lg:pt-40 lg:pb-42 overflow-hidden">

      {/* 1. TOP WAVE (Existing) */}
      <div className="absolute top-0 left-0 w-full h-48 overflow-hidden leading-[0] z-10 pointer-events-none">
        <svg className="relative block w-full h-full transform scale-x-110" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#267b9a" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#wave-gradient)"></path>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-50/20 to-zinc-50 backdrop-blur-[2px]" />
      </div>

      {/* 2. SEAMLESS BOTTOM EXIT */}
      <div className="absolute bottom-0 left-0 right-0 h-80 z-30 pointer-events-none">
        {/* The color transition to the next section's background (#050505) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

        {/* The Frosty Blur to hide the hard line of the next section's start */}
        <div className="absolute inset-0 backdrop-blur-3xl [mask-image:linear-gradient(to_top,black,transparent)] opacity-90" />
      </div>

      {/* 3. PARALLAX ACCENT BLOBS */}
      <motion.div style={{ y: y1 }} className="absolute -top-10 left-1/4 w-[500px] h-[300px] bg-[#267b9a]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <motion.div style={{ y: y2 }} className="absolute bottom-10 -right-20 w-[400px] h-[400px] bg-[#40a9cf]/10 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-16 relative z-20">

        {/* Left Side - Sticky Heading */}
        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-32">
            <h2 className="text-5xl md:text-6xl font-bold text-zinc-900 leading-[1.1] mb-8 tracking-tight">
              How It <span className="bg-gradient-to-r from-[#267b9a] to-[#40a9cf] bg-clip-text text-transparent italic">Works.</span>
            </h2>
            <p className="text-zinc-500 text-lg md:text-xl max-w-sm leading-relaxed">
              Transform your digital presence through a clear, data-driven process powered by AI insight and strategy.
            </p>
          </div>
        </div>

        {/* Right Side - Steps with Animated Path */}
        <div className="lg:col-span-3 relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-zinc-200" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#267b9a] to-[#40a9cf] z-10 shadow-[0_0_15px_rgba(38,123,154,0.4)]"
          />

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-16 group"
              >
                {/* Step Circle */}
                <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-zinc-200 rounded-full flex items-center justify-center z-20 group-hover:border-[#267b9a] group-hover:shadow-[0_0_20px_rgba(38,123,154,0.3)] transition-all duration-500">
                  <span className="text-zinc-400 group-hover:text-[#267b9a] font-bold text-sm transition-colors">
                    {step.number}
                  </span>
                </div>

                <div className="bg-white/40 backdrop-blur-xl border border-transparent hover:border-zinc-200 hover:bg-white p-8 rounded-[2.5rem] transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200/50">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}