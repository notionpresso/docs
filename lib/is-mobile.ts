import { getCookie, getCookies } from "cookies-next";
import { ServerInsertedHtml } from "next/dist/server/future/route-modules/app-page/vendored/contexts/entrypoints";
import { ServerInsertedHTMLContext } from "next/navigation";
import type { ServerInsertedHTMLHook } from "next/dist/shared/lib/server-inserted-html.shared-runtime";

function isMobile() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  const a = ServerInsertedHtml as any;
  console.log(a.ServerInsertedHTMLContext._currentValue);

  return true;
}

export default isMobile;
