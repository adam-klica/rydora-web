"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

// Fix malformed URLs that have double https://
const sanitizeImageUrl = (url: string | null | undefined): string => {
  if (!url) return "";
  const secondHttpsIndex = url.indexOf("https://", 8);
  if (secondHttpsIndex > 0) {
    return url.substring(secondHttpsIndex);
  }
  return url;
};

// Modification icon mapping - matches mobile app exactly
const MOD_ICONS: { [key: string]: string } = {
  engine: "https://api.iconify.design/mdi/engine.svg?color=%23567AFD",
  electronics: "https://api.iconify.design/mdi/chip.svg?color=%23567AFD",
  wheels: "https://api.iconify.design/mdi/steering.svg?color=%23567AFD",
  suspension: "https://api.iconify.design/mdi/tune.svg?color=%23567AFD",
  brakes: "https://api.iconify.design/mdi/car-brake-abs.svg?color=%23567AFD",
  exhaust: "https://api.iconify.design/mdi/smoke.svg?color=%23567AFD",
  interior: "https://api.iconify.design/mdi/car-seat.svg?color=%23567AFD",
  exterior: "https://api.iconify.design/mdi/car-sports.svg?color=%23567AFD",
  audio: "https://api.iconify.design/mdi/volume-high.svg?color=%23567AFD",
  electrical: "https://api.iconify.design/mdi/flash.svg?color=%23567AFD",
  general: "https://api.iconify.design/mdi/cog.svg?color=%23567AFD",
};

const MOD_LABELS: { [key: string]: string } = {
  engine: "Engine",
  electronics: "Electronics",
  wheels: "Wheels",
  suspension: "Suspension",
  brakes: "Brakes",
  exhaust: "Exhaust",
  interior: "Interior",
  exterior: "Exterior",
  audio: "Audio",
  electrical: "Electrical",
  general: "General",
};

const getModificationIcon = (iconName: string, type: string): string => {
  const normalizedType = (type || "general").toLowerCase();
  return MOD_ICONS[iconName] || MOD_ICONS[normalizedType] || MOD_ICONS.general;
};

const getModificationLabel = (type: string): string => {
  const normalizedType = (type || "general").toLowerCase();
  return MOD_LABELS[normalizedType] || "Modification";
};

