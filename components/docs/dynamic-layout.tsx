"use client";

import useIsMobile from "@/hooks/useIsMobile";

interface DynamicLayoutProps {
  sidebar: React.ReactNode;
  toc: React.ReactNode;
  mobileSidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function DynamicLayout({
  sidebar,
  toc,
  mobileSidebar,
  children,
}: DynamicLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div
      className={`flex relative flex-col w-full justify-center gap-5 md:flex-row bg-primary ${isMobile ? "p-4" : "p-5"}`}
    >
      <div>{isMobile ? mobileSidebar : sidebar}</div>
      <div className="max-w-[720px]">{children}</div>
      {!isMobile && <div>{toc}</div>}
    </div>
  );
}
