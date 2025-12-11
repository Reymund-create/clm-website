import React from "react";
// FIX: Added GlobalData to the import list to make the type visible
import { getNavigation, getGlobalData} from "@/lib/api"; 
import HeaderLayout from "./HeaderLayout";

// This is an async Server Component
const Header = async () => {
  // Fetch both navigation and global data in parallel for better performance
  // TypeScript can now correctly infer the type of globalData as GlobalData | null
  const [navItems, globalData] = await Promise.all([
    getNavigation(),
    getGlobalData(),
  ]);

  return (
    <HeaderLayout 
      navItems={navItems} 
      logoUrl={globalData?.mainLogo?.url}
      siteName={globalData?.siteName}
    />
  );
};

export default Header;