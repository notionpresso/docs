"use client";

import { useState, useRef, useEffect } from "react";
import {
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import useClickOutside from "@/hooks/useClickOutside";

interface ThemeSelectorProps {
  variant?: "black" | "orange";
}

const THEMELIST = [
  { title: "Light", value: "light", icon: SunIcon },
  { title: "Dark", value: "dark", icon: MoonIcon },
  { title: "System", value: "system", icon: ComputerDesktopIcon },
] as const;

export function ThemeSelector({ variant = "black" }: ThemeSelectorProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const containerRef = useClickOutside(() => setIsOpen(false));

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const CurrentThemeIcon = mounted
    ? (THEMELIST.find((t) => t.value === theme)?.icon ?? SunIcon)
    : SunIcon;

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-center gap-1 rounded-lg p-2",
          variant === "black" && "text-black dark:text-white",
          variant === "orange" && "text-primary-400",
          !mounted && "animate-pulse",
        )}
      >
        <CurrentThemeIcon className={cn("h-5 w-5")} />
        <ChevronDownIcon
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "transform rotate-180",
          )}
        />
      </button>

      {mounted && isOpen && (
        <div
          ref={popoverRef}
          className={cn(
            "absolute right-0 mt-2 z-30",
            "bg-white dark:bg-neutral-900",
            "rounded-lg shadow-lg",
            "border border-neutral-200 dark:border-neutral-700",
            "origin-top-right",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "w-32",
          )}
        >
          <div className="py-1" role="none">
            {THEMELIST.map(({ title, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-2",
                  "text-sm text-neutral-700 dark:text-primary-400",
                  "transition-colors duration-150",
                  "inline-flex items-center gap-2",
                )}
              >
                <Icon className="h-4 w-4" />
                {title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSelector;
