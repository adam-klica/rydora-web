"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useScrollDetection } from "../hooks/useScrollDetection";

const DownloadModal = dynamic(() => import("../components/DownloadModal"), {
  ssr: false,
});

interface GarageData {
  id: string;
  name: string;
  details: string;
  coverImageUrl: string | null;
  rating: number | null;
  ratingCount: number;
  carsCount: number;
  createdAt: string;
  region: string;
}

interface GaragesResponse {
  garages: GarageData[];
  nextCursor: string | null;
}

export default function GaragesPage() {
  const router = useRouter();
  const [garages, setGarages] = useState<GarageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const isScrolled = useScrollDetection(12);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("eu");

  const fetchGarages = useCallback(
    async (reset = false) => {
      try {
        if (reset) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const params = new URLSearchParams({
          region: selectedRegion,
          pageSize: "20",
        });

        if (!reset && nextCursor) {
          params.append("cursor", nextCursor);
        }

        const res = await fetch(
          `https://dev.rydora.me/api/public/garages?${params.toString()}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch garages");
        }

        const data: GaragesResponse = await res.json();

        if (reset) {
          setGarages(data.garages);
        } else {
          setGarages((prev) => [...prev, ...data.garages]);
        }
        setNextCursor(data.nextCursor);
      } catch (err) {
        console.error("Error fetching garages:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedRegion, nextCursor]
  );

  useEffect(() => {
    fetchGarages(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRegion]);

  const handleGarageClick = (garageId: string) => {
    router.push(`/garages/${garageId}`);
  };

  const handleLoadMore = () => {
    if (nextCursor && !loadingMore) {
      fetchGarages(false);
    }
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    setNextCursor(null);
  };

  const renderStars = (rating: number | null) => {
    const r = rating ?? 0;
    const stars = [];
    const fullStars = Math.floor(r);
    const hasHalf = r - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} style={{ color: "#FBBF24" }}>
            ★
          </span>
        );
      } else if (i === fullStars && hasHalf) {
        stars.push(
          <span key={i} style={{ color: "#FBBF24" }}>
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} style={{ color: "#4B5563" }}>
            ★
          </span>
        );
      }
    }
    return stars;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isNew = (dateString: string) => {
    const created = new Date(dateString).getTime();
    const days = (Date.now() - created) / (1000 * 60 * 60 * 24);
    return days <= 14;
  };

  return (
    <div style={styles.pageContainer}>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 1024px) {
          .garages-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .garages-grid {
            grid-template-columns: 1fr !important;
          }
          .page-title {
            font-size: 32px !important;
          }
          .region-buttons {
            flex-wrap: wrap;
          }
        }
        @media (max-width: 480px) {
          .page-title {
            font-size: 28px !important;
          }
        }
      `}</style>
      <Header
        isScrolled={isScrolled}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />
      <div style={styles.contentWrapper}>
        <div style={styles.container}>
          {/* Header Section */}
          <div style={styles.headerSection}>
            <h1 style={styles.pageTitle} className="page-title">
              Explore Garages
            </h1>
            <p style={styles.pageSubtitle}>
              Discover amazing car collections from enthusiasts around the world
            </p>

            {/* Region Switcher */}
            <div style={styles.regionSwitcher} className="region-buttons">
              {[
                { key: "eu", label: "Europe" },
                { key: "usa", label: "USA" },
                { key: "canada", label: "Canada" },
              ].map((region) => (
                <button
                  key={region.key}
                  onClick={() => handleRegionChange(region.key)}
                  style={{
                    ...styles.regionButton,
                    ...(selectedRegion === region.key
                      ? styles.regionButtonActive
                      : {}),
                  }}
                  onMouseEnter={(e) => {
                    if (selectedRegion !== region.key) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(37, 77, 112, 0.3)";
                      e.currentTarget.style.borderColor =
                        "rgba(37, 77, 112, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedRegion !== region.key) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(30, 41, 59, 0.5)";
                      e.currentTarget.style.borderColor =
                        "rgba(51, 65, 85, 0.5)";
                    }
                  }}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={styles.loadingWrapper}>
              <div style={styles.loadingSpinner}></div>
              <p style={styles.loadingMessage}>Loading garages...</p>
            </div>
          ) : garages.length === 0 ? (
            <div style={styles.emptyWrapper}>
              <div style={styles.emptyIcon}>🚗</div>
              <h2 style={styles.emptyTitle}>No Garages Found</h2>
              <p style={styles.emptyMessage}>
                There are no garages in this region yet. Check back later!
              </p>
            </div>
          ) : (
            <>
              {/* Garages Grid */}
              <div style={styles.garagesGrid} className="garages-grid">
                {garages.map((garage) => (
                  <div
                    key={garage.id}
                    style={styles.garageCard}
                    onClick={() => handleGarageClick(garage.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0, 0, 0, 0.3)";
                      const img = e.currentTarget.querySelector(
                        "img"
                      ) as HTMLElement;
                      if (img) img.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0, 0, 0, 0.2)";
                      const img = e.currentTarget.querySelector(
                        "img"
                      ) as HTMLElement;
                      if (img) img.style.transform = "scale(1)";
                    }}
                  >
                    {/* Image */}
                    <div style={styles.garageImageWrapper}>
                      {garage.coverImageUrl ? (
                        <img
                          src={garage.coverImageUrl}
                          alt={garage.name}
                          loading="lazy"
                          style={styles.garageImage}
                        />
                      ) : (
                        <div style={styles.garageImagePlaceholder}>
                          <span style={styles.placeholderIcon}>🚗</span>
                        </div>
                      )}
                      <div style={styles.imageOverlay} />

                      {/* Badges */}
                      <div style={styles.badgesContainer}>
                        <div style={styles.badgeLeft}>
                          {garage.carsCount > 0 && (
                            <div style={styles.carsBadge}>
                              🚗 {garage.carsCount}{" "}
                              {garage.carsCount === 1 ? "car" : "cars"}
                            </div>
                          )}
                        </div>
                        <div style={styles.badgeRight}>
                          <div style={styles.ratingBadge}>
                            {renderStars(garage.rating)}
                            <span style={styles.ratingText}>
                              {(garage.rating ?? 0).toFixed(1)} (
                              {garage.ratingCount})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div style={styles.garageInfo}>
                      <h3 style={styles.garageName}>{garage.name}</h3>
                      {garage.details && (
                        <p style={styles.garageDescription}>{garage.details}</p>
                      )}
                      <div style={styles.garageFooter}>
                        <span style={styles.garageDate}>
                          📅 {formatDate(garage.createdAt)}
                        </span>
                        {isNew(garage.createdAt) && (
                          <span style={styles.newBadge}>New</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {nextCursor && (
                <div style={styles.loadMoreWrapper}>
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    style={styles.loadMoreButton}
                    onMouseEnter={(e) => {
                      if (!loadingMore) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(37, 77, 112, 1)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 12px 32px rgba(37, 77, 112, 0.5)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "rgba(37, 77, 112, 0.9)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(37, 77, 112, 0.4)";
                    }}
                  >
                    {loadingMore ? "Loading..." : "Load More Garages"}
                  </button>
                </div>
              )}
            </>
          )}

          {/* CTA Section */}
          <div style={styles.ctaSection}>
            <div style={styles.ctaCard}>
              <h2 style={styles.ctaTitle}>Want to create your own garage?</h2>
              <p style={styles.ctaDescription}>
                Download the Rydora app to showcase your car collection, connect
                with other enthusiasts, and discover amazing builds
              </p>
              <button
                onClick={() => setIsDownloadModalOpen(true)}
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
    background:
      "linear-gradient(180deg, #070b12 0%, #0a1020 60%, #070b12 100%)",
    color: "#e6ecf7",
  },
  contentWrapper: {
    flex: 1,
    paddingTop: "120px",
    paddingBottom: "60px",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: "48px",
  },
  pageTitle: {
    fontSize: "48px",
    fontWeight: "900",
    color: "#fff",
    marginBottom: "16px",
    textShadow: "0 2px 20px rgba(0, 0, 0, 0.3)",
  },
  pageSubtitle: {
    fontSize: "18px",
    color: "rgba(203, 213, 225, 0.8)",
    marginBottom: "32px",
    maxWidth: "600px",
    margin: "0 auto 32px",
  },
  regionSwitcher: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
  },
  regionButton: {
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#e2e8f0",
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    border: "1px solid rgba(51, 65, 85, 0.5)",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  regionButtonActive: {
    backgroundColor: "rgba(37, 77, 112, 0.8)",
    borderColor: "rgba(37, 77, 112, 1)",
    color: "#fff",
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
  emptyWrapper: {
    textAlign: "center",
    padding: "80px 20px",
  },
  emptyIcon: {
    fontSize: "80px",
    marginBottom: "20px",
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "12px",
  },
  emptyMessage: {
    fontSize: "16px",
    color: "rgba(203, 213, 225, 0.7)",
  },
  garagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginBottom: "48px",
  },
  garageCard: {
    backgroundColor: "rgba(17, 24, 38, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  },
  garageImageWrapper: {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
  },
  garageImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  garageImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#1E3A5F",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: {
    fontSize: "60px",
    opacity: 0.5,
  },
  imageOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
  },
  badgesContainer: {
    position: "absolute",
    top: "12px",
    left: "12px",
    right: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  badgeLeft: {
    display: "flex",
    gap: "8px",
  },
  badgeRight: {
    display: "flex",
    gap: "8px",
  },
  carsBadge: {
    padding: "6px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#254D70",
  },
  ratingBadge: {
    padding: "6px 12px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  ratingText: {
    marginLeft: "4px",
  },
  garageInfo: {
    padding: "20px",
  },
  garageName: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "8px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  garageDescription: {
    fontSize: "14px",
    color: "rgba(203, 213, 225, 0.7)",
    marginBottom: "12px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    lineHeight: "1.5",
  },
  garageFooter: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  garageDate: {
    fontSize: "12px",
    color: "rgba(148, 163, 184, 0.8)",
  },
  newBadge: {
    padding: "4px 10px",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    border: "1px solid rgba(16, 185, 129, 0.4)",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#10B981",
  },
  loadMoreWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "48px",
  },
  loadMoreButton: {
    padding: "16px 48px",
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
  ctaSection: {
    marginTop: "40px",
  },
  ctaCard: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderRadius: "24px",
    padding: "60px 40px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(102, 126, 234, 0.3)",
  },
  ctaTitle: {
    fontSize: "32px",
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
    color: "#fff",
    backgroundColor: "#667eea",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)",
  },
};
