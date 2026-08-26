"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import MagneticButton from "@/components/MagneticButton";
import Preloader from "@/components/Preloader";
import RunningText from "@/components/RunningText";

// ---- Sequence config -------------------------------------------------
// Frames live at /public/sequence/chicken-frame-001.jpg ... -NNN.jpg
// We currently ship 50 hero frames. Drop in up to 240 frames (same
// naming convention, zero-padded to 3 digits) for a longer, smoother
// cinematic drench — just bump TOTAL_FRAMES below.
const TOTAL_FRAMES = 50;
const FRAME_PATH = (i: number) =>
  `/sequence/chicken-frame-${String(i).padStart(3, "0")}.jpg`;

type Story = {
  key: string;
  range: [number, number]; // scroll progress window this text is visible in
  align: "center" | "left" | "right";
  render: () => React.ReactNode;
};

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // ---- Preload every frame -------------------------------------------
  useEffect(() => {
    let cancelled = false;
    const loaded: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let count = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (cancelled) return;
        count += 1;
        setImagesLoaded(count);
        if (count === TOTAL_FRAMES) {
          setTimeout(() => setReady(true), 250); // tiny hold so preloader can finish its exit
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        count += 1;
        setImagesLoaded(count);
        if (count === TOTAL_FRAMES) setReady(true);
      };
      loaded[i - 1] = img;
    }
    imagesRef.current = loaded;

    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Draw helper: cover-fit the frame onto the canvas --------------
  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);

    // cover-fit math
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let drawW: number, drawH: number, dx: number, dy: number;

    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
      dx = 0;
      dy = (ch - drawH) / 2;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
      dy = 0;
      dx = (cw - drawW) / 2;
    }
    ctx.drawImage(img, dx, dy, drawW, drawH);
  }, []);

  // ---- Draw current frame on scroll ticks -----------------------------
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(latest)));
    if (idx !== currentFrameRef.current || true) {
      currentFrameRef.current = idx;
      requestAnimationFrame(() => draw(idx));
    }
  });

  // Redraw on resize so the cover-fit recalculates
  useEffect(() => {
    const onResize = () => draw(currentFrameRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [draw]);

  // Draw first frame once ready
  useEffect(() => {
    if (ready) draw(0);
  }, [ready, draw]);

  const stories: Story[] = [
    {
      key: "title",
      range: [0, 0.16],
      align: "center",
      render: () => (
        <>
          <h1 className="font-display text-[13vw] leading-[0.9] font-black tracking-tight text-cream sm:text-[9vw] md:text-[7.5vw]">
            Spill Keju<span className="text-crispy-yellow">nya!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-balance text-base text-cream/70 sm:text-lg">
            Obsesi neo-fast-food. Gulir untuk lihat lelehan mozzarella-nya.
          </p>
        </>
      ),
    },
    {
      key: "giant",
      range: [0.22, 0.42],
      align: "left",
      render: () => (
        <>
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-crispy-yellow">
            Si Gigitan
          </span>
          <h2 className="font-display text-[10vw] font-black leading-[0.92] text-cream sm:text-[6vw] md:text-[5vw]">
            Ayam Goreng
            <br />
            Mozzarella
            <br />
            Raksasa
          </h2>
        </>
      ),
    },
    {
      key: "sauces",
      range: [0.52, 0.72],
      align: "right",
      render: () => (
        <>
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-crispy-yellow">
            Tetesan Andalan
          </span>
          <h2 className="font-display text-[9vw] font-black leading-[0.92] text-cream sm:text-[5.5vw] md:text-[4.5vw]">
            Saus Spesial
            <br />
            yang Epic
          </h2>
          <p className="mt-4 text-lg font-semibold text-cream/80">
            Mulai dari{" "}
            <span className="text-crispy-yellow">Rp 16.000</span>
          </p>
        </>
      ),
    },
    {
      key: "cta",
      range: [0.84, 1],
      align: "center",
      render: () => (
        <>
          <h2 className="font-display text-[9vw] font-black leading-[0.95] text-cream sm:text-[5vw] md:text-[4vw]">
            Klaim promo <span className="text-crispy-yellow">diskon 25%</span>
            <br />
            khusus Pelajar
          </h2>
          <div className="mt-8 flex flex-col items-center">
            <MagneticButton>Pesan Sekarang</MagneticButton>
            <RunningText />
          </div>
        </>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-spill-blue">
      {!ready && (
        <Preloader progress={Math.round((imagesLoaded / TOTAL_FRAMES) * 100)} />
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-spill-blue">
        {/* ambient glow so the canvas edge blends with page bg */}
        <div className="pointer-events-none absolute inset-0 bg-radial-glow" />

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{
            opacity: ready ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* Story overlays */}
        {stories.map((s) => (
          <StoryText key={s.key} story={s} progress={scrollYProgress} />
        ))}

        {/* scroll hint */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]),
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-cream/50"
        >
          Gulir
          <span className="h-8 w-px animate-pulse bg-cream/50" />
        </motion.div>
      </div>
    </div>
  );
}

function StoryText({
  story,
  progress,
}: {
  story: Story;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [start, end] = story.range;
  const fadeOut = end - (end - start) * 0.18;

  // The very first story (range starting at 0) has no scroll room to fade
  // in from — it must be visible immediately on load, then fade out as
  // usual. Every other story fades in from its range start.
  const isFirst = start === 0;
  const fadeIn = isFirst ? 0 : start + (end - start) * 0.18;

  const inputRange = isFirst
    ? [0, fadeOut, end]
    : [start, fadeIn, fadeOut, end];
  const opacityOutput = isFirst ? [1, 1, 0] : [0, 1, 1, 0];
  const yOutput = isFirst ? [0, 0, -24] : [24, 0, 0, -24];

  const opacity = useTransform(progress, inputRange, opacityOutput);
  const y = useTransform(progress, inputRange, yOutput);

  const alignClass =
    story.align === "left"
      ? "items-start text-left left-6 md:left-16 max-w-xl"
      : story.align === "right"
      ? "items-end text-right right-6 md:right-16 max-w-xl"
      : "items-center text-center left-1/2 -translate-x-1/2 max-w-2xl px-6";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute top-1/2 z-10 flex -translate-y-1/2 flex-col ${alignClass}`}
    >
      {story.render()}
    </motion.div>
  );
}
