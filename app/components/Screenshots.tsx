"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        paddingLeft: "clamp(16px, 4vw, 80px)",
        paddingRight: "clamp(16px, 4vw, 80px)",
      }}
    >
      {children}
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
  style,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: "clamp(64px, 8vw, 128px)",
        paddingBottom: "clamp(64px, 8vw, 128px)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

const screenshots = [
  { src: "/ssIos/ios/Apple iPhone 14 Plus Screenshot 1.png", title: "Home Feed" },
  { src: "/ssIos/ios/Apple iPhone 14 Plus Screenshot 2.png", title: "Garages" },
  { src: "/ssIos/ios/Apple iPhone 14 Plus Screenshot 3.png", title: "Clubs" },
  { src: "/ssIos/ios/Apple iPhone 14 Plus Screenshot 4.png", title: "Events" },
  { src: "/ssIos/ios/Apple iPhone 14 Plus Screenshot 5.png", title: "Marketplace" },
  { src: "/ssIos/ios/Apple iPhone 14 Plus Screenshot 6.png", title: "Messages" },
  { src: "/ssIos/ios/Apple iPhone 14 Plus Screenshot 7.png", title: "Profile" },
];

export default function Screenshots() {
  return (
    <Section id="screenshots" className="bg-slate-900/40 border-y border-slate-800/60">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(32px, 6vw, 64px)",
            paddingTop: "clamp(16px, 3vw, 32px)",
            paddingBottom: "clamp(16px, 3vw, 32px)",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: "700",
              marginBottom: "clamp(12px, 2vw, 16px)",
              color: "#fff",
            }}
          >
            See Rydora in Action
          </h2>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.125rem)",
              color: "rgba(203, 213, 225, 0.9)",
              maxWidth: "42rem",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Explore the app through these screenshots and discover all the features that make Rydora the perfect platform for car enthusiasts.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(16px, 3vw, 32px)",
            paddingTop: "clamp(16px, 3vw, 32px)",
            paddingBottom: "clamp(16px, 3vw, 32px)",
          }}
        >
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "9/19.5",
                  borderRadius: "24px",
                  overflow: "hidden",
                  backgroundColor: "#1e293b",
                  border: "2px solid rgba(51, 65, 85, 0.5)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.5)";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(16, 185, 129, 0.2)";
                  const overlay = e.currentTarget.querySelector(".screenshot-overlay") as HTMLElement;
                  if (overlay) overlay.style.transform = "translateY(0)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
                  const overlay = e.currentTarget.querySelector(".screenshot-overlay") as HTMLElement;
                  if (overlay) overlay.style.transform = "translateY(100%)";
                }}
              >
                <Image
                  src={screenshot.src}
                  alt={screenshot.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "16px",
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
                    transform: "translateY(100%)",
                    transition: "transform 0.3s ease",
                  }}
                  className="screenshot-overlay"
                >
                  <p style={{ color: "#fff", fontWeight: "600", fontSize: "0.875rem", margin: 0 }}>
                    {screenshot.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
