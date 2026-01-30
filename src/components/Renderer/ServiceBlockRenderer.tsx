"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';

// --- TYPES (Same as before) ---
interface RichTextChild { text: string; type: "text"; bold?: boolean; italic?: boolean; code?: boolean; }
interface RichTextNode { type: "paragraph" | "list" | "list-item" | "heading" | "link" | "quote"; format?: "unordered" | "ordered"; level?: 1 | 2 | 3; url?: string; children: (RichTextNode | RichTextChild)[]; }
interface ComponentHeading { __component: "elements.heading"; id: number; heading: string; }
interface ComponentRichText { __component: "elements.rich-text"; id: number; richText: RichTextNode[]; }
interface ComponentContactButton { __component: "elements.contact-button"; id: number; label: string; phoneNumber: string; }
interface ComponentBackgroundImage { __component: "elements.background-image"; id: number; background: { id: number; url: string; alternativeText?: string; width: number; height: number; }; }
interface ComponentFaqItem { __component: "elements.faq-item"; id: number; title: string; isAccordion: boolean; content: RichTextNode[]; }
export type ServicePageBlock = ComponentHeading | ComponentRichText | ComponentContactButton | ComponentBackgroundImage | ComponentFaqItem;
interface BlockRendererProps { blocks: ServicePageBlock[]; }

// --- VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// --- RENDERER ---
const renderRichText = (nodes: (RichTextNode | RichTextChild)[], textColorClass: string = "text-slate-600") => {
  if (!nodes) return null;
  return nodes.map((node, index) => {
    if (node.type === 'text') {
      const textNode = node as any;
      let content: React.ReactNode = textNode.text;
      if (textNode.bold) content = <strong key="bold" className="font-bold text-slate-900">{content}</strong>;
      if (textNode.italic) content = <em key="italic" className="italic">{content}</em>;
      if (textNode.code) content = <code key="code" className="bg-slate-100 text-[#267b9a] px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200">{content}</code>;
      return <span key={index}>{content}</span>;
    }
    const blockNode = node as any;
    switch (blockNode.type) {
      case 'paragraph':
        if (!blockNode.children.length) return <div key={index} className="h-4" />;
        return <p key={index} className={`mb-6 text-lg leading-8 ${textColorClass} last:mb-0`}>{renderRichText(blockNode.children, textColorClass)}</p>;
      case 'heading':
        const level = blockNode.level || 3;
        const Tag = `h${level}` as React.ElementType;
        const size = level === 1 ? 'text-5xl' : level === 2 ? 'text-4xl' : 'text-2xl';
        return <Tag key={index} className={`${size} font-bold mt-12 mb-6 tracking-tight text-slate-900`}>{renderRichText(blockNode.children, textColorClass)}</Tag>;
      case 'list':
        const isOrdered = blockNode.format === 'ordered';
        const ListTag = isOrdered ? 'ol' : 'ul';
        const listClass = isOrdered ? "list-decimal pl-6 mb-8 font-bold text-slate-900" : "list-disc pl-6 mb-8 marker:text-[#267b9a]";
        return <ListTag key={index} className={`${listClass} ${textColorClass} space-y-3 text-lg`}>{renderRichText(blockNode.children, textColorClass)}</ListTag>;
      case 'link':
        return <a key={index} href={blockNode.url} className="text-[#267b9a] font-bold underline decoration-[#267b9a]/30 hover:decoration-[#267b9a] transition-all">{renderRichText(blockNode.children, "text-[#267b9a]")}</a>;
      default: return null;
    }
  });
};

