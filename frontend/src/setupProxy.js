const { createProxyMiddleware } = require('http-proxy-middleware');

// only redirect url paths that are 5 characters long
const regex = /\/.{5}/;
module.exports = function(app) {
  app.use(
    regex,
    createProxyMiddleware({
      target: 'http://localhost:9090',
      changeOrigin: true,
    })
  );

  app.post(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:9090',
      changeOrigin: true,
    })
  )
};