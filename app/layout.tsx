import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/ui/header";
import { CookiesProvider } from "next-client-cookies/server";

const pretendard = localFont({
  src: "./fonts/Pretendard-Regular.woff",
  variable: "--font-pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://notionpresso.com"),
  title: "Notionpresso Docs",
  description:
    "Comprehensive documentation for Notionpresso library, a powerful tool for rendering Notion pages in React applications.",
  keywords: "react, notion, custom, documentation, library, rendering",
  icons: {
    icon: "/icon.jpeg",
    shortcut: "/icon.jpeg",
    apple: "/icon.jpeg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Notionpresso Documentation",
    description:
      "Learn how to use Notionpresso to render Notion pages in your React apps.",
    type: "website",
    url: "https://notionpresso.com",
    siteName: "Notionpresso",
    images: [
      {
        url: "/icon.jpeg",
        alt: "Notionpresso Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notionpresso Documentation",
    description:
      "Learn how to use Notionpresso to render Notion pages in your React apps.",
    images: ["/icon.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pretendard.variable} font-sans`}>
        <CookiesProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <main className="dark:bg-black">{children}</main>
          </ThemeProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
