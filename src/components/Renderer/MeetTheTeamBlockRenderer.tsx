"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from "framer-motion";

import {
  MeetTheTeamBlock,
  MeetTheTeamCardItem,
  ServiceRichTextNode,
  ServiceRichTextChild
} from "@/lib/api";

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

// --- RENDERER HELPER ---
const renderRichText = (nodes: (ServiceRichTextNode | ServiceRichTextChild)[], textColorClass: string = "text-slate-600") => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    if (node.type === 'text') {
      const textNode = node as any;
      let content: React.ReactNode = textNode.text;

      const isDarkBackground = textColorClass.includes("white");

      if (textNode.bold) content = <strong key="bold" className={`font-black ${isDarkBackground ? "text-white" : "text-slate-900"}`}>{content}</strong>;
      if (textNode.italic) content = <em key="italic" className="italic">{content}</em>;
      if (textNode.code) content = <code key="code" className="bg-slate-100 text-[#267b9a] px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">{content}</code>;

      return <span key={index}>{content}</span>;
    }

    const blockNode = node as any;

    switch (blockNode.type) {
      case 'paragraph':
        if (!blockNode.children.length || (blockNode.children.length === 1 && blockNode.children[0].text === "")) {
          return <div key={index} className="h-4" />;
        }
        return (
          <p key={index} className={`mb-6 text-[1.05rem] leading-8 ${textColorClass} last:mb-0`}>
            {renderRichText(blockNode.children, textColorClass)}
          </p>
        );

      case 'heading':
        const level = blockNode.level || 3;
        const headingColor = textColorClass.includes("white") ? "text-white" : "text-slate-900";
        const Tag = `h${level}` as React.ElementType;
        const size = level === 1 ? 'text-4xl md:text-5xl' : level === 2 ? 'text-3xl md:text-4xl' : 'text-2xl';

        return (
          <Tag key={index} className={`${size} font-black mt-8 mb-4 ${headingColor} tracking-tight`}>
            {renderRichText(blockNode.children, textColorClass)}
          </Tag>
        );

      case 'list':
        const isOrdered = blockNode.format === 'ordered';
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered
          ? `list-decimal pl-6 mb-8 text-lg font-bold ${textColorClass}`
          : `list-disc pl-6 mb-8 text-lg marker:text-[#267b9a] ${textColorClass}`;

        return (
          <ListTag key={index} className={listClass}>
            {renderRichText(blockNode.children, textColorClass)}
          </ListTag>
        );

      case 'list-item':
        return (
          <li key={index} className={`pl-2 ${textColorClass} leading-relaxed`}>
            {renderRichText(blockNode.children, textColorClass)}
          </li>
        );

      default: return null;
    }
  });
};

// --- TEAM CARD COMPONENT (WITH MODAL) ---

