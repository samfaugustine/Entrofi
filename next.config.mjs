/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure the gated guide HTML is bundled into the route handlers' serverless
  // functions on Vercel (the files live outside /public so they stay gated).
  experimental: {
    outputFileTracingIncludes: {
      "/resources/claude-code": ["./content/guides/**"],
      "/resources/claude-code/overview": ["./content/guides/**"],
    },
  },
};

export default nextConfig;
