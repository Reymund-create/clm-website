import React from 'react';
import Image from 'next/image';

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

// --- 2. Helper: Recursive Rich Text Renderer ---
const renderRichText = (nodes: (RichTextNode | RichTextChild)[]) => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    // A. Leaf Node (Text)
    if (node.type === 'text') {
      const textNode = node as RichTextChild;
      let content: React.ReactNode = textNode.text;

      if (textNode.bold) content = <strong className="font-bold text-gray-900">{content}</strong>;
      if (textNode.italic) content = <em className="italic text-gray-700">{content}</em>;
      if (textNode.underline) content = <span className="border-b-2 border-indigo-400 pb-0.5">{content}</span>;
      if (textNode.code) content = <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono border border-indigo-100">{content}</code>;

      return <span key={index}>{content}</span>;
    }

    // B. Block Node (Container)
    const blockNode = node as RichTextNode;
    
    switch (blockNode.type) {
      case 'paragraph':
        // Check for empty paragraphs
        if (blockNode.children.length === 0 || (blockNode.children.length === 1 && (blockNode.children[0] as RichTextChild).text === "")) {
            return <div key={index} className="h-6" />; 
        }
        return (
          <p key={index} className="mb-6 text-lg text-gray-600 leading-8 last:mb-0">
            {renderRichText(blockNode.children)}
          </p>
        );

      case 'heading':
        return <h3 key={index} className="text-2xl font-bold text-gray-900 mt-10 mb-4 tracking-tight">{renderRichText(blockNode.children)}</h3>;

      case 'list':
        if (blockNode.format === 'ordered') {
            return (
                <ol key={index} className="list-decimal pl-6 mb-8 space-y-3 text-lg text-gray-700 marker:text-indigo-600 marker:font-bold">
                  {renderRichText(blockNode.children)}
                </ol>
            );
        }
        return (
          // Marketing Style List (Using Checkmarks)
          <ul key={index} className="mb-8 space-y-4">
            {renderRichText(blockNode.children)}
          </ul>
        );

      case 'list-item':
        return (
          <li key={index} className="flex items-start text-lg text-gray-700">
             {/* Custom Checkmark Bullet */}
             <span className="mt-1.5 mr-3 flex-shrink-0 text-indigo-600">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
             </span>
             <span className="leading-relaxed">{renderRichText(blockNode.children)}</span>
          </li>
        );

      case 'link':
        return (
            <a key={index} href={blockNode.url} className="text-indigo-600 font-semibold border-b border-indigo-200 hover:border-indigo-600 transition-colors">
                {renderRichText(blockNode.children)}
            </a>
        );

      case 'quote':
        return (
            <figure key={index} className="my-10 border-l-4 border-indigo-600 bg-gray-50 p-6 rounded-r-xl">
                <blockquote className="text-xl italic text-gray-800 leading-relaxed">
                  "{renderRichText(blockNode.children)}"
                </blockquote>
            </figure>
        );

      default:
        return null;
    }
  });
};

// --- 3. Main Component ---
const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || blocks.length === 0) return null;

  // --- A. Extract Hero Elements ---
  const heroImageBlock = blocks.find(
    (b) => b.__component === "elements.background-image"
  ) as ComponentBackgroundImage | undefined;

  const heroHeadingBlock = blocks.find(
    (b) => b.__component === "elements.heading"
  ) as ComponentHeading | undefined;

  // --- B. Filter Remaining Blocks ---
  const contentBlocks = blocks.filter((b) => {
    const isHeroImage = 
      heroImageBlock && 
      b.id === heroImageBlock.id && 
      b.__component === "elements.background-image";

    const isHeroHeading = 
      heroHeadingBlock && 
      b.id === heroHeadingBlock.id && 
      b.__component === "elements.heading";

    return !isHeroImage && !isHeroHeading;
  });

  return (
    <div className="bg-white">
      
      {/* --- HERO BANNER --- */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden">
        
        {/* Background Layer */}
        {heroImageBlock?.background?.url && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={heroImageBlock.background.url}
              alt={heroImageBlock.background.alternativeText || "Hero Background"}
              fill
              className="object-cover" 
              priority 
            />
            {/* Dark Overlay (60%) */}
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}

        {/* Content Layer */}
        {heroHeadingBlock && (
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl">
              {heroHeadingBlock.heading}
            </h1>
            <div className="flex justify-center mt-8">
               <div className="w-24 h-1.5 bg-indigo-500 rounded-full shadow-lg"></div>
            </div>
          </div>
        )}
      </section>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        {contentBlocks.map((block, index) => {
          const key = `${block.__component}-${block.id}-${index}`;

          switch (block.__component) {
            case 'elements.heading':
              return (
                <div key={key} className="mt-20 mb-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {block.heading}
                  </h2>
                  <div className="w-12 h-1 bg-indigo-600 mt-4 rounded-full"></div>
                </div>
              );

            case 'elements.rich-text':
              return (
                <div key={key} className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-strong:text-gray-900">
                  {renderRichText(block.richText)}
                </div>
              );

            case 'elements.faq-item':
              return (
                <div key={key} className="mb-4">
                  <details className="group rounded-xl bg-gray-50 border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-lg text-gray-900 select-none">
                      <span>{block.title}</span>
                      <span className="ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 group-open:bg-indigo-600 group-open:text-white transition-all duration-300">
                        <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed animate-fadeIn">
                      {renderRichText(block.content)}
                    </div>
                  </details>
                </div>
              );

            case 'elements.background-image':
              if (!block.background || !block.background.url) return null;
              return (
                <div key={key} className="relative w-full my-16 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5">
                  <Image
                    src={block.background.url}
                    alt={block.background.alternativeText || "Content Image"}
                    width={block.background.width}
                    height={block.background.height}
                    className="w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              );

            // [UPDATED] Contact Button with specific styling
            case 'elements.contact-button':
              return (
                <div key={key} className="mt-16 mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                  <a
                    href={`tel:${block.phoneNumber}`}
                    className="transform rounded-lg bg-[#267b9a] px-8 py-3 text-base font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#216a86]"
                  >
                    {block.label} 
                    {/* Optional: Add phone number if you want it visible, e.g.: */}
                     {/* - {block.phoneNumber} */}
                  </a>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default BlockRenderer;