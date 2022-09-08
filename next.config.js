/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      allowFutureImage: true,
    }
  }
}

module.exports = withLess(nextConfig);
