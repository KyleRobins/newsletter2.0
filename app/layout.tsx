import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Techzone - Your Source for DevOps, Web3, and Cybersecurity News",
  description: "Stay updated with the latest in DevOps, Web3, web development, and cybersecurity. Subscribe to our newsletter for daily insights.",
  keywords: "DevOps, Web3, Cybersecurity, Newsletter, Tech News",
  openGraph: {
    title: "Techzone - Your Source for DevOps, Web3, and Cybersecurity News",
    description: "Stay updated with the latest in DevOps, Web3, web development, and cybersecurity. Subscribe to our newsletter for daily insights.",
    url: "http://yourwebsite.com",
    siteName: "Techzone",
    images: [
      {
        url: "http://yourwebsite.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Techzone Newsletter",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Techzone - Your Source for DevOps, Web3, and Cybersecurity News",
    description: "Stay updated with the latest in DevOps, Web3, web development, and cybersecurity. Subscribe to our newsletter for daily insights.",
    image: "http://yourwebsite.com/twitter-image.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
