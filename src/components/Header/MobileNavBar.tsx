"use client";

import React from "react";

const MobileNavbar: React.FC = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Technical SEO", href: "/technical-seo" },
    { label: "Services", href: "/services" },
    { label: "Meet the Team", href: "/team" },
    { label: "Confluence AI", href: "/confluence-ai" },
  ];

  return (
    <div className="flex flex-col p-4 space-y-3 bg-white">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="text-gray-700 hover:text-[#2b7c91] font-medium transition-colors"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default MobileNavbar;
