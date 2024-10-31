import React from "react";
import ModernTechPortfolio from "./assets/modern-tech.png";

interface ShowcaseItem {
  title: string;
  description: string;
  imageUrl: string;
  badge: string;
  link: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    title: "Modern Tech Portfolio",
    description:
      "A tech blog with distinctive design and optimized performance",
    imageUrl: ModernTechPortfolio.src,
    badge: "Default Design",
    link: "https://nextjs-blog-template.pages.dev/",
  },
];

const PLACEHOLDER_COUNT = 2;

const ShowcasePage = () => {
  return (
    <main className="min-h-screen bg-background dark:bg-background-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent dark:from-primary-950/30" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-display bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              Create Limitless Experiences
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-subhead1 text-neutral-600 dark:text-neutral-300">
              Break free from Notion's limitations. Your imagination becomes
              reality with NotionPresso
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Showcase Cards */}
            {SHOWCASE_ITEMS.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-background dark:bg-background-dark shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={`${item.title} thumbnail`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-primary-500 px-3 py-1 text-body3 font-medium text-white">
                      {item.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-subhead1 text-text dark:text-text-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-body2 text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <a
                      href={item.link}
                      className="inline-flex items-center text-body2 text-primary-500 hover:text-primary-600"
                    >
                      Visit Site →
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Placeholder Cards */}
            {[...Array(PLACEHOLDER_COUNT)].map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="group relative overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-neutral-50 dark:bg-neutral-900"
              >
                <div className="flex aspect-video items-center justify-center">
                  <p className="text-subhead2 text-neutral-400">Coming Soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShowcasePage;
