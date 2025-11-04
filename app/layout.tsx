import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Rydora - Throttle Your Social Life",
  description: "The ultimate social platform for car enthusiasts. Showcase garages, join clubs, create events, buy/sell, and connect with car lovers worldwide.",
  keywords: "cars, automotive, car community, garage, car clubs, car events, car marketplace, car enthusiasts",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Rydora - Throttle Your Social Life",
    description: "The ultimate social platform for car enthusiasts",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function removeNextLogo() {
                  const logo = document.getElementById('next-logo');
                  if (logo) logo.remove();
                  const logos = document.querySelectorAll('#next-logo, [id="next-logo"]');
                  logos.forEach(el => el.remove());
                }
                removeNextLogo();
                setTimeout(removeNextLogo, 0);
                setTimeout(removeNextLogo, 100);
                setTimeout(removeNextLogo, 500);
                setTimeout(removeNextLogo, 1000);
                const observer = new MutationObserver(removeNextLogo);
                if (document.body) {
                  observer.observe(document.body, { childList: true, subtree: true });
                }
                document.addEventListener('DOMContentLoaded', removeNextLogo);
                window.addEventListener('load', removeNextLogo);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
