import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Body/Hero"; // 1. Import the Hero component
import WhyAISection from "@/components/Body/WhyAiSection";
import HowItWorks from "@/components/Body/HowItWorks";
import CoreServices from "@/components/Body/Coreservices";
import WhatweDO from "@/components/Body/WhatweDO";
import FAQ from "@/components/Body/FAQ";
import ReadyToDominate from "@/components/Body/ReadyToDominate";

export default function Home() {
  return (
    // Use a fragment or a div as the top-level container
    <>
      <Header />
      {/* Use the <main> tag for the primary content of the page */}
      <main>
        {/* 2. Place the Hero component here */}
        <Hero />
        <WhatweDO />
        <WhyAISection />
        <HowItWorks />
        <CoreServices />
        <FAQ />
        <ReadyToDominate />
        
        {/* You can add other sections of your page below the hero */}
        {/* <section>
          <h2>Features</h2>
          ...
        </section> 
        */}
      </main>
      <Footer />
    </>
  );
}
