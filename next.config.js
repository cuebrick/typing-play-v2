/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: {
      displayName: false
    }
  }
};

module.exports = nextConfig;
