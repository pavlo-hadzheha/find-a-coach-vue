const { defineConfig } = require('@vue/cli-service')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const Components = require('unplugin-vue-components/webpack')

module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    workboxOptions: {
      navigateFallback: 'index.html',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts./,
          handler: 'CacheFirst',
          options: { cacheName: 'dealer-pilot-external-fonts' }
        }
      ]
    }
  },

  configureWebpack: {
    plugins: [
      Components({
        dirs: [],
        resolvers: [ElementPlusResolver({
          importStyle: false
        })]
      })
    ]
  }
})
