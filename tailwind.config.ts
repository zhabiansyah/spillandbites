import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hero-only: matches the baked-in background of the uploaded
        // photo sequence, so canvas edges stay seamless. Not part of the
        // general brand palette below.
        "spill-blue": "#081C2E",
        "spill-blue-deep": "#04111D",

        // Brand palette (customer landing page)
        primary: "#012DB4", // trust, header, tombol utama
        secondary: "#FFC400", // aksen, highlight promo, CTA sekunder
        "royal-blue": "#012DB4", // alias kept for existing components
        "crispy-yellow": "#FFC400", // alias kept for existing components
        ink: "#14171A", // body/heading text on white sections
        "ink-soft": "#4B5563",

        "sauce-red": "#FFFFFF",
        cream: "#FFFFFF", // text on dark surfaces (hero, dark CTA)
      },
      fontFamily: {
        display: ["var(--font-poppins)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-poppins)", "sans-serif"],
        outfit: ["var(--font-poppins)", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at 50% 50%, rgba(255,201,60,0.25), rgba(8,28,46,0) 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
