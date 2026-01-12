"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DownloadModal from "../../components/DownloadModal";

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
const detectDeviceAndRedirect = () => {
  if (typeof window === "undefined") return;

  const userAgent = navigator.userAgent || navigator.vendor;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /android/i.test(userAgent);

  if (isIOS) {
    window.location.href = "https://apps.apple.com/us/app/rydora/id6748365405";
  } else if (isAndroid) {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.rydora.app";
  }
};

export default function GaragePage() {
  const params = useParams();
  const router = useRouter();
  const garageId = params?.garageId as string;
  const [garage, setGarage] = useState<GarageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const handleCarClick = (carId: string) => {
    router.push(`/garages/${garageId}/cars/${carId}`);
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!garageId) return;

    const fetchGarage = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://rydora.me/api/user-garages/${garageId}/cars?isPublic=true`
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

        // Update page metadata for SEO
        const title = `${garageData.name} - Rydora Garage`;
        const description = `Check out ${
          garageData.user.username
        }'s garage with ${garageData.cars.length} ${
          garageData.cars.length === 1 ? "car" : "cars"
        } on Rydora.`;
        const image = sanitizeImageUrl(garageData.cars[0]?.images?.[0]);

        document.title = title;

        // Update or create meta tags
        const updateMetaTag = (
          name: string,
          content: string,
          isProperty = false
        ) => {
          const selector = isProperty
            ? `meta[property="${name}"]`
            : `meta[name="${name}"]`;
          let meta = document.querySelector(selector) as HTMLMetaElement;
          if (!meta) {
            meta = document.createElement("meta");
            if (isProperty) {
              meta.setAttribute("property", name);
            } else {
              meta.setAttribute("name", name);
            }
            document.head.appendChild(meta);
          }
          meta.setAttribute("content", content);
        };

        updateMetaTag("description", description);
        updateMetaTag("og:title", title, true);
        updateMetaTag("og:description", description, true);
        updateMetaTag("og:type", "website", true);
        updateMetaTag("og:url", `https://rydora.me/garages/${garageId}`, true);
        if (image) {
          updateMetaTag("og:image", image, true);
        }
        updateMetaTag("twitter:card", "summary_large_image");
        updateMetaTag("twitter:title", title);
        updateMetaTag("twitter:description", description);
        if (image) {
          updateMetaTag("twitter:image", image);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load garage");
      } finally {
        setLoading(false);
      }
    };

    fetchGarage();
  }, [garageId]);

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
              onClick={() => (window.location.href = "/")}
              style={styles.homeButton}
            >
              Go to Homepage
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
        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 24px !important;
          }
          .garage-name {
            font-size: 32px !important;
          }
          .user-info-large {
            flex-direction: column;
            text-align: center;
          }
          .cars-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-card {
            padding: 40px 24px !important;
          }
          .cta-title {
            font-size: 28px !important;
          }
        }
        @media (max-width: 480px) {
          .garage-name {
            font-size: 28px !important;
          }
          .stat-number {
            font-size: 20px !important;
          }
          .section-title {
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
          {/* Hero Section */}
          <div style={styles.heroSection} className="hero-section">
            <div style={styles.heroContent}>
              <div style={styles.userInfoLarge} className="user-info-large">
                {garage.user.profileImage ? (
                  <img
                    src={sanitizeImageUrl(garage.user.profileImage)}
                    alt={garage.user.username}
                    width={80}
                    height={80}
                    style={styles.userAvatarLarge}
                  />
                ) : (
                  <div style={styles.userAvatarPlaceholderLarge}>
                    {garage.user.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div style={styles.userDetails}>
                  <h1 style={styles.garageName} className="garage-name">{garage.name}</h1>
                  <p style={styles.username}>@{garage.user.username}</p>
                  <div style={styles.statsRow}>
                    <div style={styles.statBadge}>
                      <span style={styles.statNumber} className="stat-number">{garage.cars.length}</span>
                      <span style={styles.statLabel}>
                        {garage.cars.length === 1 ? "Car" : "Cars"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          {garage.cars.length > 0 ? (
            <div style={styles.carsSection}>
              <h2 style={styles.sectionTitle} className="section-title">Collection</h2>
              <div style={styles.carsGrid} className="cars-grid">
                {garage.cars.map((car) => (
                  <div
                    key={car.id}
                    style={styles.carCard}
                    onClick={() => handleCarClick(car.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0, 0, 0, 0.12)";
                      const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement;
                      if (overlay) overlay.style.opacity = "1";
                      const img = e.currentTarget.querySelector('img') as HTMLElement;
                      if (img) img.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0, 0, 0, 0.08)";
                      const overlay = e.currentTarget.querySelector('[data-overlay]') as HTMLElement;
                      if (overlay) overlay.style.opacity = "0";
                      const img = e.currentTarget.querySelector('img') as HTMLElement;
                      if (img) img.style.transform = "scale(1)";
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
                      <div style={styles.carOverlay} data-overlay>
                        <span style={styles.viewDetails}>View Details →</span>
                      </div>
                    </div>
                    <div style={styles.carInfo}>
                      <h3 style={styles.carTitle}>
                        {car.make} {car.model}
                      </h3>
                      <p style={styles.carYear}>{car.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={styles.emptyCars}>
              <div style={styles.emptyIcon}>🚗</div>
              <p style={styles.emptyMessage}>No cars in this garage yet</p>
            </div>
          )}

          {/* CTA Section */}
          <div style={styles.ctaSection}>
            <div style={styles.ctaCard} className="cta-card">
              <h2 style={styles.ctaTitle} className="cta-title">Want to see more?</h2>
              <p style={styles.ctaDescription}>
                Download the Rydora app to view full garage details, connect with {garage.user.username}, and discover more amazing cars
              </p>
              <button
                onClick={detectDeviceAndRedirect}
                style={styles.ctaButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#5568d3";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(102, 126, 234, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#667eea";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(102, 126, 234, 0.3)";
                }}
              >
                Open in Rydora App
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
    backgroundColor: "#f8fafc",
  },
  contentWrapper: {
    flex: 1,
    padding: "0",
    paddingTop: "80px",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
  },
  loadingWrapper: {
    textAlign: "center",
    padding: "100px 20px",
  },
  loadingSpinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },
  loadingMessage: {
    fontSize: "18px",
    color: "#64748b",
  },
  errorWrapper: {
    textAlign: "center",
    maxWidth: "500px",
    padding: "100px 20px",
  },
  errorIcon: {
    fontSize: "80px",
    marginBottom: "20px",
  },
  errorTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "12px",
  },
  errorMessage: {
    fontSize: "18px",
    color: "#64748b",
    marginBottom: "32px",
    lineHeight: "1.6",
  },
  homeButton: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  heroSection: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "24px",
    padding: "60px 40px",
    marginBottom: "60px",
    boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
  },
  heroContent: {
    maxWidth: "100%",
  },
  userInfoLarge: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    flexWrap: "wrap",
  },
  userAvatarLarge: {
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
  userAvatarPlaceholderLarge: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "700",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
  },
  userDetails: {
    flex: 1,
  },
  garageName: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#fff",
    marginBottom: "8px",
    lineHeight: "1.2",
    textShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
  },
  username: {
    fontSize: "20px",
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
    marginBottom: "20px",
  },
  statsRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  statBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    padding: "12px 24px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#fff",
  },
  statLabel: {
    fontSize: "16px",
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  carsSection: {
    marginBottom: "60px",
  },
  sectionTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "32px",
  },
  carsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "32px",
  },
  carCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  carImageWrapper: {
    position: "relative",
    width: "100%",
    height: "240px",
    overflow: "hidden",
  },
  carImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  carImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carIcon: {
    fontSize: "60px",
  },
  carOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
    padding: "20px",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  viewDetails: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
  },
  carInfo: {
    padding: "20px",
  },
  carTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "6px",
  },
  carYear: {
    fontSize: "16px",
    color: "#64748b",
    fontWeight: "500",
  },
  emptyCars: {
    textAlign: "center",
    padding: "80px 20px",
    backgroundColor: "#fff",
    borderRadius: "20px",
    marginBottom: "60px",
  },
  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
    opacity: 0.5,
  },
  emptyMessage: {
    fontSize: "20px",
    color: "#94a3b8",
    fontWeight: "500",
  },
  ctaSection: {
    marginBottom: "60px",
  },
  ctaCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "24px",
    padding: "60px 40px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
  },
  ctaTitle: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#fff",
    marginBottom: "16px",
    textShadow: "0 2px 20px rgba(0, 0, 0, 0.2)",
  },
  ctaDescription: {
    fontSize: "18px",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "32px",
    lineHeight: "1.6",
    maxWidth: "600px",
    margin: "0 auto 32px",
  },
  ctaButton: {
    padding: "18px 48px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#667eea",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)",
  },
};
