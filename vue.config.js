const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')

function resolve(dir) {
  return path.join(__dirname, dir)
}

function publicPath() {
  return process.env.NODE_ENV === 'production' ? '././' : '/'
}

module.exports = defineConfig({
  publicPath: publicPath(),
  lintOnSave: false,
  transpileDependencies: true,
  
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': resolve('src'),
        'vue-amap': 'vue-amap/dist/index.full.min.js'
      }
    },
    externals: process.env.NODE_ENV === 'production' ? {
      'AMap': 'AMap',
      'AMapUI': 'AMapUI'
    } : {},
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
      })
    ]
  },

  devServer: {
    host: "localhost",
    port: 8081,
    hot: true,
    https: false,
    proxy: {
      '/xiaoyuanshitangdingcan': {
        target: 'http://localhost:8080/xiaoyuanshitangdingcan/',
        changeOrigin: true,
        pathRewrite: { '^/xiaoyuanshitangdingcan': '' }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },

  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons/svg')).end()
    
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons/svg')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]', extract: false })
      .end()
      .before('file-loader').end()
    
    if (process.env.NODE_ENV === 'development') {
      config.plugin('notifier')
        .use(WebpackNotifierPlugin, [{
          title: '项目构建',
          alwaysNotify: true,
          contentImage: path.resolve(__dirname, 'src/icons/icon.png')
        }])
      
      config.optimization.minimize(false)
    }
    
    if (process.env.NODE_ENV === 'production') {
      config.plugin('define').tap(args => {
        args[0]['process.env'].AMAP_KEY = JSON.stringify('ca04cee7ac952691aa67a131e6f0cee0')
        return args
      })
    }
  }
})