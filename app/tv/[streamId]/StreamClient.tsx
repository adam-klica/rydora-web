"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useScrollDetection } from "../../hooks/useScrollDetection";

const DownloadModal = dynamic(() => import("../../components/DownloadModal"), {
  ssr: false,
});

interface StreamData {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: "SCHEDULED" | "LIVE" | "ENDED";
  thumbnailUrl?: string;
  currentViewers?: number;
  streamer: {
    id: string;
    displayName?: string;
    user?: {
      username: string;
      profileImage?: string;
    };
  };
  scheduledAt?: string;
  startedAt?: string;
}

// Fix malformed URLs that have double https://
const sanitizeImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  const secondHttpsIndex = url.indexOf("https://", 8);
  if (secondHttpsIndex > 0) {
    return url.substring(secondHttpsIndex);
  }
  return url;
};

// Detect device and redirect to app store
const detectDeviceAndRedirect = (streamId: string) => {
  if (typeof window === "undefined") return;

  const userAgent = navigator.userAgent || navigator.vendor;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /android/i.test(userAgent);

  // Try deep link first
  const deepLink = `rydora://tv/stream/${streamId}`;
  window.location.href = deepLink;

  // Fallback to store after delay
  setTimeout(() => {
    if (isIOS) {
      window.location.href = "https://apps.apple.com/us/app/rydora/id6748365405";
    } else if (isAndroid) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.rydora.app";
    }
  }, 2500);
};

interface StreamClientProps {
  streamId: string;
  initialData: StreamData | null;
}

