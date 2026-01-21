"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import {
  ConfluenceBlock,
  ServiceRichTextNode,
  ServiceRichTextChild,
  ComponentFaqItem,
  ComponentBackgroundImage
} from "@/lib/api";

// --- 1. NEW TYPES TO REPLACE 'ANY' ---

// Extended Text Node to handle formatting flags
interface RichTextText extends ServiceRichTextChild {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
}

// Extended Block Node to handle structural props
interface RichTextBlock {
  type: string;
  children: (RichTextText | RichTextBlock)[];
  level?: number;
  format?: 'ordered' | 'unordered';
  url?: string;
}
interface ComponentCardV2 {
  __component: "elements.card-v2";
  id: number;
  Icon?: {
    width: number;
    height: number;
    iconData: string;
    iconName?: string;
  };
  Title: string;
  Desctription: RichNode[]; // Rich text array
}


type RichNode = RichTextText | RichTextBlock | RichTextImage;

const isRichTextImage = (node: RichNode): node is RichTextImage => {
  return node.type === "image";
};

const extractRichTextImage = (nodes: RichNode[]) => {
  for (const node of nodes) {
    if (isRichTextImage(node)) {
      return node.image;
    }
  }
  return null;
};


interface ComponentFeatureItem {
  __component: "elements.feature-item";
  id: number;
  title: string;
  description: string;
  icon: {
    width: number;
    height: number;
    iconData: string;
    iconName?: string;
  } | null;
}

interface ComponentButton {
  __component: "elements.button";
  id?: number;
  label: string;
  href: string;
  isExternal: boolean;
}
export interface ComponentImage {
  __component: "elements.image";
  id: number;
  singleImage: {
    url: string;
    alternativeText?: string | null;
    width: number;
    height: number;
  };
}

interface CustomFeatureGrid {
  __component: 'custom.feature-grid';
  items: ComponentFeatureItem[];
}
interface CustomCardV2Grid {
  __component: "custom.card-v2-grid";
  items: ComponentCardV2[];
}

interface RichTextImage {
  type: "image";
  image: {
    url: string;
    width: number;
    height: number;
    alternativeText?: string | null;
  };
}

// Union of all possible blocks passed to the renderer
type AnyBlock =
  | ConfluenceBlock
  | ComponentBackgroundImage
  | ComponentFeatureItem
  | ComponentButton
  | ComponentImage
  | ComponentCardV2;

// Union of blocks used inside the main content loop
type ContentBlock = AnyBlock | CustomFeatureGrid | CustomCardV2Grid;


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
    transition: { staggerChildren: 0.1 }
  }
};

