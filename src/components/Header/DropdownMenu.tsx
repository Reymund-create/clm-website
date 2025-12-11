"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import NavItem from "./NavItem";

// Define a recursive type for items that can have children
export interface DropdownItem {
  label: string;
  href: string;
  items?: DropdownItem[]; // Recursive definition
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  isActive?: boolean;
  depth?: number; // To track nesting level
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  items,
  isActive,
  depth = 0,
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  // Level 0 is the main navbar. Level 1+ are dropdowns.
  const isTopLevel = depth === 0;
  
  // Check if we need two columns
  const useTwoColumns = items.length > 7;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Render the Trigger Button */}
      {isTopLevel ? (
        // Top-level Navbar Item
        <NavItem label={label} hasDropdown isActive={isActive}>
          <FaChevronDown
            className={`h-3 w-3 ml-1 transition-transform duration-200 ${
              open ? "rotate-180 text-[#2b7c91]" : "text-gray-500"
            }`}
          />
        </NavItem>
      ) : (
        // Nested Dropdown Item Trigger
        <div
          className={`flex items-center justify-between w-full px-4 py-2 text-sm cursor-pointer transition-colors duration-200 ${
            open ? "bg-[#2b7c91]/10 text-[#2b7c91]" : "text-gray-700 hover:bg-[#2b7c91]/10 hover:text-[#2b7c91]"
          }`}
        >
          <span>{label}</span>
          <FaChevronRight className="h-3 w-3 ml-2" />
        </div>
      )}

      {/* Render the Dropdown Content */}
      {open && (
        <div
          className={`absolute z-50 bg-white rounded-lg shadow-xl border border-gray-300 py-2
            ${
              // Conditionally set width: w-96 for 2 cols, w-48 for 1 col
              useTwoColumns ? "w-96" : "w-48"
            }
            ${
              isTopLevel
                ? "top-full left-0 mt-2" // Top level opens DOWN
                : "top-0 left-full ml-1" // Nested levels open to the RIGHT
            }
          `}
        >
          <ul className={useTwoColumns ? "grid grid-cols-2 gap-x-1" : ""}>
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`} className="relative">
                {item.items && item.items.length > 0 ? (
                  // If it has children, RECURSIVELY render another DropdownMenu
                  <DropdownMenu
                    label={item.label}
                    items={item.items}
                    depth={depth + 1}
                  />
                ) : (
                  // If it's a leaf node, render a Link
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#2b7c91]/10 hover:text-[#2b7c91] transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;