/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: "#0A0A0A",
          secondary: "#111111",
          card: "#161616",
          ivory: "#F5F1E8",
          stone: "#A8A29E",
          gold: "#C9A227",
          goldLight: "#E5C76B",
          border: "#2A2418",
        },
        cyber: {
          black: "#0A0A0A",
          dark: "#111111",
          lime: "#C9A227",
          cyan: "#E5C76B",
          gray: "#A8A29E",
          border: "#2A2418",
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "Playfair Display", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(42, 36, 24, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(42, 36, 24, 0.25) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