export default function StreamClient({ streamId, initialData }: StreamClientProps) {
  const [stream] = useState<StreamData | null>(initialData);
  const isScrolled = useScrollDetection(12);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Auto-attempt to open the app on page load
  useEffect(() => {
    if (typeof window === "undefined" || !streamId) return;

    const deepLink = `rydora://tv/stream/${streamId}`;

    // Try to open the app
    window.location.href = deepLink;

    // If still here after 2.5s, user probably doesn't have the app installed
    // The page will remain visible for them to use the buttons
  }, [streamId]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "LIVE":
        return "LIVE NOW";
      case "SCHEDULED":
        return "UPCOMING";
      case "ENDED":
        return "ENDED";
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "LIVE":
        return { bg: "rgba(220, 38, 38, 0.9)", border: "rgba(220, 38, 38, 0.5)" };
      case "SCHEDULED":
        return { bg: "rgba(37, 99, 235, 0.9)", border: "rgba(37, 99, 235, 0.5)" };
      default:
        return { bg: "rgba(107, 114, 128, 0.9)", border: "rgba(107, 114, 128, 0.5)" };
    }
  };

  const formatScheduledDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get profile image and username from user object
  const profileImage = stream?.streamer?.user?.profileImage;
  const streamerName = stream?.streamer?.displayName || stream?.streamer?.user?.username || "Unknown";

  if (!stream) {
    return (
      <div style={styles.pageContainer}>
        <Header
          isScrolled={isScrolled}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.errorWrapper}>
            <div style={styles.errorIcon}>📺</div>
            <h2 style={styles.errorTitle}>Stream Not Found</h2>
            <p style={styles.errorMessage}>
              This stream doesn&apos;t exist or has been removed.
            </p>
            <button
              onClick={() => detectDeviceAndRedirect(streamId)}
              style={styles.backButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(37, 77, 112, 1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(37, 77, 112, 0.9)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Open RydoraTV in App
            </button>
          </div>
        </div>
        <Footer />
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
        />
      </div>
    );
  }

  const statusColors = getStatusColor(stream.status);

  return (
    <div style={styles.pageContainer}>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 24px 20px !important;
          }
          .stream-title {
            font-size: 24px !important;
          }
          .user-info {
            flex-direction: column;
            text-align: center;
            gap: 16px !important;
          }
          .cta-card {
            padding: 32px 20px !important;
          }
          .cta-title {
            font-size: 22px !important;
          }
        }
        @media (max-width: 480px) {
          .stream-title {
            font-size: 20px !important;
          }
          .stat-value {
            font-size: 20px !important;
          }
        }
      `}</style>
      <Header
        isScrolled={isScrolled}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />
      <div style={styles.contentWrapper}>
        <div style={styles.container}>
          {/* Hero Card */}
          <div style={styles.heroCard} className="hero-section">
            {/* Thumbnail Section */}
            <div style={styles.thumbnailWrapper}>
              {stream.thumbnailUrl ? (
                <img
                  src={sanitizeImageUrl(stream.thumbnailUrl)}
                  alt={stream.title}
                  style={styles.thumbnailImage}
                />
              ) : (
                <div style={styles.thumbnailPlaceholder}>
                  <svg style={styles.videoIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                  </svg>
                </div>
              )}
              {/* Status Badge */}
              <div
                style={{
                  ...styles.statusBadge,
                  backgroundColor: statusColors.bg,
                  border: `1px solid ${statusColors.border}`,
                }}
              >
                {stream.status === "LIVE" && (
                  <span style={styles.liveDot} />
                )}
                {getStatusLabel(stream.status)}
              </div>
              {/* Category Badge */}
              <div style={styles.categoryBadge}>
                {stream.category.replace(/_/g, " ")}
              </div>
            </div>

            {/* Stream Info */}
            <div style={styles.streamInfo}>
              <h1 style={styles.streamTitle} className="stream-title">{stream.title}</h1>

              {/* User Info */}
              <div style={styles.userInfo} className="user-info">
                {profileImage ? (
                  <img
                    src={sanitizeImageUrl(profileImage)}
                    alt={streamerName}
                    style={styles.userAvatar}
                  />
                ) : (
                  <div style={styles.userAvatarPlaceholder}>
                    {streamerName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div style={styles.userDetails}>
                  <p style={styles.username}>@{streamerName}</p>
                  <p style={styles.userSubtext}>Streamer on RydoraTV</p>
                </div>
              </div>

              {stream.description && (
                <p style={styles.description}>{stream.description}</p>
              )}

              {/* Stats Row */}
              <div style={styles.statsRow}>
                {stream.status === "SCHEDULED" && stream.scheduledAt && (
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>Scheduled for</span>
                    <span style={styles.statValue} className="stat-value">
                      {formatScheduledDate(stream.scheduledAt)}
                    </span>
                  </div>
                )}
                {stream.status === "LIVE" && (
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>Viewers</span>
                    <span style={styles.statValue} className="stat-value">
                      {stream.currentViewers || 0}
                    </span>
                  </div>
                )}
              </div>

              {/* Open in App Button */}
              <button
                onClick={() => detectDeviceAndRedirect(streamId)}
                style={styles.openAppButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(37, 77, 112, 1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(37, 77, 112, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(37, 77, 112, 0.9)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 77, 112, 0.4)";
                }}
              >
                {stream.status === "LIVE" ? "Watch Live in App" : "Open in Rydora App"}
              </button>
            </div>
          </div>

          {/* CTA Section */}
          <div style={styles.ctaSection}>
            <div style={styles.ctaCard} className="cta-card">
              <h2 style={styles.ctaTitle} className="cta-title">
                {stream.status === "LIVE"
                  ? "Join the live stream now!"
                  : "Don't miss this stream!"}
              </h2>
              <p style={styles.ctaDescription}>
                Download the Rydora app to watch {streamerName}&apos;s streams,
                chat with other viewers, and discover amazing automotive content.
              </p>
              <button
                onClick={() => setIsDownloadModalOpen(true)}
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(59, 130, 246, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #254D70 0%, #1E3A5F 100%)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(37, 77, 112, 0.4)";
                }}
              >
                Download Rydora App
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg, #070b12 0%, #0a1020 60%, #070b12 100%)",
    color: "#e6ecf7",
  },
  contentWrapper: {
    flex: 1,
    paddingTop: "120px",
    paddingBottom: "60px",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "0 20px",
  },
  errorWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "100px 20px",
  },
  errorIcon: {
    fontSize: "80px",
    marginBottom: "24px",
    opacity: 0.5,
  },
  errorTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "12px",
  },
  errorMessage: {
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.7)",
    marginBottom: "32px",
    maxWidth: "400px",
  },
  backButton: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "rgba(37, 77, 112, 0.9)",
    border: "1px solid rgba(37, 77, 112, 0.5)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  heroCard: {
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "24px",
    overflow: "hidden",
    marginBottom: "40px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  thumbnailWrapper: {
    position: "relative",
    width: "100%",
    aspectRatio: "16/9",
    backgroundColor: "#1a1a2e",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  thumbnailPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  },
  videoIcon: {
    width: "64px",
    height: "64px",
    color: "rgba(255, 255, 255, 0.2)",
  },
  statusBadge: {
    position: "absolute",
    top: "16px",
    left: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#fff",
    backdropFilter: "blur(8px)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  liveDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  categoryBadge: {
    position: "absolute",
    top: "16px",
    right: "16px",
    padding: "8px 16px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(8px)",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  streamInfo: {
    padding: "32px",
  },
  streamTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "24px",
    lineHeight: "1.3",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  userAvatar: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid rgba(37, 77, 112, 0.5)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
  },
  userAvatarPlaceholder: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "rgba(37, 77, 112, 0.3)",
    border: "3px solid rgba(37, 77, 112, 0.5)",
    color: "#567AFD",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "700",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "4px",
  },
  userSubtext: {
    fontSize: "14px",
    color: "rgba(148, 163, 184, 0.8)",
  },
  description: {
    fontSize: "15px",
    color: "rgba(203, 213, 225, 0.8)",
    lineHeight: "1.6",
    marginBottom: "24px",
    padding: "16px",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "12px",
    borderLeft: "3px solid rgba(37, 77, 112, 0.5)",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    padding: "20px 0",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    marginBottom: "24px",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    fontSize: "12px",
    color: "rgba(148, 163, 184, 0.8)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statValue: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
  },
  openAppButton: {
    width: "100%",
    padding: "18px 32px",
    fontSize: "17px",
    fontWeight: "700",
    color: "#fff",
    backgroundColor: "rgba(37, 77, 112, 0.9)",
    border: "1px solid rgba(37, 77, 112, 0.5)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 24px rgba(37, 77, 112, 0.4)",
  },
  ctaSection: {
    marginTop: "20px",
  },
  ctaCard: {
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "24px",
    padding: "48px 40px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  ctaTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "12px",
  },
  ctaDescription: {
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.8)",
    marginBottom: "28px",
    lineHeight: "1.6",
    maxWidth: "500px",
    margin: "0 auto 28px",
  },
  ctaButton: {
    padding: "16px 40px",
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    background: "linear-gradient(135deg, #254D70 0%, #1E3A5F 100%)",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 24px rgba(37, 77, 112, 0.4)",
  },
};
