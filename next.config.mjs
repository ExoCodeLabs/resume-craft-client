// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/resumecraft-ai.github.io",
  output: "export",
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse", "fs"], // Treat pdf-parse as a server-side package
  },
}

export default nextConfig
