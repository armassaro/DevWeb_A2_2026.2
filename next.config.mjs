/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera o site estático na pasta out/ (sem servidor próprio)
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
