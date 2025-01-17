/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#F6F6F6",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#888888",
          500: "#6D6D6D",
          600: "#5D5D5D",
          700: "#454545",
          800: "#3D3D3D",
          900: "#000000",
        },
        primary: {
          "light-1": "#F9F5FF",
          "light-2": "#F2E9FE",
          "light-3": "#D4B6FC",
          medium: "#A059F3",
          normal: "#6424A5",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        status: {
          positive: "#00BF40",
          negative: "#EB022B",
        },
        static: {
          black: "#000000",
          white: "#FFFFFF",
          Background: "#FCFCFC",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        50: "0.5rem",
        100: "0.75rem",
        200: "1rem",
        300: "1.25rem",
        400: "1.5rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        default: "0 0.125rem 8px 0 rgba(0, 0, 0, 0.08)",
      },
      fontFamily: {
        Binggrae: ["Binggrae"],
        BinggraeBold: ["BinggraeBold"],
        Pretendard: ["Pretendard"],
      },
      fontSize: {
        "title-1": "1.5rem",
        "title-2": "1.375rem",
        "heading-1": "1.25rem",
        "heading-2": "1.125rem",
        "body-1": "1rem",
        "body-2": "0.875rem",
        "detail-1": "0.75rem",
        "detail-2": "0.65rem",
      },
      fontWeight: {
        bold: "700",
        semibold: "600",
        medium: "500",
        regular: "400",
      },
      spacing: {
        0: "0rem",
        100: "0.125rem",
        200: "0.25rem",
        300: "0.5rem",
        400: "0.625rem",
        500: "0.75rem",
        600: "1rem",
        700: "1.25rem",
        800: "1.5rem",
        900: "1.75rem",
        1000: "2rem",
      },
    },
    keyframes: {
      fadeInSlideUp: {
        "0%": {
          opacity: "0",
          transform: "translateY(1rem)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      fadeInSlideDown: {
        "0%": {
          opacity: "0",
          transform: "translateY(-1rem)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      fadeIn: {
        "0%": {
          opacity: "0",
        },
        "100%": {
          opacity: "1",
        },
      },
      fadeOut: {
        "0%": {
          opacity: "1",
        },
        "100%": {
          opacity: "0",
        },
      },
      customPulse: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0.5 },
      },
      customSpin: {
        "0%": {
          transform: "rotate(0deg)",
        },
        "100%": {
          transform: "rotate(360deg)",
        },
      },
      fade: {
        "0%, 100%": { opacity: 1 },
        "50%": { opacity: 0 },
      },
    },
    animation: {
      fadeInSlideUp: "fadeInSlideUp 0.5s ease-out forwards",
      fadeInSlideDown: "fadeInSlideDown 0.5s ease-out forwards",
      fadeIn: "fadeIn 0.5s ease-out forwards",
      fadeOut: "fadeOut 0.5s ease-out forwards",
      pulse: "customPulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      fade1: "fade 4s infinite",
      fade2: "fade 4s infinite 2s",
      spin: "customSpin 1s linear infinite",
    },
    backdropBlur: {
      default: "25px",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const animationDelays = Array.from(
        { length: 20 },
        (_, i) => i + 1
      ).reduce((acc, num) => {
        acc[`.ani-delay-${num}00`] = {
          animationDelay: `${num * 100}ms`,
          opacity: 0,
        };
        return acc;
      }, {});

      const flexCenter = {
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      };

      addUtilities({
        ...animationDelays,
        ...flexCenter,
      });
    },
    require("tailwindcss-animate"),
  ],
};
