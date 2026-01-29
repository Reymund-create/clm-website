"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] flex items-center justify-center overflow-hidden px-6">
      
      {/* 1. Background Glows (Matching your CTA Section) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#267b9a]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1e293b_1px,transparent_0)] bg-[length:40px_40px] opacity-20" />

      <div className="relative z-10 text-center max-w-2xl">
        
        {/* Animated 404 Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[12rem] md:text-[15rem] font-black leading-none tracking-tighter text-white/5 select-none"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="-mt-12 md:-mt-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6">
            Lost in the <span className="text-[#267b9a] italic font-light">Digital Noise.</span>
          </h2>
          
          <p className="text-slate-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The page you are looking for has been optimized out of existence or moved to a new destination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Reusing your Premium Button Design */}
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link 
                href="/" 
                className="group relative flex items-center gap-3 bg-[#267b9a] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-[0_15px_40px_-10px_rgba(38,123,154,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(38,123,154,0.6)]"
              >
                Back to Safety
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>

            <Link 
              href="/contact-us" 
              className="text-slate-400 font-bold hover:text-white transition-colors"
            >
              Report an Issue
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Subtle Floating Shapes for extra "AI" flair */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2] 
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] w-32 h-32 border border-[#267b9a]/20 rounded-full"
      />
    </main>
  );
}