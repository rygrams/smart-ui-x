import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/api/ai/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'same-origin' },
          { key: 'Access-Control-Allow-Methods', value: 'GET' },
        ],
      },
    ]
  },
}

export default nextConfig
