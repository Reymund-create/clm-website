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
        const hasChildren = item.items && item.items.length > 0;
        const isActive =
          item.path === pathname ||
          (hasChildren && item.items?.some(sub =>
            sub.path === pathname || sub.items?.some(s => s.path === pathname)
          ));

        return (
          <div key={item.id} className="group/nav relative">
            {/* 1. TOP LEVEL MENU ITEM */}
            <div className="relative z-[60]">
              {hasChildren ? (
                <div className={`flex items-center gap-1.5 px-5 py-6 text-[13px] font-bold uppercase tracking-[0.12em] cursor-default transition-all duration-300 
                  ${isActive ? "text-[#267b9a]" : "text-slate-400 group-hover/nav:text-white"}`}>
                  {item.title}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-500 group-hover/nav:rotate-180 ${isActive ? "text-[#267b9a]" : "text-slate-500"}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              ) : (
                <Link
                  href={item.path}
                  className={`block px-5 py-6 text-[13px] font-bold uppercase tracking-[0.12em] transition-all duration-300 
                  ${isActive ? "text-[#267b9a]" : "text-slate-400 hover:text-white"}`}
                >
                  {item.title}
                </Link>
              )}

              {isActive && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute bottom-0 left-5 right-5 h-[3px] bg-[#267b9a] rounded-t-full shadow-[0_-2px_15px_rgba(38,123,154,0.6)]"
                />
              )}
            </div>

            {/* MEGA MENU DROPDOWN */}
            {hasChildren && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full w-[95vw] max-w-6xl invisible group-hover/nav:visible opacity-0 group-hover/nav:opacity-100 transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 z-50 pt-2">
                <div className="absolute top-0 left-0 w-full h-4 bg-transparent" />

                <div className="bg-[#0f172a]/95 backdrop-blur-2xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 rounded-3xl overflow-hidden">
                  <div className="grid grid-cols-12">
                    {/* Left Sidebar Info */}
                    <div className="col-span-3 bg-white/5 p-10 border-r border-white/5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[#267b9a] font-black text-xl mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          Explore our range of professional {item.title.toLowerCase()} services and tailored solutions.
                        </p>
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                        Navigation Hub
                      </div>
                    </div>

                    {/* Main Grid */}
                    <div className="col-span-9 p-10">
                      <div className="grid grid-cols-3 gap-x-10 gap-y-10 items-start">
                        {item.items?.map((subItem) => {
                          const hasSubSubItems = subItem.items && subItem.items.length > 0;

                          return (
                            <div key={subItem.id} className="group/subcol flex flex-col">
                              {/* 2. SUB-MENU HEADER */}
                              <div className="mb-3">
                                {hasSubSubItems ? (
                                  <div className="flex items-center gap-2 text-white cursor-default group-hover/subcol:text-[#267b9a] transition-colors">
                                    <span className="w-1.5 h-1.5 bg-[#267b9a] rounded-full" />
                                    <h4 className="font-bold text-[12px] uppercase tracking-wider">
                                      {subItem.title}
                                    </h4>
                                    <svg className="w-3 h-3 opacity-40 group-hover/subcol:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                ) : (
                                  <Link
                                    href={subItem.path}
                                    className="group/sublink flex items-center gap-2 text-white hover:text-[#267b9a] transition-colors"
                                  >
                                    <span className="w-1.5 h-1.5 bg-[#267b9a] rounded-full group-hover/sublink:scale-125 transition-transform" />
                                    <h4 className="font-bold text-[12px] uppercase tracking-wider">
                                      {subItem.title}
                                    </h4>
                                    <svg className="w-3 h-3 opacity-0 group-hover/sublink:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </Link>
                                )}
                              </div>

                              {/* 3. SUB-SUB-MENU ITEMS (Collapsible height logic) */}
                              {hasSubSubItems && (
                                <div className="flex flex-col space-y-1 overflow-hidden max-h-0 opacity-0 group-hover/subcol:max-h-[500px] group-hover/subcol:opacity-100 transition-all duration-500 ease-in-out">
                                  {subItem.items?.map((subSubItem) => (
                                    <Link
                                      key={subSubItem.id}
                                      href={subSubItem.path}
                                      className="group/link flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/5 transition-all"
                                    >
                                      <span className="text-slate-400 group-hover/link:text-[#267b9a] text-[14px] transition-colors">
                                        {subSubItem.title}
                                      </span>
                                      <svg className="w-3.5 h-3.5 text-[#267b9a] opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                      </svg>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
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