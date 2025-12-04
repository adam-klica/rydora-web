"use client";

import { useEffect } from "react";
import { SiAppstore, SiGoogleplay } from "react-icons/si";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: "40px",
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-xl p-2.5 text-slate-400 transition-all duration-200 hover:bg-slate-800 hover:text-white hover:scale-110"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-3">
            Download Rydora
          </h2>
          <p
            className="text-slate-400 mb-10 text-lg"
            style={{ marginBottom: "20px" }}
          >
            Choose your platform to get started
          </p>

          <div className="space-y-4">
            <a
              href="https://apps.apple.com/us/app/rydora/id6748365405"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-5 rounded-2xl border border-slate-700 bg-slate-800/80 transition-all duration-300 hover:bg-slate-800 hover:border-slate-600 hover:scale-[1.02] hover:shadow-lg"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                marginBottom: "20px",
              }}
            >
              <div className="flex items-center gap-4">
                <SiAppstore className="h-10 w-10 flex-shrink-0 text-white" />
                <div className="text-left">
                  <div className="text-sm text-slate-400 font-medium">
                    Download on the
                  </div>
                  <div className="text-xl font-bold text-white">App Store</div>
                </div>
              </div>
              <svg
                className="h-6 w-6 text-slate-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {/* Google Play */}
            <a
              href="https://play.google.com/store/apps/details?id=com.rydora.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-5 rounded-2xl border border-slate-700 bg-slate-800/80 transition-all duration-300 hover:bg-slate-800 hover:border-slate-600 hover:scale-[1.02] hover:shadow-lg"
              style={{
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <div className="flex items-center gap-4">
                <SiGoogleplay className="h-10 w-10 flex-shrink-0 text-white" />
                <div className="text-left">
                  <div className="text-sm text-slate-400 font-medium">
                    Get it on
                  </div>
                  <div className="text-xl font-bold text-white">
                    Google Play
                  </div>
                </div>
              </div>
              <svg
                className="h-6 w-6 text-slate-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
