"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- 1. Type Definitions ---

interface RichTextChild {
  text: string;
  type: "text";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

interface RichTextNode {
  type: "paragraph" | "list" | "list-item" | "heading" | "link" | "quote";
  format?: "unordered" | "ordered";
  level?: 1 | 2 | 3 | 4 | 5 | 6; 
  url?: string;
  children: (RichTextNode | RichTextChild)[];
}

interface ComponentHeading {
  __component: "elements.heading";
  id: number;
  heading: string;
}

interface ComponentRichText {
  __component: "elements.rich-text";
  id: number;
  richText: RichTextNode[];
}

interface ComponentContactButton {
  __component: "elements.contact-button";
  id: number;
  label: string;
  phoneNumber: string;
}

interface ComponentBackgroundImage {
  __component: "elements.background-image";
  id: number;
  background: {
    id: number;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
    mime: string;
  };
}

interface ComponentFaqItem {
  __component: "elements.faq-item";
  id: number;
  title: string;
  isAccordion: boolean;
  content: RichTextNode[]; 
}

export type ServicePageBlock = 
  | ComponentHeading 
  | ComponentRichText 
  | ComponentContactButton
  | ComponentBackgroundImage
  | ComponentFaqItem;

interface BlockRendererProps {
  blocks: ServicePageBlock[];
}

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// --- 2. Helper: Recursive Rich Text Renderer ---
const renderRichText = (nodes: (RichTextNode | RichTextChild)[], textColorClass: string = "text-gray-600") => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    // A. Leaf Node (Text)
    if (node.type === 'text') {
      const textNode = node as RichTextChild;
      const textNodeAny = textNode as any; // Loose typing for safety
      let content: React.ReactNode = textNode.text;

      if (textNodeAny.bold) content = <strong key="bold" className="font-bold text-gray-900">{content}</strong>;
      if (textNodeAny.italic) content = <em key="italic" className="italic">{content}</em>;
      if (textNodeAny.underline) content = <span key="underline" className="border-b-2 border-current pb-0.5">{content}</span>;
      if (textNodeAny.code) content = <code key="code" className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">{content}</code>;
      if (textNodeAny.strikethrough) content = <span key="strike" className="line-through opacity-70">{content}</span>;

      return <span key={index}>{content}</span>;
    }

    // B. Block Node (Container)
    const blockNode = node as any; // Loose typing to avoid strict errors
    
    switch (blockNode.type) {
      case 'paragraph':
        if (blockNode.children.length === 0 || (blockNode.children.length === 1 && blockNode.children[0].text === "")) {
            return <div key={index} className="h-4" />; 
        }
        return (
          <p key={index} className={`mb-6 text-[1.05rem] leading-8 ${textColorClass} last:mb-0`}>
            {renderRichText(blockNode.children, textColorClass)}
          </p>
        );

      case 'heading':
        const level = blockNode.level || 3;
        const Tag = `h${level}` as React.ElementType;
        const headingSize = level === 1 ? 'text-4xl md:text-5xl' : level === 2 ? 'text-3xl md:text-4xl' : 'text-2xl';
        
        return (
          <Tag key={index} className={`${headingSize} font-bold mt-10 mb-6 tracking-tight text-gray-900`}>
            {renderRichText(blockNode.children, textColorClass)}
          </Tag>
        );

      case 'list':
        const isOrdered = blockNode.format === 'ordered';
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered 
            ? "list-decimal pl-6 mb-8 space-y-3 text-lg marker:font-bold text-gray-900" 
            : "list-disc pl-6 mb-8 space-y-3 text-lg marker:text-[#267b9a]";

        return (
            <ListTag key={index} className={`${listClass} ${textColorClass}`}>
                {renderRichText(blockNode.children, textColorClass)}
            </ListTag>
        );

      case 'list-item':
        return (
          <li key={index} className="pl-2 leading-relaxed">
            {renderRichText(blockNode.children, textColorClass)}
          </li>
        );

      case 'link':
        return (
            <a key={index} href={blockNode.url} className="text-[#267b9a] font-semibold underline decoration-[#267b9a]/30 hover:decoration-[#267b9a] transition-all">
                {renderRichText(blockNode.children, "text-[#267b9a]")}
            </a>
        );

      case 'quote':
        return (
            <blockquote key={index} className="relative pl-6 py-4 my-10 border-l-4 border-[#267b9a] bg-gradient-to-r from-gray-50 to-white rounded-r-lg shadow-sm">
                <div className="text-xl font-medium italic text-gray-800 leading-relaxed">
                  "{renderRichText(blockNode.children, textColorClass)}"
                </div>
            </blockquote>
        );

      default:
        return null;
    }
  });
};

