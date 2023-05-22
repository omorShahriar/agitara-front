/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["89.163.209.153", "localhost"],
  },
  // output: "standalone",
};

module.exports = nextConfig;
