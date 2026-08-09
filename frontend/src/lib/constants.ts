// Application constants

/**
 * Canonical origin, used for metadataBase, canonical URLs, OG tags and the
 * sitemap. Matches the domain already hard-coded in the blog routes.
 * Override per-environment with NEXT_PUBLIC_BASE_URL.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://lloydontech.com';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  SYSTEMS: '/systems',
  CONTACT: '/contact',
  BLOG: '/blog',
  DASHBOARDS: {
    HAPPINESS: '/dashboards/happiness-analytics',
    LIFE_EXPECTANCY: '/dashboards/life-expectancy',
    INVENTORY: '/dashboards/inventory-management',
    HEART_DISEASE: '/dashboards/heart-disease-prediction',
    NATIONAL_HEALTH: '/dashboards/national-health-expenditure',
    HOSPITAL_SPENDING: '/dashboards/hospital-spending',
    HEALTH: '/health-dashboard'
  }
} as const;

export const SOCIAL_LINKS = {
  // Verified handle. Was previously 'lloydelacruz', which 404s.
  GITHUB: 'https://github.com/lloyd-delacruz',
  // Confirmed by owner.
  LINKEDIN: 'https://linkedin.com/in/lloydelacruz',
  // Confirmed by owner as the public contact address.
  EMAIL: 'mailto:lloyd.delacruz@outlook.com'
} as const;

export const DASHBOARD_REFRESH_INTERVALS = {
  REAL_TIME: 5000,
  FREQUENT: 30000,
  NORMAL: 60000,
  SLOW: 300000
} as const;

export const CHART_COLORS = {
  PRIMARY: '#3B82F6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  DANGER: '#EF4444',
  INFO: '#8B5CF6',
  NEUTRAL: '#6B7280'
} as const;