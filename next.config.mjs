import { readFileSync } from 'fs'
import { join } from 'path'

let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

function parseRedirects() {
  try {
    const content = readFileSync(join(process.cwd(), 'public/_redirects'), 'utf8')
    // Skip redirects that would conflict with language-based routing
    return content
      .split('\n')
      .filter(line => line && !line.startsWith('#'))
      .filter(line => {
        const [from] = line.trim().split(/\s+/)
        // Skip redirects that would interfere with language prefixes
        return !from.match(/^\/[a-z]{2}(\/|$)/)
      })
      .map(line => {
        const [from, to, code] = line.trim().split(/\s+/)
        return {
          source: from,
          destination: to,
          permanent: code === '308'
        }
      })
  } catch (error) {
    console.warn('No _redirects file found or error reading it:', error)
    return []
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'twofifty.co',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`,
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com', // Allow all Cloudinary subdomains
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'none'; sandbox;",
    // unoptimized: process.env.NODE_ENV === 'development',
    // Optimized sizes covering most common use cases
    deviceSizes: [640, 750, 1080, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },
  async rewrites() {
    return [
      {
        source: '/:lang/images/:path*',
        destination: '/images/:path*',
      },
    ]
  },
  async redirects() {
    // Get redirects from _redirects file
    const fileRedirects = parseRedirects()

    // Add any hardcoded redirects, but be careful not to conflict with language routing
    return [
      ...fileRedirects,
      // Example of a safe redirect:
      {
        source: '/legacy-path',
        destination: '/en/new-path',
        permanent: true
      },
      // Avoid redirects like these:
      // { source: '/fr/blog', destination: '/en/blog', permanent: true },
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  experimental: {
    typedRoutes: true,
    serverActions: true
  },
  output: 'standalone',
  // Specify which routes should be dynamic
  dynamicRoutes: {
    '/[lang]/blog/[slug]': { dynamic: true },
    '/[lang]/speaking-events': { dynamic: true },
    '/[lang]/admin/articles': { dynamic: true },
  }
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default {
  ...nextConfig,
  experimental: {
    ...nextConfig.experimental,
    serverActions: {
      bodySizeLimit: '3mb'
    }
  }
}
