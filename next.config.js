const withPWA = require("next-pwa")({
  dest: "public",
  disable:
    process.env.NODE_ENV === "development"
  // delete two lines above to enable PWA in production deployment
  // add your own icons to public/manifest.json
  // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
      },
      
    ]
  }
  
});
