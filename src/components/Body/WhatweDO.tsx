"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaRobot, FaMapMarkerAlt, FaBolt, FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    icon: <FaRobot />,
    title: "AI-First SEO",
    description: "Optimize for both traditional search and AI-powered platforms like Google AI Overviews."
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Local Dominance",
    description: "Own your local market with optimized Google Maps and powerful 'near me' strategies."
  },
  {
    icon: <FaBolt />,
    title: "Programmatic Scale",
    description: "Automate content across thousands of keywords without losing human-level quality."
  },
  {
    icon: <FaStar />,
    title: "Reputation Control",
    description: "Manage reviews and amplify user-generated content to build iron-clad online trust."
  },
];

const FeaturesCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for the background glow
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slides: { 
      perView: 3, 
      spacing: 24,
      origin: "center" // Keeps the focus balanced
    },
    breakpoints: {
      "(max-width: 1100px)": { slides: { perView: 2, spacing: 20 } },
      "(max-width: 768px)": { slides: { perView: 1, spacing: 16 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <section className="relative bg-black py-12 overflow-hidden -mt-1">
      {/* THE PARALLAX BLUR - Anchored to the top to meet the Hero */}
      <motion.div 
        style={{ y }}
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w h-[600px] bg-[#267b9a]/20 blur-[100px] rounded-full z-10 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-20">

          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tight">
            What We Do <span className="bg-gradient-to-r from-[#267b9a] to-[#40a9cf] bg-clip-text text-transparent italic">Differently.</span>
          </h2>
          <p className="mt-8 text-normalleading-relaxed text-zinc-400 md:text-xl">We combine AI automation with human expertise to deliver SEO that works in today’s search landscape, from Google to AI Overviews.</p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {features.map((feature, i) => (
              <div key={i} className="keen-slider__slide h-auto min-h-full">
                <div className="flex flex-col h-full bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2rem] transition-all duration-500 hover:bg-zinc-800/40 hover:border-[#267b9a]/50 group/card">
                  <div className="flex-1">
                    <div className="w-14 h-14 flex items-center justify-center bg-[#267b9a]/20 text-[#267b9a] text-2xl rounded-2xl mb-8 group-hover/card:scale-110 group-hover/card:bg-[#267b9a] group-hover/card:text-white transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-base leading-relaxed mb-8">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Bottom animated line */}
                  <div className="relative h-1 w-12 bg-zinc-800 rounded-full overflow-hidden group-hover/card:w-full transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#267b9a] to-[#40a9cf]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Controls */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900/80 border border-white/10 text-white backdrop-blur-md hover:bg-[#267b9a] transition-all z-20 shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-zinc-900/80 border border-white/10 text-white backdrop-blur-md hover:bg-[#267b9a] transition-all z-20 shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Custom Progress Bar Style Dots */}
        <div className="flex justify-center mt-16 gap-3">
          {features.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === idx ? "w-12 bg-[#267b9a]" : "w-3 bg-zinc-800 hover:bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;