/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  //basePath: "fastering18.github.io",
  assetPrefix: "./",
  distDir: 'out',
  images: {
    unoptimized: true,
    path: "",
  },
};

module.exports = nextConfig;