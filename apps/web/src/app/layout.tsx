import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MarketNova | AI Marketing Platform",
  description: "Intelligent Marketing. Simplified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-gray-100 flex min-h-screen`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#0a0a0c]">
          {children}
        </main>
      </body>
    </html>
  );
}
