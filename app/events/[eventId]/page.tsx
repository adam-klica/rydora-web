import { Metadata } from "next";
import EventClient from "./EventClient";

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

async function getEventData(eventId: string): Promise<EventData | null> {
  try {
    const res = await fetch(
      `https://rydora.me/api/public/events/${eventId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ eventId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = await params;
  const event = await getEventData(eventId);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "This event doesn't exist or has been removed.",
    };
  }

  const title = `${event.title} - Rydora Event`;
  const location = [event.city, event.country].filter(Boolean).join(", ") || event.location;
  const date = event.date ? new Date(event.date).toLocaleDateString() : "";
  const description = event.description ||
    `Join ${event.title}${location ? ` in ${location}` : ""}${date ? ` on ${date}` : ""} on Rydora.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://rydora.me/events/${eventId}`,
      siteName: "Rydora",
      images: event.imageUrl ? [{ url: event.imageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: event.imageUrl ? [event.imageUrl] : undefined,
    },
    alternates: {
      canonical: `https://rydora.me/events/${eventId}`,
    },
  };
}

function generateEventJsonLd(event: EventData, eventId: string) {
  const location = [event.city, event.country].filter(Boolean).join(", ") || event.location;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description || `Join ${event.title} on Rydora`,
    startDate: event.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: location ? {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city || undefined,
        addressCountry: event.country || undefined,
      },
    } : undefined,
    image: event.imageUrl || undefined,
    organizer: event.club ? {
      "@type": "Organization",
      name: event.club.name,
      url: `https://rydora.me/clubs/${event.club.id}`,
    } : {
      "@type": "Organization",
      name: "Rydora",
      url: "https://rydora.me",
    },
    offers: {
      "@type": "Offer",
      price: event.isFree ? "0" : (event.price?.toString() || "0"),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://rydora.me/events/${eventId}`,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { eventId } = await params;
  const event = await getEventData(eventId);

  const jsonLd = event ? generateEventJsonLd(event, eventId) : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <EventClient eventId={eventId} initialData={event} />
    </>
  );
}
