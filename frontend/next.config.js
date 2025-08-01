const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use export mode in production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true
  },
  // Enable font optimization
  optimizeFonts: true,
  // Disable font optimization warnings in development
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configure MDX
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
}

module.exports = withMDX(nextConfig)