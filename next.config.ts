/** @type {import('next').NextConfig} */

const withLess = require("next-with-less");
const {i18n} = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'imgix',
    path: 'https://i.imgur.com',
  },
  i18n
}

module.exports = withLess(nextConfig);
