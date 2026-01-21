import { Metadata } from "next";
import GarageClient from "./GarageClient";

interface GarageData {
  id: string;
  name: string;
  user: {
    username: string;
    profileImage: string | null;
  };
  cars: Array<{
    id: string;
    make: string;
    model: string;
    year: number;
    images: string[];
  }>;
  createdAt: string;
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

async function getGarageData(garageId: string): Promise<GarageData | null> {
  try {
    const res = await fetch(
      `https://dev.rydora.me/api/user-garages/${garageId}/cars?isPublic=true`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      id: garageId,
      name: data.name || "Garage",
      user: data.user || { username: "Unknown", profileImage: null },
      cars: data.cars || [],
      createdAt: data.createdAt || new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ garageId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { garageId } = await params;
  const garage = await getGarageData(garageId);

  if (!garage) {
    return {
      title: "Garage Not Found",
      description: "This garage doesn't exist or has been removed.",
    };
  }

  const title = `${garage.name} - Rydora Garage`;
  const description = `Check out ${garage.user.username}'s garage with ${garage.cars.length} ${garage.cars.length === 1 ? "car" : "cars"} on Rydora.`;
  const image = sanitizeImageUrl(garage.cars[0]?.images?.[0]);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://rydora.me/garages/${garageId}`,
      siteName: "Rydora",
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
    alternates: {
      canonical: `https://rydora.me/garages/${garageId}`,
    },
  };
}

export default async function GaragePage({ params }: Props) {
  const { garageId } = await params;
  const garage = await getGarageData(garageId);

  return <GarageClient garageId={garageId} initialData={garage} />;
}
