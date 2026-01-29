"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationItem } from "@/lib/api";

interface MobileNavbarProps {
  navItems: NavigationItem[];
  onClose: () => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ navItems, onClose }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) onClose();
    };
    window.addEventListener("resize", handleResize);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      // Updated: background to #0f172a/95 and backdrop-blur
      className="fixed inset-0 z-[100] flex flex-col px-6 py-24 bg-[#0f172a]/95 backdrop-blur-2xl h-screen overflow-y-auto"
    >
      <div className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <MobileNavItem key={item.id} item={item} onClose={onClose} />
        ))}
      </div>
      
      {/* Primary Brand Button */}
      <Link 
        href="tel:630-447-8434"
        onClick={onClose}
        className="mt-10 w-full py-4 bg-[#267b9a] text-white text-center font-bold rounded-2xl shadow-xl shadow-[#267b9a]/20 transition-transform active:scale-95"
      >
        Speak to an Expert
      </Link>
    </motion.div>
  );
};

const MobileNavItem: React.FC<{ item: NavigationItem; onClose: () => void }> = ({ item, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0;

  return (
    <div className="flex flex-col border-b border-white/5">
      <div className="flex justify-between items-center py-5">
        <Link 
          href={item.path} 
          // Colors: Use Slate for neutral and Teak for active
          onClick={hasChildren ? (e) => { e.preventDefault(); setIsOpen(!isOpen); } : onClose}
          className={`text-xl font-bold tracking-tight transition-colors ${isOpen ? 'text-[#267b9a]' : 'text-slate-100'}`}
        >
          {item.title}
        </Link>
        {hasChildren && (
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400 bg-white/5 rounded-full border border-white/5">
            <motion.svg 
              animate={{ rotate: isOpen ? 180 : 0 }}
              className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </motion.svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/[0.02] border border-white/5 rounded-2xl mb-4"
          >
            <div className="grid grid-cols-1 gap-1 p-3">
              {item.items.map((child) => (
                <Link 
                  key={child.id} 
                  href={child.path} 
                  onClick={onClose}
                  className="py-3 px-4 text-slate-400 hover:text-white hover:bg-[#267b9a]/10 rounded-xl transition-all"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;