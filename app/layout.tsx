import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Carolyn's Guiding Light - Spiritual Guidance & Healing",
    template: "%s | Carolyn's Guiding Light",
  },
  description:
    "Illuminate your path with professional spiritual guidance, energy healing, and transformative consultations. Book your session today.",
  keywords: [
    "spiritual guidance",
    "energy healing",
    "life coaching",
    "meditation",
    "spiritual readings",
    "personal growth",
  ],
  authors: [{ name: "Carolyn's Guiding Light" }],
  creator: "Carolyn's Guiding Light",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Carolyn's Guiding Light - Spiritual Guidance & Healing",
    description:
      "Illuminate your path with professional spiritual guidance, energy healing, and transformative consultations.",
    siteName: "Carolyn's Guiding Light",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carolyn's Guiding Light - Spiritual Guidance & Healing",
    description:
      "Illuminate your path with professional spiritual guidance, energy healing, and transformative consultations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
