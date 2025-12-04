"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NavigationItem } from "@/lib/api";

interface MobileNavbarProps {
  navItems: NavigationItem[];
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ navItems }) => {
  return (
    <div className="flex flex-col space-y-1 px-6 py-6 bg-white h-[calc(100vh-80px)] overflow-y-auto">
      {navItems.map((item) => (
        <MobileNavItem key={item.id} item={item} depth={0} />
      ))}
      <div className="pt-6 mt-4 border-t border-gray-100">
        <button className="w-full px-4 py-3 font-semibold text-white bg-[#267b9a] rounded-md hover:bg-[#216a86]">
          Contact Us
        </button>
      </div>
    </div>
  );
};

interface MobileNavItemProps {
  item: NavigationItem;
  depth: number;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, depth }) => {
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
        {/* If it has children, the whole row toggles the menu. No Link. */}
        {hasChildren ? (
          <button 
             onClick={handleToggle}
             className="flex-grow flex items-center justify-between text-left w-full font-medium text-gray-800 text-lg"
          >
            <span>{item.title}</span>
            <span className="text-xl font-bold text-gray-400 ml-4">
              {isOpen ? "−" : "+"}
            </span>
          </button>
        ) : (
          /* If no children, it is a clickable link */
          <Link
            href={item.path}
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
            <MobileNavItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;