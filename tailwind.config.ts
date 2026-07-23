import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12131C",
        "ink-soft": "#1D1F2C",
        cream: "#F5F5F8",
        "cream-dim": "#EAEAF1",
        gold: "#5B4FE8",
        "gold-soft": "#A79CFC",
        "accent-2": "#14C8A5",
        "accent-3": "#FF7A63",
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
