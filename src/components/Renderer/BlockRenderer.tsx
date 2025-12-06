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

// --- 2. Helper: Recursive Rich Text Renderer ---
const renderRichText = (nodes: (RichTextNode | RichTextChild)[], textColorClass: string = "text-gray-600") => {
  if (!nodes) return null;

  return nodes.map((node, index) => {
    // A. Leaf Node (Text)
    if (node.type === 'text') {
      const textNode = node as RichTextChild;
      let content: React.ReactNode = textNode.text;

      if (textNode.bold) content = <strong className="font-bold">{content}</strong>;
      if (textNode.italic) content = <em className="italic">{content}</em>;
      if (textNode.underline) content = <span className="border-b-2 border-current pb-0.5">{content}</span>;
      if (textNode.code) content = <code className="bg-white/20 px-1.5 py-0.5 rounded text-sm font-mono">{content}</code>;
      if (textNode.strikethrough) content = <span className="line-through opacity-70">{content}</span>;

      return <span key={index}>{content}</span>;
    }

    // B. Block Node (Container)
    const blockNode = node as RichTextNode;
    
    switch (blockNode.type) {
      case 'paragraph':
        if (blockNode.children.length === 0 || (blockNode.children.length === 1 && (blockNode.children[0] as RichTextChild).text === "")) {
            return <div key={index} className="h-6" />; 
        }
        return (
          <p key={index} className={`mb-6 text-lg leading-8 last:mb-0 ${textColorClass}`}>
            {renderRichText(blockNode.children, textColorClass)}
          </p>
        );

      case 'heading':
        const Tag = (`h${blockNode.level || 3}`) as React.ElementType;
        const headingSize = blockNode.level === 1 ? 'text-3xl' : blockNode.level === 2 ? 'text-2xl' : 'text-xl';
        return (
          <Tag key={index} className={`${headingSize} font-bold mt-8 mb-4 tracking-tight text-current`}>
            {renderRichText(blockNode.children, textColorClass)}
          </Tag>
        );

      case 'list':
        const listClass = blockNode.format === 'ordered' 
            ? "list-decimal pl-6 mb-8 space-y-3 text-lg marker:font-bold" 
            : "mb-8 space-y-4";

        if (blockNode.format === 'ordered') {
            return (
                <ol key={index} className={`${listClass} ${textColorClass}`}>
                  {renderRichText(blockNode.children, textColorClass)}
                </ol>
            );
        }
        return (
          <ul key={index} className={listClass}>
            {renderRichText(blockNode.children, textColorClass)}
          </ul>
        );

      case 'list-item':
        return (
          <li key={index} className={`flex items-start text-lg ${textColorClass}`}>
             <span className="mt-1.5 mr-3 flex-shrink-0 opacity-80">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
             </span>
             <span className="leading-relaxed">{renderRichText(blockNode.children, textColorClass)}</span>
          </li>
        );

      case 'link':
        return (
            <a key={index} href={blockNode.url} className="underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity font-semibold">
                {renderRichText(blockNode.children, textColorClass)}
            </a>
        );

      case 'quote':
        return (
            <figure key={index} className="my-10 border-l-4 border-current bg-black/5 p-6 rounded-r-xl">
                <blockquote className="text-xl italic leading-relaxed">
                  "{renderRichText(blockNode.children, textColorClass)}"
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
      
      {/* --- HERO BANNER --- */}
      {(heroImageBlock || heroHeadingBlock) && (
        <section className="relative w-full min-h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden">
          {heroImageBlock?.background?.url && (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={heroImageBlock.background.url}
                alt={heroImageBlock.background.alternativeText || "Hero Background"}
                fill
                className="object-cover" 
                priority
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          )}

          {heroHeadingBlock && (
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fadeIn">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl">
                {heroHeadingBlock.heading}
              </h1>
              <div className="flex justify-center mt-8">
                 <div className="w-24 h-1.5 bg-[#267b9a] rounded-full shadow-lg"></div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow max-w-4xl mx-auto px-6 py-24 w-full">
        {contentBlocks.map((block, index) => {
          const key = `${block.__component}-${block.id}-${index}`;

          switch (block.__component) {
            case 'elements.heading':
              return (
                <div key={key} className="mt-20 mb-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {block.heading}
                  </h2>
                  <div className="w-12 h-1 bg-[#267b9a] mt-4 rounded-full"></div>
                </div>
              );

            case 'elements.rich-text':
              return (
                <div key={key} className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-strong:text-gray-900">
                  {renderRichText(block.richText, "text-gray-600")}
                </div>
              );

            case 'elements.faq-item':
              return (
                <div key={key} className="mb-4">
                  <details className="group rounded-xl bg-gray-50 border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-lg text-gray-900 select-none list-none [&::-webkit-details-marker]:hidden">
                      <span>{block.title}</span>
                      <span className="ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 group-open:bg-[#267b9a] group-open:text-white transition-all duration-300">
                        <svg className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed animate-fadeIn">
                      {renderRichText(block.content, "text-gray-600")}
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
                    style={{ width: '100%', height: 'auto' }}
                    className="object-cover transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              );

            default:
              return null;
          }
        })}
      </div>

      {/* --- FOOTER CTA (Contained Card) --- */}
      <div className="px-6 pb-24">
        <div className="max-w-5xl mx-auto bg-[#267b9a] rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            
            {/* Left Side: Hardcoded Text */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
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
        </div>
      </div>

    </div>
  );
};

export default BlockRenderer;