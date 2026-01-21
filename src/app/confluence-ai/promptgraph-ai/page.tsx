import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptGraphPage } from "../../../lib/api";
import GlobalBlockRenderer from "../../../components/Renderer/GlobalBlockRenderer";

// Force dynamic rendering to ensure fresh data from Strapi on every request
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPromptGraphPage();

  if (!pageData) return { title: "Page Not Found" };

  const { metaTitle, metaDescription } = pageData;

  // SEO Logic: Smart suffix handling for optimized title length
  // If the title + long suffix is <= 60 chars, use full name. Otherwise use acronym.
  const longSuffix = " | PromptGraph Local Marketing";
  const shortSuffix = " | CLM";

  const finalTitle = (metaTitle.length + longSuffix.length <= 60)
    ? `${metaTitle}${longSuffix}`
    : `${metaTitle}${shortSuffix}`;

  return {
    title: finalTitle,
    description: metaDescription || "PromptGraph AI Services",
    openGraph: {
      title: finalTitle,
      description: metaDescription,
    },
  };
}

export default async function PromptGraphPage() {
  const pageData = await getPromptGraphPage();

  if (!pageData) {
    notFound();
  }

  const { promptGraphPage } = pageData;

  return (
    <main>
      {/* GlobalBlockRenderer handles:
          1. Extracting the Hero content (Heading/Text/Button) for the top banner.
          2. Rendering the main content (Rich Text).
          3. Grouping the FAQ items into an interactive Accordion.
        */}
      <GlobalBlockRenderer blocks={promptGraphPage} />
    </main>
  );
}