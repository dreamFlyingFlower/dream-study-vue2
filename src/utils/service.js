import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import {showFullScreenLoading,tryHideFullScreenLoading} from './loading';


/**
 * 一个猜想,如果经常变动的参数需要加载,而node build之后由于重新编码问题,无法进行修改,是否可以用require来解决
 * require一个static中的json文件或者js文件,将配置加载,但是修改config文件之后都要重启
 * 或者直接在需要的时候使用ajax同步调用static文件中的config.json文件,拿到里面的值之后再操作
 * 
 * 经测试,require和ajax都可以拿到config.json,但是build之后是否有效还未测试
 */
const config = require('../../static/config.json');

/**
 * 封装后的axios服务,配置通用配置
 * @example https://www.npmjs.com/package/axios
 * process是node的一个全局变量,哪里都可以用,如果是全局配置可写在config的dev.env.js和prod.env.js中
 * 这是开发环境和生成环境的配置文件
 */
// 创建一个实例
const service = axios.create({
  baseURL: process.env.API_ROOT, //请求后台接口的基础url
  timeout: process.env.TIME_OUT //请求超时时间
});

// 设置请求头contenttype,使用restful接口;当使用post请求时,数据需要用data:data,其他可直接使用params
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截
service.interceptors.request.use(
  config => {
    // 全局请求遮罩层
    showFullScreenLoading();
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken();
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error);
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    tryHideFullScreenLoading();
    const res = response.data;
    // 请求失败
    if (res.code !== 1) {
      Message({
        message: res.message,
        type: 'error',
        duration: this.$global.loadingTime
      });
      // -9998:非法的token; -9997:其他客户端登录了;  -9996:Token 过期了;
      if (res.code === -9998 || res.code === -9997 || res.code === -9996) {
        this.$router.push("/login");
      }
      return Promise.reject('error');
    } else {
      return response.data;
    }
  },
  error => {
    tryHideFullScreenLoading();
    console.log('err' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: this.$global.loadingTime
    })
    return Promise.reject(error);
  }
);

export default service;