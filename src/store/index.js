// jshint esversion:6
// jshint node:true
/**
 * @example https://vuex.vuejs.org/zh/guide/
 * 在vue的main.js中引入store,是其他文件中通过this.$store来调用,store中的几种属性,以user为例
 * modules中定义的模块需要在每个文件中标识namespaced:true,使用的时候需要加上modules中的标识
 * 如this.$store.getters["app/device"]
 */
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import errorLog from './modules/errorLog';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
import user from './modules/user';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user
  },
  getters,
  // mutations中的行为最好是同步操作
  mutations,
  // 通常调用mutations中的commit,但主要是为了异步操作
  actions
});

export default store;