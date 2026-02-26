// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/component/Sidebar"; // IMPORTING YOUR NEW COMPONENT

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VC AI Scout",
  description: "Precision AI Scout for VCs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen bg-slate-50 relative overflow-hidden text-slate-800`}>
        
        {/* Animated Backgrounds */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-20"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-indigo-300/30 via-purple-300/20 to-transparent blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tl from-blue-300/30 via-cyan-300/20 to-transparent blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />

        {/* INJECTING THE SMART SIDEBAR HERE */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-10 z-10">
          {children}
        </main>
        
      </body>
    </html>
  );
}