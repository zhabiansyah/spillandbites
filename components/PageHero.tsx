"use client";

import { motion } from "motion/react";

export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-primary px-6 pb-20 pt-40 md:px-16 md:pb-28 md:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
          {eyebrow}
        </span>
        <h1 className="font-display text-5xl font-extrabold leading-[0.95] text-white sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-xl text-white/70">{description}</p>
        )}
      </motion.div>
    </section>
  );
}
