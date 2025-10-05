/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : 'class',
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    './utils/**/*.{html,js,jsx,ts,tsx,mdx}',
    './*.{html,js,jsx,ts,tsx,mdx}',
    './src/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  important: 'html',
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          0: "rgb(var(--color-primary) / 0)",
          5: "rgb(var(--color-primary) / 0.05)",
          10: "rgb(var(--color-primary) / 0.1)",
          20: "rgb(var(--color-primary) / 0.2)",
          30: "rgb(var(--color-primary) / 0.3)",
          40: "rgb(var(--color-primary) / 0.4)",
          50: "rgb(var(--color-primary) / 0.5)",
          60: "rgb(var(--color-primary) / 0.6)",
          70: "rgb(var(--color-primary) / 0.7)",
          80: "rgb(var(--color-primary) / 0.8)",
          90: "rgb(var(--color-primary) / 0.9)",
          95: "rgb(var(--color-primary) / 0.95)",
          100: "rgb(var(--color-primary) / 1)",
        },
        secondary: {
          DEFAULT: "rgb(var(--color-secondary) / <alpha-value>)",
          0: "rgb(var(--color-secondary) / 0)",
          5: "rgb(var(--color-secondary) / 0.05)",
          10: "rgb(var(--color-secondary) / 0.1)",
          20: "rgb(var(--color-secondary) / 0.2)",
          30: "rgb(var(--color-secondary) / 0.3)",
          40: "rgb(var(--color-secondary) / 0.4)",
          50: "rgb(var(--color-secondary) / 0.5)",
          60: "rgb(var(--color-secondary) / 0.6)",
          70: "rgb(var(--color-secondary) / 0.7)",
          80: "rgb(var(--color-secondary) / 0.8)",
          90: "rgb(var(--color-secondary) / 0.9)",
          95: "rgb(var(--color-secondary) / 0.95)",
          100: "rgb(var(--color-secondary) / 1)",
        },
        background: {
          DEFAULT: "rgb(var(--color-background) / <alpha-value>)",
          0: "rgb(var(--color-background) / 0)",
          5: "rgb(var(--color-background) / 0.05)",
          10: "rgb(var(--color-background) / 0.1)",
          20: "rgb(var(--color-background) / 0.2)",
          30: "rgb(var(--color-background) / 0.3)",
          40: "rgb(var(--color-background) / 0.4)",
          50: "rgb(var(--color-background) / 0.5)",
          60: "rgb(var(--color-background) / 0.6)",
          70: "rgb(var(--color-background) / 0.7)",
          80: "rgb(var(--color-background) / 0.8)",
          90: "rgb(var(--color-background) / 0.9)",
          95: "rgb(var(--color-background) / 0.95)",
          100: "rgb(var(--color-background) / 1)",
        },

        text: "rgb(var(--color-text) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
      },

      fontFamily: {
        jakarta: ["var(--font-plus-jakarta-sans)"],
        inter: ["var(--font-inter)"],
      },

      boxShadow: {
        "soft-card": "0 0 20px rgba(0,0,0,0.15)",
      },
    },
  },
};
