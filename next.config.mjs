// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"], // Treat pdf-parse as a server-side package
  },
}

export default nextConfig
