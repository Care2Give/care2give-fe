/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        // port: "",
        // pathname: "/wikipedia",
      },
      {
        protocol: "https",
        hostname: "www.techsmith.com",
        // port: "",
        // pathname: "/wikipedia",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
