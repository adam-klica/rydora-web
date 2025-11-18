"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string | null;
  club: {
    name: string;
  } | null;
  eventType: string | null;
  isFree: boolean;
  price: number | null;
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
        <div style={styles.loading}>Loading event...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h1>Event Not Found</h1>
          <p>{error || "The event you are looking for does not exist."}</p>
        </div>
      </div>
    );
  }

  const eventDate = event.date
    ? new Date(event.date).toLocaleString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {event.imageUrl && (
          <img src={event.imageUrl} alt={event.title} style={styles.image} />
        )}
        <div style={styles.content}>
          <h1 style={styles.title}>{event.title}</h1>

          {event.club && (
            <p style={styles.info}>Hosted by: {event.club.name}</p>
          )}

          {eventDate && <p style={styles.info}>📅 {eventDate}</p>}

          {event.location && <p style={styles.info}>📍 {event.location}</p>}

          {event.eventType && (
            <div style={styles.badge}>
              <span style={styles.badgeText}>{event.eventType}</span>
            </div>
          )}

          {event.isFree ? (
            <div style={styles.priceBadge}>
              <span style={styles.priceText}>FREE</span>
            </div>
          ) : event.price != null ? (
            <div style={styles.priceBadge}>
              <span style={styles.priceText}>€{event.price.toFixed(2)}</span>
            </div>
          ) : null}

          {event.description && (
            <p style={styles.description}>{event.description}</p>
          )}

          <a
            href={`rydora://event/${event.id}`}
            style={styles.button}
            onClick={(e) => {
              // Fallback to web if deep link doesn't work
              setTimeout(() => {
                window.location.href = `https://apps.apple.com/app/rydora`;
              }, 500);
            }}
          >
            Open in Rydora App
          </a>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    backgroundColor: "#0b0f1a",
    color: "#e6ecf7",
    fontFamily:
      "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Helvetica, Arial, sans-serif",
  },
  card: {
    maxWidth: "720px",
    width: "100%",
    backgroundColor: "#111826",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "16px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    maxHeight: "420px",
    objectFit: "cover",
  },
  content: {
    padding: "24px",
  },
  title: {
    margin: "0 0 16px",
    fontSize: "24px",
    fontWeight: "700",
    color: "#e6ecf7",
  },
  info: {
    margin: "8px 0",
    color: "#9fb0cc",
    fontSize: "14px",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "8px",
    backgroundColor: "#254D70",
    marginTop: "12px",
    marginBottom: "12px",
  },
  badgeText: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#FFFFFF",
  },
  priceBadge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "8px",
    backgroundColor: "#16A34A",
    marginTop: "12px",
    marginBottom: "12px",
    marginLeft: "8px",
  },
  priceText: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#FFFFFF",
  },
  description: {
    margin: "16px 0",
    color: "#9fb0cc",
    lineHeight: "1.6",
    fontSize: "15px",
  },
  button: {
    display: "inline-block",
    padding: "12px 24px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#567AFD",
    fontWeight: "600",
    marginTop: "20px",
    transition: "background-color 0.2s",
  },
  loading: {
    textAlign: "center",
    color: "#9fb0cc",
    fontSize: "16px",
  },
  error: {
    textAlign: "center",
    color: "#ef4444",
  },
};
