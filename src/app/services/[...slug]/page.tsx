import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServicePageBySlug } from "../../../lib/api"; 
import BlockRenderer from "../../../components/Renderer/BlockRenderer";

// 1. Update Interface for Next.js 15 + Catch-all route
interface PageProps {
  params: Promise<{
    slug: string[]; // Changed to string[] because of [...slug]
  }>;
}

// 1. Define strict types
type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;

  // Safety check
  if (!resolvedParams.slug?.length) {
    return { title: "Page Not Found" };
  }

  const slugString = resolvedParams.slug[resolvedParams.slug.length - 1];
  const data = await getServicePageBySlug(slugString);

  if (!data) {
    return { title: "Page Not Found" };
  }

  // --- Title Logic Start ---
  const baseTitle = data.metaTitle || "Service Page";
  const fullSuffix = " | Confluence Local Marketing"; // 29 chars
  const shortSuffix = " | CLM"; // 6 chars
  const maxChars = 60; // Standard Google SERP limit

  // Check if the Base Title + Full Suffix fits within 60 characters
  const finalTitle = (baseTitle.length + fullSuffix.length <= maxChars)
    ? `${baseTitle}${fullSuffix}`
    : `${baseTitle}${shortSuffix}`;
  // --- Title Logic End ---

  return {
    title: finalTitle,
    description: data.metaDescription || "",
  };
}


// 3. Main Page Component
export default async function ServiceDynamicPage({ params }: PageProps) {
  // Await the params object (Next.js 15 requirement)
  const resolvedParams = await params;
  
  // Extract the specific slug string
  const slugString = resolvedParams.slug[resolvedParams.slug.length - 1];

  // Fetch data based on the URL slug
  const data = await getServicePageBySlug(slugString);

  // If no data exists in Strapi for this slug, return 404
  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Pass the specific block array. 
        Ensure 'data.servicePage' matches the key in your API response.
        If your API returns 'blocks', change this to 'data.blocks' 
      */}
      <BlockRenderer blocks={data.servicePage} />
    </main>
  );
}