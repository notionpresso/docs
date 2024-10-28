import { LanguageIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { HeaderList } from "@/constants/constants";
import { LanguageSelector } from "./language-selector";

export default function Header() {
  return (
    <>
      <header
        className={cn(
          "bg-primary dark:bg-black",
          "transition-colors duration-300"
        )}
      >
        <div className="p-11 flex items-center justify-between">
          <a href="/">
            <p className={cn("text-h1 text-white")}>Notion Presso</p>
          </a>

          <div className={cn("flex items-center gap-10")}>
            {HeaderList.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className={cn("text-subhead1 text-white hover:text-black")}
              >
                {item.title}
              </a>
            ))}
            <LanguageSelector />
          </div>
        </div>
      </header>
    </>
  );
}
