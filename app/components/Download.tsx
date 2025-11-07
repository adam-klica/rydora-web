"use client";

import { motion } from "framer-motion";
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { ArrowRight } from "lucide-react";

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
      className={className}
      style={{
        width: "100%",
        paddingLeft: "clamp(16px, 4vw, 80px)",
        paddingRight: "clamp(16px, 4vw, 80px)",
        ...style,
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

export default function Download() {
  return (
    <Section
      id="download"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background effects */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.1), transparent 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 80% 20%, rgba(6,182,212,0.1), transparent 50%)",
        }}
      />

      <Container style={{ position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: "56rem",
            margin: "0 auto",
            textAlign: "center",
            paddingTop: "clamp(16px, 3vw, 32px)",
            paddingBottom: "clamp(16px, 3vw, 32px)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              borderRadius: "9999px",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "8px",
              paddingBottom: "8px",
              marginBottom: "32px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#6ee7b7",
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#6ee7b7",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Available Now
            </span>
          </motion.div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontWeight: "700",
              marginBottom: "24px",
              color: "#fff",
            }}
          >
            Ready to Get Started?
          </h2>
          <p
            style={{
              fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
              color: "rgba(203, 213, 225, 0.9)",
              marginBottom: "48px",
              maxWidth: "42rem",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.6",
            }}
          >
            Download Rydora today and join thousands of car enthusiasts worldwide.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            <motion.a
              href="https://apps.apple.com/app/rydora"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                borderRadius: "16px",
                backgroundColor: "#fff",
                fontWeight: "600",
                color: "#0f172a",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: "all 0.3s ease",
                paddingLeft: "28px",
                paddingRight: "28px",
                paddingTop: "16px",
                paddingBottom: "16px",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
                e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(16, 185, 129, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
              }}
            >
              <SiAppstore style={{ width: "32px", height: "32px" }} />
              <span style={{ fontSize: "1.125rem" }}>App Store</span>
              <ArrowRight style={{ width: "20px", height: "20px" }} />
            </motion.a>

            <motion.a
              href="https://play.google.com/store/apps/details?id=com.rydora"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                borderRadius: "16px",
                backgroundColor: "#fff",
                fontWeight: "600",
                color: "#0f172a",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                transition: "all 0.3s ease",
                paddingLeft: "28px",
                paddingRight: "28px",
                paddingTop: "16px",
                paddingBottom: "16px",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f1f5f9";
                e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(16, 185, 129, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
              }}
            >
              <SiGoogleplay style={{ width: "32px", height: "32px" }} />
              <span style={{ fontSize: "1.125rem" }}>Google Play</span>
              <ArrowRight style={{ width: "20px", height: "20px" }} />
            </motion.a>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
