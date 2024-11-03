"use client";

import { useContext } from "react";
import { TranslationsContext } from "./client-translations-provider";

export function useCurrentLanguage() {
  const { lang } = useContext(TranslationsContext);
  return lang;
}
