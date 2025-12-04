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

// 2. Generate Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await the params object (Next.js 15 requirement)
  const resolvedParams = await params;
  
  // Extract the specific slug string (usually the last item in the array)
  const slugString = resolvedParams.slug[resolvedParams.slug.length - 1];

  const data = await getServicePageBySlug(slugString);

  if (!data) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: data.metaTitle || "Service Page",
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