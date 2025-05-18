/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/fastering18.github.io' : '',
}

module.exports = nextConfig 