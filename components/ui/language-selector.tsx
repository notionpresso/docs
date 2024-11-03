"use client";

import { useState, useRef } from "react";
import { LanguageIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LANGUAGE_LIST } from "@/i18n/supported-languages";
import useClickOutside from "@/hooks/useClickOutside";
import { useCurrentLanguage } from "@/i18n";

interface LanguageSelectorProps {
  variant?: "white" | "orange";
}

export function LanguageSelector({ variant = "white" }: LanguageSelectorProps) {
  const currentLang = useCurrentLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useClickOutside(() => setIsOpen(false));
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (newLang: string) => {
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPathname);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-center gap-1 rounded-lg p-2",
          variant === "white" && ["text-white dark:text-primary-400"],
          variant === "orange" && ["text-primary-400 dark:text-primary-400"],
        )}
      >
        <LanguageIcon className="h-5 w-5" />
        <ChevronDownIcon
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "transform rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            "absolute right-0 mt-2 z-30",
            "bg-white dark:bg-neutral-900",
            "rounded-lg shadow-lg",
            "border border-neutral-200 dark:border-neutral-700",
            "origin-top-right",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "sm:w-24",
          )}
        >
          <div className="py-1" role="none">
            {LANGUAGE_LIST.map((language) => (
              <button
                key={language.title}
                onClick={() => changeLanguage(language.locale)}
                className={cn(
                  "w-full text-left px-4 py-2",
                  "text-sm text-black dark:text-primary-400",
                  "transition-colors duration-150",
                  language.locale === currentLang &&
                    "bg-neutral-100 dark:bg-black",
                )}
              >
                {language.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
