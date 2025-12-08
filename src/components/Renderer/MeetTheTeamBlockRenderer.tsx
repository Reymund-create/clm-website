"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';

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
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.12 } 
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5 } 
  }
};

// --- 1. UPDATED RICH TEXT RENDERER ---
// logic updated to accept dynamic colors (white vs gray)
const renderRichText = (nodes: (ServiceRichTextNode | ServiceRichTextChild)[], textColorClass: string = "text-gray-600") => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    // Handle Leaf Text Nodes
    if (node.type === 'text') {
      const textNode = node as ServiceRichTextChild;
      const textNodeAny = textNode as any; 
      let content: React.ReactNode = textNode.text;
      
      if (textNodeAny.bold) {
        // Dynamic Bold Color
        const boldColor = textColorClass === "text-white" ? "text-white" : "text-gray-900";
        content = <strong key="bold" className={`font-bold ${boldColor}`}>{content}</strong>;
      }
      if (textNodeAny.italic) {
        content = <em key="italic" className="italic">{content}</em>;
      }
      if (textNodeAny.code) {
        content = <code key="code" className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">{content}</code>;
      }
      
      return <span key={index}>{content}</span>;
    }

    const blockNode = node as any; 
    
    switch (blockNode.type) {
      case 'paragraph':
        if (blockNode.children.length === 0 || (blockNode.children.length === 1 && blockNode.children[0].text === "")) {
             return <div key={index} className="h-4" />; 
        }
        return (
          // Use ${textColorClass} instead of hardcoded text-gray-600
          <p key={index} className={`mb-6 text-[1.05rem] leading-8 ${textColorClass} last:mb-0`}>
            {renderRichText(blockNode.children, textColorClass)}
          </p>
        );

      case 'heading':
        const level = blockNode.level || 3;
        // Determine Heading Color
        const headingColor = textColorClass === "text-white" ? "text-white" : "text-gray-900";

        const headingClasses = {
            1: `text-4xl md:text-5xl font-extrabold mt-12 mb-6 ${headingColor} tracking-tight`,
            2: `text-3xl md:text-4xl font-bold mt-12 mb-6 ${headingColor} tracking-tight`,
            3: `text-2xl font-bold mt-8 mb-4 ${headingColor}`,
            4: `text-xl font-bold mt-6 mb-3 ${headingColor}`,
            5: `text-lg font-bold mt-4 mb-2 ${headingColor}`,
            6: `text-base font-bold mt-4 mb-2 ${headingColor}`,
        };
        const className = headingClasses[level as keyof typeof headingClasses] || headingClasses[3];
        const Tag = `h${level}` as React.ElementType;

        return (
          <Tag key={index} className={className}>
            {renderRichText(blockNode.children, textColorClass)}
          </Tag>
        );

      case 'list':
        const isOrdered = blockNode.format === 'ordered';
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered
            ? `list-decimal pl-6 mb-8 space-y-2 text-lg marker:font-bold ${textColorClass === 'text-white' ? 'text-white' : 'text-gray-900'}` 
            : `list-disc pl-6 mb-8 space-y-2 text-lg marker:text-[#267b9a] ${textColorClass}`;
        
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

      case 'quote':
        return (
          <blockquote key={index} className="relative pl-6 py-4 my-10 border-l-4 border-[#267b9a] bg-gradient-to-r from-gray-50 to-white rounded-r-lg shadow-sm">
             <div className="text-xl font-medium italic text-gray-800 leading-relaxed">
               {/* Quotes usually stay dark even on dark pages because they have a white background box */}
               {renderRichText(blockNode.children, "text-gray-800")}
             </div>
          </blockquote>
        );
      
      case 'link':
         return (
            <Link 
               key={index} 
               href={blockNode.url || "#"} 
               className="text-[#267b9a] font-semibold underline decoration-[#267b9a]/30 hover:decoration-[#267b9a] transition-all"
            >
               {renderRichText(blockNode.children, "text-[#267b9a]")}
            </Link>
         );

      default:
        return null;
    }
  });
};

