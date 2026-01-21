import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#254D70",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rydora.me"),
  title: {
    default: "Rydora - Throttle Your Social Life",
    template: "%s | Rydora",
  },
  description: "The ultimate social platform for car enthusiasts. Showcase garages, join clubs, create events, buy/sell, and connect with car lovers worldwide.",
  keywords: ["cars", "automotive", "car community", "garage", "car clubs", "car events", "car marketplace", "car enthusiasts", "car social network", "car meets"],
  authors: [{ name: "Rydora" }],
  creator: "Rydora",
  publisher: "Rydora",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rydora.me",
    siteName: "Rydora",
    title: "Rydora - Throttle Your Social Life",
    description: "The ultimate social platform for car enthusiasts. Showcase garages, join clubs, create events, and connect with car lovers worldwide.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rydora - The Car Enthusiast Social Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rydora - Throttle Your Social Life",
    description: "The ultimate social platform for car enthusiasts. Showcase garages, join clubs, create events, and connect with car lovers worldwide.",
    images: ["/images/og-image.png"],
    creator: "@rydora_app",
  },
  alternates: {
    canonical: "https://rydora.me",
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rydora.me/#organization",
      name: "Rydora",
      url: "https://rydora.me",
      logo: {
        "@type": "ImageObject",
        url: "https://rydora.me/images/logo.png",
      },
      sameAs: [
        "https://apps.apple.com/us/app/rydora/id6748365405",
        "https://play.google.com/store/apps/details?id=com.rydora.app",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@rydora.me",
        contactType: "customer support",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://rydora.me/#website",
      url: "https://rydora.me",
      name: "Rydora",
      description: "The ultimate social platform for car enthusiasts",
      publisher: { "@id": "https://rydora.me/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://rydora.me/#app",
      name: "Rydora",
      operatingSystem: "iOS, Android",
      applicationCategory: "SocialNetworkingApplication",
      description: "The ultimate social platform for car enthusiasts. Showcase garages, join clubs, create events, buy/sell, and connect with car lovers worldwide.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "100",
        bestRating: "5",
        worstRating: "1",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
