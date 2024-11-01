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
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  const response = NextResponse.next();
  response.cookies.set("viewport", viewport);

  if (
    supportedLanguages.some(
      (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
    )
  ) {
    return response;
  }

  const lang = getPreferredLanguage(request);
  const newUrl = new URL(`/${lang}${pathname}`, request.url);

  const redirectResponse = NextResponse.redirect(newUrl);
  redirectResponse.cookies.set("viewport", viewport);

  return redirectResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|bmp|tiff|css|js|map|json|txt|xml|woff|woff2|eot|ttf|otf|txt)$).*)",
  ],
};
