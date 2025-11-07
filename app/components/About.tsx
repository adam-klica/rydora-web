"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

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

export default function About() {
  return (
    <Section id="about" className="bg-gradient-to-b from-slate-900/40 to-slate-900/60 border-y border-slate-800/60">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "56rem",
            margin: "0 auto",
            paddingTop: "clamp(16px, 3vw, 32px)",
            paddingBottom: "clamp(16px, 3vw, 32px)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(24px, 4vw, 48px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: "700",
                  marginBottom: "clamp(16px, 2vw, 24px)",
                  color: "#fff",
                }}
              >
                What is Rydora?
              </h2>
            </motion.div>
            <div
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(to right, #6ee7b7, #67e8f9)",
                margin: "0 auto",
                borderRadius: "2px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2vw, 24px)",
              marginBottom: "clamp(24px, 4vw, 48px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  lineHeight: "1.75",
                  color: "rgba(203, 213, 225, 0.9)",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Rydora is the all-in-one platform for car enthusiasts. Create
                stunning garages to showcase your builds, join clubs based on
                brand, model, or region, and discover events happening in your
                area.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  lineHeight: "1.75",
                  color: "rgba(203, 213, 225, 0.9)",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Our marketplace connects buyers and sellers of parts, accessories,
                and vehicles. With private messaging and a clean social feed,
                Rydora keeps you connected to the car community.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                  lineHeight: "1.75",
                  color: "rgba(203, 213, 225, 0.9)",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                Whether you're planning a meet, selling parts, or just sharing
                your latest mods, Rydora brings everything together in one place
                with a consistent, clean design that puts your content first.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              position: "relative",
              borderRadius: "16px",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))",
              backdropFilter: "blur(8px)",
              padding: "clamp(24px, 4vw, 32px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Mail style={{ width: "24px", height: "24px", color: "#6ee7b7" }} />
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <h3
                  style={{
                    fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                    fontWeight: "600",
                    color: "#fff",
                    marginBottom: "8px",
                    marginTop: 0,
                  }}
                >
                  Need Help?
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                    color: "rgba(203, 213, 225, 0.9)",
                    lineHeight: "1.6",
                    marginBottom: "16px",
                    marginTop: 0,
                  }}
                >
                  For any questions, feedback, or support, please reach out to us at:
                </p>
                <a
                  href="mailto:support@rydora.me"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#6ee7b7",
                    fontWeight: "600",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#a7f3d0";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#6ee7b7";
                  }}
                >
                  <span>support@rydora.me</span>
                  <motion.svg
                    style={{ width: "20px", height: "20px" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
