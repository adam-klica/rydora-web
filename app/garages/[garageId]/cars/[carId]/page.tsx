"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import DownloadModal from "../../../../components/DownloadModal";

interface CarMedia {
  url: string;
  type: string;
}

interface Modification {
  type: string;
  text: string;
  icon?: string;
}

interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  engine: string | null;
  description: string;
  likes: number;
  commentsCount: number;
  modifications: Modification[];
  media: CarMedia[];
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

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const garageId = params?.garageId as string;
  const carId = params?.carId as string;
  const [car, setCar] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!carId) return;

    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://rydora.me/api/user-garages/car/${carId}`
        );
        if (!res.ok) {
          throw new Error("Car not found");
        }
        const data = await res.json();
        setCar(data.car);

        // Update page metadata for SEO
        const title = `${data.car.make} ${data.car.model} (${data.car.year}) - Rydora`;
        const description =
          data.car.description ||
          `View ${data.car.make} ${data.car.model} on Rydora.`;
        const image = data.car.media?.[0]?.url || "";

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
        updateMetaTag(
          "og:url",
          `https://rydora.me/garages/${garageId}/cars/${carId}`,
          true
        );
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
        setError(err instanceof Error ? err.message : "Failed to load car");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [carId, garageId]);

  const carImages = car?.media?.filter((m) => m.type === "image") || [];
  const carVideos = car?.media?.filter((m) => m.type === "video") || [];

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
            <p style={styles.loadingMessage}>Loading car details...</p>
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

  if (error || !car) {
    return (
      <div style={styles.pageContainer}>
        <Header
          isScrolled={isScrolled}
          onDownloadClick={() => setIsDownloadModalOpen(true)}
        />
        <div style={styles.contentWrapper}>
          <div style={styles.errorWrapper}>
            <div style={styles.errorIcon}>🚗</div>
            <h2 style={styles.errorTitle}>Car Not Found</h2>
            <p style={styles.errorMessage}>
              {error || "This car doesn't exist or has been removed."}
            </p>
            <button
              onClick={() => router.push(`/garages/${garageId}`)}
              style={styles.backButton}
            >
              Back to Garage
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
        <div style={styles.carCard}>
          {/* Back Button */}
          <button
            onClick={() => router.push(`/garages/${garageId}`)}
            style={styles.backButtonTop}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
              e.currentTarget.style.color = "#475569";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.color = "#64748b";
            }}
          >
            ← Back to Garage
          </button>

          {/* Car Header */}
          <div style={styles.carHeader}>
            <h1 style={styles.carTitle}>
              {car.make} {car.model}
            </h1>
            <p style={styles.carYear}>{car.year}</p>
            {car.engine && <p style={styles.carEngine}>🔧 {car.engine}</p>}
          </div>

          {/* Main Image Gallery */}
          {carImages.length > 0 && (
            <div style={styles.imageGallery}>
              <div style={styles.mainImageContainer}>
                <Image
                  src={carImages[selectedImageIndex]?.url || carImages[0]?.url}
                  alt={`${car.make} ${car.model}`}
                  width={1200}
                  height={800}
                  style={styles.mainImage}
                  onClick={() => setIsImageViewerOpen(true)}
                />
                {carImages.length > 1 && (
                  <div style={styles.imageCounter}>
                    {selectedImageIndex + 1} / {carImages.length}
                  </div>
                )}
              </div>
              {carImages.length > 1 && (
                <div style={styles.thumbnailContainer}>
                  {carImages.map((img, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.thumbnail,
                        ...(selectedImageIndex === index
                          ? styles.thumbnailActive
                          : {}),
                      }}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={img.url}
                        alt={`${car.make} ${car.model} - Image ${index + 1}`}
                        width={120}
                        height={90}
                        style={styles.thumbnailImage}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Videos */}
          {carVideos.length > 0 && (
            <div style={styles.videoSection}>
              <h2 style={styles.sectionTitle}>Videos</h2>
              <div style={styles.videoGrid}>
                {carVideos.map((video, index) => (
                  <video
                    key={index}
                    src={video.url}
                    controls
                    style={styles.video}
                  >
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div style={styles.statsContainer}>
            <div style={styles.statItem}>
              <span style={styles.statIcon}>❤️</span>
              <span style={styles.statValue}>{car.likes || 0}</span>
              <span style={styles.statLabel}>Likes</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statIcon}>💬</span>
              <span style={styles.statValue}>{car.commentsCount || 0}</span>
              <span style={styles.statLabel}>Comments</span>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div style={styles.descriptionSection}>
              <h2 style={styles.sectionTitle}>Description</h2>
              <p style={styles.description}>{car.description}</p>
            </div>
          )}

          {/* Modifications */}
          {car.modifications && car.modifications.length > 0 && (
            <div style={styles.modificationsSection}>
              <h2 style={styles.sectionTitle}>Modifications</h2>
              <div style={styles.modificationsGrid}>
                {car.modifications.map((mod, index) => (
                  <div key={index} style={styles.modificationCard}>
                    <span style={styles.modificationIcon}>
                      {mod.icon || "⚙️"}
                    </span>
                    <div style={styles.modificationContent}>
                      <span style={styles.modificationType}>
                        {mod.type.charAt(0).toUpperCase() + mod.type.slice(1)}
                      </span>
                      <span style={styles.modificationText}>{mod.text}</span>
                    </div>
                  </div>
                ))}
              </div>
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
              View full car details, comments, and connect with the owner
            </p>
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {isImageViewerOpen && carImages.length > 0 && (
        <div
          style={styles.imageViewerOverlay}
          onClick={() => setIsImageViewerOpen(false)}
        >
          <div style={styles.imageViewerContent}>
            <button
              style={styles.imageViewerClose}
              onClick={() => setIsImageViewerOpen(false)}
            >
              ✕
            </button>
            <Image
              src={carImages[selectedImageIndex]?.url || carImages[0]?.url}
              alt={`${car.make} ${car.model}`}
              width={1920}
              height={1080}
              style={styles.imageViewerImage}
            />
            {carImages.length > 1 && (
              <>
                <button
                  style={styles.imageViewerNavLeft}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(
                      (prev) => (prev - 1 + carImages.length) % carImages.length
                    );
                  }}
                >
                  ‹
                </button>
                <button
                  style={styles.imageViewerNavRight}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(
                      (prev) => (prev + 1) % carImages.length
                    );
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}

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
    padding: "20px 16px",
    paddingTop: "120px",
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
  backButton: {
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
  backButtonTop: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#64748b",
    backgroundColor: "transparent",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    marginBottom: "24px",
  },
  carCard: {
    maxWidth: "1200px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
    padding: "40px",
  },
  carHeader: {
    textAlign: "center",
    marginBottom: "40px",
    paddingBottom: "24px",
    borderBottom: "2px solid #e2e8f0",
  },
  carTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "8px",
    lineHeight: "1.2",
  },
  carYear: {
    fontSize: "24px",
    color: "#64748b",
    fontWeight: "600",
    marginBottom: "8px",
  },
  carEngine: {
    fontSize: "18px",
    color: "#475569",
    fontWeight: "500",
  },
  imageGallery: {
    marginBottom: "40px",
  },
  mainImageContainer: {
    position: "relative",
    width: "100%",
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "16px",
    cursor: "pointer",
    backgroundColor: "#f1f5f9",
  },
  mainImage: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    maxHeight: "600px",
  },
  imageCounter: {
    position: "absolute",
    top: "16px",
    right: "16px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },
  thumbnailContainer: {
    display: "flex",
    gap: "12px",
    overflowX: "auto",
    paddingBottom: "8px",
  },
  thumbnail: {
    flexShrink: 0,
    width: "120px",
    height: "90px",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "all 0.2s",
    opacity: 0.7,
  },
  thumbnailActive: {
    borderColor: "#667eea",
    opacity: 1,
    transform: "scale(1.05)",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  videoSection: {
    marginBottom: "40px",
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  video: {
    width: "100%",
    borderRadius: "12px",
    backgroundColor: "#000",
  },
  statsContainer: {
    display: "flex",
    gap: "32px",
    justifyContent: "center",
    marginBottom: "40px",
    padding: "24px",
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  statIcon: {
    fontSize: "24px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e293b",
  },
  statLabel: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
  },
  descriptionSection: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "16px",
  },
  description: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: "1.8",
    whiteSpace: "pre-wrap",
  },
  modificationsSection: {
    marginBottom: "40px",
  },
  modificationsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
  },
  modificationCard: {
    display: "flex",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },
  modificationIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  modificationContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
  modificationType: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#667eea",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  modificationText: {
    fontSize: "14px",
    color: "#475569",
    lineHeight: "1.5",
  },
  ctaSection: {
    textAlign: "center",
    paddingTop: "32px",
    borderTop: "2px solid #e2e8f0",
  },
  ctaButton: {
    padding: "16px 40px",
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
    maxWidth: "400px",
  },
  ctaSubtext: {
    fontSize: "14px",
    color: "#94a3b8",
  },
  imageViewerOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  imageViewerContent: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageViewerClose: {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  },
  imageViewerImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  imageViewerNavLeft: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    border: "none",
    fontSize: "32px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  },
  imageViewerNavRight: {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    border: "none",
    fontSize: "32px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
  },
};
