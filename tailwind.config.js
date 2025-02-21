/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#D4A373",
        secondary: "#F5EBE0",
        accent: {
          DEFAULT: "#F5EBE0",
          foreground: "#1F1F1F",
        },
        muted: {
          DEFAULT: "#E9E2D7",
          foreground: "#1F1F1F",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
      fontFamily: {
        sans: ['var(--font-geist)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        grain:
          "url('data:image/png;base64,data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD8/vz08vT09vT8+vzs7uxH16TeAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAuFJREFUOI0Vk+3NLiEIRG1B8ClAYAsQ2AIEt4D9ePtv5Xp/mZgYJ2fOFJKEfInkVWY2aglmQFkimRTV7MblYyVqD7HXyhKsSuPX12MeDhRHLtGvRG+P+B/S0Vu4OswR9tmvwNPyhdCDbVayJGads/WiUWcjCvCnruTBNHS9gmX2VzVbk7ZvB1gb1hkWFGl+A/n+/FowcO34U/XvKqZ/fHY+6vgRfU92XrOBUbGeeDfQmjWjdrK+frc6FdGReQhfSF5JvR29O2QrfNw1huTwlgsyXLo0u+5So82sgv7tsFZR2nxB6lXiquHrfD8nfYZ9SeT0LiuvSoVrxGY16pCNRZKqvwWsn5OHypPBELzohMCaRaa0ceTHYqe7X/gfJEEtKFbJpWoNqO+aS1cuTykGPpK5Ga48m6L3NefTr013KqYBQu929iP1oQ/7UwSR+i3zqruUmT84qmhzLpxyj7pr9kg7LKvqaXxZmdpn+6o8sHqSqojy02gU3U8q9PnpidiaLks0mbMYz+q2uVXsoBQ8bfURULYxRgZVYCHMv9F4OA7qxT2NPPpvGQ/sTDH2yznKh7E2AcErfcNsaIoN1izzbJiaY63x4QjUFdBSvDCvugPpu5xDny0jzEeuUQbcP1aGT9V90uixngTRLYNEIIZ6yOF1H8tm7rj2JxiefsVy53zGVy3ag5uuPsdufYOzYxLRxngKe7nhx3VAq54pmz/DK9/Q3aDam2Yt3hNXB4HuU87jKNd/CKZn77Qdn5QkXPfqSkhk7hGOXXB+7v09KbBbqdvxGqa0AqfK/atIrL2WXdAgXAJ43Wtwe/aIoacXezeGPMlhDOHDbSfHnaXsL2QzbT82GRwZuezdwcoWzx5pnOnGMUdHuiY7lhdyWzWiHnucLZQxYStMJbtcydHaQ6vtMbe0AcDbxG+QG14AL94xry4297xpy9Cpf1OoxZ740gHDfrK+gtsy0xabwJmfgtCeii79B6aj0SJeLbd7AAAAAElFTkSuQmCC')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