const TeamCard = ({ card }: { card: MeetTheTeamCardItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasImage = card.image && card.image.url;
  const altText = card.image?.alternativeText || card.title || "Team Member";

  return (
    <>
      <motion.div
        layoutId={`card-${card.id}`}
        onClick={() => setIsOpen(true)}
        variants={fadeInUp}
        // Updated Colors: bg-white for cleanliness, hover border to #267b9a
        className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer bg-white border border-slate-200 hover:border-[#267b9a]/50 shadow-sm hover:shadow-[0_20px_50px_rgba(38,123,154,0.2)] transition-all duration-500"
      >
        {/* Background Image with Parallax-like scale */}
        {hasImage ? (
          <Image
            src={card.image!.url}
            alt={altText}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300">
            <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
          </div>
        )}

        {/* Dynamic Overlays - Slate-900 based for brand consistency */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Info Overlay (Slides up on hover) */}
        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]">
          <motion.div className="flex flex-col gap-2">
            <span className="text-[#267b9a] text-[10px] font-black uppercase tracking-[0.2em] bg-white/95 backdrop-blur-md w-fit px-3 py-1 rounded-md shadow-lg">
              {card.position || "Expert"}
            </span>
            <h3 className="text-2xl font-black text-white leading-none mb-2 drop-shadow-md">
              {card.title}
            </h3>
            <p className="text-slate-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">
              {card.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
              View Profile <span className="w-6 h-px bg-[#267b9a]" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- THE MODAL --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0f172a]/90 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              layoutId={`card-${card.id}`}
              className="relative w-full max-w-5xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/80 hover:bg-[#267b9a] hover:text-white rounded-full flex items-center justify-center transition-colors group backdrop-blur-sm shadow-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Side: Large Image */}
              <div className="w-full md:w-2/5 relative h-[300px] md:h-auto bg-slate-50 border-r border-slate-100">
                {hasImage && (
                  <Image
                    src={card.image!.url}
                    alt={altText}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5" />
              </div>

              {/* Right Side: Detailed Bio */}
              <div className="w-full md:w-3/5 p-8 md:p-16 flex flex-col justify-center bg-white">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block text-[#267b9a] font-black uppercase tracking-[0.3em] text-xs mb-4">
                    {card.position}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tight">
                    {card.title}
                  </h2>
                  <div className="w-20 h-1.5 bg-[#267b9a] mb-8 rounded-full" />

                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed mb-10">
                    {card.description}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact-us"
                      className="px-8 py-4 bg-[#267b9a] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#0f172a] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#267b9a]/20"
                    >
                      Book a Session
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- MAIN RENDERER ---

interface RendererProps {
  blocks: MeetTheTeamBlock[];
}

export default function MeetTheTeamRenderer({ blocks }: RendererProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHashChange = () => {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (!blocks || blocks.length === 0) return null;

  const heroImage = blocks.find((b) => b.__component === "elements.background-image");
  const heroHeading = blocks.find((b) => b.__component === "elements.heading");
  const heroText = blocks.find((b) => b.__component === "elements.rich-text");
  const heroButton = blocks.find((b) => b.__component === "elements.button");

  const contentBlocks = blocks.filter(b =>
    b !== heroImage &&
    b !== heroHeading &&
    b !== heroText &&
    b !== heroButton
  );

  let processedBlocks: any[] = [];
  let cardBuffer: MeetTheTeamCardItem[] = [];

  contentBlocks.forEach((block) => {
    if (block.__component === "elements.card-item") {
      cardBuffer.push(block);
    } else {
      if (cardBuffer.length > 0) {
        processedBlocks.push({
          __component: "custom.card-grid",
          cards: [...cardBuffer],
        });
        cardBuffer = [];
      }
      processedBlocks.push(block);
    }
  });

  if (cardBuffer.length > 0) {
    processedBlocks.push({
      __component: "custom.card-grid",
      cards: [...cardBuffer],
    });
  }

  const buttonProps = heroButton as any;

  return (
    <div className="bg-white flex flex-col min-h-screen font-sans">

      {/* --- HERO BANNER --- */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#0f172a] overflow-hidden px-4">

        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#267b9a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none" />

        {heroImage && heroImage.__component === 'elements.background-image' && heroImage.background?.url && (
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={heroImage.background.url}
              alt={heroImage.background.alternativeText || "Hero Background"}
              fill
              className="object-cover opacity-40 mix-blend-overlay"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-transparent" />
          </div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10 max-w-4xl mx-auto text-center py-20"
        >
          {heroHeading && heroHeading.__component === 'elements.heading' && (
            <>
              <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-2xl mb-8">
                {heroHeading.heading}
              </h1>
              <div className="w-24 h-1.5 bg-[#267b9a] rounded-full shadow-[0_0_15px_rgba(38,123,154,0.8)] mx-auto mb-10" />
            </>
          )}

          {heroText && heroText.__component === 'elements.rich-text' && (
            <div className="prose prose-lg prose-invert max-w-none text-slate-300 leading-relaxed mb-10">
              {renderRichText(heroText.richText, "text-white")}
            </div>
          )}

          {buttonProps && buttonProps.label && (
            <Link
              href={buttonProps.href || "#"}
              className="inline-flex items-center justify-center px-10 py-5 text-[13px] font-black uppercase tracking-[0.15em] bg-[#267b9a] text-white rounded-lg transition-all duration-300 hover:bg-white hover:text-[#0f172a] shadow-xl hover:shadow-[#267b9a]/40 transform hover:-translate-y-1"
            >
              {buttonProps.label}
            </Link>
          )}
        </motion.div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="grow w-full py-24 overflow-hidden bg-slate-50/50">
        {processedBlocks.map((block, index) => {
          const key = `block-${index}`;

          const BlockWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className={className}
            >
              {children}
            </motion.div>
          );

          switch (block.__component) {
            case "elements.heading":
              const isCentered = block.heading.toLowerCase().includes("our team");
              return (
                <BlockWrapper key={key} className={`max-w-6xl mx-auto px-6 mt-20 mb-12 ${isCentered ? "text-center" : "text-left"}`}>
                  <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-tight">
                    {block.heading}
                  </h2>
                  <div className={`bg-[#267b9a] mt-6 rounded-full opacity-80 ${isCentered ? "w-20 h-1.5 mx-auto" : "w-20 h-1.5"}`} />
                </BlockWrapper>
              );

            case "elements.rich-text":
              return (
                <BlockWrapper key={key} className="max-w-6xl mx-auto px-6 prose prose-lg prose-headings:font-black prose-headings:text-[#0f172a] prose-p:text-slate-600">
                  {renderRichText(block.richText, "text-slate-600")}
                </BlockWrapper>
              );

            case "custom.card-grid":
              return (
                <div key={key} className="max-w-7xl mx-auto px-6 mt-12 mb-24">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                  >
                    {block.cards.map((card: any) => (
                      <TeamCard key={card.id} card={card} />
                    ))}
                  </motion.div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="px-6 pb-24 bg-slate-50/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto bg-gradient-to-r from-[#267b9a] to-[#1f637c] rounded-[3rem] shadow-[0_30px_60px_rgba(38,123,154,0.3)] overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="relative z-10 px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
                Ready to take the next step?
              </h2>
              <p className="text-indigo-100 text-lg opacity-90 max-w-xl">
                Let’s discuss how our team can help you achieve your goals faster.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/contact-us"
                className="inline-block bg-white text-[#0f172a] px-10 py-5 text-[13px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}