"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * Splits `text` into characters and reveals them (opacity + blur)
 * scrubbed directly to scroll progress through the element.
 */
export default function TextReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="mr-[0.3em] flex">
          {word.split("").map((char, ci) => {
            const totalChars = text.replace(/ /g, "").length;
            const globalIndex =
              words.slice(0, wi).join("").length + ci;
            const start = globalIndex / totalChars;
            const end = start + 1 / totalChars;
            return (
              <Char
                key={ci}
                char={char}
                start={start}
                end={Math.min(end + 0.15, 1)}
                progress={scrollYProgress}
              />
            );
          })}
        </span>
      ))}
    </p>
  );
}

function Char({
  char,
  start,
  end,
  progress,
}: {
  char: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  );
}
