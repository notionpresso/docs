import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/navigation";
import Header from "@/components/ui/header";

const pretendard = localFont({
  src: "./fonts/Pretendard-Regular.woff",
  variable: "--font-pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Notionpresso Docs",
  description:
    "Comprehensive documentation for Notionpresso library, a powerful tool for rendering Notion pages in React applications.",
  keywords: "react, notion, custom, documentation, library, rendering",
  icons: {
    icon: "/notionpresso.jpeg",
    shortcut: "/notionpresso.jpeg",
    apple: "/notionpresso.jpeg",
  },
  openGraph: {
    title: "Notionpresso Documentation",
    description:
      "Learn how to use Notionpresso to render Notion pages in your React apps.",
    type: "website",
    images: [
      {
        url: "/notionpresso.jpeg",
        width: 400,
        height: 400,
        alt: "Notionpresso Documentation",
      },
    ],
    siteName: "Notionpresso",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notionpresso Documentation",
    description:
      "Learn how to use Notionpresso to render Notion pages in your React apps.",
    images: ["/notionpresso.jpeg"],
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="dark:bg-black">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
