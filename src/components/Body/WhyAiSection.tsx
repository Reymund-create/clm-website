"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaChartLine, FaGlobe, FaBolt } from "react-icons/fa";

const features = [
  {
    icon: <FaBrain />,
    title: "AI-Powered Insights",
    description: "Machine learning helps identify untapped keyword and market opportunities before competitors do.",
  },
  {
    icon: <FaChartLine />,
    title: "Scalable Strategy",
    description: "From startups to enterprises, our SEO systems scale seamlessly with your business growth.",
  },
  {
    icon: <FaGlobe />,
    title: "Omnichannel Reach",
    description: "Be visible across Google, Maps, AI Overviews, and voice search — wherever users are searching.",
  },
  {
    icon: <FaBolt />,
    title: "Adaptive Optimization",
    description: "We constantly evolve strategies based on real-time data, ensuring consistent visibility and growth.",
  },
];

const SectionVariant1_Grid = () => {
  return (
    <section className="relative bg-white pt-24 lg:pt-32 pb-48 overflow-hidden">
      
      {/* 1. TOP TRANSITION (From Dark Section Above) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-black/80 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,black,transparent)] z-10 pointer-events-none" />

      {/* 2. LIGHT GRID TEXTURE */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000_70%,transparent_100%)] opacity-40" />

      {/* 3. CENTER GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-[#267b9a]/5 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-30 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >

          <h2 className="text-5xl md:text-6xl font-bold text-zinc-900 mb-8 leading-[1.1] tracking-tight">
            Smarter SEO for the
            <span className="block mt-2">
              <span className="text-[#267b9a]">AI-Driven Web</span>
            </span>
          </h2>
          
          <p className="text-zinc-500 text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            We blend intelligent automation with expert strategy to help your brand dominate search results, not just today, but as algorithms evolve.
          </p>

          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:bg-[#267b9a] hover:shadow-[0_20px_40px_-10px_rgba(38,123,154,0.4)]"
          >
            Learn More
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE - Floating Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              whileHover={{ y: -10 }}
              className="group bg-white/60 backdrop-blur-xl border border-zinc-200/50 hover:border-[#267b9a]/40 rounded-[2.5rem] p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30_60px_-20px_rgba(38,123,154,0.15)] transition-all duration-500"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-white border border-zinc-100 text-[#267b9a] text-2xl rounded-2xl mb-6 group-hover:bg-[#267b9a] group-hover:text-white transition-all duration-500 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 4. BOTTOM WAVE CONNECTOR (Links to HowItWorks) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg 
          className="relative block w-full h-[120px]" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bottom-wave-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="#267b9a" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Main Wave Shape */}
          <path 
            d="M0,120V27.35A600.21,600.21,0,0,1,321.39,56.44c58,10.79,114.16,30.13,172,41.86,82.39,16.72,168.19,17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0Z" 
            fill="url(#bottom-wave-grad)"
          ></path>
          {/* Subtle Accent Line on Wave Top */}
          <path 
            d="M0,27.35A600.21,600.21,0,0,1,321.39,56.44c58,10.79,114.16,30.13,172,41.86" 
            fill="none" 
            stroke="#267b9a" 
            strokeWidth="1" 
            strokeOpacity="0.2"
          />
        </svg>
      </div>
    </section>
  );
};

export default SectionVariant1_Grid;