import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/ui/header";
import { ThemeProvider } from "@/components/theme-provider";

const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "react-notion-custom Docs",
  description:
    "Comprehensive documentation for react-notion-custom library, a powerful tool for rendering Notion pages in React applications.",
  keywords: "react, notion, custom, documentation, library, rendering",
  openGraph: {
    title: "react-notion-custom Documentation",
    description:
      "Learn how to use react-notion-custom to render Notion pages in your React apps.",
    type: "website",
    // TODO: Add URL and image
    // url: "",
    // image: "",
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
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
