"use client";

import React, { useEffect } from 'react';
import { motion, Variants } from 'framer-motion'; 
import Link from 'next/link';

// --- ANIMATION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

export default function ContactPage() {

  // --- THE FIX: Clean Script Injection ---
  useEffect(() => {
    const scriptId = 'paperform-embed-script';

    // 1. Remove any existing Paperform script to prevent conflicts
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    // 2. Create a fresh script tag
    const script = document.createElement('script');
    script.src = "https://paperform.co/__embed.min.js";
    script.id = scriptId;
    script.async = true;
    
    // 3. Append it to the body. This forces the script to run from scratch
    // and find the <div data-paperform-id> automatically.
    document.body.appendChild(script);

    // 4. Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return (
    <div className="bg-white flex flex-col min-h-screen">
      
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center bg-[#0f172a] overflow-hidden px-4">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#267b9a] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse pointer-events-none"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900 rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent pointer-events-none" />

        <motion.div 
           initial="hidden"
           animate="visible"
           variants={fadeInUp}
           className="relative z-10 max-w-4xl mx-auto text-center pt-20 pb-10"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl mb-8">
            Get in Touch
          </h1>
          <div className="w-24 h-1.5 bg-[#267b9a] rounded-full shadow-lg mx-auto mb-8"></div>
          <p className="text-xl text-gray-100/90 leading-relaxed max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="grow w-full py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid lg:grid-cols-2 gap-16"
          >
            
            {/* LEFT COLUMN: Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-10">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-6">
                  Let's start a conversation
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Whether you have a question about features, pricing, or need a demo, our team is ready to answer all your questions.
                </p>
              </div>

              {/* Contact Items */}
              <div className="space-y-6">
                
                {/* Email Item */}
                <div className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl hover:border-[#267b9a]/30 border border-transparent transition-all duration-300 group">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#f0f9fb] flex items-center justify-center text-[#267b9a] group-hover:bg-[#267b9a] group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#267b9a] transition-colors">Email Us</h3>
                    <p className="mt-1 text-gray-600">hello@yourcompany.com</p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl hover:border-[#267b9a]/30 border border-transparent transition-all duration-300 group">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#f0f9fb] flex items-center justify-center text-[#267b9a] group-hover:bg-[#267b9a] group-hover:text-white transition-colors duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#267b9a] transition-colors">Our Office</h3>
                    <p className="mt-1 text-gray-600">123 Innovation Dr, Suite 400<br/>Tech City, ST 90210</p>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* RIGHT COLUMN: Paperform Embed */}
            <motion.div variants={fadeInUp}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-h-[400px]">
                
                {/* The Paperform DIV */}
                <div data-paperform-id="smg9wu0g"></div>

              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* --- BOTTOM CTA --- */}
      <div className="px-6 pb-24">
        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={fadeInUp}
           className="max-w-6xl mx-auto bg-gradient-to-r from-[#267b9a] to-[#1f637c] rounded-[2.5rem] shadow-2xl shadow-[#267b9a]/30 overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_0)] bg-[length:20px_20px]" />
          
          <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-4">
                Not ready to contact us yet?
              </h2>
              <p className="text-indigo-100 text-lg md:text-lg opacity-90 max-w-2xl">
                Check out our FAQ page to see if we've already answered your question.
              </p>
            </div>
            <div className="shrink-0">
               <Link
                 href="/"
                 className="inline-block px-10 py-4 text-lg rounded-md font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-xl bg-white text-[#267b9a] hover:bg-gray-50"
               >
                 View FAQs
               </Link>
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}