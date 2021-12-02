module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    host: "0.0.0.0", // localhost
    port: 8080, // 端口号
    proxy: {
      // 代理: 配置跨域请求
      "/api": {
        // target: 'https://192.168.137.57:55943', // 开发环境
        // target: "https://192.168.137.57:55944", // 测试环境
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
    open: true, //配置自动启动浏览器
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
};
