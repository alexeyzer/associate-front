const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1/',
    createProxyMiddleware({
      target: 'https://glowing-succotash-w5vvxwvxrgpfg7x-7000.app.github.dev',
      changeOrigin: true,
    })
  );
};