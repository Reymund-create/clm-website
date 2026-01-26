"use client";

import React from "react";
import { Search, Globe, Calendar, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative bg-[#0b1220] text-white overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

            <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* LEFT CONTENT */}
                <div>
                    <span className="block w-10 h-1 bg-[#267b9a] mb-6" />

                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight">
                        Transform Your <br />
                        Business for the{" "}
                        <span className="text-[#267b9a]">AI-Driven</span> Future
                    </h1>

                    <p className="mt-6 max-w-xl text-gray-300 leading-relaxed">
                        The shift to AI-driven search is happening now. Every day you wait is
                        another day of missed opportunities while your competitors capture
                        AI-driven leads. Take the first step today.
                    </p>
                </div>

                {/* RIGHT CTA STACK */}
                <div className="flex flex-col gap-4">
                    <p className="text-xs uppercase tracking-widest text-[#23c1a5] mb-3">
                        Get Started Now
                    </p>

                    {/* PRIMARY CTA */}
                    <Link
                        href="/contact-us"
                        className="
  bg-[#267b9a]
  text-black
  rounded-md
  p-6
  flex
  items-center
  gap-4
  transition
  duration-300
  hover:bg-[#267b9a]
  hover:text-white
  hover:shadow-[0_0_30px_rgba(38,123,154,0.6)]
  hover:ring-2
  hover:ring-[#267b9a]/50
"
                    >
                        <Search className="w-6 h-6" />
                        <div>
                            <span className="block text-xs uppercase tracking-wide opacity-70">
                                Recommended Step
                            </span>
                            <span className="font-semibold">
                                Get Your Free AI Visibility Scan
                            </span>
                        </div>
                    </Link>

                    {/* SECONDARY CTAs */}
                    <CTA
                        href="https://www.promptgraph.ai/"
                        icon={<Globe />}
                        label="Visit Website"
                        title="Confluence AI"
                        external
                    />

                    <CTA
                        href="/contact-us"
                        icon={<Calendar />}
                        label="See It in Action"
                        title="Schedule a Demo"
                    />

                    <CTA
                        href="mailto:sales@promptgraph.ai"
                        icon={<Mail />}
                        label="Talk to an Expert"
                        title="sales@promptgraph.ai"
                    />
                </div>
            </div>
        </section>
    );
}

function CTA({
    href,
    icon,
    label,
    title,
    external = false,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    title: string;
    external?: boolean;
}) {
    return (
        <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="border border-white/10 rounded-md p-5 flex items-center gap-4 bg-white/5 hover:bg-white/10 transition cursor-pointer"
        >
            <div className="text-[#267b9a]">{icon}</div>
            <div>
                <span className="block text-xs uppercase tracking-wide text-gray-400">
                    {label}
                </span>
                <span className="font-medium">{title}</span>
            </div>
        </Link>
    );
}
