import { getAllServices } from "@/lib/api";
import ServicesClientWrapper from "./ServicesClientWrapper";

export default async function CoreServices() {
  const servicesData = await getAllServices();

  return (
    <section className="relative bg-[#050505] py-24 lg:py-40 overflow-hidden">

      {/* 1. SEAMLESS TOP EDGE */}
      <div className="absolute top-0 left-0 right-0 h-40 z-40 pointer-events-none">
        {/* Pulls the zinc-50 color from the section above into a soft glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/40 via-transparent to-transparent opacity-30" />

        {/* Matches the blur from the section above to create a "glass" bridge */}
        <div className="absolute inset-0 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>
      {/* 2. BACKGROUND DECORATION */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#1a1a1a_1px,transparent_0)] bg-[length:40px_40px] opacity-20" />

      {/* Large Blurred Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-[#267b9a]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-30 max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
            Our <span className="bg-gradient-to-r from-[#267b9a] to-[#40a9cf] bg-clip-text text-transparent italic font-light">Core Services</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Scalable, AI-driven solutions extracted directly from our intelligence engine to dominate modern search.
          </p>
        </div>

        {/* Client Wrapper for Grid and Interaction */}
        <ServicesClientWrapper initialServices={servicesData} />
      </div>
    </section>
  );
}