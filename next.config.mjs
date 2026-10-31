/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [],
  async redirects() {
    return [
      { source: '/shop', destination: '/buyer', permanent: true },
      { source: '/sell', destination: '/seller', permanent: true },
      { source: '/cart', destination: '/buyer', permanent: true },
      { source: '/checkout', destination: '/buyer', permanent: true },
      { source: '/orders', destination: '/', permanent: true },
      { source: '/orders/:path*', destination: '/', permanent: true },
      { source: '/seller/orders', destination: '/seller', permanent: true },
      { source: '/seller/products/:path*', destination: '/seller', permanent: true },
      { source: '/product/:path*', destination: '/buyer', permanent: true },
    ]
  },
}

export default nextConfig
