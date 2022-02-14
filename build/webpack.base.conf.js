'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

/**
 * svg-sprite-loader是对svg图片的使用
 * 若使用svg-sprite-loader这个插件,需要在配置中添加解析,并且原文件已经解析过svg,需要使用exculde排除svg放的目录
 * @example https://blog.csdn.net/github_35631540/article/details/78818919
 */
module.exports = {
  context: path.resolve(__dirname, '../'),
  // 指定程序入口文件
  entry: {
    app: './src/main.js'
  },
  // 指定打包时输出的目录以及文件
  output: {
    // 指定打包好的文件输出到那个目录中
    path: config.build.assetsRoot,
    // 指定输出的文件名
    filename: '[name].js',
    // 指定访问路径,根据环境不同而不同,环境配置在config目录中
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 设置vue被导入时的包路径,默认在main.js中导入的是node_modules/vue/dist/vue.runtime.common.js
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      "vendor": path.resolve(__dirname, "../src/vender"),
    }
  },
  // module配置所有第三方模块加载器
  module: {
    // 定义匹配规则
    rules: [
      // 直接使用插件的调用规则
      // {
        // 匹配规则
        // test: /\.css$/,
        // 使用的插件,从书写的后面往前面开始匹配
        // use: ['style-loader', 'css-loader']
      // },
      {
        test: /\.vue$/,
        // 会先从配置文件中查看同名的loader,再根据loader中的use属性使用插件
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 将ES6以上的语法转换为低级语法,否则部分浏览器无法识别
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        // 在url-loader后添加其他关键字限制文件的行为
        // limit:限制图片大小,图片大小单位以字节计算.当图片大于limit时,直接展示图片;当图片小于limit时,将图片转成base64
        // name:展示时图片的名字,默认为32位hash.为避免重复,前面可以加上32位hash
        // [hash:32]表示使用32位hash;[name]表示使用原文件名;[ext]表示使用原后缀
        // loader: "url-loader?limit=10000&name=[hash:32]-[name].[ext]",
        exclude: [resolve('src/icons')],
        // options对象功能等同于在url-loader后添加属性
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
