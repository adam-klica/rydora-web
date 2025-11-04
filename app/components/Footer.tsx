"use client";

import Image from "next/image";
import { SiInstagram, SiTiktok } from "react-icons/si";

function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="border-t transition-all duration-300"
      style={{
        borderTopColor: "rgba(30, 41, 59, 0.5)",
        backgroundColor: "rgba(7, 34, 54, 0.3)",
        paddingTop: "60px",
        paddingBottom: "60px",
        paddingLeft: "100px",
        paddingRight: "100px",
      }}
    >
      <Container className="flex flex-col items-center justify-between gap-8 md:flex-row">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-center gap-3 transition-all duration-300 hover:opacity-80 hover:scale-105"
          >
            <span className="relative block" style={{ width: "40px", height: "40px" }}>
              <Image
                src="/images/logo.png"
                alt="Rydora logo"
                fill
                className="object-contain"
              />
            </span>
            <span
              className="text-lg font-semibold"
              style={{ color: "#fff" }}
            >
              Rydora
            </span>
          </a>
        </div>

        {/* Copyright */}
        <p
          className="text-sm text-center"
          style={{ color: "rgba(203, 213, 225, 0.7)" }}
        >
          &copy; {new Date().getFullYear()} Rydora. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/rydora.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg transition-all duration-300"
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(51, 65, 85, 0.5)",
              color: "rgba(203, 213, 225, 0.9)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(225, 48, 108, 0.2)";
              e.currentTarget.style.borderColor = "rgba(225, 48, 108, 0.4)";
              e.currentTarget.style.color = "#ec4899";
              e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(225, 48, 108, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.5)";
              e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
              e.currentTarget.style.color = "rgba(203, 213, 225, 0.9)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <SiInstagram style={{ width: "20px", height: "20px" }} />
          </a>
          <a
            href="https://tiktok.com/@rydora.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg transition-all duration-300"
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: "rgba(30, 41, 59, 0.5)",
              border: "1px solid rgba(51, 65, 85, 0.5)",
              color: "rgba(203, 213, 225, 0.9)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
              e.currentTarget.style.borderColor = "rgba(255, 0, 80, 0.4)";
              e.currentTarget.style.color = "#ff0050";
              e.currentTarget.style.transform = "translateY(-3px) scale(1.1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 0, 80, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.5)";
              e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
              e.currentTarget.style.color = "rgba(203, 213, 225, 0.9)";
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <SiTiktok style={{ width: "20px", height: "20px" }} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
