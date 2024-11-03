import { Messages } from "./messages/types";
import { loadTranslations } from "./load-translations";
import { interpolate } from "./interpolate";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./supported-languages";

type Variables = { [key: string]: string | number };

export async function getServerTranslations(namespace?: keyof Messages) {
  let lang = DEFAULT_LANGUAGE; // 기본 언어 설정

  if (typeof window === "undefined") {
    const store = staticGenerationAsyncStorage.getStore();
    const pathname = store?.urlPathname;

    if (pathname) {
      // 경로명에서 언어 코드 추출 (예: /ko/...)
      const segments = pathname.split("/");
      if (segments.length > 1 && segments[1]) {
        const potentialLang = segments[1];
        if (SUPPORTED_LANGUAGES.includes(potentialLang as any)) {
          lang = potentialLang;
        }
      }
    }
  }

  // 언어 코드 기반으로 번역 메시지 로드
  const messages = await loadTranslations(lang);

  function t(key: string, variables?: Variables): string {
    let template: string;

    if (namespace) {
      template = (messages[namespace] as any)?.[key] || "";
    } else {
      template = (messages as any)?.[key] || "";
    }

    if (variables) {
      return interpolate(template, variables);
    } else {
      return template;
    }
  }

  return t;
}
