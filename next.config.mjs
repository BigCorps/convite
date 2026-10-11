/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/roteiro', destination: '/roteiro.html' },
    ];
  },
};

export default nextConfig;
