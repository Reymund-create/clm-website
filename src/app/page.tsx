import { getLandingPageData } from "@/lib/api"; // Check this path matches your project structure
import Hero from "@/components/Body/Hero";
import WhyAISection from "@/components/Body/WhyAiSection";
import HowItWorks from "@/components/Body/HowItWorks";
import CoreServices from "@/components/Body/Coreservices";
import WhatweDO from "@/components/Body/WhatweDO";
import FAQ from "@/components/Body/FAQ";
import ReadyToDominate from "@/components/Body/ReadyToDominate";

export default async function Home() {
  // 1. Fetch data directly on the server
  const strapiData = await getLandingPageData();

  return (
    <>
      {/* Use the <main> tag for the primary content of the page */}
      <main>
        {/* 2. Pass the fetched data to the Hero component.
            If strapiData is null (fetch failed), the Hero component 
            has a guard clause (if (!data) return null) to handle it safely.
        */}
        <Hero data={strapiData} />
        <WhatweDO />
        <WhyAISection />
        <HowItWorks />
        <CoreServices />
        <FAQ />
        <ReadyToDominate />
      </main>
    </>
  );
}