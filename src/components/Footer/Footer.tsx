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
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/Confluencelocalmarketing/", icon: <FaFacebook size={18} /> },
    { name: "YouTube", href: "https://www.youtube.com/c/Confluencelocalmarketing", icon: <FaYoutube size={18} /> },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/confluence-local-marketing", icon: <FaLinkedin size={18} /> },
    { name: "Maps", href: "https://www.google.com/maps/place/Confluence+Local+Marketing/@41.8052949,-88.2044818,17z/data=!3m1!4b1!4m6!3m5!1s0x880e57eff5fc1b93:0x67296514c59f316d!8m2!3d41.8052949!4d-88.2019069!16s%2Fg%2F11gxx60q18?entry=ttu&g_ep=EgoyMDI2MDIwMS4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D", icon: <FaMapMarkedAlt size={18} /> }
  ];

  return (
    <footer className="bg-[#0f172a] text-zinc-400 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 lg:px-8">
        {/* Adjusted Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center sm:text-left">

          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col items-center sm:items-start space-y-6">
            <Link href="/" className="inline-block transition-opacity hover:opacity-80">
              <Image
                src="/ConfluenceLogo.webp"
                alt="Confluence Marketing Logo"
                width={200}
                height={54}
                className="brightness-0 invert opacity-90"
              />
            </Link>
            <div className="space-y-3 text-sm leading-relaxed">
              <p className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#267b9a] hidden sm:block" />
                Mon-Fri: 9:00 AM – 5:00 PM
              </p>
              <p className="max-w-[200px] sm:max-w-none mx-auto sm:mx-0">
                2020 Calamos Ct, Naperville, IL 60563
              </p>
              <a href="tel:6304478434" className="block text-[#267b9a] font-black text-lg hover:text-[#40a9cf] transition-colors">
                630-447-8434
              </a>
            </div>
          </div>

          {/* Column 2: Useful Links */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm hover:text-[#267b9a] transition-all duration-300 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-xs">Capabilities</h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Empowering U.S. brands through AI-driven SEO, programmatic scaling,
              and generative search optimization.
            </p>
          </div>

          {/* Column 4: Social Presence */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-xs">Connect</h3>
            <div className="flex justify-center sm:justify-start flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#267b9a] hover:text-white hover:border-[#267b9a] hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="sr-only">{social.name}</span>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col items-center justify-between gap-6 sm:flex-row text-center sm:text-left">
          <p className="text-[10px] sm:text-xs tracking-wide text-zinc-500">
            © {currentYear} Confluence Local Marketing. <br className="sm:hidden" />
            Powered by AI Insight.
          </p>
          <div className="flex gap-8 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <Link href="/privacy-policy" className="hover:text-white transition-colors sm:text-xs">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;