"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";
import { LandingPageData } from "@/lib/api";

interface VideoHeroProps {
  data: LandingPageData | null;
}

/* ======================
   MOTION VARIANTS
====================== */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};


const buttonVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const VideoHero: React.FC<VideoHeroProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src={data.heroBackgound.url} type={data.heroBackgound.mime} />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-20" />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-30 flex max-w-4xl flex-col items-center px-6 text-center text-white sm:px-8"
      >
        {/* Eyebrow */}
        <motion.span
          variants={fadeUp}
          className="block text-xl font-semibold text-[#c65957] md:text-5xl mb-4"
        >
          {data.eyebrow}
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-extrabold tracking-tight leading-tight md:text-5xl lg:text-6xl mb-4"
        >
          {data.title.map((block, blockIndex) => (
            <span key={blockIndex} className="block">
              {block.children.map((child, childIndex) =>
                child.bold ? (
                  <span key={childIndex} className="text-[#267b9a]">
                    {child.text}
                  </span>
                ) : (
                  <span key={childIndex}>{child.text}</span>
                )
              )}
            </span>
          ))}
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg font-normal text-zinc-200 md:text-xl"
        >
          {data.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={container}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          {data.button.map((btn, index) => {
            const isPrimary = index === 0;
            const href = btn?.href?.trim()
              ? btn.href
              : "tel:630-447-8434";

            return (
              <motion.a
                key={btn.id}
                href={href}
                target={btn.isExternal ? "_blank" : "_self"}
                rel={btn.isExternal ? "noopener noreferrer" : undefined}
                variants={buttonVariant}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={
                  isPrimary
                    ? "rounded-lg bg-[#267b9a] px-8 py-3 text-base font-semibold text-white shadow-[0_0_20px_rgba(38,123,154,0.5)] hover:bg-[#216a86]"
                    : "rounded-lg border-2 border-[#267b9a] px-8 py-3 text-base font-semibold text-[#267b9a] shadow-[0_0_20px_rgba(38,123,154,0.35)] hover:bg-[#267b9a]/10 hover:shadow-[0_0_30px_rgba(38,123,154,0.6)]"
                }
              >
                {btn.label}
              </motion.a>

            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default VideoHero;
