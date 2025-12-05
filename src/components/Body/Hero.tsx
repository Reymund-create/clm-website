"use client";

import React from "react";
// 1. Import the type from your API file so definitions match exactly.
// Check that "@/lib/api" matches your actual path to api.tsx
import { LandingPageData } from "@/lib/api"; 

interface VideoHeroProps {
  // 2. Allow 'null' in the props definition
  data: LandingPageData | null;
}

const VideoHero: React.FC<VideoHeroProps> = ({ data }) => {
  // 3. We already had this guard clause, but now TypeScript knows about it.
  if (!data) return null;

  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src={data.heroBackgound.url} type={data.heroBackgound.mime} />
        Your browser does not support the video tag.
      </video>

      {/* 2. Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 z-20"></div>

      {/* 3. Content */}
      <div className="relative z-30 flex max-w-4xl flex-col items-center px-6 text-center text-white sm:px-8">
        
        {/* Eyebrow */}
        <span className="block text-xl font-semibold text-[#c65957] md:text-5xl mb-4">
          {data.eyebrow}
        </span>

        {/* Main Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-6xl mb-4">
          {data.title.map((block, blockIndex) => (
            <span key={blockIndex} className="block">
              {block.children.map((child, childIndex) => {
                if (child.bold) {
                  return (
                    <span key={childIndex} className="text-[#267b9a]">
                      {child.text}
                    </span>
                  );
                }
                return <span key={childIndex}>{child.text}</span>;
              })}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg font-normal text-zinc-200 md:text-xl">
          {data.description}
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          {data.button.map((btn, index) => {
            const isPrimary = index === 0;
            return (
              <a
                key={btn.id}
                href={`tel: 630-447-8434`}
                target={btn.isExternal ? "_blank" : "_self"} // Safe check for undefined
                rel={btn.isExternal ? "noopener noreferrer" : undefined}
                className={
                  isPrimary
                    ? "transform rounded-lg bg-[#267b9a] px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#216a86]"
                    : "transform rounded-lg border-2 border-zinc-500 px-8 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:border-white hover:bg-white/10"
                }
              >
                {btn.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VideoHero;