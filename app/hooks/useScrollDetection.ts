"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to detect if user has scrolled past a threshold
 * Uses passive event listener for better scroll performance
 */
export function useScrollDetection(threshold: number = 12): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Check initial scroll position
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isScrolled;
}
