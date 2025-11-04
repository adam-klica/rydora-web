"use client";

import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import { Mail } from "lucide-react";

interface HeaderProps {
  isScrolled: boolean;
  onDownloadClick: () => void;
}

export default function Header({ isScrolled, onDownloadClick }: HeaderProps) {
  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "rgba(7, 34, 54, 0.95)" : "rgba(7, 34, 54, 0.85)",
        borderBottom: "1px solid rgba(30, 41, 59, 0.5)",
        backdropFilter: "blur(20px)",
        boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "0 2px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="w-full" style={{ paddingLeft: "100px", paddingRight: "100px" }}>
        <div className="flex h-24 items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            className="flex items-center transition-all duration-300 hover:scale-105 hover:opacity-90"
            style={{ padding: "8px" }}
          >
            <span className="relative block" style={{ width: "48px", height: "48px" }}>
              <Image
                src="/images/logo.png"
                alt="Rydora"
                fill
                className="object-contain"
                priority
              />
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden items-center gap-3 md:flex">
            {[
              { href: "#features", label: "Features" },
              { href: "#gallery", label: "Gallery" },
              { href: "#about", label: "About" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative rounded-lg px-5 py-2.5 text-sm font-medium text-slate-300 transition-all duration-300 hover:text-white"
                style={{
                  padding: "10px 20px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.6)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Contact Button */}
            <a
              href="mailto:support@rydora.me"
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300"
              style={{
                padding: "12px 20px",
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.8)";
                e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.8)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.5)";
                e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
                e.currentTarget.style.color = "#e2e8f0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Mail style={{ width: "16px", height: "16px" }} />
              <span>Contact</span>
            </a>

            {/* Download Button */}
            <button
              onClick={onDownloadClick}
              className="flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300"
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(16, 185, 129, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.2)";
              }}
            >
              <FiDownload style={{ width: "16px", height: "16px" }} />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
