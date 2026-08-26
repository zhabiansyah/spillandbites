"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function MagneticButton({
  children,
  onClick,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 14, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 14, mass: 0.3 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      data-cursor="pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.94 }}
      className={`pointer-events-auto group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-crispy-yellow px-9 py-4 text-sm font-bold uppercase tracking-widest text-spill-blue-deep shadow-[0_0_40px_rgba(245,166,35,0.35)] transition-shadow hover:shadow-[0_0_60px_rgba(245,166,35,0.55)] ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
      <span className="absolute inset-0 -translate-x-full bg-sauce-red transition-transform duration-500 group-hover:translate-x-0" />
    </motion.button>
  );
}
