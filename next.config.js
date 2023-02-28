/** @type {import('next').NextConfig} */
const withLess = require('next-with-less')

const nextConfig = {
  reactStrictMode: true,
  lessLoaderOptions: {},
}

module.exports = withLess(nextConfig)
