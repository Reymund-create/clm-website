"use client";

import React, { useState } from "react";
import DesktopNavbar from "./DesktopNavBar";
import MobileNavbar from "./MobileNavBar";

const Header: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/ConfluenceLogo.webp"
            alt="Confluence Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden xl:block">
          <DesktopNavbar />
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
          <MobileNavbar />
        </div>
      )}
    </header>
  );
};

export default Header;
