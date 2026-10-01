import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "TN smart tourism — Explore smarter. Experience more.",
  description:
    "Digital tourism platform for Tamil Nadu pilot corridor (Chennai–Mahabalipuram). Discover attractions, select tourism passes, and enjoy seamless international tourist payment onboarding via UPI One World simulation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 flex flex-col min-h-screen antialiased selection:bg-teal-500 selection:text-navy-950">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
