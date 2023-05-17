/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["89.163.209.153", "127.0.0.1"],
  },
  output: "standalone",
};

module.exports = nextConfig;
