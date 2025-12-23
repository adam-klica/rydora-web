"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
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
        const image = garageData.cars[0]?.images?.[0] || "";

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
      <Header
        isScrolled={isScrolled}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />
      <div style={styles.contentWrapper}>
        <div style={styles.garageCard}>
          {/* Garage Header */}
          <div style={styles.garageHeader}>
            <h1 style={styles.garageName}>{garage.name}</h1>
            <div style={styles.userInfo}>
              {garage.user.profileImage ? (
                <Image
                  src={garage.user.profileImage}
                  alt={garage.user.username}
                  width={40}
                  height={40}
                  style={styles.userAvatar}
                />
              ) : (
                <div style={styles.userAvatarPlaceholder}>
                  {garage.user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={styles.username}>@{garage.user.username}</span>
            </div>
            <div style={styles.carCount}>
              🚗 {garage.cars.length}{" "}
              {garage.cars.length === 1 ? "car" : "cars"}
            </div>
          </div>

          {/* Cars Grid */}
          {garage.cars.length > 0 ? (
            <div style={styles.carsGrid}>
              {garage.cars.map((car) => (
                <div
                  key={car.id}
                  style={styles.carCard}
                  onClick={() => handleCarClick(car.id)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 24px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {car.images && car.images.length > 0 ? (
                    <Image
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      width={400}
                      height={300}
                      style={styles.carImage}
                    />
                  ) : (
                    <div style={styles.carImagePlaceholder}>
                      <span style={styles.carIcon}>🚗</span>
                    </div>
                  )}
                  <div style={styles.carInfo}>
                    <h3 style={styles.carTitle}>
                      {car.make} {car.model}
                    </h3>
                    <p style={styles.carYear}>{car.year}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyCars}>
              <p style={styles.emptyMessage}>No cars in this garage yet</p>
            </div>
          )}

          {/* CTA Button */}
          <div style={styles.ctaSection}>
            <button
              onClick={detectDeviceAndRedirect}
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5568d3";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 16px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#667eea";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Open in Rydora App
            </button>
            <p style={styles.ctaSubtext}>
              View full garage details and connect with the owner
            </p>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 16px",
  },
  loadingWrapper: {
    textAlign: "center",
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
  garageCard: {
    maxWidth: "1000px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    padding: "24px 20px",
  },
  garageHeader: {
    textAlign: "center",
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "2px solid #e2e8f0",
  },
  garageName: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "16px",
    lineHeight: "1.2",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  userAvatar: {
    borderRadius: "50%",
    objectFit: "cover",
  },
  userAvatarPlaceholder: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#667eea",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "600",
  },
  username: {
    fontSize: "18px",
    color: "#475569",
    fontWeight: "500",
  },
  carCount: {
    fontSize: "20px",
    color: "#64748b",
    fontWeight: "600",
  },
  carsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },
  carCard: {
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    border: "1px solid #e2e8f0",
  },
  carImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  carImagePlaceholder: {
    width: "100%",
    height: "200px",
    backgroundColor: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carIcon: {
    fontSize: "60px",
  },
  carInfo: {
    padding: "16px",
  },
  carTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "4px",
  },
  carYear: {
    fontSize: "14px",
    color: "#64748b",
  },
  emptyCars: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyMessage: {
    fontSize: "18px",
    color: "#94a3b8",
  },
  ctaSection: {
    textAlign: "center",
    paddingTop: "24px",
    borderTop: "2px solid #e2e8f0",
  },
  ctaButton: {
    padding: "14px 32px",
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
    marginBottom: "12px",
    width: "100%",
    maxWidth: "320px",
  },
  ctaSubtext: {
    fontSize: "14px",
    color: "#94a3b8",
  },
};
