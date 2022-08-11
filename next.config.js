/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'imgix',
    path: 'https://i.imgur.com',
  }
}

module.exports = withLess(nextConfig);
