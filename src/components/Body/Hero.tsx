"use client";

import React from "react";

const VideoHero: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/heroBG.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay */}
      {/* Changed to bg-black/70 for better readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-20"></div>

      {/* 3. Content */}
      <div className="relative z-30 flex max-w-4xl flex-col items-center px-6 text-center text-white sm:px-8">
        
        {/* Pre-headline for better hierarchy */}
        <span className="block text-xl font-semibold text-[#c65957] md:text-5xl">
          Confluence Local Marketing
        </span>

        {/* Main Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl mb-4">
            <span className="block">
                The <span className="text-[#267b9a]">AI-First SEO Platform</span>
            </span>
            <span className="block">Built for Real Business</span>
            <span className="block">Growth</span>
        </h1>

        {/* Paragraph: Improved readability and updated copy */}
        <p className="mt-6 max-w-2xl text-lg font-normal text-zinc-200 md:text-xl">
          While others stick to old methods, we combine proven strategies with
          smart AI tools giving you faster insights, smoother execution, and
          real results.
        </p>

        {/* Call to Action Buttons (Essential) */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#demo"
            // Using your brand color for the primary button
            className="transform rounded-lg bg-[#267b9a] px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#216a86]"
          >
            Book a Free Demo
          </a>
          <a
            href="#features"
            // A secondary "ghost" button
            className="transform rounded-lg border-2 border-zinc-500 px-8 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:border-white hover:bg-white/10"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoHero;