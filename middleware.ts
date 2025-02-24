import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { i18n } from "./i18n-config";
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

  // Skip middleware for static files and favicons
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes("/favicon") ||
    pathname.includes(".ico") ||
    /\.(jpg|jpeg|png|gif|svg|css|js)$/i.test(pathname)
  ) {
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

  // If accessing a path without language code, redirect to /en/
  if (!i18n.locales.includes(potentialLocale as any)) {
    return NextResponse.redirect(
      new URL(`/en/${pathname.replace(/^\/+/, "")}`, request.url)
    );
  }

  // Check if it's an admin route
  if (
    request.nextUrl.pathname.startsWith("/api/admin") ||
    request.nextUrl.pathname.includes("/admin/")
  ) {
    const adminCookie = request.cookies.get("admin_access");
    const isApiRoute = request.nextUrl.pathname.startsWith("/api/admin");

    // Allow login API route
    if (request.nextUrl.pathname === "/api/admin/login") {
      return NextResponse.next();
    }

    // Check for valid admin cookie
    if (!adminCookie || adminCookie.value !== process.env.ADMIN_SECRET) {
      // For API routes, return 401
      if (isApiRoute) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
      // For page routes, redirect to login
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
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
      const redirectUrl = new URL(
        `/${potentialLocale}/${localizedPath}`,
        request.url
      );
      console.log(
        "[middleware] Redirecting to localized:",
        redirectUrl.pathname
      );
      return NextResponse.redirect(redirectUrl);
    }

    // If on localized path, set canonical and rewrite
    if (path === localizedPath) {
      const response = NextResponse.rewrite(
        new URL(`/${potentialLocale}/${standardPath}`, request.url)
      );
      response.headers.set(
        "x-canonical-url",
        `/${potentialLocale}/${localizedPath}`
      );
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all admin routes including those with language prefixes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/admin/:path*",
    "/admin-login",
    "/:lang/admin/:path*", // Add this to catch language-prefixed admin routes
    "/api/admin/:path*",
  ],
};
