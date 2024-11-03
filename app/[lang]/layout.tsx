import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/ui/header";
import Script from "next/script";
import TranslationsProvider from "@/i18n/translations-provider";
import { getServerTranslations } from "@/i18n";

const pretendard = localFont({
  src: "../fonts/Pretendard-Regular.woff",
  variable: "--font-pretendard",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerTranslations("metadata");
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      siteName: t("og.siteName"),
      images: [
        {
          url: "/icon.jpeg",
          alt: t("og.imageAlt"),
        },
      ],
    },
    twitter: {
      title: t("twitter.title"),
      description: t("twitter.description"),
      images: [
        {
          url: "/icon.jpeg",
          alt: t("twitter.imageAlt"),
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        {params.lang === "ko" && (
          <>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://static.llami.net/widget-v1.css"
            />
            <Script type="module">
              {`
                import { initialize, run } from "https://static.llami.net/widget-v1.js";
                run("e38ec339-5085-4561-bfc6-df730876395e");
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${pretendard.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TranslationsProvider lang={params.lang}>
            <Header />
            <main className="dark:bg-black">{children}</main>
          </TranslationsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
