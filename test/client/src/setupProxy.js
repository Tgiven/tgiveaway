import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app) {
  app.use(
    "/api", // Specify the path you want to proxy
    createProxyMiddleware({
      target: "https://teslagiveaway-api.vercel.app", // Specify the target URL of the backend
      changeOrigin: true,
    })
  );
};