// --- COMPONENT: ACCORDION ---
const FaqAccordion = ({ block }: { block: ComponentFaqItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`group cursor-pointer rounded-2xl border bg-white transition-all duration-300 hover:border-[#267b9a]/40 hover:shadow-lg ${isOpen ? 'ring-1 ring-[#267b9a] shadow-md border-[#267b9a]' : 'border-slate-200'}`}
      >
        <div className="flex items-center justify-between p-6">
          <span className="font-bold text-xl text-slate-900 group-hover:text-[#267b9a] transition-colors">{block.title}</span>
          <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#267b9a] text-white rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-[#267b9a] group-hover:text-white'}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
          </span>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="px-6 pb-8 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                {renderRichText(block.content, "text-slate-600")}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- MAIN RENDERER ---
const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || blocks.length === 0) return null;

  const heroImageBlock = blocks.find((b) => b.__component === "elements.background-image") as ComponentBackgroundImage | undefined;
  const heroHeadingBlock = blocks.find((b) => b.__component === "elements.heading") as ComponentHeading | undefined;
  const ctaButtons: ComponentContactButton[] = [];
  blocks.forEach(b => { if (b.__component === "elements.contact-button") ctaButtons.push(b); });

  const contentBlocks = blocks.filter((b) => {
    return b !== heroImageBlock && b !== heroHeadingBlock && !ctaButtons.includes(b as ComponentContactButton);
  });

  return (
    <div className="bg-white flex flex-col min-h-screen font-sans">

      {/* --- HERO BANNER --- */}
      {(heroImageBlock || heroHeadingBlock) && (
        <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#0f172a] overflow-hidden px-4">
          {/* Tech FX */}
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#267b9a] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />

          {heroImageBlock?.background?.url && (
            <div className="absolute inset-0 w-full h-full z-0">
              <Image src={heroImageBlock.background.url} alt="Hero" fill className="object-cover opacity-40 mix-blend-overlay" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-transparent" />
            </div>
          )}

          {heroHeadingBlock && (
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-2xl">{heroHeadingBlock.heading}</h1>
              <div className="flex justify-center mt-10">
                <div className="w-24 h-1.5 bg-[#267b9a] rounded-full shadow-[0_0_15px_rgba(38,123,154,0.8)]"></div>
              </div>
            </motion.div>
          )}
        </section>
      )}

      {/* --- CONTENT --- */}
      <div className="flex-grow max-w-6xl mx-auto px-6 py-24 w-full">
        {contentBlocks.map((block, index) => {
          const key = `${block.__component}-${block.id}-${index}`;
          const BlockWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className={className}>{children}</motion.div>
          );

          switch (block.__component) {
            case 'elements.heading':
              return (
                <BlockWrapper key={key} className="mt-20 mb-10">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">{block.heading}</h2>
                  <div className="w-16 h-1 bg-[#267b9a] mt-6 rounded-full" />
                </BlockWrapper>
              );
            case 'elements.rich-text':
              return (
                <BlockWrapper key={key} className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600">
                  {renderRichText(block.richText, "text-slate-600")}
                </BlockWrapper>
              );
            case 'elements.faq-item':
              return <motion.div key={key} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}><FaqAccordion block={block} /></motion.div>;
            case 'elements.background-image':
              if (!block.background?.url) return null;
              return (
                <BlockWrapper key={key} className="relative w-full my-20 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200">
                  <Image src={block.background.url} alt="Image" width={block.background.width} height={block.background.height} style={{ width: '100%', height: 'auto' }} className="object-cover" />
                </BlockWrapper>
              );
            default: return null;
          }
        })}
      </div>

      {/* --- FOOTER CTA --- */}
      <div className="px-6 pb-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto bg-gradient-to-r from-[#267b9a] to-[#1f637c] rounded-[3rem] shadow-[0_30px_60px_rgba(38,123,154,0.3)] overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_0)] bg-[length:20px_20px]" />
          <div className="relative z-10 px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Ready to take the next step?</h2>
              <p className="text-indigo-100 text-lg opacity-90">Let’s discuss how we can help you achieve your goals.</p>
            </div>
            {ctaButtons.length > 0 && (
              <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4">
                {ctaButtons.map((button, index) => (
                  <a key={index} href={`tel:${button.phoneNumber}`} className={`px-10 py-5 text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-center whitespace-nowrap ${index === 0 ? "bg-white text-[#0f172a] hover:bg-slate-50" : "bg-transparent border-2 border-white text-white hover:bg-white/10"}`}>
                    {button.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlockRenderer;