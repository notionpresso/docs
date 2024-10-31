import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userAgent } from "next/server";

const supportedLanguages = ["en", "ko"];

function getPreferredLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return "en";

  const langs = acceptLanguage.split(",").map((lang) => lang.split(";")[0]);
  for (const lang of langs) {
    const shortLang = lang.slice(0, 2).toLowerCase();
    if (supportedLanguages.includes(shortLang)) {
      return shortLang;
    }
  }
  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.match(/\.(svg|png|jpg|jpeg|gif|ico|json|txt|pdf|xml|js|css)$/)) {
    return NextResponse.next();
  }

  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  if (
    supportedLanguages.some(
      (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
    )
  ) {
    const currentViewport = request.nextUrl.searchParams.get("viewport");
    if (!currentViewport) {
      const newUrl = request.nextUrl;
      newUrl.searchParams.set("viewport", viewport);
      console.log("rewrite", newUrl.searchParams.get("viewport"));
      return NextResponse.redirect(newUrl);
    }
    return NextResponse.next();
  }

  const lang = getPreferredLanguage(request);
  const newUrl = new URL(`/${lang}${pathname}`, request.url);
  newUrl.searchParams.set("viewport", viewport);

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
