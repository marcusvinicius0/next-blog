/** @type {import('next').NextConfig} */

const config = require('./config.tsx');

const nextConfig = {
  env: {
    DB_URL: config.DB_URL,
    API: config.API,
    NEXTAUTH_SECRET: config.NEXTAUTH_SECRET,
  },
}

module.exports = nextConfig
