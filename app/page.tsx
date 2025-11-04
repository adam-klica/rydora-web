"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import DownloadModal from "./components/DownloadModal";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Download from "./components/Download";
import Footer from "./components/Footer";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);

    // Aggressively remove Next.js logo
    const removeNextLogo = () => {
      const logo = document.getElementById("next-logo");
      if (logo) {
        logo.remove();
      }
      // Also try querySelector
      const logos = document.querySelectorAll('#next-logo, [id="next-logo"]');
      logos.forEach((el) => el.remove());
    };

    // Run immediately and multiple times
    removeNextLogo();
    setTimeout(removeNextLogo, 0);
    setTimeout(removeNextLogo, 100);
    setTimeout(removeNextLogo, 500);
    setTimeout(removeNextLogo, 1000);

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      removeNextLogo();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
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

      <div className="flex flex-col gap-[100px]">
        <Hero />
        <Features />
        <Gallery />
        <About />
        <Download />
        <Footer />
      </div>
    </div>
  );
}
