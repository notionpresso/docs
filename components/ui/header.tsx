"use client";

import { cn } from "@/lib/utils";
import { LanguageSelector } from "./language-selector";
import { SNS_LIST } from "@/constants/constants";
import Image from "next/image";
import {
  ArrowUpRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import ThemeSelector from "./theme-selector";
import Link from "next/link";
import { useTranslations } from "@/i18n";
import { useCurrentLanguage } from "@/i18n/use-current-language";
import { useRouter } from "next/navigation";
import { useQueryParams } from "@/hooks/use-query-params";
import usePreventScroll from "@/hooks/usePreventScroll";

export default function Header() {
  const [{ menu: isMenuOpen = false }, setQueryParams] = useQueryParams({
    menu: "boolean",
  });
  usePreventScroll({ isOpen: isMenuOpen });

  const t = useTranslations("header");
  const lang = useCurrentLanguage();
  const router = useRouter();

  const setIsMenuOpen = (value: boolean) => {
    setQueryParams({ menu: value });
  };

  const shouldShowIcon = (title: string) => {
    return ["Blog", "Github", "블로그", "깃허브"].includes(title);
  };

  const items = [
    {
      title: t("docs"),
      href: `/${lang}/docs/getting-started/introduction`,
    },
    {
      title: t("tutorial"),
      href: `/${lang}/tutorial`,
    },
    {
      title: t("contributing"),
      href: `/${lang}/contributing`,
    },
    {
      title: t("showcase"),
      href: `/${lang}/showcase`,
    },
    {
      title: t("blog"),
      href: "https://nextjs-blog-template.pages.dev/",
    },
    {
      title: t("github"),
      href: "https://github.com/notionpresso",
    },
  ] as const;

  return (
    <>
      <header className={cn("bg-primary dark:bg-black")}>
        {/* Desktop Header */}
        <div className="hidden md:block">
          <div className="h-[80px] p-5 flex items-center justify-between">
            <Link href={`/${lang}`}>
              <p className="text-h2 text-white dark:text-primary-400">
                Notion Presso
              </p>
            </Link>
            <div className="flex items-center gap-10">
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="text-subhead1 text-white dark:text-primary-400 flex gap-1 hover:text-black"
                >
                  {item.title}
                  {shouldShowIcon(item.title) && (
                    <ArrowUpRightIcon className="w-3 h-3" />
                  )}
                </Link>
              ))}
              <LanguageSelector />
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <div className="p-4 flex items-center justify-between">
            <Link href="/">
              <p className="text-h2 text-white dark:text-primary-400">
                Notion Presso
              </p>
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-white p-2"
            >
              <Bars3Icon className="w-6 h-6 dark:stroke-primary-400" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full bg-white dark:bg-black z-50 p-6 transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="text-primary">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col px-6 py-4">
          <div className="flex flex-col gap-6 mb-auto">
            {items.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-h3 text-primary flex items-start gap-1"
              >
                {item.title}
                {shouldShowIcon(item.title) && (
                  <ArrowUpRightIcon className="w-2 h-2" />
                )}
              </Link>
            ))}
          </div>

          <div className={cn("flex items-center justify-between mt-20")}>
            <div>
              <LanguageSelector variant="orange" />
              <ThemeSelector variant="orange" />
            </div>
            <div className={cn("flex gap-4")}>
              {SNS_LIST.map((item) => (
                <a key={item.name} href={item.url} target="_blank">
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
