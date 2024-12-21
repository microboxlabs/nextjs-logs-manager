/** @type {import('next').NextConfig} */

const {
  DATABASE_URL = undefined,
  JWT_SECRET = undefined,
  BASE_API_URL = "",
} = process.env;

const nextConfig = {
  env: {
    DATABASE_URL,
    JWT_SECRET,
    API_URL: BASE_API_URL,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
