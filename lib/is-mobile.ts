import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage.external";

function getSearchString(): string {
  const store = staticGenerationAsyncStorage.getStore();
  const pathname = store?.urlPathname;

  if (!pathname) return "";

  const queryIndex = pathname.indexOf("?");
  if (queryIndex === -1) return "";

  return pathname.substring(queryIndex);
}

function isMobile() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }

  const store = staticGenerationAsyncStorage.getStore();
  if (!store) {
    throw new Error("isMobile is not available in server-side rendering");
  }

  const searchParams = new URLSearchParams(getSearchString());
  const viewport = searchParams.get("viewport");

  return viewport === "mobile";
}

export default isMobile;
