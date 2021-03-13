module.exports = {
  proxyList: {
    "/apiTest": {
      target: `${process.env.VUE_APP_BASE_URL}`, //设置调用接口域名和端口号别忘了加http
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true,
      ws: true,
      toProxy: true,
      pathRewrite: {
        "^/apiTest": "/"
      }
    },
    "/apis": {
      target: `${process.env.VUE_APP_BASE_URL}`,
      secure: false,
      changeOrigin: true,
      ws: true,
      toProxy: true,
      pathRewrite: {
        "^/apis": "/"
      }
    },
    "/apiMap": {
      target: `${process.env.MapUrl}`,
      secure: false,
      changeOrigin: true,
      ws: true,
      toProxy: true,
      pathRewrite: {
        "^/map": "/"
      }
    }
  }
};
