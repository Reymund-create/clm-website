"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaRobot,
  FaGlobe,
  FaLink,
  FaYoutube,
  FaBrain,
  FaChartLine,
  FaMapMarkedAlt,
  FaStar,
  FaCode,
  FaPenFancy,
  FaDesktop,
  FaUsers,
} from "react-icons/fa";

const services = [
  { title: "Programmatic SEO", desc: "Scale your online presence with data-driven, automated landing pages.", icon: <FaGlobe />, href: "/services/programmatic-seo" },
  { title: "Generative SEO", desc: "Use AI-generated content to dominate AI Overviews and voice search.", icon: <FaRobot />, href: "/services/generative-seo" },
  { title: "Link Building", desc: "Enhance domain authority through AI-guided link-building campaigns.", icon: <FaLink />, href: "/services/link-building" },
  { title: "AI YouTube Marketing", desc: "Harness AI video SEO for YouTube to grow visibility with precision.", icon: <FaYoutube />, href: "/services/ai-youtube-marketing" },
  { title: "AI Optimization (AIO)", desc: "Optimize for how ChatGPT Search, Gemini, and AI Overviews rank your brand.", icon: <FaBrain />, href: "/services/ai-optimization" },
  { title: "Rank Tracking", desc: "Monitor rankings in real time across Google and voice-driven platforms.", icon: <FaChartLine />, href: "/services/rank-tracking" },
  { title: "Local Listings", desc: "Keep your NAP accurate across Google, Apple Maps, and 100+ directories.", icon: <FaMapMarkedAlt />, href: "/services/local-listings" },
  { title: "GBP Management", desc: "Protect your business with AI-enhanced review monitoring and removal.", icon: <FaStar />, href: "/services/reputation-management" },
  { title: "Schema & Rich Snippets", desc: "Implement structured data that boost visibility in Rich Results.", icon: <FaCode />, href: "/services/schema-rich-snippets" },
  { title: "AI Content Development", desc: "Develop AI-optimized content designed to rank across AI ranking systems.", icon: <FaPenFancy />, href: "/services/ai-content" },
  { title: "Web Design & Dev", desc: "Build SEO-first websites aligned with your generative search strategy.", icon: <FaDesktop />, href: "/services/website-development" },
  { title: "Social Media Creative", desc: "Grow engagement with AI-driven social media marketing and storytelling.", icon: <FaUsers />, href: "/services/social-media" },
];

export default function CoreServices() {
  return (
    <section className="relative bg-[#050505] py-24 lg:py-40 overflow-hidden">

      {/* 1. SEAMLESS TOP EDGE */}
      <div className="absolute top-0 left-0 right-0 h-64 z-20 pointer-events-none">
        {/* Pulls the zinc-50 color from the section above into a soft glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/40 via-transparent to-transparent opacity-50" />

        {/* Matches the blur from the section above to create a "glass" bridge */}
        <div className="absolute inset-0 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* 2. BACKGROUND DECORATION */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1a1a1a_1px,transparent_0)] bg-[length:40px_40px] opacity-20" />
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#267b9a]/5 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-[#267b9a]/10 blur-[130px] rounded-full" />

      <div className="relative z-40 max-w-7xl mx-auto px-6 -mt-20 lg:-mt-32">

        {/* HEADING SECTION */}
        <div className="text-center mb-24">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter"
          >
            Our <span className="bg-gradient-to-r from-[#267b9a] to-[#40a9cf] bg-clip-text text-transparent italic font-light">Core Services</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            AI-powered strategies designed to enhance visibility, scalability, and performance across all digital channels.
          </motion.p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ y: -8 }}
                className="group relative h-full bg-zinc-900/40 backdrop-blur-md border border-zinc-800 hover:border-[#267b9a]/50 rounded-[2rem] p-8 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute -inset-px bg-gradient-to-br from-[#267b9a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 flex items-center justify-center bg-zinc-800/50 border border-zinc-700 text-[#267b9a] text-2xl rounded-2xl mb-6 group-hover:bg-[#267b9a] group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#267b9a] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                    {service.desc}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-[#267b9a] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    Explore Service <span className="text-lg">→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}