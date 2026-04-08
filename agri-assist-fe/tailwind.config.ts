import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
        soil: {
          50: "#faf3eb",
          100: "#f4e1cf",
          500: "#a45e33",
          700: "#6d3617"
        },
        leaf: {
          50: "#eef6e8",
          100: "#d8e9ca",
          500: "#42773e",
          700: "#26482a"
        },
        chili: {
          50: "#fff0ec",
          100: "#ffd3c8",
          500: "#d84c2f",
          700: "#8f2512"
        }
      },
      fontFamily: {
        sans: ["Candara", "Trebuchet MS", "Segoe UI", "sans-serif"],
        display: ["Georgia", "Times New Roman", "serif"]
      },
      boxShadow: {
        soil: "0 24px 60px rgba(79, 40, 17, 0.16)",
        leaf: "0 20px 40px rgba(38, 72, 42, 0.16)"
      },
      backgroundImage: {
        field:
          "radial-gradient(circle at top left, rgba(255, 211, 200, 0.7), transparent 36%), radial-gradient(circle at top right, rgba(216, 233, 202, 0.85), transparent 28%), linear-gradient(180deg, rgba(250, 243, 235, 0.85), rgba(255, 255, 255, 0.95))"
      }
    }
  },
  plugins: []
};

export default config;
