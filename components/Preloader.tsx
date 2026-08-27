"use client";

import { motion, AnimatePresence } from "motion/react";

export default function Preloader({ progress }: { progress: number }) {
  return (
    <AnimatePresence>
      <motion.div
        exit={{ y: "-100%" }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[90] flex flex-col items-center justify-center primary bg-primary  "
      >
        <div className="overflow-hidden">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="block font-display text-sm font-semibold uppercase tracking-[0.4em] text-crispy-yellow"
          >
            Spill &amp; Bites
          </motion.span>
        </div>

        <div className="mt-8 flex items-baseline gap-2 font-display text-6xl font-black text-cream md:text-8xl">
          <motion.span
            key={progress}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
          >
            {progress}
          </motion.span>
          <span className="text-2xl text-cream/40 md:text-3xl">%</span>
        </div>

        <div className="mt-6 h-[2px] w-52 overflow-hidden rounded-full bg-cream/10">
          <motion.div
            className="h-full bg-crispy-yellow"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.2 }}
          />
        </div>

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cream/40">
          WELCOME TO SPILL
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
