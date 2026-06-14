import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sino Safarov — Data Scientist",
  description:
    "Portfolio of Sino Safarov, incoming Master's student in Applied Data Analytics & AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-8`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
