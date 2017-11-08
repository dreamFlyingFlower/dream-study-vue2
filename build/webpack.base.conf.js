// 基础配置文件引入
// 引入依赖模块
var path = require('path');
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
var webpack = require("webpack");
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

//__dirname是node中一个全局变量,指代当前执行脚本所在目录
function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  // 入口文件，路径相对于本文件所在的位置，可以写成字符串、数组、对象
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,//  打包存放地址
    filename: '[name].js',//打包后输出的文件名称
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      "jquery":"jquery"
    }
  },
  module: {
    // test是正则表达式，匹配要处理的文件；loader匹配要使用的loader，"-loader"可以省略；include把要处理的目录包括进来，exclude排除不处理的目录
    rules: [
      // 使用vue-loader 加载 .vue 结尾的文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 使用babel 加载 .js 结尾的文件
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // 使用css-loader、autoprefixer-loader和style-loader 加载 .css 结尾的文件
      // {
      //   test: /\.css$/,
      //   // 将样式抽取出来为独立的文件
      //   loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader"),
      //   exclude: /node_modules/
      // },
      // // 使用less-loader、autoprefixer-loader、css-loader和style-loade 加载 .less 结尾的文件
      // {
      //   test: /\.less$/,
      //   // 将样式抽取出来为独立的文件
      //   loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader"),
      //   exclude: /node_modules/
      // },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
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
  plugins: [
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    })
  ]
};