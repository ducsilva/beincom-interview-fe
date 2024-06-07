/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "group.beincom.com",
        port: "",
      },
    ],
  },
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

export default nextConfig;
