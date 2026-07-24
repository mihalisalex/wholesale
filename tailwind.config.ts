import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        "ink-soft": "#1A1A1D",
        cream: "#F7F7F6",
        "cream-dim": "#ECECEA",
        gold: "#2E2E31",
        "gold-soft": "#9B9B9F",
        "accent-2": "#4B7A63",
        "accent-3": "#B5493D",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        brand: "18px",
        "brand-sm": "10px",
      },
      boxShadow: {
        brand: "0 20px 60px -20px rgba(18,19,28,0.28)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "scroll-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "scroll-left": "scroll-left 24s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
