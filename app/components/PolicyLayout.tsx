"use client";

import Link from "next/link";
import PolicyContent from "./PolicyContent";

interface PolicyLayoutProps {
  title: string;
  lastUpdated: string;
  effectiveDate: string;
  children: string;
}

export default function PolicyLayout({
  title,
  lastUpdated,
  effectiveDate,
  children,
}: PolicyLayoutProps) {

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#070b12_0%,#0a1020_60%,#070b12_100%)] text-slate-100">
      {/* Header */}
      <header className="border-b transition-all duration-300 sticky top-0 z-50 backdrop-blur-md bg-opacity-90" style={{ borderBottomColor: "rgba(30, 41, 59, 0.5)", backgroundColor: "rgba(7, 34, 54, 0.7)" }}>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4">
          <Link
            href="/"
            className="flex items-center gap-3 transition-all duration-300 hover:opacity-80"
          >
            <span className="text-lg font-semibold" style={{ color: "#fff" }}>
              ← Back to Home
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        width: "100%", 
        paddingTop: "48px", 
        paddingBottom: "48px",
        paddingLeft: "24px",
        paddingRight: "24px"
      }}>
        <div style={{ 
          maxWidth: "1280px", 
          margin: "0 auto", 
          paddingLeft: "32px", 
          paddingRight: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {/* Header Section */}
          <div style={{ 
            marginBottom: "48px", 
            paddingBottom: "32px", 
            paddingTop: "24px",
            paddingLeft: "24px",
            paddingRight: "24px",
            borderBottom: "1px solid rgba(51, 65, 85, 0.4)",
            width: "100%",
            textAlign: "center"
          }}>
            <h1 style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              marginBottom: "24px",
              background: "linear-gradient(to right, #ffffff, #cbd5e1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {title}
            </h1>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "16px", 
              fontSize: "14px",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "8px"
            }}>
              <div 
                style={{ 
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(30, 41, 59, 0.4)", 
                  color: "rgba(203, 213, 225, 0.8)",
                  border: "1px solid rgba(51, 65, 85, 0.3)",
                  transition: "opacity 0.2s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <span style={{ fontWeight: "600", color: "rgba(203, 213, 225, 0.9)" }}>Last Updated:</span>
                <span>{lastUpdated}</span>
              </div>
              <div 
                style={{ 
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(30, 41, 59, 0.4)", 
                  color: "rgba(203, 213, 225, 0.8)",
                  border: "1px solid rgba(51, 65, 85, 0.3)",
                  transition: "opacity 0.2s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
              >
                <span style={{ fontWeight: "600", color: "rgba(203, 213, 225, 0.9)" }}>Effective Date:</span>
                <span>{effectiveDate}</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div
            style={{
              color: "rgba(203, 213, 225, 0.9)",
              lineHeight: "1.8",
              fontSize: "16px",
              letterSpacing: "0.01em",
              width: "100%",
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              paddingLeft: "16px",
              paddingRight: "16px"
            }}
          >
            <div 
              style={{ 
                borderRadius: "12px",
                paddingTop: "32px",
                paddingBottom: "32px",
                paddingLeft: "48px",
                paddingRight: "48px",
                backgroundColor: "rgba(7, 34, 54, 0.25)", 
                border: "1px solid rgba(51, 65, 85, 0.3)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                width: "100%",
                maxWidth: "100%",
                margin: "0 auto",
                transition: "all 0.3s ease"
              }}
            >
              <PolicyContent content={children} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t transition-all duration-300 mt-16"
        style={{
          borderTopColor: "rgba(30, 41, 59, 0.5)",
          backgroundColor: "rgba(7, 34, 54, 0.3)",
          paddingTop: "60px",
          paddingBottom: "60px",
          paddingLeft: "100px",
          paddingRight: "100px",
        }}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <p
            className="text-sm text-center"
            style={{ color: "rgba(203, 213, 225, 0.7)" }}
          >
            &copy; {new Date().getFullYear()} Rydora. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

