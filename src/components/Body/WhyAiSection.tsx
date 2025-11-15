"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaChartLine, FaGlobe, FaBolt } from "react-icons/fa";

const features = [
  {
    icon: <FaBrain className="text-[#267b9a] text-2xl" />,
    title: "AI-Powered Insights",
    description:
      "Machine learning helps identify untapped keyword and market opportunities before competitors do.",
  },
  {
    icon: <FaChartLine className="text-[#267b9a] text-2xl" />,
    title: "Scalable Strategy",
    description:
      "From startups to enterprises, our SEO systems scale seamlessly with your business growth.",
  },
  {
    icon: <FaGlobe className="text-[#267b9a] text-2xl" />,
    title: "Omnichannel Reach",
    description:
      "Be visible across Google, Maps, AI Overviews, and voice search — wherever users are searching.",
  },
  {
    icon: <FaBolt className="text-[#267b9a] text-2xl" />,
    title: "Adaptive Optimization",
    description:
      "We constantly evolve strategies based on real-time data, ensuring consistent visibility and growth.",
  },
];

const SectionVariant1_Grid = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0a0a] to-[#000000] py-24 overflow-hidden">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1a1a1a_1px,transparent_0)] bg-[length:24px_24px] opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Smarter SEO for the
            <span className="block">
              <span className="text-[#267b9a]">AI-Driven Web</span>
            </span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg">
            We blend intelligent automation with expert strategy to help your
            brand dominate search results — not just today, but as algorithms
            evolve.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#267b9a] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1e5f73] transition-colors shadow-[0_0_15px_rgba(38,123,154,0.4)]"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.4, ease: "easeOut" },
                },
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(38,123,154,0.5)",
                transition: { duration: 0.3 },
              }}
              className="bg-[#0d0d0d] border border-[#267b9a33] hover:border-[#267b9a] rounded-2xl p-6 shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  whileHover={{ rotate: 8 }}
                  className="w-12 h-12 flex items-center justify-center bg-[#267b9a]/10 rounded-xl"
                >
                  {feature.icon}
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm text-center leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SectionVariant1_Grid;
