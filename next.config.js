/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      'www.notion.so', 
      'avatars.githubusercontent.com'
    ]
  }
}

module.exports = nextConfig
