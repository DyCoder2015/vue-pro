'use strict'
const path = require('path')
// const defaultSettings = require('./src/settings.js')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// const name = defaultSettings.title || '' // page title
const port = process.env.port || process.env.npm_config_port || 8180 // dev port
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
	https:true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: '//www.charkey.cloud', 
        changeOrigin: true,
        pathRewrite: {
          // ['^' + process.env.VUE_APP_BASE_API]: ''
          '^/api/': ''
        }
      }
    }
  },
  configureWebpack: {
    // name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  // pages: {//配置多页面入口        
  //   login: {          
  //     entry: 'src/login/login.main.js',          
  //     template: 'public/login.html',        
  //   },        
  //   index: {          
  //     entry: 'src/main.js',          
  //     template: 'public/index.html',        
  //   },    
  // },
  chainWebpack: config => {
    // set preserveWhitespace 去除元素之间空格
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
          options.compilerOptions.preserveWhitespace = true
      })
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        // config => config.devtool('cheap-source-map') 默认的
        config => config.devtool('eval') // 开发调试模式为eval(跟源码不同),调试为source-map(跟源码相同)
      )
  },
  // 转rem 设置
 css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            remUnit: 37.5,
            exclude: 'node_modules' // 忽略 第三方组件设置
          })
        ]
      }
    }
  }
}
