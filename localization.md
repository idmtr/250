# TwoFifty Consulting - Next.js Internationalization Guide

## Overview

Our Next.js 15+ application uses a dual-path routing system that handles both standard and localized URLs. The system supports:

- Standard paths (e.g., `/fr/mission`)
- Localized paths (e.g., `/fr/notre-mission`)
- Automatic redirects between them
- SEO-friendly URLs with proper canonical tags

## Core Components

### 1. URL Configuration

```typescript
// Standard route configuration
type LocalizedRouteConfig = {
  standard: string;
  localized: {
    [key in Locale]: {
      path: string;
      title: string;
      canonicalPath?: string;
    }
  }
};

// Example route
mission: {
  standard: "mission",
  localized: {
    en: {
      path: "our-mission",
      title: "Our Mission",
      canonicalPath: "/en/our-mission",
    },
    fr: {
      path: "notre-mission",
      title: "Notre Mission",
      canonicalPath: "/fr/notre-mission",
    }
  }
}
```

### 2. URL Resolution Flow

1. User visits a URL (e.g., `/fr/mission`)
2. Middleware intercepts the request
3. Path is checked against route configurations
4. Redirects to localized version if needed
5. Page is rendered with correct content

```typescript
// URL Resolution Examples:
/fr/mission       → redirects to → /fr/notre-mission
/fr/notre-mission → renders      → Mission page in French
/mission          → redirects to → /en/our-mission (default locale)
```

### 3. Core Functions

```typescript
// Get localized version of a path
getLocalizedPath("mission", "fr"); // Returns "notre-mission"

// Get standard version of a path
getStandardPath("notre-mission", "fr"); // Returns "mission"

// Get canonical URL
getCanonicalUrl("notre-mission", "fr", "https://example.com");
// Returns "https://example.com/fr/notre-mission"
```

## Implementation Details

### 1. Middleware (URL Handling)

```typescript
// Middleware responsibilities:
- Skip static files and API routes
- Check if URL needs locale prefix
- Redirect standard paths to localized versions
- Set headers for page routing
```

### 2. Route Configuration

```typescript
routes: {
  standard: "path-key",      // Internal route key
  localized: {              // Language-specific paths
    en: { path, title },    // English version
    fr: { path, title },    // French version
    de: { path, title },    // German version
    es: { path, title }     // Spanish version
  }
}
```

### 3. Path Resolution Strategy

1. Clean incoming path
2. Check if it's a standard path
3. Look up localized version
4. Redirect or render as needed

## URL Examples

| Standard Path | English URL             | French URL              | German URL               |
| ------------- | ----------------------- | ----------------------- | ------------------------ |
| mission       | /en/our-mission         | /fr/notre-mission       | /de/unsere-mission       |
| education     | /en/coworking-education | /fr/formation-coworking | /de/coworking-ausbildung |

## Testing & Validation

```bash
# Test standard to localized redirects
curl -I http://localhost:3000/fr/mission
# Expected: 307 redirect to /fr/notre-mission

# Test localized path rendering
curl -I http://localhost:3000/fr/notre-mission
# Expected: 200 OK
```

## Best Practices

1. **URL Structure**

   - Use consistent patterns
   - Keep URLs meaningful in each language
   - Maintain standard/localized path mapping

2. **SEO Optimization**

   - Set proper canonical URLs
   - Include language alternates
   - Use localized metadata

3. **Content Management**
   - Keep translations in sync
   - Update all language versions
   - Maintain consistent routing

## Common Issues

1. **404 Errors**

   - Check route configuration
   - Verify middleware redirect rules
   - Ensure page components exist

2. **Incorrect Redirects**
   - Check path cleaning
   - Verify locale detection
   - Validate route mapping

## Directory Structure

```
/app/
  [lang]/            # Language-based routes
    page.tsx         # Home page
    mission/         # Standard path pages
      page.tsx
    [...slug]/       # Catch-all for localized paths
      page.tsx
/lib/
  url-utils.ts       # URL handling utilities
/middleware.ts       # URL processing & redirects
```

## Future Improvements

1. Better handling of missing translations
2. Market-specific routing (e.g., fr-CA)
3. Dynamic route generation
4. Improved caching strategy

## Language Localization Management

### 1. URL Localization

- **Language Prefixes**: All URLs are prefixed with the language code (e.g., `/fr/`, `/en/`) to indicate the content's language.
- **Localized Paths**: Each route has a corresponding localized path defined in the route configuration, ensuring that users are directed to the correct language version of the content.
- **Automatic Redirects**: Middleware handles redirects from standard paths to their localized counterparts based on the user's language preference or browser settings.

### 2. Content Localization

- **Translation Management**: All content is translated and stored in language-specific files or databases. This ensures that users receive content in their preferred language.
- **Dynamic Content Loading**: The application dynamically loads the appropriate content based on the URL's language prefix, allowing for seamless user experiences across different languages.
- **Fallback Mechanism**: If a translation is missing, the application can fall back to a default language (usually English) to ensure that users still receive relevant content.

### 3. Metadata Localization

- **Localized Metadata**: Each page includes language-specific metadata, such as titles and descriptions, which are crucial for SEO. This metadata is defined in the route configuration.
- **Canonical Tags**: Proper canonical tags are set for each localized version of a page to prevent duplicate content issues and to inform search engines about the preferred version of the content.
- **Language Alternates**: The application includes `<link rel="alternate" hreflang="x">` tags in the HTML head to indicate the available language versions of a page, improving SEO and user navigation.

### 4. Example of URL and Metadata Handling

- For a page like "Our Mission":
  - **URL**: `/fr/notre-mission`
  - **Title**: "Notre Mission"
  - **Canonical URL**: `https://example.com/fr/notre-mission`
  - **Alternate Tags**:
    ```html
    <link
      rel="alternate"
      hreflang="en"
      href="https://example.com/en/our-mission"
    />
    <link
      rel="alternate"
      hreflang="fr"
      href="https://example.com/fr/notre-mission"
    />
    ```

This structured approach ensures that users have a consistent and localized experience across the application, enhancing usability and SEO performance.
