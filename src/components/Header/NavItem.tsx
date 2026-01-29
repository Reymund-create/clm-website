"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface NavItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, isActive, hasDropdown, onClick, children }) => {
  return (
    <div className="relative group">
      {hasDropdown ? (
        <button
          onClick={onClick}
          // Updated colors: text-slate-400 pairs better with navy than zinc
          className={`flex items-center gap-1.5 px-5 py-4 text-[13px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
            isActive ? "text-[#267b9a]" : "text-slate-400 group-hover:text-white"
          }`}
        >
          {label}
          <span className={`transition-transform duration-500 ease-out ${isActive ? "rotate-180" : "group-hover:rotate-180"}`}>
            {children}
          </span>
        </button>
      ) : (
        <Link
          href={href || "#"}
          className={`block px-5 py-4 text-[13px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${
            isActive ? "text-[#267b9a]" : "text-slate-400 hover:text-white"
          }`}
        >
          {label}
        </Link>
      )}
      
      {/* High-End Glow Indicator - Refined for Navy background */}
      {isActive && (
        <motion.div 
          layoutId="nav-glow"
          className="absolute bottom-1 left-5 right-5 h-[2px] bg-[#267b9a] shadow-[0_0_15px_rgba(38,123,154,0.8)]"
        />
      )}

      {/* Hover Underline (Non-active) */}
      {!isActive && (
        <div className="absolute bottom-1 left-5 right-5 h-[1px] bg-[#267b9a] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center opacity-50" />
      )}
    </div>
  );
};

export default NavItem;