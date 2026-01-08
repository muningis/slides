import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Near-black backgrounds with olive undertones
        olive: {
          950: "#050606", // Near black - primary background
          900: "#0a0c0a", // Slightly lifted black
          800: "#12150f", // Card backgrounds
          700: "#1a1e15", // Elevated surfaces
          600: "#252a1e", // Borders
          500: "#353d2d", // Muted elements
          400: "#4a5540", // Visible borders
        },
        // Lime accent - precision, energy
        lime: {
          400: "#d4ff4a", // High contrast variant
          500: "#c8f542", // Primary accent
          600: "#a8d435", // Dimmed/secondary accent
          700: "#8ab82a", // Pressed states
        },
        // Text hierarchy - clarity through contrast
        sand: {
          50: "#ffffff", // High contrast text
          100: "#f5f5f0", // Primary text
          200: "#e8e8e0", // Emphasized text
          300: "#b8b8b0", // Secondary text
          400: "#8a8a82", // Tertiary text
          500: "#787870", // Muted text
          600: "#5a5a54", // Disabled text
        },
      },
      fontFamily: {
        // Sharp, technical sans-serif
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        // Monospace for code
        mono: [
          "ui-monospace",
          '"SF Mono"',
          "Menlo",
          "Monaco",
          '"Cascadia Mono"',
          "monospace",
        ],
      },
      fontSize: {
        // Responsive type scale with fluid sizing
        display: [
          "clamp(3rem, 5vw, 4.5rem)",
          { lineHeight: "1.1", fontWeight: "700" },
        ],
        h1: [
          "clamp(2.5rem, 4vw, 3.5rem)",
          { lineHeight: "1.15", fontWeight: "700" },
        ],
        h2: [
          "clamp(2rem, 3vw, 2.5rem)",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        h3: [
          "clamp(1.5rem, 2.5vw, 2rem)",
          { lineHeight: "1.25", fontWeight: "600" },
        ],
        body: [
          "clamp(1rem, 1.5vw, 1.25rem)",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        caption: [
          "clamp(0.875rem, 1vw, 1rem)",
          { lineHeight: "1.5", fontWeight: "400" },
        ],
      },
      spacing: {
        // Slide-specific spacing
        slide: "3rem",
        "slide-sm": "1.5rem",
      },
      backgroundImage: {
        // Near-black base
        "olive-gradient":
          "linear-gradient(135deg, #050606 0%, #0a0c0a 50%, #050606 100%)",
        "olive-radial":
          "radial-gradient(ellipse at center, #12150f 0%, #050606 70%)",
        // Accent glow - subtle olive blob
        "lime-glow":
          "radial-gradient(ellipse at center, rgba(200, 245, 66, 0.08) 0%, transparent 70%)",
        "olive-blob":
          "radial-gradient(ellipse at center, rgba(45, 60, 30, 0.4) 0%, transparent 60%)",
        // Empty state dot pattern
        "dot-pattern":
          "radial-gradient(circle, #252a1e 1px, transparent 1px)",
      },
      boxShadow: {
        // Lime accent glow
        "lime-glow": "0 0 20px rgba(200, 245, 66, 0.3)",
        "lime-glow-lg": "0 0 40px rgba(200, 245, 66, 0.4)",
        "lime-glow-sm": "0 0 10px rgba(200, 245, 66, 0.2)",
        // Subtle elevation
        "olive-sm": "0 2px 8px rgba(15, 19, 16, 0.4)",
        "olive-md": "0 4px 16px rgba(15, 19, 16, 0.5)",
        "olive-lg": "0 8px 32px rgba(15, 19, 16, 0.6)",
      },
      borderRadius: {
        // Consistent rounding
        slide: "0.5rem",
      },
      animation: {
        // Subtle pulse for active elements
        "lime-pulse": "lime-pulse 2s ease-in-out infinite",
        // Fade in for slide transitions
        "fade-in": "fade-in 0.3s ease-out",
        // Scale in for navigation dots
        "scale-in": "scale-in 0.2s ease-out",
        // Very slow blob drift
        "blob-drift": "blob-drift 60s ease-in-out infinite",
        "blob-drift-delayed": "blob-drift 60s ease-in-out infinite 30s",
      },
      keyframes: {
        "lime-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { transform: "scale(0.9)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "blob-drift": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "25%": { transform: "translate(5%, 10%) scale(1.05)" },
          "50%": { transform: "translate(-5%, 5%) scale(0.95)" },
          "75%": { transform: "translate(10%, -5%) scale(1.02)" },
        },
      },
      transitionTimingFunction: {
        // Snappy, precise easing
        precise: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
