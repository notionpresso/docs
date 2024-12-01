import { SNS_LIST } from "@/constants/constants";
import { cn } from "@/lib/utils";
import ThemeSelector from "./theme-selector";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="hidden md:flex items-center justify-between w-full p-4">
      {/* left */}
      <div className="text-xs">
        <p>Released under the MIT License.</p>
        <p>Copyright NotionPresso</p>
      </div>
      {/* right */}
      <div className={cn("flex items-center gap-4")}>
        <ThemeSelector />
        {SNS_LIST.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "text-muted-foreground hover:text-primary transition-colors",
              "flex items-center gap-2",
            )}
          >
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
  );
}
