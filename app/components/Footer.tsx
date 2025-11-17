"use client";

import Image from "next/image";
import Link from "next/link";
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
  const policyLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/eula", label: "EULA" },
    { href: "/community-guidelines", label: "Community Guidelines" },
    { href: "/marketplace-policy", label: "Marketplace Policy" },
    { href: "/content-moderation-policy", label: "Content Moderation Policy" },
    { href: "/app-store-policies", label: "App Store Policies" },
  ];

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
      <Container className="flex flex-col gap-8">
        {/* Top Section: Logo, Links, Social */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
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

          {/* Policy Links */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {policyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-all duration-300 hover:opacity-80"
                  style={{ color: "rgba(203, 213, 225, 0.7)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(203, 213, 225, 0.7)";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

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
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t pt-6" style={{ borderTopColor: "rgba(30, 41, 59, 0.3)" }}>
          <p
            className="text-sm text-center"
            style={{ color: "rgba(203, 213, 225, 0.7)" }}
          >
            &copy; {new Date().getFullYear()} Rydora. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
