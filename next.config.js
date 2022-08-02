module.exports = {
  images: {
    domains: ['i.imgur.com'],
  },
  async rewrites() {
    return [
      // Rewrite everything else to use `pages/index`
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
};
