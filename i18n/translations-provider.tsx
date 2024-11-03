"use server";
import { ClientTranslationsProvider } from "./client-translations-provider";
import { loadTranslations } from "./load-translations";
import { SupportedLanguage } from "./supported-languages";

export default async function TranslationsProvider({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const messages = await loadTranslations(lang);
  return (
    <ClientTranslationsProvider messages={messages}>
      {children}
    </ClientTranslationsProvider>
  );
}
