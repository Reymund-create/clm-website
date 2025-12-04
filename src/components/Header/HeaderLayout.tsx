"use client";

import React, { useState } from "react";
import Link from "next/link"; // <--- Import Link
import DesktopNavbar from "./DesktopNavBar";
import MobileNavbar from "./MobileNavBar";
import { NavigationItem } from "@/lib/api";

const STRAPI_BASE_URL = "https://ancient-crown-9dfaf5bb18.strapiapp.com";

interface HeaderLayoutProps {
  navItems: NavigationItem[];
  logoUrl?: string | null;
  siteName?: string;
}

const HeaderLayout: React.FC<HeaderLayoutProps> = ({ navItems, logoUrl, siteName }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const fullLogoUrl = logoUrl 
    ? (logoUrl.startsWith('http') ? logoUrl : `${STRAPI_BASE_URL}${logoUrl}`)
    : "/ConfluenceLogo.webp"; 

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        
        {/* Logo Section - Wrapped in Link to Root */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src={fullLogoUrl}
            alt={siteName || "Confluence Logo"}
            className="h-16 w-auto object-contain cursor-pointer" // Added cursor-pointer
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:block">
          <DesktopNavbar navItems={navItems} />
        </div>

        {/* Mobile Nav Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="xl:hidden flex flex-col space-y-1 focus:outline-none"
        >
          <span className="h-0.5 w-6 bg-gray-800"></span>
          <span className="h-0.5 w-6 bg-gray-800"></span>
          <span className="h-0.5 w-6 bg-gray-800"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="xl:hidden border-t">
          <MobileNavbar navItems={navItems} /> 
        </div>
      )}
    </header>
  );
};

export default HeaderLayout;