import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

/**
 * `robots.ts` is emitted statically, so it survives `output: 'export'` (unlike
 * `redirects()` in next.config, which is server-only and silently dropped).
 *
 * Disallowed paths fall into two groups, both already carrying
 * `robots: { index: false }` on the page itself — the disallow here just
 * keeps crawlers from re-fetching URLs with nothing worth indexing:
 *  - retired routes that now serve meta-refresh bridge pages
 *    (/projects, /skills, /experience, /education, /case-studies)
 *  - pre-redesign dashboard demos with no live internal links pointing to
 *    them (/dashboards, /health-dashboard)
 */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/projects/',
          '/skills/',
          '/experience/',
          '/education/',
          '/case-studies/',
          '/dashboards/',
          '/health-dashboard/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
