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
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}
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
      className={`py-[50px] md:py-[50px] ${className}`}
      style={style}
    >
      {children}
    </section>
  );
}

const FEATURES = [
  {
    icon: Car,
    title: "Garages",
    desc: "Showcase builds with photos, videos, and full mod lists.",
  },
  {
    icon: Users2,
    title: "Clubs",
    desc: "Join by brand, model, style, or region—find your crew.",
  },
  {
    icon: Calendar,
    title: "Events",
    desc: "Plan meets and discover shows with RSVPs and reminders.",
  },
  {
    icon: ShoppingCart,
    title: "Marketplace",
    desc: "Buy & sell parts, accessories, and cars—made for enthusiasts.",
  },
  {
    icon: MessageCircle,
    title: "Messages",
    desc: "Private DMs with media so deals and plans move fast.",
  },
  {
    icon: Smartphone,
    title: "Social Feed",
    desc: "A clean feed from garages, clubs, and events you follow.",
  },
];

export default function Features() {
  return (
    <Section
      id="features"
      className="border-y border-slate-800/60 bg-slate-900/30"
      style={{
        paddingLeft: "100px",
        paddingRight: "100px",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <Container>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: "700",
              marginBottom: "12px",
            }}
          >
            Everything you need
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(203, 213, 225, 0.9)" }}>
            Consistent spacing, balanced cards, and clear hierarchy.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              style={{
                borderRadius: "16px",
                border: "1px solid rgba(30, 41, 59, 0.8)",
                backgroundColor: "rgba(15, 23, 42, 0.6)",
                padding: "24px",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              }}
              className="hover:border-slate-700 hover:shadow transition-all"
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    color: "#6ee7b7",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <Icon style={{ width: "24px", height: "24px" }} />
                </div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(203, 213, 225, 0.9)",
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
