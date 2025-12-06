"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MeetTheTeamBlock, 
  MeetTheTeamCardItem, 
  ServiceRichTextNode,
  ServiceRichTextChild
} from "@/lib/api";

// --- 1. REUSED RICH TEXT RENDERER ---
const renderRichText = (nodes: (ServiceRichTextNode | ServiceRichTextChild)[], textColorClass: string = "text-gray-600") => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    if (node.type === 'text') {
      const textNode = node as ServiceRichTextChild;
      let content: React.ReactNode = textNode.text;
      if (textNode.bold) content = <strong className="font-bold text-current">{content}</strong>;
      return <span key={index}>{content}</span>;
    }

    const blockNode = node as ServiceRichTextNode;
    
    switch (blockNode.type) {
      case 'paragraph':
        if (blockNode.children.length === 0 || (blockNode.children.length === 1 && (blockNode.children[0] as any).text === "")) {
             return <div key={index} className="h-6" />; 
        }
        return (
          <p key={index} className={`mb-6 text-lg leading-8 last:mb-0 ${textColorClass}`}>
            {renderRichText(blockNode.children, textColorClass)}
          </p>
        );
      case 'heading':
        return (
          <h3 key={index} className="text-2xl font-bold mt-8 mb-4 tracking-tight text-gray-900">
            {renderRichText(blockNode.children, textColorClass)}
          </h3>
        );
      case 'list':
        const listClass = blockNode.format === 'ordered' 
            ? "list-decimal pl-6 mb-8 space-y-3 text-lg marker:font-bold text-gray-900" 
            : "list-disc pl-6 mb-8 space-y-3 text-lg marker:text-gray-400";
        const Tag = blockNode.format === 'ordered' ? 'ol' : 'ul';
        return (
          <Tag key={index} className={`${listClass} ${textColorClass}`}>
            {renderRichText(blockNode.children, textColorClass)}
          </Tag>
        );
      case 'list-item':
        return (
          <li key={index} className="pl-2">
             {renderRichText(blockNode.children, textColorClass)}
          </li>
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
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Header Area */}
      <div className="bg-gray-50 p-6 flex justify-center items-center group-hover:bg-[#eaf4f7] transition-colors min-h-[140px]">
         {hasImage ? (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image 
                src={card.image!.url} 
                alt={card.image!.alternativeText || card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
         ) : (
            <div className="text-[#267b9a] w-16 h-16 flex items-center justify-center">
                {card.icon?.iconData ? (
                  <svg
                    width="48"
                    height="48"
                    viewBox={`0 0 ${card.icon.width || 36} ${card.icon.height || 32}`}
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    dangerouslySetInnerHTML={{ __html: card.icon.iconData }}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full" />
                )}
            </div>
         )}
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
        {card.position && (
          <span className="inline-block text-xs font-bold text-[#267b9a] uppercase tracking-widest mb-4">
            {card.position}
          </span>
        )}
        <p className="text-gray-600 text-base leading-relaxed flex-grow">
          {card.description}
        </p>
      </div>
    </div>
  );
};

// --- 3. MOBILE CAROUSEL COMPONENT (New Feature) ---
const MobileCarousel = ({ cards }: { cards: MeetTheTeamCardItem[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Update active index on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      // Calculate index based on scroll position (approximate)
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      // Use spacing logic to center roughly
      const cardWidthWithGap = width * 0.85 + 16; // 85vw + gap
      
      scrollRef.current.scrollTo({
        left: index * cardWidthWithGap, // Simple approximation
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
    <div className="relative md:hidden pb-12">
      {/* Cards Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-6 px-6 scrollbar-hide"
      >
        {cards.map((card, index) => (
          <div key={card.id} className="snap-center shrink-0 w-[85vw] sm:w-[350px]">
            <TeamCard card={card} />
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between px-4 mt-2">
        
        {/* Prev Button */}
        <button 
          onClick={scrollPrev}
          disabled={activeIndex === 0}
          className={`p-2 rounded-full border border-gray-200 shadow-sm transition-all ${
            activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:bg-gray-50 text-[#267b9a]'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* Indicators (Dots) */}
        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-[#267b9a] w-6' // Active dot is wider
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button 
          onClick={scrollNext}
          disabled={activeIndex === cards.length - 1}
          className={`p-2 rounded-full border border-gray-200 shadow-sm transition-all ${
            activeIndex === cards.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-white hover:bg-gray-50 text-[#267b9a]'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>

      </div>
    </div>
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
      <section className="relative w-full min-h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden px-4">
        {heroImage && heroImage.__component === 'elements.background-image' && heroImage.background?.url && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={heroImage.background.url}
              alt={heroImage.background.alternativeText || "Hero Background"}
              fill
              className="object-cover" 
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
        )}

        <div className="relative z-10 max-w-4xl mx-auto text-center animate-fadeIn py-20">
          {heroHeading && heroHeading.__component === 'elements.heading' && (
            <>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl mb-8">
                {heroHeading.heading}
              </h1>
              <div className="w-24 h-1.5 bg-[#267b9a] rounded-full shadow-lg mx-auto mb-8"></div>
            </>
          )}

          {heroText && heroText.__component === 'elements.rich-text' && (
             <div className="prose prose-lg prose-invert max-w-none text-gray-100/90 leading-relaxed mb-10">
                {renderRichText(heroText.richText, "text-gray-100")}
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
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow w-full py-24">
        {processedBlocks.map((block, index) => {
          const key = `block-${index}`;

          switch (block.__component) {
            case "elements.heading":
              const isCenteredHeading = block.heading.toLowerCase().includes("our team");

              return (
                <div 
                  key={key} 
                  className={`max-w-7xl mx-auto px-6 mt-20 mb-10 ${isCenteredHeading ? "text-center" : "text-left"}`}
                >
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {block.heading}
                  </h2>
                  <div className={`bg-[#267b9a] mt-5 rounded-full ${
                    isCenteredHeading ? "w-12 h-1 mx-auto" : "w-12 h-1"
                  }`}></div>
                </div>
              );

            case "elements.rich-text":
              return (
                <div key={key} className="max-w-7xl mx-auto px-6 prose prose-lg prose-headings:text-gray-900 prose-strong:text-gray-900">
                  {renderRichText(block.richText, "text-gray-600")}
                </div>
              );

            case "elements.button":
              return (
                <div key={key} className="flex justify-center my-12 px-6">
                  <Link
                    href={block.href}
                    target={block.isExternal ? "_blank" : "_self"}
                    className="bg-[#267b9a] hover:bg-[#1f637c] text-white px-8 py-3.5 text-base rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  >
                    {block.label}
                  </Link>
                </div>
              );

            case "custom.card-grid":
              return (
                <div key={key} className="max-w-7xl mx-auto px-6 mt-12 mb-16">
                  
                  {/* 1. MOBILE: Carousel with Controls */}
                  <MobileCarousel cards={block.cards} />

                  {/* 2. DESKTOP: Grid Layout (hidden on mobile) */}
                  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {block.cards.map((card) => (
                      <TeamCard key={card.id} card={card} />
                    ))}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-[#267b9a] rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                Ready to take the next step?
              </h2>
              <p className="text-indigo-100 text-lg opacity-90">
                Let’s discuss how we can help you achieve your goals.
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4">
               <Link
                 href="/contact-us"
                 className="px-8 py-3.5 text-base rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-center whitespace-nowrap bg-white text-[#267b9a] hover:bg-gray-100 hover:shadow-xl"
               >
                 Contact Us
               </Link>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}