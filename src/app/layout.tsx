import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://xude-energy.vercel.app"),
  title: "Xude Energy | Energy, Reimagined",
  description: "Fruit-forward flavour. Plant-based energy. Zero sugar. Discover a different kind of energy.",
  icons: {
    icon: "/assets/xude.png",
  },
  openGraph: {
    images: [
      {
        url: "/assets/Xudebrand.png",
        width: 1200,
        height: 630,
        alt: "Xude Energy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Xude Energy",
    description: "Finally, an energy drink for everyone.",
    images: ["/assets/Xudebrand.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
