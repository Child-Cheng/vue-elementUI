const proxyConfig = require("./globalConfig/proxyConfig");
// eslint-disable-next-line no-unused-vars
const webpack = require("webpack");
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.plugins.delete("fork-ts-checker"); // 禁用fork-ts-checker
    config.plugin("html").tap(args => {
      args[0].title = "電子站牌發饰後台管理系統";
      return args;
    });
  },
  publicPath: process.env.NODE_ENV === "prod" ? "/" : "./",
  outputDir: `dist-${process.env.NODE_ENV}`,
  assetsDir: "public",
  filenameHashing: false,
  productionSourceMap: false,
  // 它支持webPack-dev-server的所有选项
  devServer: {
    port: 9011, // 端口号
    https: false, // https:{type:Boolean}
    open: "Google Chrome", //配置自动启动浏览器
    openPage: "/", //指定打开浏览器时要导航到的页面
    proxy: proxyConfig.proxyList
  },
  // 配置webpack打包
  configureWebpack: config => {
    // 取消console打印
    config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
  }
};
