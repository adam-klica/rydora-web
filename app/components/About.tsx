"use client";

import { motion } from "framer-motion";

function Container({
  className = "",
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}
      style={style}
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
    <section id={id} className={`py-[50px] md:py-[50px] ${className}`}>
      {children}
    </section>
  );
}

export default function About() {
  return (
    <Section id="about" className="bg-slate-900/30">
      <Container
        style={{
          paddingLeft: "100px",
          paddingRight: "100px",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: "700",
                marginBottom: "16px",
                color: "#fff",
              }}
            >
              What is Rydora?
            </h2>
            <div
              style={{
                width: "60px",
                height: "3px",
                backgroundColor: "#6ee7b7",
                margin: "0 auto",
                borderRadius: "2px",
              }}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75",
                color: "rgba(203, 213, 225, 0.9)",
                margin: 0,
              }}
            >
              Rydora is the all-in-one platform for car enthusiasts. Create
              stunning garages to showcase your builds, join clubs based on
              brand, model, or region, and discover events happening in your
              area.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75",
                color: "rgba(203, 213, 225, 0.9)",
                margin: 0,
              }}
            >
              Our marketplace connects buyers and sellers of parts, accessories,
              and vehicles. With private messaging and a clean social feed,
              Rydora keeps you connected to the car community.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75",
                color: "rgba(203, 213, 225, 0.9)",
                margin: 0,
              }}
            >
              Whether you're planning a meet, selling parts, or just sharing
              your latest mods, Rydora brings everything together in one place
              with a consistent, clean design that puts your content first.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{
                marginTop: "32px",
                paddingTop: "24px",
                paddingBottom: "24px",
                paddingLeft: "20px",
                paddingRight: "20px",
                borderRadius: "12px",
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                border: "1px solid rgba(30, 41, 59, 0.8)",
              }}
            >
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  color: "rgba(203, 213, 225, 0.9)",
                  margin: 0,
                }}
              >
                For any consideration or support, please reach us at{" "}
                <a
                  href="mailto:support@rydora.me"
                  style={{
                    color: "#6ee7b7",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  support@rydora.me
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
