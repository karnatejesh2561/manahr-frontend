/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'frontend-demo-3d.cluster-12.preview.emergentcf.cloud',
    '*.preview.emergentagent.com',
    '*.emergentcf.cloud',
    '*.emergentagent.com',
  ],
}

module.exports = nextConfig
