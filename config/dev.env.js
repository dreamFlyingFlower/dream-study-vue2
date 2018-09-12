'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

/**
 * dev.env和prod.env是项目的全局配置文件,是通过node加载到程序中,可在全局通用
 * process是node运行后产生的一个全局变量,里面包含大量信息,可以直接使用process.env来拿到这2个文件中的所有参数
 * 如获得api_root,process.env.API_ROOT
 * 如果是通用配置,可直接都写在prod.env.js中
 */
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://localhost:8080/"',
  TIME_OUT:'5000'
})
