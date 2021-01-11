
const { createProxyMiddleware } = require("http-proxy-middleware");  

module.exports = function (app) {
  app.use(
    ['/current_user', '/auth/google', '/logout'],
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true
    })
  );
};

