"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export function LandingHero() {
  const router = useRouter();

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-primary-500 dark:bg-black",
        "flex items-center",
        "h-[calc(100dvh-72px)] sm:h-[calc(100dvh-80px)]",
      )}
    >
      <div className={cn("container mx-auto px-4")}>
        <div
          className={cn(
            "flex flex-col items-center justify-center",
            "text-white dark:text-primary-400",
          )}
        >
          <motion.div
            className={cn("flex flex-col items-center")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={cn("text-h2 sm:text-display text-center mb-8")}>
              Just a cup of coffee
              <br />
              with NotionPresso
            </h1>

            <div className={cn("flex flex-col sm:flex-row gap-4 mt-8")}>
              <motion.button
                className={cn(
                  "px-8 py-4 rounded-lg font-bold min-w-[200px]",
                  "flex items-center justify-center gap-2",
                  "bg-white text-primary-500",
                  "hover:bg-primary-50 transition-colors",
                )}
                onClick={() => router.push("/tutorial")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
                <ArrowRightIcon className={cn("w-4 h-4")} />
              </motion.button>

              <motion.button
                className={cn(
                  "px-8 py-4 rounded-lg font-bold min-w-[200px]",
                  "flex items-center justify-center gap-2",
                  "bg-transparent border-2 border-white",
                  "hover:bg-white/10 transition-colors",
                )}
                onClick={() => router.push("/docs")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Read the Docs
                <ArrowRightIcon className={cn("w-4 h-4")} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
