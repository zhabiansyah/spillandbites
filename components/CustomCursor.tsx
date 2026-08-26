"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const touchDevice = useRef(false);

  useEffect(() => {
    touchDevice.current = window.matchMedia("(pointer: coarse)").matches;
    if (touchDevice.current) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement;
      setIsPointer(!!target.closest("a, button, [data-cursor='pointer']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [visible, x, y]);

  if (touchDevice.current) return null;
  if (pathname?.startsWith("/admin")) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{ scale: isPointer ? 2.4 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-5 w-5 rounded-full bg-crispy-yellow"
      />
    </motion.div>
  );
}
