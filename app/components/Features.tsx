"use client";

import { motion } from "framer-motion";
import {
  Car,
  Users2,
  Calendar,
  ShoppingCart,
  MessageCircle,
  Smartphone,
} from "lucide-react";

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

const FEATURES = [
  {
    icon: Car,
    title: "Garages",
    desc: "Showcase your builds with photos, videos, and detailed modification lists. Create multiple garages for different projects.",
    color: "emerald",
  },
  {
    icon: Users2,
    title: "Clubs",
    desc: "Join clubs by brand, model, style, or region. Connect with like-minded enthusiasts and share your passion.",
    color: "cyan",
  },
  {
    icon: Calendar,
    title: "Events",
    desc: "Plan meets and discover shows with RSVPs, reminders, and location sharing. Never miss a car event again.",
    color: "blue",
  },
  {
    icon: ShoppingCart,
    title: "Marketplace",
    desc: "Buy & sell parts, accessories, and vehicles. A marketplace built specifically for car enthusiasts.",
    color: "purple",
  },
  {
    icon: MessageCircle,
    title: "Messages",
    desc: "Private DMs with media support. Close deals and make plans quickly with rich messaging features.",
    color: "pink",
  },
  {
    icon: Smartphone,
    title: "Social Feed",
    desc: "A clean, curated feed from garages, clubs, and events you follow. Stay connected to your community.",
    color: "orange",
  },
];

const colorMap: Record<string, { rgb: string; hex: string }> = {
  emerald: { rgb: "16, 185, 129", hex: "#6ee7b7" },
  cyan: { rgb: "6, 182, 212", hex: "#67e8f9" },
  blue: { rgb: "59, 130, 246", hex: "#93c5fd" },
  purple: { rgb: "168, 85, 247", hex: "#c4b5fd" },
  pink: { rgb: "236, 72, 153", hex: "#f9a8d4" },
  orange: { rgb: "249, 115, 22", hex: "#fb923c" },
};

export default function Features() {
  return (
    <Section id="features" className="bg-slate-900/20">
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
            Everything You Need
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
            All the features you need to connect, share, and grow in the car community.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "clamp(16px, 3vw, 32px)",
            paddingTop: "clamp(16px, 3vw, 32px)",
            paddingBottom: "clamp(16px, 3vw, 32px)",
          }}
        >
          {FEATURES.map(({ icon: Icon, title, desc, color }, index) => {
            const colorInfo = colorMap[color];
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    borderRadius: "16px",
                    border: `1px solid rgba(${colorInfo.rgb}, 0.3)`,
                    background: `linear-gradient(135deg, rgba(${colorInfo.rgb}, 0.05), rgba(${colorInfo.rgb}, 0.02))`,
                    backdropFilter: "blur(8px)",
                    padding: "clamp(20px, 3vw, 24px)",
                    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${colorInfo.rgb}, 0.6)`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = `0 20px 25px -5px rgba(${colorInfo.rgb}, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `rgba(${colorInfo.rgb}, 0.3)`;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: "56px",
                        height: "56px",
                        borderRadius: "12px",
                        background: `linear-gradient(135deg, rgba(${colorInfo.rgb}, 0.2), rgba(${colorInfo.rgb}, 0.1))`,
                        border: `1px solid rgba(${colorInfo.rgb}, 0.3)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "transform 0.3s ease",
                      }}
                      className="feature-icon"
                    >
                      <Icon
                        style={{
                          width: "28px",
                          height: "28px",
                          color: colorInfo.hex,
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                          fontWeight: "700",
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {title}
                      </h3>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)",
                      color: "rgba(203, 213, 225, 0.9)",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
