const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  // 更改ico
  pwa: {
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
  },
  transpileDependencies: true,
  // 配置打包更改根目录
  publicPath: "./",
  // 配置代理服务器
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8080,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": "/api",
    //     },
    //   },
    // },
  },
});
