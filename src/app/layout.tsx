import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { AnalyticsPageView } from "@/components/analytics/AnalyticsPageView";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";

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
        {/* GA4 script tags — loaded after interactive, gated by Consent Mode */}
        <GoogleAnalytics />
        {/* Track client-side route changes as page_view events */}
        <AnalyticsPageView />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        {/* Analytics consent banner — shown on first visit */}
        <ConsentBanner />
      </body>
    </html>
  );
}
