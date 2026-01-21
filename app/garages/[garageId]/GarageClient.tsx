"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useScrollDetection } from "../../hooks/useScrollDetection";

const DownloadModal = dynamic(() => import("../../components/DownloadModal"), {
  ssr: false,
});

interface UserData {
  username: string;
  profileImage: string | null;
}

interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  images: string[];
}

interface GarageData {
  id: string;
  name: string;
  user: UserData;
  cars: CarData[];
  createdAt: string;
}

// Fix malformed URLs that have double https:// (e.g., supabase prefix + full URL)
const sanitizeImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  // Check if URL contains a second https:// after the first one
  const secondHttpsIndex = url.indexOf("https://", 8);
  if (secondHttpsIndex > 0) {
    return url.substring(secondHttpsIndex);
  }
  return url;
};

// Detect device and redirect to app store
const detectDeviceAndRedirect = (garageId: string) => {
  if (typeof window === "undefined") return;

  const userAgent = navigator.userAgent || navigator.vendor;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /android/i.test(userAgent);

  // Try deep link first
  const deepLink = `rydora://garages/${garageId}`;
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

interface GarageClientProps {
  garageId: string;
  initialData: GarageData | null;
}

export default function GarageClient({ garageId, initialData }: GarageClientProps) {
  const router = useRouter();
  const [garage, setGarage] = useState<GarageData | null>(initialData);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const isScrolled = useScrollDetection(12);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const handleCarClick = (carId: string) => {
    router.push(`/garages/${garageId}/cars/${carId}`);
  };

  useEffect(() => {
    if (initialData || !garageId) return;

    const fetchGarage = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://dev.rydora.me/api/user-garages/${garageId}/cars?isPublic=true`
        );
        if (!res.ok) {
          throw new Error("Garage not found");
        }
        const data = await res.json();
        const garageData = {
          id: garageId,
          name: data.name || "Garage",
          user: data.user || { username: "Unknown", profileImage: null },
          cars: data.cars || [],
          createdAt: data.createdAt || new Date().toISOString(),
        };
        setGarage(garageData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load garage");
      } finally {
        setLoading(false);
      }
    };

    fetchGarage();
  }, [garageId, initialData]);

  if (loading) {
    return (
      <div style={styles.pageContainer}>
        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <Header
          isScrolled={isScrolled}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.loadingWrapper}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingMessage}>Loading garage...</p>
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

  if (error || !garage) {
    return (
      <div style={styles.pageContainer}>
        <Header
          isScrolled={isScrolled}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.errorWrapper}>
            <div style={styles.errorIcon}>🚗</div>
            <h2 style={styles.errorTitle}>Garage Not Found</h2>
            <p style={styles.errorMessage}>
              {error || "This garage doesn't exist or has been removed."}
            </p>
            <button
              onClick={() => router.push("/garages")}
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
              Browse Garages
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

  return (
    <div style={styles.pageContainer}>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .cars-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 32px 20px !important;
          }
          .garage-name {
            font-size: 28px !important;
          }
          .user-info {
            flex-direction: column;
            text-align: center;
            gap: 16px !important;
          }
          .cars-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-card {
            padding: 40px 24px !important;
          }
          .cta-title {
            font-size: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .garage-name {
            font-size: 24px !important;
          }
          .stat-value {
            font-size: 24px !important;
          }
        }
      `}</style>
      <Header
        isScrolled={isScrolled}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />
      <div style={styles.contentWrapper}>
        <div style={styles.container}>
          {/* Back Button */}
          <button
            onClick={() => router.push("/garages")}
            style={styles.backLink}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(203, 213, 225, 0.8)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            ← Back to Garages
          </button>

          {/* Hero Card */}
          <div style={styles.heroCard} className="hero-section">
            <div style={styles.userInfo} className="user-info">
              {garage.user.profileImage ? (
                <img
                  src={sanitizeImageUrl(garage.user.profileImage)}
                  alt={garage.user.username}
                  style={styles.userAvatar}
                />
              ) : (
                <div style={styles.userAvatarPlaceholder}>
                  {garage.user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div style={styles.userDetails}>
                <h1 style={styles.garageName} className="garage-name">{garage.name}</h1>
                <p style={styles.username}>@{garage.user.username}</p>
              </div>
            </div>

            {/* Stats Row */}
            <div style={styles.statsRow}>
              <div style={styles.statCard}>
                <span style={styles.statValue} className="stat-value">{garage.cars.length}</span>
                <span style={styles.statLabel}>{garage.cars.length === 1 ? "Car" : "Cars"}</span>
              </div>
              <div style={styles.statDivider} />
              <div style={styles.statCard}>
                <span style={styles.statValue} className="stat-value">
                  {new Date(garage.createdAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                </span>
                <span style={styles.statLabel}>Created</span>
              </div>
            </div>

            {/* Open in App Button */}
            <button
              onClick={() => detectDeviceAndRedirect(garageId)}
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
              Open in Rydora App
            </button>
          </div>

          {/* Cars Section */}
          {garage.cars.length > 0 ? (
            <div style={styles.carsSection}>
              <h2 style={styles.sectionTitle}>Collection</h2>
              <div style={styles.carsGrid} className="cars-grid">
                {garage.cars.map((car, index) => (
                  <div
                    key={car.id}
                    style={{
                      ...styles.carCard,
                      animation: `fadeIn 0.5s ease ${index * 0.1}s both`,
                    }}
                    onClick={() => handleCarClick(car.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.4)";
                      e.currentTarget.style.borderColor = "rgba(37, 77, 112, 0.6)";
                      const img = e.currentTarget.querySelector("img") as HTMLElement;
                      if (img) img.style.transform = "scale(1.1)";
                      const overlay = e.currentTarget.querySelector("[data-overlay]") as HTMLElement;
                      if (overlay) overlay.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                      const img = e.currentTarget.querySelector("img") as HTMLElement;
                      if (img) img.style.transform = "scale(1)";
                      const overlay = e.currentTarget.querySelector("[data-overlay]") as HTMLElement;
                      if (overlay) overlay.style.opacity = "0";
                    }}
                  >
                    <div style={styles.carImageWrapper}>
                      {car.images && car.images.length > 0 ? (
                        <img
                          src={sanitizeImageUrl(car.images[0])}
                          alt={`${car.make} ${car.model}`}
                          style={styles.carImage}
                        />
                      ) : (
                        <div style={styles.carImagePlaceholder}>
                          <span style={styles.carIcon}>🚗</span>
                        </div>
                      )}
                      <div style={styles.imageOverlay} />
                      <div style={styles.carOverlay} data-overlay>
                        <span style={styles.viewDetails}>View Details →</span>
                      </div>
                      {/* Year Badge */}
                      <div style={styles.yearBadge}>{car.year}</div>
                    </div>
                    <div style={styles.carInfo}>
                      <h3 style={styles.carTitle}>
                        {car.make} {car.model}
                      </h3>
                      <div style={styles.carMeta}>
                        <span style={styles.carMetaItem}>
                          {car.images?.length || 0} {car.images?.length === 1 ? "photo" : "photos"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.emptyCars}>
              <div style={styles.emptyIcon}>🚗</div>
              <h3 style={styles.emptyTitle}>No Cars Yet</h3>
              <p style={styles.emptyMessage}>This garage is empty. Check back later!</p>
            </div>
          )}

          {/* CTA Section */}
          <div style={styles.ctaSection}>
            <div style={styles.ctaCard} className="cta-card">
              <h2 style={styles.ctaTitle} className="cta-title">Want to create your own garage?</h2>
              <p style={styles.ctaDescription}>
                Download the Rydora app to showcase your car collection, connect with {garage.user.username}, and discover amazing builds
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
    paddingTop: "100px",
    paddingBottom: "60px",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    marginBottom: "24px",
    fontSize: "14px",
    fontWeight: "500",
    color: "rgba(203, 213, 225, 0.8)",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  loadingWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px 20px",
  },
  loadingSpinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(37, 77, 112, 0.2)",
    borderTop: "4px solid #254D70",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px",
  },
  loadingMessage: {
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.7)",
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
    padding: "40px",
    marginBottom: "40px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "32px",
  },
  userAvatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid rgba(37, 77, 112, 0.5)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
  },
  userAvatarPlaceholder: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(37, 77, 112, 0.3)",
    border: "3px solid rgba(37, 77, 112, 0.5)",
    color: "#567AFD",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "700",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
  },
  userDetails: {
    flex: 1,
  },
  garageName: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "8px",
    lineHeight: "1.2",
  },
  username: {
    fontSize: "16px",
    color: "rgba(148, 163, 184, 0.9)",
    fontWeight: "500",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    padding: "24px 0",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    marginBottom: "24px",
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#fff",
  },
  statLabel: {
    fontSize: "13px",
    color: "rgba(148, 163, 184, 0.8)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statDivider: {
    width: "1px",
    height: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  openAppButton: {
    width: "100%",
    padding: "16px 32px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "rgba(37, 77, 112, 0.9)",
    border: "1px solid rgba(37, 77, 112, 0.5)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 8px 24px rgba(37, 77, 112, 0.4)",
  },
  carsSection: {
    marginBottom: "48px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "24px",
  },
  carsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  },
  carCard: {
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
  carImageWrapper: {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
  },
  carImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  carImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1E3A5F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carIcon: {
    fontSize: "48px",
    opacity: 0.5,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)",
  },
  carOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px",
    opacity: 0,
    transition: "opacity 0.3s ease",
    display: "flex",
    justifyContent: "center",
  },
  viewDetails: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    padding: "8px 16px",
    backgroundColor: "rgba(37, 77, 112, 0.9)",
    borderRadius: "8px",
  },
  yearBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    padding: "6px 12px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(8px)",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
  },
  carInfo: {
    padding: "20px",
  },
  carTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "8px",
  },
  carMeta: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  carMetaItem: {
    fontSize: "13px",
    color: "rgba(148, 163, 184, 0.8)",
  },
  emptyCars: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "rgba(17, 24, 38, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "24px",
    marginBottom: "48px",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "16px",
    opacity: 0.4,
  },
  emptyTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "8px",
  },
  emptyMessage: {
    fontSize: "15px",
    color: "rgba(148, 163, 184, 0.7)",
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
    fontSize: "28px",
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
