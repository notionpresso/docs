"use client";

import { useContext } from "react";
import { TranslationsContext } from "./client-translations-provider";
import { interpolate } from "./interpolate";
import { Messages } from "./messages/types";

export function useTranslations(namespace?: keyof Messages) {
  const messages = useContext(TranslationsContext);

  function t(
    key: string,
    variables?: { [key: string]: string | number },
  ): string {
    // 네임스페이스 적용
    const fullKey = namespace ? `${namespace}.${key}` : key;

    // 키를 '.'으로 분할하여 중첩된 객체에서 값을 찾습니다.
    const keys = fullKey.split(".");
    let message: any = messages;

    for (const k of keys) {
      if (message && message.hasOwnProperty(k)) {
        message = message[k];
      } else {
        console.warn(`Translation for key "${fullKey}" not found.`);
        return fullKey;
      }
    }

    if (typeof message === "string") {
      if (variables) {
        return interpolate(message, variables);
      } else {
        return message;
      }
    } else {
      console.warn(`Translation for key "${fullKey}" is not a string.`);
      return fullKey;
    }
  }

  return t;
}
