"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SiAppstore, SiGoogleplay } from "react-icons/si";

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

export default function Download() {
  return (
    <Section
      id="download"
      className="pb-24"
      style={{
        paddingLeft: "100px",
        paddingRight: "100px",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px",
            border: "1px solid rgba(30, 41, 59, 0.8)",
            background:
              "linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
            padding: "40px 32px",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Decorative background elements */}
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "-50px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "grid",
              gap: "40px",
              alignItems: "center",
            }}
            className="grid-cols-1 md:grid-cols-2 md:gap-16"
          >
            {/* Left Content */}
            <div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  color: "#fff",
                  marginBottom: "16px",
                  lineHeight: "1.2",
                }}
              >
                Join the community
              </h3>
              <p
                style={{
                  fontSize: "1.125rem",
                  color: "rgba(203, 213, 225, 0.9)",
                  lineHeight: "1.6",
                  marginBottom: "32px",
                }}
              >
                Download Rydora and connect with car lovers worldwide. Share
                your builds, join clubs, attend events, and trade parts all in
                one place.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                <motion.a
                  href="https://apps.apple.com/app/rydora"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    fontWeight: "600",
                    color: "#0f172a",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f1f5f9";
                    e.currentTarget.style.boxShadow =
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                  }}
                >
                  <SiAppstore style={{ width: "24px", height: "24px" }} />
                  <span>App Store</span>
                </motion.a>
                <motion.a
                  href="https://play.google.com/store/apps/details?id=com.rydora"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    fontWeight: "600",
                    color: "#0f172a",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f1f5f9";
                    e.currentTarget.style.boxShadow =
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
                  }}
                >
                  <SiGoogleplay style={{ width: "24px", height: "24px" }} />
                  <span>Google Play</span>
                </motion.a>
              </div>
            </div>

            {/* Right Image */}
            <div
              style={{
                position: "relative",
              }}
              className="hidden md:block"
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "10/9",
                  borderRadius: "20px",
                  border: "1px solid rgba(30, 41, 59, 0.8)",
                  backgroundColor: "rgba(15, 23, 42, 0.4)",
                  padding: "16px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/newDownload.png"
                  alt="Rydora features"
                  fill
                  style={{ objectFit: "contain", padding: "16px" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
