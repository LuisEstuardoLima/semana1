/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'onrender.com'],
  },
  // Ignorar errores de ESLint en producción
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignorar errores de TypeScript en producción
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;