/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/webp'],
    domains: ['i.imgur.com']
  },
  experimental: {
    images: {
      allowFutureImage: true,
    }
  }
}

module.exports = withLess(nextConfig);
