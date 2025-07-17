/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force development server settings
  env: {
    HOSTNAME: '0.0.0.0',
    PORT: '3001'
  },
  // Enable static export as fallback
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig