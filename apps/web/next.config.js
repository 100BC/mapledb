const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  reactStrictMode: true,

  images: {
    minimumCacheTTL: 60 * 60 * 24 * 1,
    domains: ['res.cloudinary.com'],
  },

  i18n: {
    locales: ['en-CA'],
    defaultLocale: 'en-CA',
  },

  // Allows SVGs to be added as components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  async redirects() {
    return [
      {
        source: '/music',
        destination: '/music/all',
        permanent: true,
      },
      {
        source: '/albums/all',
        destination: '/music/all',
        permanent: true,
      },
      {
        source: '/musicians',
        destination: '/musicians/all',
        permanent: true,
      },
    ];
  },
});
