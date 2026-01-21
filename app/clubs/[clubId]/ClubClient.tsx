"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DownloadModal from "../../components/DownloadModal";

interface ClubData {
  id: string;
  name: string;
  description: string | null;
  city: string | null;
  country: string | null;
  categoryLabel: string | null;
  profileImageUrl: string | null;
  memberCount: number;
  admin: {
    username: string;
    profileImage: string | null;
  };
  _count: {
    members: number;
    events: number;
  };
}

// Detect device and try to open app, fallback to store
const tryOpenApp = (clubId: string) => {
  if (typeof window === "undefined") return;

  const deepLink = `rydora://clubs/${clubId}`;
  const userAgent = navigator.userAgent || navigator.vendor;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /android/i.test(userAgent);

  // Try to open the app
  window.location.href = deepLink;

  // Set timeout to redirect to store if app doesn't open
  setTimeout(() => {
    if (isIOS) {
      window.location.href =
        "https://apps.apple.com/us/app/rydora/id6748365405";
    } else if (isAndroid) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.rydora.app";
    }
  }, 2500);
};

interface ClubClientProps {
  clubId: string;
  initialData: ClubData | null;
}

export default function ClubClient({ clubId, initialData }: ClubClientProps) {
  const [club, setClub] = useState<ClubData | null>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (initialData || !clubId) return;

    const fetchClub = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://rydora.me/api/clubs/${clubId}`);
        if (!res.ok) {
          throw new Error("Club not found");
        }
        const data = await res.json();
        setClub(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load club");
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, [clubId, initialData]);

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <Header
          isScrolled={isScrolled}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.loadingWrapper}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingMessage}>Loading club...</p>
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

  if (error || !club) {
    return (
      <div style={styles.pageContainer}>
        <Header
          isScrolled={isScrolled}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.errorWrapper}>
            <div style={styles.errorEmoji}>🏁</div>
            <h1 style={styles.errorHeading}>Club Not Found</h1>
            <p style={styles.errorMessage}>
              {error ||
                "The club you're looking for doesn't exist or has been removed."}
            </p>
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

  const memberCount = club._count?.members || club.memberCount || 0;
  const eventCount = club._count?.events || 0;
  const location = [club.city, club.country].filter(Boolean).join(", ");

  return (
    <div style={styles.pageContainer}>
      <Header
        isScrolled={isScrolled}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />

      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

      <div style={styles.contentWrapper}>
        <div style={styles.clubContainer}>
          {/* Club Header */}
          {club.profileImageUrl && (
            <div style={styles.coverImageContainer}>
              <Image
                src={club.profileImageUrl}
                alt={club.name}
                width={800}
                height={400}
                style={styles.coverImage}
                priority
              />
              <div style={styles.coverOverlay} />
            </div>
          )}

          <div style={styles.clubContent}>
            {/* Club Info */}
            <div style={styles.clubHeader}>
              <h1 style={styles.clubName}>{club.name}</h1>
              {location && <p style={styles.location}>📍 {location}</p>}
              {club.categoryLabel && (
                <div style={styles.categoryBadge}>{club.categoryLabel}</div>
              )}
            </div>

            {/* Stats */}
            <div style={styles.statsRow}>
              <div style={styles.stat}>
                <div style={styles.statValue}>{memberCount}</div>
                <div style={styles.statLabel}>Members</div>
              </div>
              <div style={styles.statDivider} />
              <div style={styles.stat}>
                <div style={styles.statValue}>{eventCount}</div>
                <div style={styles.statLabel}>Events</div>
              </div>
            </div>

            {/* Description */}
            {club.description && (
              <div style={styles.descriptionContainer}>
                <h3 style={styles.sectionTitle}>About</h3>
                <p style={styles.description}>{club.description}</p>
              </div>
            )}

            {/* Admin */}
            {club.admin && (
              <div style={styles.adminContainer}>
                <h3 style={styles.sectionTitle}>Organizer</h3>
                <div style={styles.adminCard}>
                  {club.admin.profileImage ? (
                    <div style={styles.adminAvatarWrapper}>
                      <Image
                        src={club.admin.profileImage}
                        alt={club.admin.username}
                        fill
                        style={{ objectFit: "cover", borderRadius: "50%" }}
                      />
                    </div>
                  ) : (
                    <div style={styles.adminAvatarPlaceholder}>
                      {club.admin.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div style={styles.adminInfo}>
                    <div style={styles.adminName}>@{club.admin.username}</div>
                    <div style={styles.adminRole}>Administrator</div>
                  </div>
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div style={styles.ctaContainer}>
              <button
                onClick={() => tryOpenApp(clubId)}
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(37, 77, 112, 1) 0%, rgba(30, 58, 95, 1) 100%)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 32px rgba(37, 77, 112, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(37, 77, 112, 0.9) 0%, rgba(30, 58, 95, 0.9) 100%)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(37, 77, 112, 0.4)";
                }}
              >
                Open in Rydora App
              </button>
              <p style={styles.ctaSubtext}>
                Join this club and connect with car enthusiasts on Rydora
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #070b12 0%, #0a1020 60%, #070b12 100%)",
    color: "#e6ecf7",
  },
  contentWrapper: {
    paddingTop: "120px",
    paddingBottom: "80px",
    paddingLeft: "clamp(16px, 4vw, 100px)",
    paddingRight: "clamp(16px, 4vw, 100px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "calc(100vh - 200px)",
  },
  clubContainer: {
    maxWidth: "800px",
    width: "100%",
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  coverImageContainer: {
    position: "relative",
    width: "100%",
    height: "300px",
    overflow: "hidden",
  },
  coverImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  coverOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    background: "linear-gradient(to top, rgba(17, 24, 38, 0.9), transparent)",
  },
  clubContent: {
    padding: "32px",
  },
  clubHeader: {
    marginBottom: "24px",
  },
  clubName: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "12px",
  },
  location: {
    margin: 0,
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.7)",
    marginBottom: "12px",
  },
  categoryBadge: {
    display: "inline-block",
    padding: "6px 16px",
    backgroundColor: "rgba(37, 77, 112, 0.3)",
    border: "1px solid rgba(37, 77, 112, 0.5)",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#94A3B8",
  },
  statsRow: {
    display: "flex",
    gap: "32px",
    padding: "20px 0",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    marginBottom: "24px",
  },
  stat: {
    textAlign: "center",
    flex: 1,
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "12px",
    color: "rgba(148, 163, 184, 0.8)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statDivider: {
    width: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
  },
  descriptionContainer: {
    marginBottom: "24px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "12px",
  },
  description: {
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.7",
    color: "rgba(203, 213, 225, 0.9)",
    whiteSpace: "pre-wrap",
  },
  adminContainer: {
    marginBottom: "32px",
  },
  adminCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "16px",
  },
  adminAvatarWrapper: {
    position: "relative",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid rgba(37, 77, 112, 0.3)",
  },
  adminAvatarPlaceholder: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "rgba(37, 77, 112, 0.3)",
    border: "2px solid rgba(37, 77, 112, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "700",
    color: "#567AFD",
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "4px",
  },
  adminRole: {
    fontSize: "13px",
    color: "rgba(148, 163, 184, 0.8)",
  },
  ctaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
  },
  ctaButton: {
    width: "100%",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    background:
      "linear-gradient(135deg, rgba(37, 77, 112, 0.9) 0%, rgba(30, 58, 95, 0.9) 100%)",
    border: "1px solid rgba(37, 77, 112, 0.5)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 24px rgba(37, 77, 112, 0.4)",
  },
  ctaSubtext: {
    margin: 0,
    fontSize: "14px",
    color: "rgba(203, 213, 225, 0.6)",
    textAlign: "center",
  },
  loadingWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    padding: "80px 20px",
  },
  loadingSpinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(37, 77, 112, 0.2)",
    borderTop: "4px solid #254D70",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingMessage: {
    margin: 0,
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.7)",
  },
  errorWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    padding: "80px 20px",
    textAlign: "center",
  },
  errorEmoji: {
    fontSize: "64px",
  },
  errorHeading: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
  },
  errorMessage: {
    margin: 0,
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.7)",
    maxWidth: "500px",
  },
};
