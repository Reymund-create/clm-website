import React from 'react';

// --- 1. Type Definitions (Matched to api.ts) ---

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
  url?: string; // For links
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

export type ServicePageBlock = 
  | ComponentHeading 
  | ComponentRichText 
  | ComponentContactButton;

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

      // Apply formatting layers
      if (textNode.bold) content = <strong className="font-bold text-gray-900">{content}</strong>;
      if (textNode.italic) content = <em className="italic">{content}</em>;
      if (textNode.underline) content = <u className="underline underline-offset-2">{content}</u>;
      if (textNode.strikethrough) content = <s className="line-through opacity-70">{content}</s>;
      if (textNode.code) content = <code className="bg-gray-100 text-indigo-600 px-1 py-0.5 rounded text-sm font-mono">{content}</code>;

      return <span key={index}>{content}</span>;
    }

    // B. Block Node (Container)
    const blockNode = node as RichTextNode;
    
    switch (blockNode.type) {
      case 'paragraph':
        // Handle empty paragraphs (often created by double spaces in editor)
        if (blockNode.children.length === 0 || (blockNode.children.length === 1 && (blockNode.children[0] as RichTextChild).text === "")) {
            return <br key={index} />; 
        }
        return (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {renderRichText(blockNode.children)}
          </p>
        );

      case 'heading':
        // Strapi sometimes nests headings inside Rich Text
        return <h3 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">{renderRichText(blockNode.children)}</h3>;

      case 'list':
        // --- FIX: Handle both Unordered (ul) and Ordered (ol) ---
        if (blockNode.format === 'ordered') {
            return (
                <ol key={index} className="list-decimal pl-5 mb-6 text-gray-700 space-y-2 marker:text-indigo-500 font-medium">
                  {renderRichText(blockNode.children)}
                </ol>
            );
        }
        return (
          <ul key={index} className="list-disc pl-5 mb-6 text-gray-700 space-y-2 marker:text-indigo-500">
            {renderRichText(blockNode.children)}
          </ul>
        );

      case 'list-item':
        return <li key={index} className="pl-1">{renderRichText(blockNode.children)}</li>;

      case 'link':
        return (
            <a key={index} href={blockNode.url} className="text-indigo-600 hover:underline font-medium">
                {renderRichText(blockNode.children)}
            </a>
        );

      case 'quote':
        return (
            <blockquote key={index} className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 my-4">
                {renderRichText(blockNode.children)}
            </blockquote>
        );

      default:
        return null;
    }
  });
};

// --- 3. Main Component ---
const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  // --- DEBUGGING: Check what React is actually receiving ---
  console.log("BlockRenderer received blocks:", blocks);

  if (!blocks || blocks.length === 0) {
      console.warn("BlockRenderer: No blocks to render");
      return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {blocks.map((block, i) => {
        // Fallback for ID if missing
        const key = block.id || i; 

        switch (block.__component) {
          
          case 'elements.heading':
            return (
              <h2 key={key} className="text-3xl md:text-4xl font-bold text-gray-900 mt-12 mb-6">
                {block.heading}
              </h2>
            );

          case 'elements.rich-text':
            return (
              <div key={key} className="prose prose-lg max-w-none text-gray-600">
                {renderRichText(block.richText)}
              </div>
            );

          case 'elements.contact-button':
            return (
              <div key={key} className="mt-8 mb-12">
                <a
                  href={`tel:${block.phoneNumber}`}
                  className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  {block.label}
                  <span className="ml-2 opacity-90 border-l border-indigo-400 pl-2">
                    {block.phoneNumber}
                  </span>
                </a>
              </div>
            );

          default:
            // Helpful for debugging if a new component is added in Strapi but not here
            console.warn("Unknown component type:", (block as any).__component);
            return null;
        }
      })}
    </div>
  );
};

// --- EXPORT DEFAULT ---
export default BlockRenderer;