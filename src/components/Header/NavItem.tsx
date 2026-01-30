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
          className={`flex items-center gap-2 px-5 py-4 text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${isActive ? "text-[#267b9a]" : "text-slate-400 group-hover:text-white"
            }`}
        >
          {label}
          <div className={`transition-transform duration-500 ease-out ${isActive ? "rotate-180" : "group-hover:rotate-180"}`}>
            {children}
          </div>
        </button>
      ) : (
        <Link
          href={href || "#"}
          className={`block px-5 py-4 text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${isActive ? "text-[#267b9a]" : "text-slate-400 hover:text-white"
            }`}
        >
          {label}
        </Link>
      )}

      {/* Visual Feedback Line */}
      <div className={`absolute bottom-2 left-5 right-5 h-[2px] transition-all duration-300 rounded-full 
        ${isActive ? "bg-[#267b9a] shadow-[0_0_12px_rgba(38,123,154,0.8)] opacity-100" : "bg-white opacity-0 group-hover:opacity-20 translate-y-1 group-hover:translate-y-0"}`}
      />
    </div>
  );
};

export default NavItem;