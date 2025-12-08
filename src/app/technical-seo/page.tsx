import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTechnicalSeoPage } from "../../lib/api"; 
import GlobalBlockRenderer from "../../components/Renderer/ConfluenceBlockRenderer";

// Force dynamic rendering to ensure fresh data from Strapi
export const dynamic = "force-dynamic"; 

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getTechnicalSeoPage();

  if (!pageData) return { title: "Page Not Found" };

  const { metaTitle, metaDescription } = pageData;
  
  // Logic: Smart suffix handling for optimized title length
  const longSuffix = " | Confluence Local Marketing";
  const shortSuffix = " | CLM";
  
  const finalTitle = (metaTitle.length + longSuffix.length <= 60) 
    ? `${metaTitle}${longSuffix}` 
    : `${metaTitle}${shortSuffix}`;

  return {
    title: finalTitle,
    description: metaDescription || "Technical SEO Services",
    openGraph: {
      title: finalTitle,
      description: metaDescription,
    },
  };
}

export default async function TechnicalSeoPage() {
  const pageData = await getTechnicalSeoPage();

  if (!pageData) {
    notFound();
  }

  const { technicalSEO } = pageData;

  return (
    <main>
        {/* The GlobalBlockRenderer now accepts the technicalSEO blocks.
          It will automatically group your `elements.feature-item` blocks 
          into the 3-column grid you designed.
        */}
        <GlobalBlockRenderer blocks={technicalSEO} />
    </main>
  );
}