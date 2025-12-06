"use client";

import { useState } from "react";
import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import { Mail, Menu, X } from "lucide-react";

interface HeaderProps {
  isScrolled: boolean;
  onDownloadClick: () => void;
}

export default function Header({ isScrolled, onDownloadClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "https://rydora.me", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#gallery", label: "Gallery" },
    { href: "#about", label: "About" },
  ];

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled
          ? "rgba(7, 34, 54, 0.95)"
          : "rgba(7, 34, 54, 0.85)",
        borderBottom: "1px solid rgba(30, 41, 59, 0.5)",
        backdropFilter: "blur(20px)",
        boxShadow: isScrolled
          ? "0 4px 20px rgba(0, 0, 0, 0.3)"
          : "0 2px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        style={{
          width: "100%",
          paddingLeft: "clamp(16px, 4vw, 100px)",
          paddingRight: "clamp(16px, 4vw, 100px)",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "clamp(64px, 8vw, 96px)",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="https://rydora.me"
            style={{
              display: "flex",
              alignItems: "center",
              transition: "all 0.3s ease",
              padding: "8px",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.opacity = "0.9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "1";
            }}
          >
            <span
              style={{
                position: "relative",
                display: "block",
                width: "clamp(40px, 6vw, 48px)",
                height: "clamp(40px, 6vw, 48px)",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Rydora"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div
            style={{
              display: "none",
              alignItems: "center",
              gap: "12px",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  padding: "10px 20px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#cbd5e1",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(30, 41, 59, 0.6)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#cbd5e1";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div
            style={{
              display: "none",
              alignItems: "center",
              gap: "16px",
            }}
            className="desktop-actions"
          >
            {/* Contact Button */}
            <a
              href="mailto:support@rydora.me"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderRadius: "8px",
                padding: "12px 20px",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#e2e8f0",
                textDecoration: "none",
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(51, 65, 85, 0.5)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.8)";
                e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.8)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0, 0, 0, 0.3)";
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#fff",
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(16, 185, 129, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(16, 185, 129, 0.2)";
              }}
            >
              <FiDownload style={{ width: "16px", height: "16px" }} />
              <span>Download</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(51, 65, 85, 0.5)",
              color: "#cbd5e1",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            className="mobile-menu-button"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.8)";
              e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.5)";
              e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
            }}
          >
            {mobileMenuOpen ? (
              <X style={{ width: "24px", height: "24px" }} />
            ) : (
              <Menu style={{ width: "24px", height: "24px" }} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              paddingTop: "16px",
              paddingBottom: "24px",
              borderTop: "1px solid rgba(30, 41, 59, 0.5)",
              marginTop: "16px",
            }}
            className="mobile-menu"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "block",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#cbd5e1",
                    textDecoration: "none",
                    backgroundColor: "rgba(30, 41, 59, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(30, 41, 59, 0.6)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(30, 41, 59, 0.3)";
                    e.currentTarget.style.color = "#cbd5e1";
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:support@rydora.me"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#e2e8f0",
                  textDecoration: "none",
                  backgroundColor: "rgba(30, 41, 59, 0.5)",
                  border: "1px solid rgba(51, 65, 85, 0.5)",
                  marginTop: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(30, 41, 59, 0.8)";
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.8)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(30, 41, 59, 0.5)";
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
                  e.currentTarget.style.color = "#e2e8f0";
                }}
              >
                <Mail style={{ width: "16px", height: "16px" }} />
                <span>Contact</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadClick();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
                  cursor: "pointer",
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "8px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(16, 185, 129, 1) 0%, rgba(5, 150, 105, 1) 100%)";
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.5)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(16, 185, 129, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(16, 185, 129, 0.9) 0%, rgba(5, 150, 105, 0.9) 100%)";
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(16, 185, 129, 0.2)";
                }}
              >
                <FiDownload style={{ width: "16px", height: "16px" }} />
                <span>Download</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
