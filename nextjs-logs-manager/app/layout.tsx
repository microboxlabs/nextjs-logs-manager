import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";

import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import AuthContextProvider from "./auth/context";
import AuthGuard from "./auth/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Logs Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <AuthContextProvider>
          <AuthGuard>
            <NavigationBar />
            <main className="container">{children}</main>
            <Footer />
          </AuthGuard>
        </AuthContextProvider>
      </body>
      <Script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js" />
    </html>
  );
}
