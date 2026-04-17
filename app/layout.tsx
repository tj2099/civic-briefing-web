import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "CitySmart — Your city council, made readable",
  description:
    "CitySmart delivers a plain-English summary of city council votes and key decisions to your inbox every Friday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${dmSerifDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
