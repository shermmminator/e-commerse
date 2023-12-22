const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use('/api', createProxyMiddleware({
      target: 'https://GadgetDron-fullstack.onrender.com',
      changeOrigin: true,
      secure: true
    }));
}