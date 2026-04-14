import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatbotFab } from "@/components/sections/chatbot-fab";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crop Care Centre - Kashmir's Trusted Agri-Store",
  description: "Buy pesticides, insecticides & crop care products online. Get weather-based spray recommendations, crop guides for Kashmir's Apple, Walnut, Saffron & Apricot orchards.",
  keywords: ["pesticides", "insecticides", "Kashmir", "farming", "crop care", "apple orchard", "walnut", "saffron", "agriculture"],
  authors: [{ name: "Crop Care Centre" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <ChatbotFab />
        </Providers>
      </body>
    </html>
  );
}
