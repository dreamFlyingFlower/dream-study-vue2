// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';//引入vuex的store
import ElementUI from "element-ui";
import i18n from './lang'; //语言配置
import 'element-ui/lib/theme-chalk/index.css'; //默认主题
import Global from './global'; // vue全局变量和方法,只能在vue文件中使用
import './icons'; // svg-icon

Vue.config.productionTip = false;
// 使用语言选择,在vue文件中使用$t(key),其中key是lang/zh中的key,会根据文件自动切换
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(Global);

// 取消vue所有的日志和警告,true取消
Vue.config.silent=false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
