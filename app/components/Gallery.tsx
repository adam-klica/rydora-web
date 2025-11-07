"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

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
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: "clamp(64px, 8vw, 128px)",
        paddingBottom: "clamp(64px, 8vw, 128px)",
      }}
    >
      {children}
    </section>
  );
}

const events = [
  {
    image: "/images/event1.png",
    title: "Car Meets & Shows",
    description: "Connect with car enthusiasts at local meets and organized shows. Share your build, discover new modifications, and build lasting friendships in the community.",
    icon: Calendar,
  },
  {
    image: "/images/event2.png",
    title: "Track Days & Races",
    description: "Experience the thrill of track days and racing events. Whether you're a driver or spectator, join the action and feel the adrenaline of motorsport competition.",
    icon: MapPin,
  },
];

export default function Gallery() {
  return (
    <Section id="gallery" className="bg-slate-900/30">
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
            Community Events
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
            Join meets, shows, and gatherings with fellow enthusiasts from around the world.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(24px, 4vw, 48px)",
            paddingTop: "clamp(16px, 3vw, 32px)",
            paddingBottom: "clamp(16px, 3vw, 32px)",
          }}
        >
          {events.map((event, index) => (
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
                  height: "100%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid rgba(51, 65, 85, 0.5)",
                  backgroundColor: "rgba(30, 41, 59, 0.3)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.5)";
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(16, 185, 129, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(51, 65, 85, 0.5)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    style={{
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                    }}
                    className="event-image"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      left: "24px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        backgroundColor: "rgba(16, 185, 129, 0.2)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(16, 185, 129, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <event.icon style={{ width: "24px", height: "24px", color: "#6ee7b7" }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: "clamp(24px, 4vw, 32px)" }}>
                  <h3
                    style={{
                      fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                      fontWeight: "700",
                      color: "#fff",
                      marginBottom: "16px",
                      marginTop: 0,
                    }}
                  >
                    {event.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                      color: "rgba(203, 213, 225, 0.9)",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {event.description}
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
