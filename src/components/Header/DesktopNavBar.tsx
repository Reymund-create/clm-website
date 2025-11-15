"use client";

import React from "react";
import NavItem from "./NavItem";
import DropdownMenu from "./DropdownMenu";

const DesktopNavbar: React.FC = () => {
  const navItems = [
    { label: "Home", href: "/", active: true },
    {
      label: "Technical SEO",
      href: "/technical-seo",
    },
    {
      label: "Services",
      dropdown: [
        { label: "Local SEO", href: "/services/local-seo" },
        { label: "Content Marketing", href: "/services/content-marketing" },
      ],
    },
    {
      label: "Meet the Team",
      dropdown: [
        { label: "Leadership", href: "/team/leadership" },
        { label: "Experts", href: "/team/experts" },
      ],
    },
    {
      label: "Confluence AI",
      href: "/confluence-ai",
    },
  ];

  return (
    <nav className="flex items-center space-x-8">
      {navItems.map((item) =>
        item.dropdown ? (
          <DropdownMenu key={item.label} label={item.label} items={item.dropdown} />
        ) : (
          <NavItem key={item.label} label={item.label} href={item.href} isActive={item.active} />
        ) 
      )}
      <button className="px-4 py-2 font-semibold text-white bg-[#267b9a] rounded-md hover:bg-[#216a86]">
        Contact Us
      </button>
    </nav>
  );
};

export default DesktopNavbar;
