"use client";

import React from "react";
import Link from "next/link";

interface NavItemProps {
  label: string;
  href?: string;
  isActive?: boolean;
  hasDropdown?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
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

  // SCENARIO 1: It has a dropdown (Parent Item)
  // We render a <button> or <div> so it is NOT clickable as a link.
  if (hasDropdown) {
    return (
      <div className="relative group">
        <button
          type="button"
          onClick={onClick}
          className={`${baseClasses} ${activeClasses} cursor-default`} // cursor-default implies no action
          aria-haspopup="true"
          aria-expanded={children ? true : false}
        >
          {label}
          {children} {/* Chevron Icon */}
        </button>
      </div>
    );
  }

  // SCENARIO 2: Regular Link (Child Item or Root without children)
  return (
    <Link href={href || "#"} className={`${baseClasses} ${activeClasses}`}>
      {label}
    </Link>
  );
};

export default NavItem;