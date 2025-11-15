"use client";

import React from "react";
import Link from "next/link";

interface NavItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
  children?: React.ReactNode; // for dropdown wrapper
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  href,
  isActive,
  hasDropdown,
  onClick,
  children,
}) => {
  const baseClasses =
    "flex items-center gap-1 px-4 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-200";

  const activeClasses = isActive
    ? "text-[#2b7c91] border-b-2 border-[#2b7c91]"
    : "text-gray-700 hover:text-[#2b7c91]";

  if (hasDropdown) {
    // Dropdown trigger button
    return (
      <div className="relative group">
        <button
          onClick={onClick}
          className={`${baseClasses} ${activeClasses}`}
          aria-haspopup="true"
          aria-expanded={children ? true : false}
        >
          {label}
          {children}
        </button>
      </div>
    );
  }

  // Normal nav item
  return (
    <Link href={href || "#"} className={`${baseClasses} ${activeClasses}`}>
      {label}
    </Link>
  );
};

export default NavItem;
