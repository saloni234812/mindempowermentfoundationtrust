import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/components/AccessibilityContext";
import WhatsAppChat from "@/components/WhatsAppChat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mind Empowerment Foundation Trust",
  description: "Empowering Minds, Transforming Lives. A trustworthy donation-and-volunteer-focused digital platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-txt-base transition-colors duration-200">
        <AccessibilityProvider>
          {children}
          <WhatsAppChat />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
