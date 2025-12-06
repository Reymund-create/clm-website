"use client";

import React from "react";
import { usePathname } from "next/navigation"; // <--- Import this
import NavItem from "./NavItem";
import DropdownMenu, { DropdownItem } from "./DropdownMenu";
import { NavigationItem } from "@/lib/api";

interface DesktopNavbarProps {
  navItems: NavigationItem[];
}

// Helper: Check if a parent contains the active path (to highlight parent when child is active)
const isChildActive = (items: NavigationItem[], currentPath: string): boolean => {
  return items.some(item => {
    if (item.path === currentPath) return true;
    if (item.items && item.items.length > 0) {
      return isChildActive(item.items, currentPath);
    }
    return false;
  });
};

const mapToDropdownItems = (items: NavigationItem[]): DropdownItem[] => {
  return items.map((item) => ({
    label: item.title,
    href: item.path,
    items: item.items && item.items.length > 0 ? mapToDropdownItems(item.items) : undefined,
  }));
};

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ navItems }) => {
  const pathname = usePathname(); // <--- Get current URL

  return (
    <nav className="flex items-center space-x-8">
      {navItems.map((item) => {
        const hasDropdown = item.items && item.items.length > 0;
        
        // Logic: Item is active if path matches OR if one of its children is active
        const isActive = 
          item.path === pathname || 
          (hasDropdown && isChildActive(item.items, pathname));

        return hasDropdown ? (
          <DropdownMenu
            key={item.id}
            label={item.title}
            items={mapToDropdownItems(item.items)}
            isActive={isActive} // Pass the calculated active state
          />
        ) : (
          <NavItem
            key={item.id}
            label={item.title}
            href={item.path}
            isActive={isActive} // Pass the calculated active state
          />
        );
      })}
    </nav>
  );
};

export default DesktopNavbar;