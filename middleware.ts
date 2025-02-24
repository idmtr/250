import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n-config";
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

  // Check if it's an admin-login attempt with language prefix
  if (pathname.match(/^\/[a-z]{2}\/admin-login$/)) {
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  // Skip middleware for static files, API routes, and admin paths
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

  // Redirect root to default language
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/en`, request.url));
  }

  // Extract locale and path
  const pathSegments = pathname.split("/");
  const potentialLocale = pathSegments[1];
  const path = pathSegments.slice(2).join("/");

  // If accessing a non-admin path without language code, redirect to /en/
  if (!i18n.locales.includes(potentialLocale as any)) {
    return NextResponse.redirect(
      new URL(`/en/${pathname.replace(/^\/+/, "")}`, request.url)
    );
  }

  // Special handling for tag routes
  if (path.startsWith("blog/tag/")) {
    const tagPart = path.replace("blog/tag/", "");
    const decodedTag = decodeURIComponent(tagPart);
    const normalizedTag = decodedTag.toLowerCase();
    const encodedNormalizedTag = encodeURIComponent(normalizedTag);

    if (tagPart !== encodedNormalizedTag) {
      return NextResponse.redirect(
        new URL(
          `/${potentialLocale}/blog/tag/${encodedNormalizedTag}`,
          request.url
        )
      );
    }
    return NextResponse.next();
  }

  const standardPath = getStandardPath(path, potentialLocale as any);
  const route = routes[standardPath];

  console.log("[middleware] Route resolution:", {
    path,
    standardPath,
    hasRoute: !!route,
    expectedPath: route?.localized[potentialLocale]?.path,
  });

  if (route) {
    const localizedPath = route.localized[potentialLocale].path;

    // If accessing standard path, redirect to localized
    if (path === standardPath && localizedPath !== standardPath) {
      return NextResponse.redirect(
        new URL(`/${potentialLocale}/${localizedPath}`, request.url)
      );
    }

    // If on localized path, rewrite to standard path
    if (path === localizedPath) {
      // Instead of setting headers, pass the canonical URL as a searchParam
      const url = new URL(`/${potentialLocale}/${standardPath}`, request.url);
      url.searchParams.set("canonical", `/${potentialLocale}/${localizedPath}`);
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/admin-login",
    "/:lang/admin-login",
  ],
};
