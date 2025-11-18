"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ClubData {
  id: string;
  name: string;
  description: string | null;
  profileImageUrl: string | null;
}

interface EventData {
  id: string;
  title: string;
  description: string | null;
  date: string;
  location: string | null;
  city: string | null;
  country: string | null;
  imageUrl: string | null;
  eventType: string | null;
  isFree: boolean;
  price: number | null;
  club: ClubData | null;
  usersComing: number | null;
  usersMaybeComing: number | null;
}

export default function EventPage() {
  const params = useParams();
  const eventId = params?.eventId as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://rydora.me/api/public/events/${eventId}`
        );
        if (!res.ok) {
          throw new Error("Event not found");
        }
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={styles.container}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>⚠️</div>
          <h1 style={styles.errorTitle}>Event Not Found</h1>
          <p style={styles.errorText}>
            {error || "The event you are looking for does not exist."}
          </p>
        </div>
      </div>
    );
  }

  const eventDate = event.date
    ? new Date(event.date).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const eventTime = event.date
    ? new Date(event.date).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const fullLocation =
    [event.city, event.country].filter(Boolean).join(", ") ||
    event.location ||
    null;

  const totalAttendees =
    (event.usersComing || 0) + (event.usersMaybeComing || 0);

  return (
    <div style={styles.container}>
      {/* Hero Image Section */}
      {event.imageUrl && (
        <div style={styles.heroSection}>
          <img
            src={event.imageUrl}
            alt={event.title}
            style={styles.heroImage}
          />
          <div style={styles.heroOverlay}></div>
        </div>
      )}

      <div style={styles.contentWrapper}>
        {/* Main Content Card */}
        <div style={styles.mainCard}>
          {/* Header Section */}
          <div style={styles.headerSection}>
            <div style={styles.titleRow}>
              <h1 style={styles.title}>{event.title}</h1>
              <div style={styles.badgesRow}>
                {event.eventType && (
                  <div style={styles.categoryBadge}>
                    <span style={styles.categoryIcon}>🏷️</span>
                    <span style={styles.categoryText}>{event.eventType}</span>
                  </div>
                )}
                {event.isFree ? (
                  <div style={styles.priceBadgeFree}>
                    <span style={styles.priceTextFree}>FREE</span>
                  </div>
                ) : event.price != null ? (
                  <div style={styles.priceBadge}>
                    <span style={styles.priceText}>
                      €{event.price.toFixed(2)}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Event Details Grid */}
          <div style={styles.detailsGrid}>
            {eventDate && (
              <div style={styles.detailCard}>
                <div style={styles.detailIcon}>📅</div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Date</div>
                  <div style={styles.detailValue}>{eventDate}</div>
                  {eventTime && (
                    <div style={styles.detailSubtext}>{eventTime}</div>
                  )}
                </div>
              </div>
            )}

            {fullLocation && (
              <div style={styles.detailCard}>
                <div style={styles.detailIcon}>📍</div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Location</div>
                  <div style={styles.detailValue}>{fullLocation}</div>
                </div>
              </div>
            )}

            {totalAttendees > 0 && (
              <div style={styles.detailCard}>
                <div style={styles.detailIcon}>👥</div>
                <div style={styles.detailContent}>
                  <div style={styles.detailLabel}>Attendees</div>
                  <div style={styles.detailValue}>
                    {event.usersComing || 0} going
                    {event.usersMaybeComing
                      ? `, ${event.usersMaybeComing} maybe`
                      : ""}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {event.description && (
            <div style={styles.descriptionSection}>
              <h2 style={styles.sectionTitle}>About This Event</h2>
              <p style={styles.description}>{event.description}</p>
            </div>
          )}

          {/* Club Card */}
          {event.club && (
            <div style={styles.clubSection}>
              <h2 style={styles.sectionTitle}>Hosted By</h2>
              <div style={styles.clubCard}>
                {event.club.profileImageUrl ? (
                  <img
                    src={event.club.profileImageUrl}
                    alt={event.club.name}
                    style={styles.clubImage}
                  />
                ) : (
                  <div style={styles.clubImagePlaceholder}>
                    <span style={styles.clubImagePlaceholderText}>
                      {event.club.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div style={styles.clubInfo}>
                  <h3 style={styles.clubName}>{event.club.name}</h3>
                  {event.club.description && (
                    <p style={styles.clubDescription}>
                      {event.club.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div style={styles.ctaSection}>
            <a
              href={`rydora://event/${event.id}`}
              style={styles.ctaButton}
              onClick={() => {
                setTimeout(() => {
                  window.location.href = `https://apps.apple.com/app/rydora`;
                }, 500);
              }}
            >
              <span style={styles.ctaButtonIcon}>📱</span>
              <span style={styles.ctaButtonText}>Open in Rydora App</span>
            </a>
            <p style={styles.ctaSubtext}>
              Join the community and RSVP to this event
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0F172A",
    color: "#F1F5F9",
    fontFamily:
      "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Helvetica, Arial, sans-serif",
  },
  heroSection: {
    position: "relative",
    width: "100%",
    height: "400px",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "200px",
    background: "linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)",
  },
  contentWrapper: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "32px 24px",
  },
  mainCard: {
    backgroundColor: "#1E293B",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  headerSection: {
    marginBottom: "32px",
  },
  titleRow: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  title: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: "1.2",
    letterSpacing: "-0.5px",
  },
  badgesRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "center",
  },
  categoryBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 16px",
    borderRadius: "12px",
    backgroundColor: "#254D70",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  categoryIcon: {
    fontSize: "14px",
  },
  categoryText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  priceBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "12px",
    backgroundColor: "#254D70",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  priceText: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  priceBadgeFree: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "12px",
    backgroundColor: "#16A34A",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  priceTextFree: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  detailCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "20px",
    backgroundColor: "#0F172A",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  detailIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "4px",
  },
  detailValue: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: "1.4",
  },
  detailSubtext: {
    fontSize: "14px",
    color: "#94A3B8",
    marginTop: "4px",
  },
  descriptionSection: {
    marginBottom: "32px",
    paddingBottom: "32px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  sectionTitle: {
    margin: "0 0 16px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  description: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#CBD5E1",
  },
  clubSection: {
    marginBottom: "32px",
  },
  clubCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "20px",
    backgroundColor: "#0F172A",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.2s",
  },
  clubImage: {
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "2px solid rgba(255, 255, 255, 0.1)",
    flexShrink: 0,
  },
  clubImagePlaceholder: {
    width: "64px",
    height: "64px",
    borderRadius: "12px",
    backgroundColor: "#254D70",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  clubImagePlaceholderText: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    margin: "0 0 8px",
    fontSize: "18px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  clubDescription: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#94A3B8",
  },
  ctaSection: {
    textAlign: "center",
    paddingTop: "32px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 32px",
    borderRadius: "16px",
    backgroundColor: "#567AFD",
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(86, 122, 253, 0.3)",
  },
  ctaButtonIcon: {
    fontSize: "20px",
  },
  ctaButtonText: {
    fontSize: "16px",
  },
  ctaSubtext: {
    margin: "12px 0 0",
    fontSize: "14px",
    color: "#94A3B8",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    gap: "16px",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255, 255, 255, 0.1)",
    borderTopColor: "#567AFD",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    fontSize: "16px",
    color: "#94A3B8",
    margin: 0,
  },
  errorCard: {
    maxWidth: "500px",
    margin: "100px auto",
    padding: "40px",
    backgroundColor: "#1E293B",
    borderRadius: "24px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
  errorIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  errorTitle: {
    margin: "0 0 12px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  errorText: {
    margin: 0,
    fontSize: "16px",
    color: "#94A3B8",
  },
};

// Add spinner animation
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
