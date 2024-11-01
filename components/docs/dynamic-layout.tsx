import { cn } from "@/lib/utils";

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
  return (
    <div
      className={cn(
        "flex relative flex-col w-full justify-center gap-5 md:flex-row bg-white dark:bg-black p-4 md:p-5",
      )}
    >
      {/* Sidebar for desktop */}
      <div className={cn("hidden md:block")}>{sidebar}</div>

      {/* Mobile sidebar */}
      <div className={cn("block md:hidden")}>{mobileSidebar}</div>

      {/* Main content */}
      <div className={cn("max-w-[720px]")}>{children}</div>

      {/* TOC - only visible on desktop */}
      <div className={cn("hidden md:block")}>{toc}</div>
    </div>
  );
}
