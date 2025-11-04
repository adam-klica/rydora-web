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

export default function Hero() {
  return (
    <Section id="top" className="pt-32 md:pt-40 lg:pt-48 ">
      <Container>
        <div
          style={{
            paddingTop: "150px",
            paddingLeft: "100px",
            paddingRight: "100px",
          }}
          className="grid items-center gap-12 lg:gap-20 lg:grid-cols-2"
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pl-4 sm:pl-6 md:pl-8 lg:pl-12"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 mb-6"
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold text-emerald-300">
                Built for enthusiasts
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
            >
              Your garage. Your crew. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                One powerful app.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              style={{ marginBottom: "10px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-slate-300/90 leading-relaxed mb-10 max-w-2xl"
            >
              Create a stunning garage, join clubs, plan events, and trade
              parts—all with a clean, consistent UI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="https://apps.apple.com/app/rydora"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 rounded-xl bg-white font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:bg-slate-100 hover:shadow-xl hover:scale-105 hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <SiAppstore className="h-6 w-6 transition-transform group-hover:scale-110" />
                <span>App Store</span>
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
                className="group inline-flex items-center gap-4 rounded-xl bg-white font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:bg-slate-100 hover:shadow-xl hover:scale-105 hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <SiGoogleplay className="h-6 w-6 transition-transform group-hover:scale-110" />
                <span>Google Play</span>
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

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-10/9 w-full rounded-3xl border border-slate-800 bg-slate-900/40 p-4 shadow-2xl"
            >
              <Image
                src="/images/hero.png"
                alt="Rydora preview"
                fill
                className="object-contain"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />

              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-transparent to-indigo-500/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-500/20 rounded-full blur-3xl"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
