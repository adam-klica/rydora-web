"use client";

import Image from "next/image";
import { motion } from "framer-motion";

function Container({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}>{children}</div>
  );
}

function Section({ id, children, className = "", style }: { id?: string; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <section id={id} className={`py-[50px] md:py-[50px] ${className}`} style={style}>
      {children}
    </section>
  );
}

export default function Gallery() {
  return (
    <Section
      id="gallery"
      style={{
        paddingLeft: "100px",
        paddingRight: "100px",
        paddingTop: "100px",
        paddingBottom: "100px",
      }}
    >
      <Container>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "2.25rem", fontWeight: "700", marginBottom: "12px" }}>
            Community events
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(203, 213, 225, 0.9)" }}>
            Join meets, shows, and gatherings with fellow enthusiasts
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
          {/* Event 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(30, 41, 59, 0.8)",
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "300px", backgroundColor: "rgba(15, 23, 42, 0.8)" }}>
              <Image
                src="/images/event1.png"
                alt="Community event"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#fff", marginBottom: "12px", marginTop: 0 }}>
                Car Meets & Shows
              </h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(203, 213, 225, 0.9)", lineHeight: "1.6", margin: 0 }}>
                Connect with car enthusiasts at local meets and organized shows. Share your build, 
                discover new modifications, and build lasting friendships in the community.
              </p>
            </div>
          </motion.div>

          {/* Event 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(30, 41, 59, 0.8)",
              backgroundColor: "rgba(15, 23, 42, 0.6)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: "300px", backgroundColor: "rgba(15, 23, 42, 0.8)" }}>
              <Image
                src="/images/event2.png"
                alt="Community event"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div style={{ padding: "24px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#fff", marginBottom: "12px", marginTop: 0 }}>
                Track Days & Races
              </h3>
              <p style={{ fontSize: "0.875rem", color: "rgba(203, 213, 225, 0.9)", lineHeight: "1.6", margin: 0 }}>
                Experience the thrill of track days and racing events. Whether you're a driver or spectator, 
                join the action and feel the adrenaline of motorsport competition.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
