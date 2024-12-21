import type { Metadata } from "next";
import { ReactNode } from "react";
import { Roboto } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import { Toaster } from "@/src/components/ui/toaster";

const roboto = Roboto({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Logs Manager",
  description:
    "A powerful logs management system built with Next.js and Flowbite",
  keywords: "logs, management, nextjs, flowbite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <link rel="icon" href="/favicon.ico" />
        <title>LogSpace</title>
      </head>
      <body className={`${roboto.className} `}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
