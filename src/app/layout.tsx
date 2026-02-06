import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Confluence Local Marketing | Local SEO",
  description:
    "Enhance your business visibility with expert local SEO strategies. Contact us to boost your search rankings today!",
  verification: {
    google: "JElj45SvEVZGptATzhnkZeXuMGmQGwvw3vpXDEI0onc",
  },
  // This replaces the manual <link> tag for the sitemap
  alternates: {
    types: {
      'application/xml': [{ url: '/ai-sitemap.xml', title: 'AI Sitemap' }],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Schema App Configuration - Kept as beforeInteractive for early loading */}
        <Script id="schema-config" strategy="beforeInteractive">
          {`
            window.schema_highlighter = {
              accountId: "ConfluenceLocalMarketing",
              outputCache: true
            };
          `}
        </Script>

        <Header />
        {children}
        <Footer />

        {/* Schema App Script */}
        <Script
          src="https://cdn.schemaapp.com/javascript/highlight.js"
          strategy="afterInteractive"
        />

        {/* InLinks Script */}
        <Script
          src="https://jscloud.net/x/49769/inlinks.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  );
}