// --- 2. SUB-COMPONENTS ---

const TeamCard = ({ card }: { card: MeetTheTeamCardItem }) => {
  const hasImage = card.image && card.image.url;

  return (
    <motion.div 
      variants={cardVariants}
      className="group relative flex flex-col h-full bg-white rounded-2xl border border-gray-200 transition-all duration-300 hover:border-[#267b9a]/30 hover:shadow-2xl hover:shadow-[#267b9a]/10 hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-gray-50 to-white opacity-50 transition-opacity group-hover:from-[#eaf4f7] group-hover:to-white" />

      <div className="relative pt-10 px-8 flex justify-center z-10">
         {hasImage ? (
            <div className="relative w-36 h-36 rounded-full p-1 bg-white shadow-lg ring-1 ring-gray-100 group-hover:ring-[#267b9a] transition-all duration-500">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image 
                  src={card.image!.url} 
                  alt={card.image!.alternativeText || card.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 200px"
                />
              </div>
            </div>
         ) : (
            <div className="w-32 h-32 rounded-full bg-[#f0f9fb] flex items-center justify-center text-[#267b9a] ring-4 ring-white shadow-lg">
                {card.icon?.iconData ? (
                  <svg width="48" height="48" viewBox={`0 0 ${card.icon.width || 36} ${card.icon.height || 32}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: card.icon.iconData }} />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                )}
            </div>
         )}
      </div>

      <div className="p-8 pt-6 flex flex-col grow text-center relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-[#267b9a] transition-colors">
            {card.title}
        </h3>
        
        {card.position && (
          <span className="inline-block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-5">
            {card.position}
          </span>
        )}

        <div className="w-10 h-0.5 bg-gray-200 mx-auto mb-5 group-hover:bg-[#267b9a] transition-colors duration-500" />
        
        <p className="text-gray-600 text-[15px] leading-7 grow line-clamp-4">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
};

const MobileCarousel = ({ cards }: { cards: MeetTheTeamCardItem[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const cardWidthWithGap = width * 0.85 + 16; 
      
      scrollRef.current.scrollTo({
        left: index * cardWidthWithGap,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  const scrollNext = () => {
    if (activeIndex < cards.length - 1) scrollTo(activeIndex + 1);
  };

  const scrollPrev = () => {
    if (activeIndex > 0) scrollTo(activeIndex - 1);
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className="relative md:hidden pb-12"
    >
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 scrollbar-hide"
      >
        {cards.map((card) => (
          <div key={card.id} className="snap-center shrink-0 w-[85vw] sm:w-[350px]">
            <TeamCard card={card} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-4">
        <button 
          onClick={scrollPrev}
          disabled={activeIndex === 0}
          aria-label="Previous Slide"
          className={`w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 shadow-sm transition-all active:scale-95 ${
            activeIndex === 0 
              ? 'opacity-30 cursor-not-allowed bg-gray-50' 
              : 'bg-white hover:border-[#267b9a] hover:text-[#267b9a]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="flex gap-2.5">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-[#267b9a] w-8' 
                  : 'bg-gray-300 w-2.5 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={scrollNext}
          disabled={activeIndex === cards.length - 1}
          aria-label="Next Slide"
          className={`w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 shadow-sm transition-all active:scale-95 ${
            activeIndex === cards.length - 1 
              ? 'opacity-30 cursor-not-allowed bg-gray-50' 
              : 'bg-white hover:border-[#267b9a] hover:text-[#267b9a]'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </motion.div>
  );
};

// --- 4. MAIN RENDERER ---

interface RendererProps {
  blocks: MeetTheTeamBlock[];
}

export default function MeetTheTeamRenderer({ blocks }: RendererProps) {
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

  const processedBlocks: Array<
    | MeetTheTeamBlock 
    | { __component: "custom.card-grid"; cards: MeetTheTeamCardItem[] }
  > = [];

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

  const isButton = (b: any): b is { label: string; href: string; isExternal: boolean } => {
    return b && b.label && b.href;
  }

  return (
    <div className="bg-white flex flex-col min-h-screen">
      
      {/* --- HERO BANNER --- */}
      <section className="relative w-full min-h-[600px] flex items-center justify-center bg-[#0f172a] overflow-hidden px-4">
  
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#267b9a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>

        {heroImage && heroImage.__component === 'elements.background-image' && heroImage.background?.url && (
          <div className="absolute inset-0 w-full h-full z-0">
            <Image
              src={heroImage.background.url}
              alt={heroImage.background.alternativeText || "Hero Background"}
              fill
              className="object-cover opacity-40 mix-blend-overlay"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
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
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl mb-8">
                {heroHeading.heading}
              </h1>
              <div className="w-24 h-1.5 bg-[#267b9a] rounded-full shadow-lg mx-auto mb-8"></div>
            </>
          )}

          {heroText && heroText.__component === 'elements.rich-text' && (
             <div className="prose prose-lg prose-invert max-w-none text-white leading-relaxed mb-10">
               {/* UPDATED: Pass "text-white" here */}
               {renderRichText(heroText.richText, "text-white")}
             </div>
          )}

          {heroButton && isButton(heroButton) && (
             <Link
               href={heroButton.href}
               className="inline-block bg-[#267b9a] hover:bg-[#1f637c] text-white px-10 py-4 text-lg rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20"
             >
               {heroButton.label}
             </Link>
          )}
        </motion.div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="grow w-full py-24 overflow-hidden">
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
              const isCenteredHeading = block.heading.toLowerCase().includes("our team");
              return (
                <BlockWrapper key={key} className={`max-w-6xl mx-auto px-6 mt-20 mb-10 ${isCenteredHeading ? "text-center" : "text-left"}`}>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {block.heading}
                  </h2>
                  <div className={`bg-[#267b9a] mt-5 rounded-full ${
                    isCenteredHeading ? "w-12 h-1 mx-auto" : "w-12 h-1"
                  }`}></div>
                </BlockWrapper>
              );

            case "elements.rich-text":
              return (
                <BlockWrapper key={key} className="max-w-6xl mx-auto px-6 prose prose-lg prose-headings:text-gray-900 prose-strong:text-gray-900">
                  {/* Default renders with gray-600 */}
                  {renderRichText(block.richText, "text-gray-600")}
                </BlockWrapper>
              );

            case "elements.button":
              return (
                <BlockWrapper key={key} className="flex justify-center my-12 px-6">
                  <Link
                    href={block.href}
                    target={block.isExternal ? "_blank" : "_self"}
                    className="bg-[#267b9a] hover:bg-[#1f637c] text-white px-8 py-3.5 text-base rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  >
                    {block.label}
                  </Link>
                </BlockWrapper>
              );

            case "custom.card-grid":
              return (
                <div key={key} className="max-w-7xl mx-auto px-6 mt-12 mb-16">
                  <MobileCarousel cards={block.cards} />

                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={staggerContainer}
                    className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {block.cards.map((card) => (
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
      <div className="px-6 pb-24">
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
           className="max-w-6xl mx-auto bg-gradient-to-r from-[#267b9a] to-[#1f637c] rounded-[2.5rem] shadow-2xl shadow-[#267b9a]/30 overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_0)] bg-[length:20px_20px]" />
          
          <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Ready to take the next step?
              </h2>
              <p className="text-indigo-100 text-lg md:text-xl opacity-90 max-w-2xl">
                Let’s discuss how our team can help you achieve your goals faster.
              </p>
            </div>
            <div className="shrink-0">
               <Link
                 href="/contact-us"
                 className="inline-block px-10 py-4 text-lg rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-xl bg-white text-[#267b9a] hover:bg-gray-50"
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