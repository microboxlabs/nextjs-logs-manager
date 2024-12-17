import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript } from "flowbite-react";
import "../styles/globals.css";
import SessionWrapper from "@/src/components/SessionWrapper";
import CustomNavbar from "@/src/components/CustomNavbar";
import { AlertProvider } from "@/src/contexts/AlertContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Log Manager App - Simplify Your Logs",
  description: "Efficiently manage, organize, and analyze logs with our Next.js app. Built with performance and usability in mind.",
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.logmanager-ejemplo.com", // Esto aun no existe asi que un dominio de ejemplo
    title: "Log Manager App - Simplify Your Logs",
    description: "Efficiently manage, organize, and analyze logs with our Next.js app.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Log Manager App - Simplify Your Logs",
    description: "Efficiently manage, organize, and analyze logs with our Next.js app.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${inter.className} h-screen bg-gray-50 dark:bg-gray-900`}>
        <AlertProvider>
          <SessionWrapper>
            <div className="flex h-screen flex-col">
              <header className="z-50">
                <CustomNavbar />
              </header>
              <main className="grow overflow-y-auto">{children}</main>
            </div>
          </SessionWrapper>
        </AlertProvider>
      </body>
    </html>
  );
}