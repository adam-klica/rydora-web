"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MdTune, MdVolumeUp, MdFlashOn, MdMemory } from "react-icons/md";
import { GiSteeringWheel, GiCarWheel } from "react-icons/gi";
import { FaCog } from "react-icons/fa";
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
  modifications: Modification[];
  media: CarMedia[];
  createdAt: string;
}

interface GarageRating {
  rating: number | null;
  ratingCount: number;
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
  const [garageRating, setGarageRating] = useState<GarageRating | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);

  // Icon mapping to match app - using MaterialCommunityIcons names
  const getModificationIcon = (iconName: string, type: string) => {
    // Map MaterialCommunityIcons names to available react-icons
    const iconMap: { [key: string]: React.ReactNode } = {
      engine: <span style={{ fontSize: "24px" }}>🔧</span>,
      chip: <MdMemory size={24} color="#254D70" />,
      steering: <GiSteeringWheel size={24} color="#254D70" />,
      tune: <MdTune size={24} color="#254D70" />,
      "car-brake-abs": <span style={{ fontSize: "24px" }}>🛑</span>,
      smog: <span style={{ fontSize: "24px" }}>💨</span>,
      seat: <GiCarWheel size={24} color="#254D70" />,
      "car-sports": <GiCarWheel size={24} color="#254D70" />,
      "volume-high": <MdVolumeUp size={24} color="#254D70" />,
      flash: <MdFlashOn size={24} color="#254D70" />,
      cog: <FaCog size={24} color="#254D70" />,
    };

    // Try icon name first, then type
    return (
      iconMap[iconName] || iconMap[type] || <FaCog size={24} color="#254D70" />
    );
  };

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
        const [carRes, garageRes] = await Promise.all([
          fetch(`https://rydora.me/api/user-garages/car/${carId}`),
          fetch(
            `https://rydora.me/api/user-garages/${garageId}/cars?isPublic=true`
          ),
        ]);

        if (!carRes.ok) {
          throw new Error("Car not found");
        }
        const carData = await carRes.json();
        setCar(carData.car);

        // Fetch garage rating
        if (garageRes.ok) {
          const garageData = await garageRes.json();
          setGarageRating({
            rating: garageData.rating ?? null,
            ratingCount: garageData.ratingCount ?? 0,
          });
        }

        // Update page metadata for SEO
        const title = `${carData.car.make} ${carData.car.model} (${carData.car.year}) - Rydora`;
        const description =
          carData.car.description ||
          `View ${carData.car.make} ${carData.car.model} on Rydora.`;
        const image = carData.car.media?.[0]?.url || "";

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
      <style jsx>{`
        @media (max-width: 768px) {
          .hero-card {
            padding: 24px !important;
          }
          .car-title {
            font-size: 32px !important;
          }
          .car-year {
            font-size: 20px !important;
          }
          .car-engine {
            font-size: 16px !important;
          }
          .car-header-modern {
            flex-direction: column;
            align-items: stretch !important;
          }
          .rating-card {
            width: 100%;
          }
          .content-card {
            padding: 24px !important;
          }
          .section-title {
            font-size: 24px !important;
          }
          .modifications-grid {
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
          .car-title {
            font-size: 28px !important;
          }
          .main-image {
            max-height: 400px !important;
          }
          .thumbnail {
            width: 100px !important;
            height: 75px !important;
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
            onClick={() => router.push(`/garages/${garageId}`)}
            style={styles.backButtonTop}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#667eea";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#667eea";
            }}
          >
            ← Back to Garage
          </button>

          {/* Hero Section with Car Info */}
          <div style={styles.heroCard} className="hero-card">
            <div style={styles.carHeaderModern} className="car-header-modern">
              <div style={styles.carTitleSection}>
                <h1 style={styles.carTitle} className="car-title">
                  {car.make} {car.model}
                </h1>
                <div style={styles.carMetaRow}>
                  <span style={styles.carYear} className="car-year">{car.year}</span>
                  {car.engine && (
                    <>
                      <span style={styles.metaDivider}>•</span>
                      <span style={styles.carEngine} className="car-engine">{car.engine}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Rating Section - Only show if data exists */}
              {garageRating && garageRating.ratingCount > 0 && (
                <div style={styles.ratingCard} className="rating-card">
                  <div style={styles.ratingContent}>
                    <div style={styles.starContainer}>
                      <span style={styles.starIcon}>⭐</span>
                      <span style={styles.ratingValue}>
                        {garageRating.rating ? garageRating.rating.toFixed(1) : "N/A"}
                      </span>
                    </div>
                    <span style={styles.ratingCount}>
                      {garageRating.ratingCount} {garageRating.ratingCount === 1 ? "review" : "reviews"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Image Gallery */}
          {carImages.length > 0 && (
            <div style={styles.imageGallery}>
              <div style={styles.mainImageContainer}>
                <img
                  src={carImages[selectedImageIndex]?.url || carImages[0]?.url}
                  alt={`${car.make} ${car.model}`}
                  style={styles.mainImage}
                  className="main-image"
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
                      className="thumbnail"
                      style={{
                        ...styles.thumbnail,
                        ...(selectedImageIndex === index
                          ? styles.thumbnailActive
                          : {}),
                      }}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img
                        src={img.url}
                        alt={`${car.make} ${car.model} - Image ${index + 1}`}
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
              <h2 style={styles.sectionTitle} className="section-title">Videos</h2>
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

          {/* Description */}
          {car.description && (
            <div style={styles.contentCard} className="content-card">
              <h2 style={styles.sectionTitle} className="section-title">About This Car</h2>
              <p style={styles.description}>{car.description}</p>
            </div>
          )}

          {/* Modifications */}
          {car.modifications && car.modifications.length > 0 && (
            <div style={styles.contentCard} className="content-card">
              <h2 style={styles.sectionTitle} className="section-title">Modifications & Upgrades</h2>
              <div style={styles.modificationsGrid} className="modifications-grid">
                {car.modifications.map((mod, index) => (
                  <div key={index} style={styles.modificationCard}>
                    <div style={styles.modificationIconWrapper}>
                      {getModificationIcon(mod.icon || "", mod.type)}
                    </div>
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

          {/* CTA Section */}
          <div style={styles.ctaSection}>
            <div style={styles.ctaCard} className="cta-card">
              <h2 style={styles.ctaTitle} className="cta-title">Interested in this car?</h2>
              <p style={styles.ctaDescription}>
                Download the Rydora app to see full details, leave comments, and connect with the owner
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
            <img
              src={carImages[selectedImageIndex]?.url || carImages[0]?.url}
              alt={`${car.make} ${car.model}`}
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
    padding: "0",
    paddingTop: "80px",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
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
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#667eea",
    backgroundColor: "transparent",
    border: "2px solid #667eea",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s",
    marginBottom: "32px",
  },
  heroCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "40px",
    marginBottom: "40px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
  },
  carHeaderModern: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "24px",
  },
  carTitleSection: {
    flex: 1,
    minWidth: "280px",
  },
  carTitle: {
    fontSize: "42px",
    fontWeight: "900",
    color: "#1e293b",
    marginBottom: "12px",
    lineHeight: "1.2",
  },
  carMetaRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  carYear: {
    fontSize: "24px",
    color: "#667eea",
    fontWeight: "700",
  },
  metaDivider: {
    fontSize: "20px",
    color: "#cbd5e1",
  },
  carEngine: {
    fontSize: "20px",
    color: "#64748b",
    fontWeight: "600",
  },
  ratingCard: {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "16px",
    padding: "20px 28px",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.3)",
  },
  ratingContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  starContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  starIcon: {
    fontSize: "32px",
  },
  ratingValue: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#fff",
  },
  ratingCount: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  imageGallery: {
    marginBottom: "40px",
  },
  mainImageContainer: {
    position: "relative",
    width: "100%",
    borderRadius: "24px",
    overflow: "hidden",
    marginBottom: "20px",
    cursor: "pointer",
    backgroundColor: "#000",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  },
  mainImage: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    maxHeight: "700px",
  },
  imageCounter: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(10px)",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "24px",
    fontSize: "15px",
    fontWeight: "700",
  },
  thumbnailContainer: {
    display: "flex",
    gap: "16px",
    overflowX: "auto",
    paddingBottom: "12px",
  },
  thumbnail: {
    flexShrink: 0,
    width: "140px",
    height: "100px",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    border: "3px solid transparent",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: 0.6,
  },
  thumbnailActive: {
    borderColor: "#667eea",
    opacity: 1,
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
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
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
  },
  video: {
    width: "100%",
    borderRadius: "20px",
    backgroundColor: "#000",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
  },
  contentCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "40px",
    marginBottom: "40px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "24px",
  },
  description: {
    fontSize: "18px",
    color: "#475569",
    lineHeight: "1.8",
    whiteSpace: "pre-wrap",
  },
  modificationsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  modificationCard: {
    display: "flex",
    gap: "16px",
    padding: "20px",
    backgroundColor: "#f8fafc",
    borderRadius: "16px",
    border: "2px solid #e2e8f0",
    transition: "all 0.2s",
  },
  modificationIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "48px",
    height: "48px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  },
  modificationContent: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  modificationType: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#667eea",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  modificationText: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: "1.5",
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
