"use client";

import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { name: "Meet the Team", href: "/meet-the-team#meetOurTeam" },
    { name: "Technical SEO", href: "/technical-seo" },
    { name: "Confluence AI", href: "/confluence-ai" },
    { name: "Privacy Policy", href: "/privacy-policy" }, // Added redirect
  ];
  
  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/Confluencelocalmarketing/", icon: <FaFacebook size={18} /> },
    { name: "YouTube", href: "https://www.youtube.com/c/Confluencelocalmarketing", icon: <FaYoutube size={18} /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/confluence-local-marketing", icon: <FaLinkedin size={18} /> }, 
    { name: "Maps", href: "https://www.google.com/maps/dir/Confluence+Local+Marketing,+2020+Calamos+Ct,+Naperville,+IL+60563/2020+Calamos+Ct,+Naperville,+IL+60563/@40.4848495,-86.976014,8z/data=!3m2!4b1!5s0x880ef8e74bdfc8e7:0xd5c6e936527cf4a2!4m13!4m12!1m5!1m1!1s0x880e57eff5fc1b93:0x67296514c59f316d!2m2!1d-88.2019069!2d41.8052949!1m5!1m1!1s0x880e57eff5fc1b93:0x67296514c59f316d!2m2!1d-88.2019069!2d41.8052949?hl=en&authuser=0&entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D", icon: <FaMapMarkedAlt size={18} /> }
  ];

  return (
    <footer className="bg-[#0f172a] text-zinc-400 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Image 
                src="/ConfluenceLogo.webp" 
                alt="Confluence Marketing Logo"
                width={220}
                height={60}
                className="brightness-0 invert opacity-90" // Makes logo white to match dark theme
              />
            </Link>
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#267b9a]" />
                Mon-Fri: 9:00 AM – 5:00 PM
              </p>
              <p>2020 Calamos Ct, Naperville, IL 60563</p>
              <a href="tel:6304478434" className="block text-[#267b9a] font-bold hover:text-[#40a9cf] transition-colors">
                630-447-8434
              </a>
            </div>
          </div>
        
          {/* Column 2: Useful Links */}
          <div>
            <h3 className="text-white font-bold tracking-tight mb-8">Navigation</h3>
            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-[#267b9a] transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company Blurb */}
          <div>
            <h3 className="text-white font-bold tracking-tight mb-8">Capabilities</h3>
            <p className="text-sm leading-relaxed">
              Empowering U.S. brands through AI-driven SEO, programmatic scaling, 
              and generative search optimization. We turn complex data into 
              sustained digital visibility.
            </p>
          </div>

          {/* Column 4: Social Presence */}
          <div>
            <h3 className="text-white font-bold tracking-tight mb-8">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#267b9a] hover:text-white hover:border-[#267b9a] transition-all duration-300"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-wide">
            © {currentYear} Confluence Local Marketing. Powered by AI Insight.
          </p>
          <div className="flex gap-6 text-xs underline underline-offset-4 decoration-zinc-800 hover:decoration-[#267b9a]">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;