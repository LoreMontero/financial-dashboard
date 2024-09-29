const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      
      
      fontFamily: {
        sans: ["var(--geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [addVariablesForColors, require("tailwindcss-animate")],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({
  addBase,
  theme
}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  newVars["--border"] = theme("colors.border");
  newVars["--input"] = theme("colors.input");
  newVars["--ring"] = theme("colors.ring");
  newVars["--background"] = theme("colors.background");
  newVars["--foreground"] = theme("colors.foreground");
  newVars["--primary"] = theme("colors.primary.DEFAULT");
  newVars["--primary-foreground"] = theme("colors.primary.foreground");
  newVars["--secondary"] = theme("colors.secondary.DEFAULT");
  newVars["--secondary-foreground"] = theme("colors.secondary.foreground");
  newVars["--destructive"] = theme("colors.destructive.DEFAULT");
  newVars["--destructive-foreground"] = theme("colors.destructive.foreground");
  newVars["--muted"] = theme("colors.muted.DEFAULT");
  newVars["--muted-foreground"] = theme("colors.muted.foreground");
  newVars["--accent"] = theme("colors.accent.DEFAULT");
  newVars["--accent-foreground"] = theme("colors.accent.foreground");
  newVars["--popover"] = theme("colors.popover.DEFAULT");
  newVars["--popover-foreground"] = theme("colors.popover.foreground");
  newVars["--card"] = theme("colors.card.DEFAULT");
  newVars["--card-foreground"] = theme("colors.card.foreground");

  addBase({
    ":root": newVars,
  });
}

