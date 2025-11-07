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

export default function Hero() {
  return (
    <Section
      id="top"
      className=""
      style={{
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(64px, 8vw, 128px)",
      }}
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            alignItems: "center",
            gap: "clamp(32px, 6vw, 64px)",
          }}
          className="hero-grid"
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(24px, 4vw, 32px)",
              paddingTop: "clamp(16px, 3vw, 32px)",
              paddingBottom: "clamp(16px, 3vw, 32px)",
            }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                backdropFilter: "blur(8px)",
                width: "fit-content",
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
                Built for Car Enthusiasts
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 5rem)",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Throttle Your{" "}
                <span
                  style={{
                    background: "linear-gradient(to right, #6ee7b7, #67e8f9, #93c5fd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Social Life
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  color: "rgba(203, 213, 225, 0.9)",
                  lineHeight: "1.75",
                  maxWidth: "42rem",
                  margin: 0,
                }}
              >
                The ultimate social platform for car enthusiasts. Showcase your garage, join clubs, create events, buy & sell parts, and connect with car lovers worldwide.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "16px",
                paddingTop: "16px",
              }}
            >
              <motion.a
                href="https://apps.apple.com/app/rydora"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl bg-white font-semibold text-slate-900 shadow-xl transition-all duration-300 hover:bg-slate-100 hover:shadow-2xl hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "14px",
                  paddingBottom: "14px",
                }}
              >
                <SiAppstore className="h-7 w-7 transition-transform group-hover:scale-110" />
                <span className="text-lg">App Store</span>
                <motion.svg
                  className="h-5 w-5 ml-1"
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
              </motion.a>

              <motion.a
                href="https://play.google.com/store/apps/details?id=com.rydora"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-xl bg-white font-semibold text-slate-900 shadow-xl transition-all duration-300 hover:bg-slate-100 hover:shadow-2xl hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  paddingTop: "14px",
                  paddingBottom: "14px",
                }}
              >
                <SiGoogleplay className="h-7 w-7 transition-transform group-hover:scale-110" />
                <span className="text-lg">Google Play</span>
                <motion.svg
                  className="h-5 w-5 ml-1"
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
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Phone Mockup with Screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Phone Frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative mx-auto"
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  aspectRatio: "9/19.5",
                }}
              >
                {/* Phone Bezel */}
                <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-2xl border-4 border-slate-700">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-10" />
                  
                  {/* Screen */}
                  <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-900">
                    <Image
                      src="/ssIos/ios/Apple iPhone 14 Plus Screenshot 1.png"
                      alt="Rydora App Preview"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Floating Screenshots */}
                <motion.div
                  className="absolute -right-8 top-1/4 hidden lg:block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="relative w-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700">
                    <Image
                      src="/ssIos/ios/Apple iPhone 14 Plus Screenshot 2.png"
                      alt="Rydora Feature"
                      width={192}
                      height={416}
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -left-8 bottom-1/4 hidden lg:block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="relative w-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700">
                    <Image
                      src="/ssIos/ios/Apple iPhone 14 Plus Screenshot 3.png"
                      alt="Rydora Feature"
                      width={192}
                      height={416}
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Animated glow effects */}
              <motion.div
                className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
