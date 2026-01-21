"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Screenshots from "./components/Screenshots";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Download from "./components/Download";
import Footer from "./components/Footer";

// Dynamic import for modal - only loaded when needed
const DownloadModal = dynamic(() => import("./components/DownloadModal"), {
  ssr: false,
});

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#070b12_0%,#0a1020_60%,#070b12_100%)] text-slate-100">
      <Header
        isScrolled={isScrolled}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <div className="flex flex-col">
        <Hero />
        <Screenshots />
        <Features />
        <Gallery />
        <About />
        <Download />
        <Footer />
      </div>
    </div>
  );
}
