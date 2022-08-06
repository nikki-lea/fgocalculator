/** @type {import('next').NextConfig} */
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

module.exports = nextConfig
