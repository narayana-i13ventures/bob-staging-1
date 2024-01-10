/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/Dashboard',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
