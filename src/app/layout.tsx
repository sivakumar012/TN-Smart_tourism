import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "TN smart tourism — Explore smarter. Experience more.",
  description:
    "Digital tourism platform for Tamil Nadu pilot corridor (Chennai–Mahabalipuram & Coimbatore). Discover attractions, select tourism passes, and enjoy seamless international tourist payment onboarding via UPI One World simulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-navy-950 text-slate-100 flex flex-col min-h-screen antialiased selection:bg-teal-500 selection:text-navy-950">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
