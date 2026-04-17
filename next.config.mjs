/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Permite que las compilaciones de producción se completen con éxito incluso si
    // tu proyecto tiene errores de TypeScript.
    // !! ADVERTENCIA !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignorar errores de ESLint durante la compilación
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
