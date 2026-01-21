"use client";

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

interface EventClientProps {
  eventId: string;
  initialData: EventData | null;
  error?: string;
}

export default function EventClient({ initialData: event, error }: EventClientProps) {
  if (!event) {
    return (
      <div style={styles.pageContainer}>
        <div style={styles.errorWrapper}>
          <div style={styles.errorEmoji}>😕</div>
          <h1 style={styles.errorHeading}>Event Not Found</h1>
          <p style={styles.errorMessage}>
            {error ||
              "The event you're looking for doesn't exist or has been removed."}
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
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
      <div style={styles.pageContainer}>
        {/* Hero Banner with Image */}
        {event.imageUrl ? (
          <div style={styles.heroBanner}>
            <img
              src={event.imageUrl}
              alt={event.title}
              style={styles.heroImage}
            />
            <div style={styles.heroGradient}></div>
            <div style={styles.heroContent}>
              <div style={styles.heroBadges}>
                {event.eventType && (
                  <div style={styles.heroCategoryTag}>
                    <span style={styles.heroCategoryIcon}>🎯</span>
                    <span style={styles.heroCategoryLabel}>
                      {event.eventType}
                    </span>
                  </div>
                )}
                {event.isFree ? (
                  <div style={styles.heroFreeTag}>
                    <span style={styles.heroFreeText}>FREE EVENT</span>
                  </div>
                ) : event.price != null ? (
                  <div style={styles.heroPriceTag}>
                    <span style={styles.heroPriceText}>
                      €{event.price.toFixed(2)}
                    </span>
                  </div>
                ) : null}
              </div>
              <h1 style={styles.heroTitle}>{event.title}</h1>
            </div>
          </div>
        ) : (
          <div style={styles.heroBannerNoImage}>
            <div style={styles.heroContentNoImage}>
              <div style={styles.heroBadges}>
                {event.eventType && (
                  <div style={styles.heroCategoryTag}>
                    <span style={styles.heroCategoryIcon}>🎯</span>
                    <span style={styles.heroCategoryLabel}>
                      {event.eventType}
                    </span>
                  </div>
                )}
                {event.isFree ? (
                  <div style={styles.heroFreeTag}>
                    <span style={styles.heroFreeText}>FREE EVENT</span>
                  </div>
                ) : event.price != null ? (
                  <div style={styles.heroPriceTag}>
                    <span style={styles.heroPriceText}>
                      €{event.price.toFixed(2)}
                    </span>
                  </div>
                ) : null}
              </div>
              <h1 style={styles.heroTitleNoImage}>{event.title}</h1>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div style={styles.mainContent}>
          <div style={styles.contentGrid}>
            {/* Left Column - Event Details */}
            <div style={styles.leftColumn}>
              {/* Key Information Cards */}
              <div style={styles.infoCardsSection}>
                {eventDate && (
                  <div style={styles.infoCard} className="fade-in">
                    <div style={styles.infoCardIconWrapper}>
                      <div style={styles.infoCardIcon}>📅</div>
                    </div>
                    <div style={styles.infoCardContent}>
                      <div style={styles.infoCardLabel}>Event Date</div>
                      <div style={styles.infoCardValue}>{eventDate}</div>
                      {eventTime && (
                        <div style={styles.infoCardSubtext}>
                          Starts at {eventTime}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {fullLocation && (
                  <div style={styles.infoCard} className="fade-in">
                    <div style={styles.infoCardIconWrapper}>
                      <div style={styles.infoCardIcon}>📍</div>
                    </div>
                    <div style={styles.infoCardContent}>
                      <div style={styles.infoCardLabel}>Location</div>
                      <div style={styles.infoCardValue}>{fullLocation}</div>
                    </div>
                  </div>
                )}

                {totalAttendees > 0 && (
                  <div style={styles.infoCard} className="fade-in">
                    <div style={styles.infoCardIconWrapper}>
                      <div style={styles.infoCardIcon}>👥</div>
                    </div>
                    <div style={styles.infoCardContent}>
                      <div style={styles.infoCardLabel}>Attendees</div>
                      <div style={styles.infoCardValue}>
                        <strong>{event.usersComing || 0}</strong> confirmed
                        {event.usersMaybeComing ? (
                          <span style={styles.attendeeMaybe}>
                            {" "}
                            • <strong>{event.usersMaybeComing}</strong> maybe
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Event Description */}
              {event.description && (
                <div style={styles.descriptionBox} className="fade-in">
                  <h2 style={styles.sectionHeading}>
                    <span style={styles.sectionHeadingIcon}>📝</span>
                    About This Event
                  </h2>
                  <div style={styles.descriptionText}>{event.description}</div>
                </div>
              )}
            </div>

            {/* Right Column - Club & CTA */}
            <div style={styles.rightColumn}>
              {/* Club Information Card */}
              {event.club && (
                <div style={styles.clubBox} className="fade-in">
                  <h2 style={styles.sectionHeading}>
                    <span style={styles.sectionHeadingIcon}>🏢</span>
                    Hosted By
                  </h2>
                  <div style={styles.clubCard}>
                    {event.club.profileImageUrl ? (
                      <img
                        src={event.club.profileImageUrl}
                        alt={event.club.name}
                        style={styles.clubAvatar}
                      />
                    ) : (
                      <div style={styles.clubAvatarPlaceholder}>
                        <span style={styles.clubAvatarInitial}>
                          {event.club.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div style={styles.clubDetails}>
                      <h3 style={styles.clubTitle}>{event.club.name}</h3>
                      {event.club.description && (
                        <p style={styles.clubBio}>{event.club.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div style={styles.ctaBox} className="fade-in">
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
                  <span style={styles.ctaButtonLabel}>Open in Rydora App</span>
                  <span style={styles.ctaButtonArrow}>→</span>
                </a>
                <p style={styles.ctaHint}>
                  Download the app to RSVP and join the community
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#0A0E1A",
    color: "#FFFFFF",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  heroBanner: {
    position: "relative",
    width: "100%",
    height: "500px",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    background:
      "linear-gradient(to top, rgba(10, 14, 26, 0.98) 0%, rgba(10, 14, 26, 0.7) 50%, transparent 100%)",
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "60px 32px 40px",
    zIndex: 2,
  },
  heroBannerNoImage: {
    backgroundColor: "#1A1F2E",
    padding: "60px 32px 40px",
    borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
  },
  heroContentNoImage: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  heroBadges: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  heroCategoryTag: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "20px",
    backgroundColor: "rgba(37, 77, 112, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  heroCategoryIcon: {
    fontSize: "14px",
  },
  heroCategoryLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#FFFFFF",
    textTransform: "capitalize",
  },
  heroFreeTag: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 14px",
    borderRadius: "20px",
    backgroundColor: "rgba(22, 163, 74, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  heroFreeText: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: "0.5px",
  },
  heroPriceTag: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 14px",
    borderRadius: "20px",
    backgroundColor: "rgba(37, 77, 112, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
  },
  heroPriceText: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  heroTitle: {
    margin: 0,
    fontSize: "48px",
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: "1.1",
    letterSpacing: "-1px",
    textShadow: "0 2px 20px rgba(0, 0, 0, 0.5)",
  },
  heroTitleNoImage: {
    margin: 0,
    fontSize: "48px",
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: "1.1",
    letterSpacing: "-1px",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 24px",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "32px",
    alignItems: "start",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    position: "sticky",
    top: "24px",
  },
  infoCardsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  infoCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
    padding: "24px",
    backgroundColor: "#1A1F2E",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
  },
  infoCardIconWrapper: {
    flexShrink: 0,
    width: "56px",
    height: "56px",
    borderRadius: "14px",
    backgroundColor: "rgba(37, 77, 112, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoCardIcon: {
    fontSize: "28px",
  },
  infoCardContent: {
    flex: 1,
  },
  infoCardLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px",
  },
  infoCardValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: "1.4",
  },
  infoCardSubtext: {
    fontSize: "14px",
    color: "#94A3B8",
    marginTop: "4px",
  },
  attendeeMaybe: {
    color: "#94A3B8",
    fontWeight: "400",
  },
  descriptionBox: {
    padding: "32px",
    backgroundColor: "#1A1F2E",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  sectionHeading: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "0 0 20px",
    fontSize: "22px",
    fontWeight: "800",
    color: "#FFFFFF",
  },
  sectionHeadingIcon: {
    fontSize: "24px",
  },
  descriptionText: {
    margin: 0,
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#CBD5E1",
    whiteSpace: "pre-wrap",
  },
  clubBox: {
    padding: "32px",
    backgroundColor: "#1A1F2E",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  clubCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  clubAvatar: {
    width: "72px",
    height: "72px",
    borderRadius: "16px",
    objectFit: "cover",
    border: "3px solid rgba(255, 255, 255, 0.15)",
    flexShrink: 0,
  },
  clubAvatarPlaceholder: {
    width: "72px",
    height: "72px",
    borderRadius: "16px",
    backgroundColor: "#254D70",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "3px solid rgba(255, 255, 255, 0.15)",
  },
  clubAvatarInitial: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#FFFFFF",
  },
  clubDetails: {
    flex: 1,
  },
  clubTitle: {
    margin: "0 0 8px",
    fontSize: "20px",
    fontWeight: "800",
    color: "#FFFFFF",
  },
  clubBio: {
    margin: 0,
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#94A3B8",
  },
  ctaBox: {
    padding: "32px",
    backgroundColor: "linear-gradient(135deg, #254D70 0%, #1A3A52 100%)",
    background: "linear-gradient(135deg, #254D70 0%, #1A3A52 100%)",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow: "0 8px 24px rgba(37, 77, 112, 0.4)",
    textAlign: "center",
  },
  ctaButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    width: "100%",
    padding: "18px 24px",
    borderRadius: "16px",
    backgroundColor: "#567AFD",
    color: "#FFFFFF",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 16px rgba(86, 122, 253, 0.4)",
    marginBottom: "12px",
  },
  ctaButtonIcon: {
    fontSize: "22px",
  },
  ctaButtonLabel: {
    fontSize: "16px",
  },
  ctaButtonArrow: {
    fontSize: "20px",
    marginLeft: "auto",
  },
  ctaHint: {
    margin: 0,
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.7)",
  },
  errorWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "40px",
    textAlign: "center",
  },
  errorEmoji: {
    fontSize: "64px",
    marginBottom: "20px",
  },
  errorHeading: {
    margin: "0 0 12px",
    fontSize: "32px",
    fontWeight: "800",
    color: "#FFFFFF",
  },
  errorMessage: {
    margin: 0,
    fontSize: "16px",
    color: "#94A3B8",
    maxWidth: "500px",
  },
};
