import { Metadata } from "next";
import ClubClient from "./ClubClient";

interface ClubData {
  id: string;
  name: string;
  description: string | null;
  city: string | null;
  country: string | null;
  categoryLabel: string | null;
  profileImageUrl: string | null;
  memberCount: number;
  admin: {
    username: string;
    profileImage: string | null;
  };
  _count: {
    members: number;
    events: number;
  };
}

async function getClubData(clubId: string): Promise<ClubData | null> {
  try {
    const res = await fetch(
      `https://dev.rydora.me/api/clubs/${clubId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ clubId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { clubId } = await params;
  const club = await getClubData(clubId);

  if (!club) {
    return {
      title: "Club Not Found",
      description: "This club doesn't exist or has been removed.",
    };
  }

  const title = `${club.name} - Rydora Club`;
  const location = [club.city, club.country].filter(Boolean).join(", ");
  const memberCount = club._count?.members || club.memberCount || 0;
  const description = club.description ||
    `Join ${club.name}${location ? ` in ${location}` : ""} with ${memberCount} members on Rydora.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://rydora.me/clubs/${clubId}`,
      siteName: "Rydora",
      images: club.profileImageUrl ? [{ url: club.profileImageUrl, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: club.profileImageUrl ? [club.profileImageUrl] : undefined,
    },
    alternates: {
      canonical: `https://rydora.me/clubs/${clubId}`,
    },
  };
}

export default async function ClubPage({ params }: Props) {
  const { clubId } = await params;
  const club = await getClubData(clubId);

  return <ClubClient clubId={clubId} initialData={club} />;
}
