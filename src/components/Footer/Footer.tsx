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
  ];
  
  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: <FaFacebook className="w-6 h-6" />
    },
    {
      name: "YouTube",
      href: "#",
      icon: <FaYoutube className="w-6 h-6" />
    },
    {
        name: "LinkedIn",
        href: "#",
        icon: <FaLinkedin className="w-6 h-6" />
    }, 
    {
        name: "Maps",
        href: "#",
        icon: <FaMapMarkedAlt className="w-6 h-6" />
           
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Column 1: Contact & Social */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
                {/* Ensure your logo is in the /public folder */}
                <Image 
                    src="/ConfluenceLogo.webp" 
                    alt="Confluence Marketing Logo"
                    width={200}
                    height={50}
                    className="h-auto"
                />
            </Link>
            <p className="text-sm">
                Mon-Fri: 9:00 AM – 5:00 PM <br/>
                Sat-Sun: Closed
            </p>
            <p className="text-sm">
                2020 Calamos Ct, Naperville, IL 60563, United States
            </p>
            <a href="tel:6304478434" className="text-sm hover:text-white">630-447-8434</a>


          </div>
        
            <div>
              <h3 className="text-lg font-semibold text-white">Social Links</h3>
              <div className="flex space-x-4 space-y-2 mt-6">
                  {socialLinks.map((social) => (
                    <a key={social.name} href={social.href} className="hover:text-white">
                      <span className="sr-only">{social.name}</span>
                      {social.icon}
                    </a>
                  ))}
              </div>
            </div>
          {/* Column 2: Services
          <div>
            <h3 className="text-lg font-semibold text-white">Services</h3>
            <ul className="mt-6 space-y-4 text-sm">
              {servicesLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="text-lg font-semibold text-white">Useful Links</h3>
            <ul className="mt-6 space-y-4 text-sm">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="hover:text-white transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company Blurb */}
          <div>
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <p className="mt-6 text-sm">
              Companies around the U.S.A use Confluence Local Marketing to
              manage their marketing, reputation, Schema, social media, and
              SEO.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-sm text-center">
            &copy; {currentYear} Confluence Local Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

