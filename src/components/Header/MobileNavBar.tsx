"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NavigationItem } from "@/lib/api";

interface MobileNavbarProps {
  navItems: NavigationItem[];
  onClose: () => void; 
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ navItems, onClose }) => {
  return (
    <div className="flex flex-col space-y-1 px-6 py-6 bg-white h-[calc(100vh-80px)] overflow-y-auto">
      {navItems.map((item) => (
        <MobileNavItem 
          key={item.id} 
          item={item} 
          depth={0} 
          onClose={onClose} 
        />
      ))}

    </div>
  );
};

interface MobileNavItemProps {
  item: NavigationItem;
  depth: number;
  onClose: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, depth, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.items && item.items.length > 0;
  const paddingLeft = depth > 0 ? `${depth * 16}px` : "0px";

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col">
      <div 
        className="flex justify-between items-center w-full py-2 border-b border-gray-50 last:border-0"
        style={{ paddingLeft }}
      >
        {/* If it has children, the whole row toggles the menu. */}
        {hasChildren ? (
          <button 
             onClick={handleToggle}
             className="flex-grow flex items-center justify-between text-left w-full font-medium text-gray-800 text-lg group"
          >
            <span>{item.title}</span>
            
            {/* UPDATED: Chevron Icon with Rotation Animation */}
            <span className={`ml-4 text-gray-400 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>
        ) : (
          /* If no children, it is a clickable link. */
          <Link
            href={item.path}
            onClick={onClose} 
            className="flex-grow font-medium text-gray-800 hover:text-[#267b9a] text-lg"
          >
            {item.title}
          </Link>
        )}
      </div>

      {/* Recursive Children */}
      {hasChildren && isOpen && (
        <div className="flex flex-col space-y-1 mt-1 mb-2 animate-in slide-in-from-top-2">
          {item.items.map((child) => (
            <MobileNavItem 
                key={child.id} 
                item={child} 
                depth={depth + 1} 
                onClose={onClose} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;