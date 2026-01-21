import { Metadata } from "next";
import CarClient from "./CarClient";

interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  engine: string | null;
  description: string;
  modifications: Array<{
    type: string;
    text: string;
    icon?: string;
  }>;
  media: Array<{
    url: string;
    type: string;
  }>;
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

async function getCarData(carId: string): Promise<CarData | null> {
  try {
    const res = await fetch(
      `https://dev.rydora.me/api/user-garages/car/${carId}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.car;
  } catch {
    return null;
  }
}

async function getGarageRating(garageId: string): Promise<GarageRating | null> {
  try {
    const res = await fetch(
      `https://dev.rydora.me/api/user-garages/${garageId}/cars?isPublic=true`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      rating: data.rating ?? null,
      ratingCount: data.ratingCount ?? 0,
    };
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ garageId: string; carId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { garageId, carId } = await params;
  const car = await getCarData(carId);

  if (!car) {
    return {
      title: "Car Not Found",
      description: "This car doesn't exist or has been removed.",
    };
  }

  const title = `${car.make} ${car.model} (${car.year}) - Rydora`;
  const description = car.description || `View ${car.make} ${car.model} on Rydora.`;
  const image = sanitizeImageUrl(car.media?.find((m) => m.type === "image")?.url);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://rydora.me/garages/${garageId}/cars/${carId}`,
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
      canonical: `https://rydora.me/garages/${garageId}/cars/${carId}`,
    },
  };
}

export default async function CarDetailsPage({ params }: Props) {
  const { garageId, carId } = await params;
  const [car, rating] = await Promise.all([
    getCarData(carId),
    getGarageRating(garageId),
  ]);

  return (
    <CarClient
      garageId={garageId}
      carId={carId}
      initialCar={car}
      initialRating={rating}
    />
  );
}
