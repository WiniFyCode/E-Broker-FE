/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/sdk"],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_API_URL 
          ? `${process.env.BACKEND_API_URL}/:path*`
          : 'http://localhost:3000/:path*',
      },
    ]
  },
}

export default nextConfig
