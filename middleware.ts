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
  console.log("[middleware] Request:", pathname);

  // Skip middleware for API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Admin routes check (including language prefixes)
  if (pathname.includes('/admin') && !pathname.includes('admin-login')) {
    const adminCookie = request.cookies.get('admin_access');
    console.log('[middleware] Cookie check:', !!adminCookie);

    if (!adminCookie?.value || adminCookie.value !== process.env.ADMIN_SECRET) {
      console.log('[middleware] Unauthorized access, redirecting to login');
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // Skip static files
  if (/\.(jpg|jpeg|png|gif|ico|css|js)$/i.test(pathname)) {
    return NextResponse.next();
  }

  // Handle localized paths
  const [_, locale, ...rest] = pathname.split("/");
  const path = rest.join("/");

  if (i18n.locales.includes(locale as any)) {
    // Special handling for tag routes
    if (path.startsWith("blog/tag/")) {
      const tagPart = path.replace("blog/tag/", "");
      const decodedTag = decodeURIComponent(tagPart);
      const normalizedTag = decodedTag.toLowerCase();
      const encodedNormalizedTag = encodeURIComponent(normalizedTag);

      if (tagPart !== encodedNormalizedTag) {
        return NextResponse.redirect(
          new URL(`/${locale}/blog/tag/${encodedNormalizedTag}`, request.url)
        );
      }
      return NextResponse.next();
    }

    const standardPath = getStandardPath(path, locale as any);
    const route = routes[standardPath];

    console.log("[middleware] Route resolution:", {
      path,
      standardPath,
      hasRoute: !!route,
      expectedPath: route?.localized[locale]?.path,
    });

    if (route) {
      const localizedPath = route.localized[locale].path;

      // If accessing standard path, redirect to localized
      if (path === standardPath && localizedPath !== standardPath) {
        const redirectUrl = new URL(`/${locale}/${localizedPath}`, request.url);
        console.log(
          "[middleware] Redirecting to localized:",
          redirectUrl.pathname
        );
        return NextResponse.redirect(redirectUrl);
      }

      // If on localized path, set canonical and rewrite
      if (path === localizedPath) {
        const response = NextResponse.rewrite(
          new URL(`/${locale}/${standardPath}`, request.url)
        );
        response.headers.set("x-canonical-url", `/${locale}/${localizedPath}`);
        return response;
      }

      // Otherwise, rewrite to the standard path for Next.js routing
      if (path === localizedPath) {
        const rewriteUrl = new URL(`/${locale}/${standardPath}`, request.url);
        console.log(
          "[middleware] Rewriting to standard path:",
          rewriteUrl.pathname
        );
        return NextResponse.rewrite(rewriteUrl);
      }
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
    "/:lang/admin/:path*"  // Add this to catch language-prefixed admin routes
  ],
};
