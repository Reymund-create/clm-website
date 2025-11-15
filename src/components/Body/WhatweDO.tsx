"use client";

import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { FaRobot, FaMapMarkerAlt, FaBolt, FaStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

const features = [
  {
    icon: <FaRobot className="text-[#267b9a] text-3xl" />,
    title: "AI-First SEO",
    description:
      "Optimize for both traditional search engines and AI-powered platforms like Google AI Overview and voice search.",
  },
  {
    icon: <FaMapMarkerAlt className="text-[#267b9a] text-3xl" />,
    title: "Local Dominance",
    description:
      "Own your local market with optimized Google Maps, accurate listings, and powerful 'near me' strategies.",
  },
  {
    icon: <FaBolt className="text-[#267b9a] text-3xl" />,
    title: "Programmatic Scale",
    description:
      "Automate content creation and optimization across thousands of keywords and locations without losing quality.",
  },
  {
    icon: <FaStar className="text-[#267b9a] text-3xl" />,
    title: "Reputation Control",
    description:
      "Manage reviews, build trust, and amplify user-generated content to strengthen your online presence.",
  },
];

const FeaturesCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 3, spacing: 24 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 640px)": { slides: { perView: 1, spacing: 12 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Optional subtle grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#f3f3f3_1px,transparent_0)] bg-[length:24px_24px] opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          What We Do <span className="text-[#267b9a]">Differently</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-14">
          We combine AI automation with human expertise to deliver SEO that
          works in today’s search landscape — from Google to AI Overviews.
        </p>

        {/* Carousel */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {features.map((feature, i) => (
              <div
                key={i}
                className="keen-slider__slide flex flex-col justify-between bg-white border border-gray-200 rounded-2xl p-8 text-left hover:border-[#267b9a] transition-all duration-300 hover:shadow-[0_0_25px_rgba(38,123,154,0.15)] h-full"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#267b9a]/10 rounded-xl">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 hover:bg-[#267b9a]/10 transition"
          >
            <ChevronLeft className="w-5 h-5 text-[#267b9a]" />
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 hover:bg-[#267b9a]/10 transition"
          >
            <ChevronRight className="w-5 h-5 text-[#267b9a]" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {features.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                currentSlide === idx
                  ? "bg-[#267b9a]"
                  : "bg-gray-300 hover:bg-[#267b9a]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;
