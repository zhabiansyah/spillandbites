"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import RatingStars from "@/components/RatingStars";

const STATS = [
  {
    label: "Rating Rata-rata",
    value: 4.9,
    suffix: "/5",
    decimals: 1,
    showStars: true,
  },
  { label: "Porsi Terjual", value: 50000, suffix: "+", decimals: 0 },
  { label: "Cabang", value: 6, suffix: "", decimals: 0 },
];

function CountUp({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {Number(display).toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="relative bg-primary px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-display text-5xl font-extrabold text-secondary sm:text-6xl">
              <CountUp value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </p>
            {s.showStars && (
              <div className="mt-3 flex justify-center">
                <RatingStars rating={s.value} size={18} />
              </div>
            )}
            <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/70 sm:text-sm">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
