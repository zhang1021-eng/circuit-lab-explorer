
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Since we're transitioning from a Vite project, we need to configure appropriately
  webpack: (config) => {
    // Add support for importing .tsx files without specifying extensions
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', ...config.resolve.extensions];
    return config;
  },
  // Use the Vite public directory for static files
  publicRuntimeConfig: {
    staticFolder: '/public',
  }
};

module.exports = nextConfig;
