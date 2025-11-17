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
      <main className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 pb-8 border-b" style={{ borderBottomColor: "rgba(51, 65, 85, 0.4)" }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90" 
              style={{ 
                backgroundColor: "rgba(30, 41, 59, 0.4)", 
                color: "rgba(203, 213, 225, 0.8)",
                border: "1px solid rgba(51, 65, 85, 0.3)",
              }}
            >
              <span className="font-semibold" style={{ color: "rgba(203, 213, 225, 0.9)" }}>Last Updated:</span>
              <span>{lastUpdated}</span>
            </div>
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90" 
              style={{ 
                backgroundColor: "rgba(30, 41, 59, 0.4)", 
                color: "rgba(203, 213, 225, 0.8)",
                border: "1px solid rgba(51, 65, 85, 0.3)",
              }}
            >
              <span className="font-semibold" style={{ color: "rgba(203, 213, 225, 0.9)" }}>Effective Date:</span>
              <span>{effectiveDate}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div
          className="prose prose-invert max-w-none"
          style={{
            color: "rgba(203, 213, 225, 0.9)",
            lineHeight: "1.8",
            fontSize: "16px",
            letterSpacing: "0.01em",
          }}
        >
          <div 
            className="rounded-xl p-8 md:p-12 lg:p-16 transition-all duration-300" 
            style={{ 
              backgroundColor: "rgba(7, 34, 54, 0.25)", 
              border: "1px solid rgba(51, 65, 85, 0.3)",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
            }}
          >
            <PolicyContent content={children} />
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

