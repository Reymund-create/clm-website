import { notFound } from "next/navigation";

const STRAPI_URL = "https://ancient-crown-9dfaf5bb18.strapiapp.com";

// --- Existing Interfaces (Global & Nav) ---
export interface GlobalData {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  mainLogo?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

export interface NavigationItem {
  id: number;
  title: string;
  path: string;
  order: number;
  type: "EXTERNAL" | "WRAPPER" | "INTERNAL";
  items: NavigationItem[];
}

interface StrapiNavItemRaw {
  id: number;
  title: string;
  path: string;
  externalPath?: string | null;
  type: "EXTERNAL" | "WRAPPER" | "INTERNAL";
  menuAttached: boolean;
  order: number;
  parent: { id: number } | null;
}

// --- NEW INTERFACES (Service Pages / Dynamic Blocks) ---

export interface ServiceRichTextChild {
  text: string;
  type: "text";
  bold?: boolean;
}

export interface ServiceRichTextNode {
  type: "paragraph" | "list" | "list-item" | "heading";
  format?: "unordered" | "ordered";
  children: (ServiceRichTextNode | ServiceRichTextChild)[];
}

export interface ComponentHeading {
  __component: "elements.heading";
  id: number;
  heading: string;
}

export interface ComponentRichText {
  __component: "elements.rich-text";
  id: number;
  richText: ServiceRichTextNode[];
}

export interface ComponentContactButton {
  __component: "elements.contact-button";
  id: number;
  label: string;
  phoneNumber: string;
}

export type ServicePageBlock = 
  | ComponentHeading 
  | ComponentRichText 
  | ComponentContactButton
  | ComponentBackgroundImage 
  | ComponentFaqItem;

export interface ServicePageData {
  id: number;
  documentId: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  servicePage: ServicePageBlock[];
}
export interface ComponentBackgroundImage {
  __component: "elements.background-image";
  id: number;
  background: {
    id: number;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
    mime: string;
  };
}

// [ADD THIS] FAQ Interface
export interface ComponentFaqItem {
  __component: "elements.faq-item";
  id: number;
  title: string;
  isAccordion: boolean;
  content: ServiceRichTextNode[]; 
}

// --- NEW INTERFACES (Landing Page / Hero) ---

export interface StrapiTextChild {
  text: string;
  type: "text";
  bold?: boolean;
}

export interface StrapiTextBlock {
  type: "paragraph";
  children: StrapiTextChild[];
}

export interface StrapiButton {
  id: number;
  label: string;
  href: string;
  isExternal: boolean;
  type: "link";
}

export interface LandingPageData {
  id: number;
  documentId: string;
  eyebrow: string;
  title: StrapiTextBlock[];
  description: string;
  heroBackgound: {
    id: number;
    url: string;
    mime: string;
    width?: number;
    height?: number;
  };
  button: StrapiButton[];
}

// --- Logic (Navigation Tree) ---

function recursivelyBuildPaths(items: NavigationItem[], parentPath: string = "") {
  items.forEach((item) => {
    if (item.type !== "EXTERNAL" && !item.path.startsWith("http")) {
      const cleanSlug = item.path.replace(/^\//, ""); 
      let fullPath = "";

      if (parentPath === "/") {
        fullPath = `/${cleanSlug}`;
      } else if (parentPath) {
        fullPath = `${parentPath}/${cleanSlug}`;
      } else {
        fullPath = `/${cleanSlug}`;
      }

      if (!cleanSlug) fullPath = parentPath;
      if (item.path === "/") fullPath = "/"; 

      item.path = fullPath;
    }

    if (item.items && item.items.length > 0) {
      recursivelyBuildPaths(item.items, item.path);
    }
  });
}

function buildNavigationTree(flatItems: StrapiNavItemRaw[]): NavigationItem[] {
  const itemMap = new Map<number, NavigationItem>();
  const roots: NavigationItem[] = [];

  flatItems.forEach((raw) => {
    let initialPath = raw.externalPath || raw.path || "";
    if (initialPath === "/home" || raw.title === "Home") {
        initialPath = "/";
    }

    itemMap.set(raw.id, {
      id: raw.id,
      title: raw.title,
      path: initialPath,
      order: raw.order || 99,
      type: raw.type,
      items: [],
    });
  });

  flatItems.forEach((raw) => {
    const item = itemMap.get(raw.id);
    if (!item) return;

    if (raw.parent && raw.parent.id) {
      const parentItem = itemMap.get(raw.parent.id);
      if (parentItem) {
        parentItem.items.push(item);
      }
    } else {
      roots.push(item);
    }
  });

  const sortItems = (items: NavigationItem[]) => {
    items.sort((a, b) => a.order - b.order);
    items.forEach((child) => sortItems(child.items));
  };
  sortItems(roots);
  recursivelyBuildPaths(roots, "");

  return roots;
}

// --- Fetchers ---

export async function getNavigation(): Promise<NavigationItem[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/navigation/render/navigation?type=FLAT`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];
    const flatData: StrapiNavItemRaw[] = await res.json();
    return buildNavigationTree(flatData);
  } catch (error) {
    console.error("Error fetching navigation:", error);
    return [];
  }
}

export async function getGlobalData(): Promise<GlobalData | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/global?populate=mainLogo`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    return null;
  }
}

export async function getLandingPageData(): Promise<LandingPageData | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/hero-section?populate=*`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error("Failed to fetch landing page data", res.status);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    return null;
  }
}

// --- NEW FETCHER: Service Page (Dynamic Route) ---

export async function getServicePageBySlug(slug: string): Promise<ServicePageData | null> {
  try {
    // ---------------------------------------------------------------------------
    // IMPORTANT: Verify your Collection Name in Strapi
    // If your collection is named "Service", use "/api/services"
    // If it is named "Service Page", use "/api/service-pages"
    // ---------------------------------------------------------------------------
    const endpoint = "/api/services"; // I changed this to the most common default
    
    // Construct URL
    const url = `${STRAPI_URL}${endpoint}?filters[slug][$eq]=${slug}&populate[servicePage][populate]=*`;
    
    console.log(`Trying to fetch Service Page: ${url}`); // Debug Log

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch service page. Status: ${res.status} URL: ${url}`);
      return null;
    }

    const json = await res.json();
    
    if (json.data && json.data.length > 0) {
      return json.data[0];
    }
    
    console.log("Strapi returned 200 OK, but the data array was empty. No page matches this slug.");
    return null;
  } catch (error) {
    console.error("Error fetching service page:", error);
    return null;
  }
}