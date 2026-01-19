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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* LightSite AI Discovery Integration */}
        <link
          rel="sitemap"
          type="application/xml"
          title="AI Sitemap"
          href="/ai-sitemap.xml"
        />

        {/* Schema App Configuration */}
        <Script id="schema-config" strategy="beforeInteractive">
          {`
            window.schema_highlighter = {
              accountId: "ConfluenceLocalMarketing",
              outputCache: true
            };
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />

        {/* Schema App Script */}
        <Script
          src="https://cdn.schemaapp.com/javascript/highlight.js"
          strategy="afterInteractive"
          async
        />

        {/* LightSite Script */}
        <Script
          src="https://cdn.lightsite.ai/v2.3.0/llm-delivery.js"
          strategy="afterInteractive"
          defer
          data-apikey="lsai_c5756cc5f6684e33a35d52402d58fa68"
          data-direct-supabase="true"
        />

        {/* InLinks */}
        <Script
          src="https://jscloud.net/x/49769/inlinks.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
