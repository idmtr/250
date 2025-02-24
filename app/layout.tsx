import type { Metadata } from "next";
import "./globals.css";
import { Inter, Geist } from "next/font/google";
import { generateFaviconMetadata } from "@/lib/favicon";

// Initialize fonts at module scope - export for reuse
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

// Consistent class names across all layouts
export const layoutClasses = {
  html: `${inter.variable} ${geist.variable}`,
  body: "min-h-screen font-sans antialiased",
};

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
  return (
    <html lang="en" className={layoutClasses.html}>
      <body className={layoutClasses.body}>{children}</body>
    </html>
  );
}
