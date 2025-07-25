// Application constants

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  EXPERIENCE: '/experience',
  EDUCATION: '/education',
  SKILLS: '/skills',
  PROJECTS: '/projects',
  CONTACT: '/contact',
  BLOG: '/blog',
  DASHBOARDS: {
    HAPPINESS: '/dashboards/happiness-analytics',
    LIFE_EXPECTANCY: '/dashboards/life-expectancy',
    INVENTORY: '/dashboards/inventory-management',
    HEART_DISEASE: '/dashboards/heart-disease-prediction',
    OPERATIONS: '/dashboards/operational-optimization',
    HEALTH: '/health-dashboard'
  }
} as const;

export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/lloydelacruz',
  LINKEDIN: 'https://linkedin.com/in/lloydelacruz',
  EMAIL: 'mailto:lloyd@example.com'
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