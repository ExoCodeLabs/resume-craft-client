// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/resume-craft-client",
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse", "fs"], // Treat pdf-parse as a server-side package
  },
}

export default nextConfig
