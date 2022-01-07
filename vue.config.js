const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  publicPath: "/admin",
  transpileDependencies: true,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import '@/assets/scss/variable.scss';
          @import '@/assets/scss/mixins.scss';
        `,
      },
    },
  },
  devServer: {
    open: false,
    proxy: {
      public: {
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true,
      },
      api: {
        target: process.env.VUE_APP_BASE_URL,
        ws: true,
        changeOrigin: true, //允许跨域
      },
    },
  },
})
