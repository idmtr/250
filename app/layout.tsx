import type { Metadata } from "next";
import "./globals.css";
import { Inter, Geist } from "next/font/google";
import { generateFaviconMetadata } from "@/lib/favicon";
import { i18n } from "@/i18n-config";

// Initialize fonts at module scope - export for reuse
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

// Consistent class names across all layouts
const layoutClasses = {
  html: `${inter.variable} ${geist.variable} font-sans antialiased`,
  body: "min-h-screen bg-[#F5EBE0]",
};

export { layoutClasses };

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://twofifty.co";

  return {
    ...generateFaviconMetadata({ baseUrl }),
    title: {
      default: "TwoFifty",
      template: "%s | Coworking Consulting",
    },
    description:
      "TwoFifty specializes in crafting sustainable, adaptable workspaces that streamline processes, foster team dynamics, and enhance community engagement.",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children; // Let the [lang] layout handle the HTML structure
}
