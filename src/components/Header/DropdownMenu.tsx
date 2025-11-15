"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";
import NavItem from "./NavItem";

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  isActive?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  items,
  isActive,
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavItem label={label} hasDropdown isActive={isActive}>
        <FaChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${
            open ? "rotate-180 text-[#2b7c91]" : "text-gray-500"
          }`}
        />
      </NavItem>

      {open && (
        <div className="absolute left-0 top-full mt-3 w-48 bg-white text-gray-700 rounded-lg shadow-lg border border-gray-100 z-50">
          <ul className="py-2">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm hover:bg-[#2b7c91]/10 hover:text-[#2b7c91] transition-all duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
