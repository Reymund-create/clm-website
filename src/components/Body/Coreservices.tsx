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
  {
    title: "Programmatic SEO",
    desc: "Scale your online presence with data-driven, automated landing pages that capture thousands of long-tail keywords and search intents.",
    icon: <FaGlobe />,
    href: "/services/programmatic-seo",
  },
  {
    title: "Generative SEO",
    desc: "Use AI-generated, human-refined content to dominate AI Overviews, voice search, and generative search results.",
    icon: <FaRobot />,
    href: "/services/generative-seo",
  },
  {
    title: "Link Building",
    desc: "Enhance domain authority and search trust through AI-guided link-building campaigns that drive real, organic traffic.",
    icon: <FaLink />,
    href: "/services/link-building",
  },
  {
    title: "AI YouTube Marketing",
    desc: "Harness AI video SEO and AI content optimization for YouTube to grow visibility and conversions with precision.",
    icon: <FaYoutube />,
    href: "/services/ai-youtube-marketing",
  },
  {
    title: "Artificial Intelligence Optimization (AIO)",
    desc: "Go beyond traditional SEO — optimize for how AI search engines like Google’s AI Overview, ChatGPT Search, and Gemini rank your brand.",
    icon: <FaBrain />,
    href: "/services/ai-optimization",
  },
  {
    title: "Rank Tracking & Performance Reporting",
    desc: "Monitor rankings in real time with AI-powered tools that analyze search performance across Google, AI Overviews, and voice-driven platforms.",
    icon: <FaChartLine />,
    href: "/services/rank-tracking",
  },
  {
    title: "Local Listings & NAP Accuracy",
    desc: "Keep your NAP (Name, Address, Phone) accurate and optimized across Google, Apple Maps, Yelp, and 100+ directories.",
    icon: <FaMapMarkedAlt />,
    href: "/services/local-listings",
  },
  {
    title: "GBP Reputation Management & Review Removal",
    desc: "Protect your business with AI-enhanced review monitoring and removal services to maintain your credibility.",
    icon: <FaStar />,
    href: "/services/reputation-management",
  },
  {
    title: "Schema & AI Rich Snippets",
    desc: "Implement structured data and schema markup that boost visibility in Google’s AI Overview and voice search.",
    icon: <FaCode />,
    href: "/services/schema-rich-snippets",
  },
  {
    title: "AI Content Development & Ranking",
    desc: "Develop AI-optimized, human-edited content designed to rank across search engines and AI ranking systems.",
    icon: <FaPenFancy />,
    href: "/services/ai-content",
  },
  {
    title: "Website Design & Development",
    desc: "Build SEO-first, conversion-optimized websites aligned with your AI and generative search strategy.",
    icon: <FaDesktop />,
    href: "/services/website-development",
  },
  {
    title: "Social Media Creative & Posting",
    desc: "Grow engagement with AI-driven social media marketing and creative storytelling across every platform.",
    icon: <FaUsers />,
    href: "/services/social-media",
  },
];

export default function CoreServices() {
  return (
    <section className="relative bg-gradient-to-b from-[#0a0a0a] to-[#000000] py-24 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1a1a1a_1px,transparent_0)] bg-[length:24px_24px] opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Our <span className="text-[#267b9a]">Core Services</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto mb-16"
        >
          AI-powered strategies designed to enhance visibility, scalability, and performance across all digital channels.
        </motion.p>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(38,123,154,0.4)",
                }}
                className="group flex flex-col justify-between bg-[#0d0d0d] border border-[#267b9a33] hover:border-[#267b9a] rounded-2xl p-8 text-left transition-all duration-300 cursor-pointer h-full"
              >
                <div>
                  <div className="text-[#267b9a] text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#267b9a] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-6 text-[#267b9a] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More →
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Accent glow */}
      <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] bg-[#267b9a]/30 rounded-full blur-3xl opacity-30" />
    </section>
  );
}
