"use client";

import React from "react";
import Link from "next/link"; 
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NavigationItem } from "@/lib/api";

interface DesktopNavbarProps {
  navItems: NavigationItem[];
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ navItems }) => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2">
      {navItems.map((item) => {
        const hasDropdown = item.items && item.items.length > 0;
        const isActive = 
          item.path === pathname || 
          (hasDropdown && item.items?.some(sub => sub.path === pathname));

        return (
          <div key={item.id} className="group/nav">
            <div className="relative">
              {hasDropdown ? (
                <button 
                  className={`flex items-center gap-1.5 px-4 py-6 text-sm font-bold uppercase tracking-widest transition-all duration-300 
                  ${isActive ? "text-[#267b9a]" : "text-slate-400 group-hover/nav:text-white"}`}
                >
                  {item.title}
                  <svg 
                    className={`w-3.5 h-3.5 transition-transform duration-300 group-hover/nav:rotate-180 ${isActive ? "text-[#267b9a]" : "text-slate-500"}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              ) : (
                <Link 
                  href={item.path} 
                  className={`block px-4 py-6 text-sm font-bold uppercase tracking-widest transition-all duration-300 
                  ${isActive ? "text-[#267b9a]" : "text-slate-400 hover:text-white"}`}
                >
                  {item.title}
                </Link>
              )}

              {isActive && (
                <motion.div 
                  layoutId="nav-glow"
                  className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#267b9a] rounded-t-full shadow-[0_-2px_15px_rgba(38,123,154,0.6)]"
                />
              )}
            </div>

            {/* Glassmorphism Mega Menu - Updated to 0f172a */}
            {hasDropdown && (
              <div className="absolute left-0 top-full w-screen invisible group-hover/nav:visible opacity-0 group-hover/nav:opacity-100 transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 z-50">
                <div className="bg-[#0f172a]/90 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] border-y border-white/5">
                  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4 py-12 px-8">
                    {item.items?.map((subItem) => (
                      <Link 
                        key={subItem.id} 
                        href={subItem.path}
                        className="group/item flex flex-col p-5 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/10 transition-all duration-300"
                      >
                        <span className="text-slate-100 font-bold text-base group-hover/item:text-[#267b9a] transition-colors">
                          {subItem.title}
                        </span>
                        <p className="mt-2 text-slate-400 text-xs leading-relaxed group-hover/item:text-slate-200">
                          Advanced AI strategies for {subItem.title.toLowerCase()} optimization.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[#267b9a] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[10px] font-black uppercase tracking-widest">
                          Explore Capability <span>→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default DesktopNavbar;