// --- 3. Sub-Component: Animated Accordion ---
const FaqAccordion = ({ block }: { block: ComponentFaqItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`group cursor-pointer rounded-xl border border-transparent bg-gray-50 transition-all duration-300 hover:border-indigo-100 hover:bg-white hover:shadow-lg ${isOpen ? 'bg-white shadow-md ring-1 ring-gray-100' : ''}`}
      >
        <div className="flex items-center justify-between p-6">
          <span className="font-bold text-lg text-gray-900">{block.title}</span>
          <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#267b9a] text-white' : 'bg-indigo-100 text-indigo-600'}`}>
            <svg 
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                {renderRichText(block.content, "text-gray-600")}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


// --- 4. Main Component ---
const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || blocks.length === 0) return null;

  // --- A. Logic: Extract Hero Elements ---
  const heroImageBlock = blocks.find((b) => b.__component === "elements.background-image") as ComponentBackgroundImage | undefined;
  const heroHeadingBlock = blocks.find((b) => b.__component === "elements.heading") as ComponentHeading | undefined;

  // --- B. Logic: Extract Buttons for Footer ---
  const ctaButtons: ComponentContactButton[] = [];
  blocks.forEach(b => {
    if (b.__component === "elements.contact-button") {
        ctaButtons.push(b);
    }
  });

  // --- C. Logic: Filter Main Content ---
  const contentBlocks = blocks.filter((b) => {
    const isHeroImage = heroImageBlock && b === heroImageBlock;
    const isHeroHeading = heroHeadingBlock && b === heroHeadingBlock;
    const isCtaButton = ctaButtons.includes(b as ComponentContactButton);

    return !isHeroImage && !isHeroHeading && !isCtaButton;
  });

  return (
    <div className="bg-white flex flex-col min-h-screen">
      
      {/* --- HERO BANNER (UPDATED MODERN GLOW) --- */}
      {(heroImageBlock || heroHeadingBlock) && (
        <section className="relative w-full min-h-[500px] flex items-center justify-center bg-[#0f172a] overflow-hidden px-4">
          
          {/* Abstract Background Shapes */}
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#267b9a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>

          {heroImageBlock?.background?.url && (
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src={heroImageBlock.background.url}
                alt={heroImageBlock.background.alternativeText || "Hero Background"}
                fill
                className="object-cover opacity-40 mix-blend-overlay"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
            </div>
          )}

          {heroHeadingBlock && (
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeInUp}
              className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl">
                {heroHeadingBlock.heading}
              </h1>
              <div className="flex justify-center mt-8">
                 <div className="w-24 h-1.5 bg-[#267b9a] rounded-full shadow-lg"></div>
              </div>
            </motion.div>
          )}
        </section>
      )}

{/* --- MAIN CONTENT --- */}
      <div className="flex-grow max-w-6xl mx-auto px-6 py-24 w-full">
        {contentBlocks.map((block, index) => {
          const key = `${block.__component}-${block.id}-${index}`;
          
          // Helper wrapper for animation
          const BlockWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
            <motion.div 
                // Note: The 'key' is NOT here. It must be passed when BlockWrapper is USED below.
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
            case 'elements.heading':
              return (
                // FIX: Added key={key} here
                <BlockWrapper key={key} className="mt-20 mb-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {block.heading}
                  </h2>
                  <div className="w-12 h-1 bg-[#267b9a] mt-4 rounded-full"></div>
                </BlockWrapper>
              );

            case 'elements.rich-text':
              return (
                // FIX: Added key={key} here
                <BlockWrapper key={key} className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-strong:text-gray-900">
                  {renderRichText(block.richText, "text-gray-600")}
                </BlockWrapper>
              );

            case 'elements.faq-item':
              return (
                 <motion.div 
                    // FIX: Added key={key} here (Direct motion.div usage)
                    key={key}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={fadeInUp}
                 >
                    <FaqAccordion block={block} />
                 </motion.div>
              );

            case 'elements.background-image':
              if (!block.background || !block.background.url) return null;
              return (
                // FIX: Added key={key} here
                <BlockWrapper key={key} className="relative w-full my-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5">
                  <Image
                    src={block.background.url}
                    alt={block.background.alternativeText || "Content Image"}
                    width={block.background.width}
                    height={block.background.height}
                    style={{ width: '100%', height: 'auto' }}
                    className="object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </BlockWrapper>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* --- FOOTER CTA (UPDATED MODERN) --- */}
      <div className="px-6 pb-24">
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
           className="max-w-6xl mx-auto bg-gradient-to-r from-[#267b9a] to-[#1f637c] rounded-[2.5rem] shadow-2xl shadow-[#267b9a]/30 overflow-hidden relative"
        >
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_0)] bg-[length:20px_20px]" />

          <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            
            {/* Left Side: Hardcoded Text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                Ready to take the next step?
              </h2>
              <p className="text-indigo-100 text-lg opacity-90">
                Let’s discuss how we can help you achieve your goals.
              </p>
            </div>

            {/* Right Side: DYNAMIC Buttons (From Strapi) */}
            {ctaButtons.length > 0 && (
              <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4">
                {ctaButtons.map((button, index) => {
                  const isPrimary = index === 0;
                  
                  const baseClasses = "px-8 py-3.5 text-base rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-center whitespace-nowrap";
                  // Updated classes to match new theme
                  const primaryClasses = "bg-white text-[#267b9a] hover:bg-gray-100 hover:shadow-xl";
                  const secondaryClasses = "bg-transparent border-2 border-white text-white hover:bg-white/10";

                  return (
                    <a 
                      key={index} 
                      href={`tel:${button.phoneNumber}`} 
                      className={`${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`}
                    >
                      {button.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default BlockRenderer;