// --- 2. SHARED RICH TEXT RENDERER ---
const renderRichText = (nodes: (ServiceRichTextNode | ServiceRichTextChild | RichNode)[], textColorClass: string = "text-gray-600") => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    // Cast to our local RichNode type to access optional props safely
    const safeNode = node as RichNode;

    if (safeNode.type === 'text') {
      const textNode = safeNode as RichTextText;
      let content: React.ReactNode = textNode.text;

      if (textNode.bold) content = <strong key="bold" className="font-bold text-gray-900">{content}</strong>;
      if (textNode.italic) content = <em key="italic" className="italic">{content}</em>;
      if (textNode.code) content = <code key="code" className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200">{content}</code>;

      return <span key={index}>{content}</span>;
    }

    // It's a block node
    const blockNode = safeNode as RichTextBlock;

    switch (blockNode.type) {
      case 'paragraph':
        if (blockNode.children.length === 0 || (blockNode.children.length === 1 && (blockNode.children[0] as RichTextText).text === "")) {
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
          ? "list-decimal pl-6 mb-8 space-y-2 text-lg marker:font-bold text-gray-900"
          : "list-disc pl-6 mb-8 space-y-2 text-lg marker:text-[#267b9a]";

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
              {renderRichText(blockNode.children, textColorClass)}
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

// --- 3. SUB-COMPONENTS ---

const FaqItem = ({ item }: { item: ComponentFaqItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4">
      <div
        onClick={toggle}
        className={`group cursor-pointer rounded-xl border border-transparent bg-gray-50 transition-all duration-300 hover:border-indigo-100 hover:bg-white hover:shadow-lg ${isOpen ? 'bg-white shadow-md ring-1 ring-gray-100' : ''}`}
      >
        <div className="flex items-center justify-between p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#267b9a] transition-colors">
            {item.title}
          </h3>
          <div className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#267b9a] text-white rotate-180' : 'bg-indigo-100 text-indigo-600 group-hover:bg-[#267b9a] group-hover:text-white'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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
                {renderRichText(item.content, "text-gray-600")}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- 4. HELPER: GROUP BLOCKS ---

const processBlocks = (blocks: AnyBlock[]) => {
  const heroBlocks: AnyBlock[] = [];
  const processedContent: ContentBlock[] = [];

  let foundHeroLimit = false;
  let buttonFound = false;
  let featureBuffer: ComponentFeatureItem[] = [];
  let cardV2Buffer: ComponentCardV2[] = [];

  const flushCardV2 = () => {
    if (cardV2Buffer.length > 0) {
      processedContent.push({
        __component: "custom.card-v2-grid",
        items: [...cardV2Buffer],
      });
      cardV2Buffer = [];
    }
  };

  const flushFeatures = () => {
    if (featureBuffer.length > 0) {
      processedContent.push({
        __component: 'custom.feature-grid',
        items: [...featureBuffer]
      });
      featureBuffer = [];
    }
  };

  blocks.forEach((block) => {
    if (!foundHeroLimit) {
      if (block.__component === 'elements.heading' || block.__component === 'elements.rich-text') {
        heroBlocks.push(block);
        return;
      } else if (block.__component === 'elements.button' && !buttonFound) {
        heroBlocks.push(block);
        buttonFound = true;
        foundHeroLimit = true;
        return;
      } else {
        foundHeroLimit = true;
      }
    }

    if (block.__component === 'elements.feature-item') {
      featureBuffer.push(block as ComponentFeatureItem);
      return;
    }

    if (block.__component === 'elements.card-v2') {
      cardV2Buffer.push(block as ComponentCardV2);
      return;
    }

    flushFeatures();
    flushCardV2();
    processedContent.push(block);

  });

  flushFeatures();
  flushCardV2();
  return { heroBlocks, processedContent };

};


// --- 5. MAIN RENDERER ---

interface RendererProps {
  blocks: AnyBlock[];
}

export default function ConfluenceBlockRenderer({ blocks }: RendererProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!blocks || blocks.length === 0) return null;

  const heroImage = blocks.find((b) => b.__component === "elements.background-image") as ComponentBackgroundImage | undefined;
  const rawBlocks = blocks.filter((b) => b.__component !== "elements.background-image");

  const { heroBlocks, processedContent } = processBlocks(rawBlocks);

  // Helper type guards or specific finds
  const heroHeading = heroBlocks.find(b => b.__component === 'elements.heading') as { heading: string; __component: string } | undefined;
  const heroText = heroBlocks.find(b => b.__component === 'elements.rich-text') as { richText: any[]; __component: string } | undefined;
  const heroButton = heroBlocks.find(b => b.__component === 'elements.button') as ComponentButton | undefined;

  return (
    <div className="bg-white flex flex-col min-h-screen">

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[600px] flex items-center justify-center bg-[#0f172a] overflow-hidden px-4">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#267b9a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>

        {heroImage && heroImage.background?.url && (
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
          {heroHeading && (
            <>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl mb-8">
                {heroHeading.heading}
              </h1>
              <div className="w-24 h-1.5 bg-[#267b9a] rounded-full shadow-lg mx-auto mb-8"></div>
            </>
          )}

          {heroText && (
            <div className="prose prose-lg prose-invert max-w-none text-gray-100/90 leading-relaxed mb-10">
              {renderRichText(heroText.richText, "text-gray-100")}
            </div>
          )}

          {heroButton && (
            <Link
              href={heroButton.href}
              target={heroButton.isExternal ? "_blank" : "_self"}
              className="inline-block bg-[#267b9a] hover:bg-[#1f637c] text-white px-10 py-4 text-lg rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/20"
            >
              {heroButton.label}
            </Link>
          )}
        </motion.div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="grow w-full py-12 overflow-hidden">
        {processedContent.map((block, index) => {
          const key = `block-${index}`;
          if (block.__component === "custom.card-v2-grid") {
            return (
              <div key={key} className="max-w-7xl mx-auto px-6 my-20">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                  {block.items.map((card) => (
                    <motion.div
                      key={card.id}
                      variants={fadeInUp}
                      className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      {card.Icon && (
                        <div className="w-12 h-12 mb-6 text-[#267b9a]">
                          <svg
                            width={card.Icon.width}
                            height={card.Icon.height}
                            viewBox={`0 0 ${card.Icon.width} ${card.Icon.height}`}
                            fill="currentColor"
                            dangerouslySetInnerHTML={{ __html: card.Icon.iconData }}
                          />
                        </div>
                      )}

                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {card.Title}
                      </h3>

                      <div className="text-gray-600 text-sm leading-relaxed">
                        {renderRichText(card.Desctription, "text-gray-600")}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            );
          }

          // --- GRID RENDERER FOR FEATURES ---
          if (block.__component === 'custom.feature-grid') {
            const features = block.items;
            const isOddCount = features.length % 2 !== 0;
            const isFourItems = features.length === 4;

            const gridClasses = isFourItems
              ? "grid md:grid-cols-2 lg:grid-cols-2 gap-8"
              : "grid md:grid-cols-2 lg:grid-cols-3 gap-8";

            const containerClasses = isFourItems
              ? "max-w-5xl mx-auto px-6 mb-20 mt-10"
              : "max-w-7xl mx-auto px-6 mb-20 mt-10";

            return (
              <div key={key} className={containerClasses}>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className={gridClasses}
                >
                  {features.map((feature, fIndex) => {
                    const isLast = fIndex === features.length - 1;
                    let spanClass = "";

                    if (isOddCount && isLast) {
                      spanClass = "md:col-span-2 lg:col-span-1";
                    }
                    if (!isFourItems && features.length % 3 === 1 && isLast) {
                      spanClass += " lg:col-start-2";
                    }

                    const hasIcon = !!feature.icon;

                    return (
                      <motion.div
                        key={feature.id || fIndex}
                        variants={fadeInUp}
                        className={`rounded-md p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#267b9a]/30 transition-all duration-300 group ${spanClass}
      ${hasIcon ? "bg-white" : "bg-gradient-to-br from-gray-50 to-white text-center flex flex-col justify-center"}
    `}
                      >

                        {/* ICON (only if exists) */}
                        {hasIcon && (
                          <div className="w-14 h-14 rounded-full bg-[#f0f9fb] flex items-center justify-center text-[#267b9a] mb-6 group-hover:bg-[#267b9a] group-hover:text-white transition-colors duration-300">
                            <svg
                              width={feature.icon!.width}
                              height={feature.icon!.height}
                              viewBox={`0 0 ${feature.icon!.width} ${feature.icon!.height}`}
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-8 h-8"
                              dangerouslySetInnerHTML={{ __html: feature.icon!.iconData }}
                            />
                          </div>
                        )}

                        {/* TITLE */}
                        <h3
                          className={
                            hasIcon
                              ? "text-xl font-bold text-gray-900 mb-3 group-hover:text-[#267b9a] transition-colors"
                              : "text-4xl md:text-5xl font-extrabold text-[#267b9a] mb-2 tracking-tight"
                          }
                        >
                          {feature.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p
                          className={
                            hasIcon
                              ? "text-gray-600 leading-relaxed text-[15px]"
                              : "text-sm md:text-base uppercase tracking-wide text-gray-500"
                          }
                        >
                          {feature.description}
                        </p>
                      </motion.div>
                    );
                  })}

                </motion.div>
              </div>
            );
          }

          // --- STANDARD BLOCKS ---

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
              // We need to tell TS this block has a 'heading' property
              const headingBlock = block as { heading: string };
              return (
                <BlockWrapper key={key} className={`max-w-6xl mx-auto px-6 mt-6 text-left`}>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {headingBlock.heading}
                  </h2>
                  <div className="w-12 h-1 bg-[#267b9a] mt-4 rounded-full"></div>
                </BlockWrapper>
              );

            case "elements.rich-text": {
              const rtBlock = block as { richText: RichNode[] };

              const image = extractRichTextImage(rtBlock.richText);
              const textOnly = rtBlock.richText.filter(n => n.type !== "image");

              return (
                <BlockWrapper
                  key={key}
                  className={`max-w-6xl mx-auto px-6 my-16 ${image ? "grid md:grid-cols-2 gap-10 items-center" : ""
                    }`}
                >
                  {/* TEXT */}
                  <div className="prose prose-lg prose-headings:text-gray-900 prose-strong:text-gray-900">
                    {renderRichText(textOnly, "text-gray-600")}
                  </div>

                  {/* IMAGE */}
                  {image && (
                    <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={image.url}
                        alt={image.alternativeText || "Content image"}
                        width={image.width}
                        height={image.height}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </BlockWrapper>
              );
            }
            case "elements.button":
              const btn = block as ComponentButton;
              return (
                <BlockWrapper key={key} className="flex justify-start max-w-4xl mx-auto my-12 px-6">
                  <Link
                    href={btn.href}
                    target={btn.isExternal ? "_blank" : "_self"}
                    className="bg-[#267b9a] hover:bg-[#1f637c] text-white px-8 py-3.5 text-base rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  >
                    {btn.label}
                  </Link>
                </BlockWrapper>
              );

            case "elements.faq-item":
              return (
                <motion.div
                  key={key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="max-w-6xl mx-auto px-6"
                >
                  <FaqItem item={block as ComponentFaqItem} />
                </motion.div>
              );
            case "elements.image": {
              const imageBlock = block as ComponentImage;

              if (!imageBlock.singleImage?.url) return null;

              return (
                <BlockWrapper key={key} className="max-w-6xl mx-auto px-6 my-16">
                  <div className="relative w-full overflow-hidden rounded-xl shadow-lg">
                    <Image
                      src={imageBlock.singleImage.url}
                      alt={imageBlock.singleImage.alternativeText || "Content image"}
                      width={imageBlock.singleImage.width}
                      height={imageBlock.singleImage.height}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </BlockWrapper>
              );
            }

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
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-4">
                Ready to transform your marketing?
              </h2>
              <p className="text-indigo-100 text-lg md:text-lg opacity-90 max-w-2xl">
                Let’s implement AI strategies that drive real growth for your business.
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