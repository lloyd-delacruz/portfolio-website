import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { PROJECT_LIST } from '@/lib/projects'
import { loadPostsFromFiles } from '@/lib/blog-server'

/**
 * `sitemap.ts` is emitted statically, so it survives `output: 'export'`
 * (unlike `redirects()` in next.config, which is server-only and dropped).
 *
 * Retired routes (`/projects`, `/skills`, `/experience`, `/education`,
 * `/case-studies/*`) are deliberately absent — they serve noindex meta-refresh
 * bridges and are disallowed in robots.ts.
 */
export const dynamic = 'force-static'

/**
 * A fixed date rather than `new Date()`: a module-scope `new Date()` would
 * rewrite every `lastModified` on every build, which trains crawlers to ignore
 * the field. Bump this when the static pages meaningfully change.
 */
const STATIC_LAST_MODIFIED = new Date('2026-08-08T00:00:00.000Z')

/**
 * Project slugs that have a real page directory under `src/app/work/`. The
 * registry in `lib/projects.ts` is broader than what is routable — listing a
 * slug here that has no page would put a guaranteed 404 in the sitemap.
 */
const WORK_PAGE_SLUGS = new Set([
  'wheelchair-tracking',
  'mepp',
  'clinical-ai-assistant',
  'spendwise',
  'clinical-risk-engine',
  'population-health-intelligence',
  'clinical-genai-pipeline',
  'healthcare-automation-engine',
  'equitrackr',
  'apex-protocol',
  'client-work',
  'website-gemms',
  'self-hosted-infrastructure',
])

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${SITE_URL}/`, changeFrequency: 'monthly', priority: 1 },
      { url: `${SITE_URL}/work`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
      { url: `${SITE_URL}/systems`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.6 },
      { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: STATIC_LAST_MODIFIED }))

  const workRoutes: MetadataRoute.Sitemap = PROJECT_LIST.filter((project) =>
    WORK_PAGE_SLUGS.has(project.slug)
  ).map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: 'monthly',
    priority: project.tier === 'flagship' ? 0.8 : 0.6,
  }))

  const blogRoutes: MetadataRoute.Sitemap = loadPostsFromFiles().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ?? STATIC_LAST_MODIFIED,
    changeFrequency: 'yearly',
    priority: post.featured ? 0.6 : 0.5,
  }))

  return [...staticRoutes, ...workRoutes, ...blogRoutes]
}
