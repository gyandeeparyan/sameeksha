/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'overreacted.io',
            port: '',
            pathname: '/about'
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/about'
          },
        ],
      },
};

export default nextConfig;
