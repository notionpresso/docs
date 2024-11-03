"use client";

import React, { createContext } from "react";
import { Messages } from "./messages/types";

export const TranslationsContext = createContext<Messages>({} as Messages);

interface TranslationsProviderProps {
  messages: Messages;
  children: React.ReactNode;
}

export const ClientTranslationsProvider: React.FC<
  TranslationsProviderProps
> = ({ messages, children }) => {
  return (
    <TranslationsContext.Provider value={messages}>
      {children}
    </TranslationsContext.Provider>
  );
};
