import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n-config";
import type { Locale } from "@/i18n-config";
import { getLocalizedPath, getStandardPath, routes } from "./lib/url-utils";

// Helper function for tag URL generation
export function getTagUrl(tag: string, locale: Locale): string {
  const encodedTag = encodeURIComponent(tag.toLowerCase());
  return `/${locale}/blog/tag/${encodedTag}`;
}

function getLocale(request: NextRequest): string {
  const acceptLanguage =
    request.headers.get("accept-language")?.split(",")[0] || i18n.defaultLocale;

  return (
    i18n.locales.find((locale) =>
      acceptLanguage.toLowerCase().startsWith(locale.toLowerCase())
    ) || i18n.defaultLocale
  );
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Add debug logging
  console.log(`[Middleware] Processing: ${pathname}`);

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes("/favicon") ||
    pathname.includes(".ico") ||
    pathname === "/sitemap.xml" ||
    pathname === "/admin-login" ||
    /\.(jpg|jpeg|png|gif|svg|css|js)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Handle admin routes
  if (pathname.startsWith("/admin/")) {
    const adminCookie = request.cookies.get("admin_access");
    if (!adminCookie || adminCookie.value !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
    return NextResponse.next();
  }

  // Extract locale and path
  const pathSegments = pathname.split("/");
  const potentialLocale = pathSegments[1] as Locale;
  const path = pathSegments.slice(2).join("/");

  // Special handling for root path
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  // If no locale is present, redirect to default locale
  if (!i18n.locales.includes(potentialLocale)) {
    return NextResponse.redirect(
      new URL(`/en/${pathname.replace(/^\/+/, "")}`, request.url)
    );
  }

  // IMPORTANT: Special handling for blog routes - completely bypass other rules
  if (path === "blog" || path.startsWith("blog/")) {
    return NextResponse.next();
  }

  // Only for non-blog routes: handle standard/localized path logic
  const standardPath = getStandardPath(path, potentialLocale);

  // If we're already on a standard path or a path that doesn't need processing, just pass through
  if (standardPath === path || !routes[standardPath]) {
    return NextResponse.next();
  }

  const route = routes[standardPath];
  if (route && route.localized[potentialLocale]) {
    const localizedPath = route.localized[potentialLocale].path;

    // If accessing standard path, redirect to localized
    if (path === standardPath && localizedPath !== standardPath) {
      return NextResponse.redirect(
        new URL(`/${potentialLocale}/${localizedPath}`, request.url)
      );
    }

    // If on localized path, rewrite to standard path
    if (path === localizedPath) {
      const url = new URL(`/${potentialLocale}/${standardPath}`, request.url);
      return NextResponse.rewrite(url);
    }
  }

  // At the end
  console.log(`[Middleware] Completed processing: ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/admin-login",
    "/:lang/admin-login",
  ],
};
