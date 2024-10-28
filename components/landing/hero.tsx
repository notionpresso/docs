"use client";

import { CoffeeCanvas } from "./coffee-model";
import { motion } from "framer-motion";

export function LandingHero() {
  return (
    <section className="relative min-h-screen bg-primary-500 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
          <motion.h1
            className="text-display text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Just a cup of coffee
            <br />
            with NotionPresso
          </motion.h1>

          {/* <div className="w-full max-w-xl mx-auto">
            <CoffeeCanvas />
          </div> */}
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white"
        >
          <path d="M7 13L12 18L17 13" />
          <path d="M7 6L12 11L17 6" />
        </svg>
      </motion.div>
    </section>
  );
}
