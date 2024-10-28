"use client";
import { useState, useRef, useEffect } from "react";
import { LanguageIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { LanguageList } from "@/constants/constants";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-center gap-1 rounded-lg p-2",
          "text-white hover:bg-primary-400 dark:hover:bg-neutral-800",
          "focus:outline-none focus:ring-2 focus:ring-primary-200"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <LanguageIcon className="h-5 w-5" />
        <ChevronDownIcon
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            "absolute right-0 mt-2",
            "w-48",
            "bg-white dark:bg-neutral-900",
            "rounded-lg shadow-lg",
            "border border-neutral-200 dark:border-neutral-700",
            "origin-top-right",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "sm:w-24"
          )}
        >
          <div className="py-1" role="none">
            {LanguageList.map((language) => (
              <button
                key={language}
                className={cn(
                  "w-full text-left px-4 py-2",
                  "text-sm text-neutral-700 dark:text-neutral-200",
                  "hover:bg-primary-50 dark:hover:bg-neutral-800",
                  "focus:outline-none focus:bg-primary-50 dark:focus:bg-neutral-800",
                  "transition-colors duration-150"
                )}
              >
                {language}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