// Detect device and redirect to app
const detectDeviceAndRedirect = (garageId: string, carId: string) => {
  if (typeof window === "undefined") return;

  const userAgent = navigator.userAgent || navigator.vendor;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /android/i.test(userAgent);

  const deepLink = `rydora://garages/${garageId}/cars/${carId}`;
  window.location.href = deepLink;

  setTimeout(() => {
    if (isIOS) {
      window.location.href = "https://apps.apple.com/us/app/rydora/id6748365405";
    } else if (isAndroid) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.rydora.app";
    }
  }, 2500);
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
          fetch(`https://dev.rydora.me/api/user-garages/car/${carId}`),
          fetch(
            `https://dev.rydora.me/api/user-garages/${garageId}/cars?isPublic=true`
          ),
        ]);

        if (!carRes.ok) {
          throw new Error("Car not found");
        }
        const carData = await carRes.json();
        setCar(carData.car);

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
        const image = sanitizeImageUrl(carData.car.media?.[0]?.url);

        document.title = title;

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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(37, 77, 112, 1)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(37, 77, 112, 0.9)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .modifications-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .car-title {
            font-size: 28px !important;
          }
          .hero-card {
            padding: 24px !important;
          }
          .content-card {
            padding: 24px !important;
          }
          .main-image {
            height: 350px !important;
          }
          .thumbnail {
            width: 80px !important;
            height: 60px !important;
          }
        }
        @media (max-width: 480px) {
          .car-title {
            font-size: 24px !important;
          }
          .main-image {
            height: 280px !important;
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
            ← Back to Garage
          </button>

          {/* Hero Card with Car Info */}
          <div style={styles.heroCard} className="hero-card">
            <div style={styles.carHeader}>
              <div style={styles.carTitleSection}>
                <h1 style={styles.carTitle} className="car-title">
                  {car.make} {car.model}
                </h1>
                <div style={styles.carMetaRow}>
                  <span style={styles.carYear}>{car.year}</span>
                  {car.engine && (
                    <>
                      <span style={styles.metaDivider}>•</span>
                      <span style={styles.carEngine}>{car.engine}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Rating Badge */}
              {garageRating && garageRating.ratingCount > 0 && (
                <div style={styles.ratingBadge}>
                  <span style={styles.starIcon}>⭐</span>
                  <span style={styles.ratingValue}>
                    {garageRating.rating ? garageRating.rating.toFixed(1) : "N/A"}
                  </span>
                  <span style={styles.ratingCount}>
                    ({garageRating.ratingCount})
                  </span>
                </div>
              )}
            </div>

            {/* Open in App Button */}
            <button
              onClick={() => detectDeviceAndRedirect(garageId, carId)}
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

          {/* Main Image Gallery */}
          {carImages.length > 0 && (
            <div style={styles.imageGallery}>
              <div
                style={styles.mainImageContainer}
                onClick={() => setIsImageViewerOpen(true)}
              >
                <img
                  src={sanitizeImageUrl(carImages[selectedImageIndex]?.url || carImages[0]?.url)}
                  alt={`${car.make} ${car.model}`}
                  style={styles.mainImage}
                  className="main-image"
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
                      onMouseEnter={(e) => {
                        if (selectedImageIndex !== index) {
                          e.currentTarget.style.opacity = "0.8";
                          e.currentTarget.style.borderColor = "rgba(37, 77, 112, 0.5)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedImageIndex !== index) {
                          e.currentTarget.style.opacity = "0.5";
                          e.currentTarget.style.borderColor = "transparent";
                        }
                      }}
                    >
                      <img
                        src={sanitizeImageUrl(img.url)}
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
            <div style={styles.contentCard} className="content-card">
              <h2 style={styles.sectionTitle}>Videos</h2>
              <div style={styles.videoGrid}>
                {carVideos.map((video, index) => (
                  <video
                    key={index}
                    src={sanitizeImageUrl(video.url)}
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
              <h2 style={styles.sectionTitle}>About This Car</h2>
              <p style={styles.description}>{car.description}</p>
            </div>
          )}

          {/* Modifications */}
          {car.modifications && car.modifications.length > 0 && (
            <div style={styles.contentCard} className="content-card">
              <h2 style={styles.sectionTitle}>
                Modifications & Upgrades ({car.modifications.length})
              </h2>
              <div style={styles.modificationsGrid} className="modifications-grid">
                {car.modifications.map((mod, index) => (
                  <div
                    key={index}
                    style={styles.modificationCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(37, 77, 112, 0.4)";
                      e.currentTarget.style.backgroundColor = "rgba(37, 77, 112, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.backgroundColor = "rgba(30, 41, 59, 0.5)";
                    }}
                  >
                    <div style={styles.modificationIconWrapper}>
                      <img
                        src={getModificationIcon(mod.icon || "", mod.type)}
                        alt={mod.type}
                        style={styles.modificationIconImage}
                      />
                    </div>
                    <div style={styles.modificationContent}>
                      <span style={styles.modificationType}>
                        {getModificationLabel(mod.type)}
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
            <div style={styles.ctaCard}>
              <h2 style={styles.ctaTitle}>Want to see more details?</h2>
              <p style={styles.ctaDescription}>
                Download the Rydora app to leave comments, rate this car, and connect with the owner
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

      {/* Image Viewer Modal */}
      {isImageViewerOpen && carImages.length > 0 && (
        <div
          style={styles.imageViewerOverlay}
          onClick={() => setIsImageViewerOpen(false)}
        >
          <div style={styles.imageViewerContent} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.imageViewerClose}
              onClick={() => setIsImageViewerOpen(false)}
            >
              ✕
            </button>
            <img
              src={sanitizeImageUrl(carImages[selectedImageIndex]?.url || carImages[0]?.url)}
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
            <div style={styles.imageViewerCounter}>
              {selectedImageIndex + 1} / {carImages.length}
            </div>
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
    background: "linear-gradient(180deg, #070b12 0%, #0a1020 60%, #070b12 100%)",
    color: "#e6ecf7",
  },
  contentWrapper: {
    flex: 1,
    paddingTop: "100px",
    paddingBottom: "60px",
  },
  container: {
    maxWidth: "1000px",
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
    padding: "32px",
    marginBottom: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  carHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  },
  carTitleSection: {
    flex: 1,
    minWidth: "200px",
  },
  carTitle: {
    fontSize: "36px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "8px",
    lineHeight: "1.2",
  },
  carMetaRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  carYear: {
    fontSize: "20px",
    color: "#567AFD",
    fontWeight: "700",
  },
  metaDivider: {
    fontSize: "16px",
    color: "rgba(148, 163, 184, 0.5)",
  },
  carEngine: {
    fontSize: "16px",
    color: "rgba(148, 163, 184, 0.9)",
    fontWeight: "500",
  },
  ratingBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    backgroundColor: "rgba(37, 77, 112, 0.3)",
    border: "1px solid rgba(37, 77, 112, 0.5)",
    borderRadius: "12px",
  },
  starIcon: {
    fontSize: "18px",
  },
  ratingValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
  },
  ratingCount: {
    fontSize: "14px",
    color: "rgba(148, 163, 184, 0.8)",
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
  imageGallery: {
    marginBottom: "24px",
  },
  mainImageContainer: {
    position: "relative",
    width: "100%",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "16px",
    cursor: "pointer",
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  mainImage: {
    width: "100%",
    height: "500px",
    objectFit: "cover",
    display: "block",
  },
  imageCounter: {
    position: "absolute",
    top: "16px",
    right: "16px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(8px)",
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
    width: "100px",
    height: "75px",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    border: "2px solid transparent",
    transition: "all 0.3s ease",
    opacity: 0.5,
  },
  thumbnailActive: {
    borderColor: "#567AFD",
    opacity: 1,
    boxShadow: "0 4px 12px rgba(86, 122, 253, 0.4)",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  contentCard: {
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    padding: "32px",
    marginBottom: "24px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "20px",
  },
  description: {
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.9)",
    lineHeight: "1.7",
    whiteSpace: "pre-wrap",
  },
  videoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  },
  video: {
    width: "100%",
    borderRadius: "12px",
    backgroundColor: "#000",
  },
  modificationsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
  },
  modificationCard: {
    display: "flex",
    gap: "16px",
    padding: "20px",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    transition: "all 0.2s ease",
  },
  modificationIconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(37, 77, 112, 0.2)",
    borderRadius: "12px",
  },
  modificationIconImage: {
    width: "28px",
    height: "28px",
  },
  modificationContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
    minWidth: 0,
  },
  modificationType: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#567AFD",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  modificationText: {
    fontSize: "15px",
    color: "rgba(203, 213, 225, 0.9)",
    lineHeight: "1.5",
    fontWeight: "500",
  },
  ctaSection: {
    marginTop: "16px",
  },
  ctaCard: {
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "24px",
    padding: "48px 32px",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  ctaTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "12px",
  },
  ctaDescription: {
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.8)",
    marginBottom: "24px",
    lineHeight: "1.6",
    maxWidth: "450px",
    margin: "0 auto 24px",
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
    padding: "20px",
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
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
    transition: "background-color 0.2s",
  },
  imageViewerImage: {
    maxWidth: "90%",
    maxHeight: "85%",
    objectFit: "contain",
    borderRadius: "8px",
  },
  imageViewerNavLeft: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    border: "none",
    fontSize: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
    transition: "background-color 0.2s",
  },
  imageViewerNavRight: {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    border: "none",
    fontSize: "36px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000,
    transition: "background-color 0.2s",
  },
  imageViewerCounter: {
    position: "absolute",
    bottom: "30px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "24px",
    fontSize: "16px",
    fontWeight: "600",
  },
};
