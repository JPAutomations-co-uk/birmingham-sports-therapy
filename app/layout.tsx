import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "Birmingham Sports Therapy | Get Back to Training Pain-Free",
  description: "Sports massage, cupping therapy, compression & infrared recovery in Birmingham. 100+ clients helped. Most cases resolved in 2 sessions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
