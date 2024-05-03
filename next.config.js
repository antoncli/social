/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/feed",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  env: {
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
