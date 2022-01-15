// jshint esversion:6
// jshint node:true
/**
 * @example https://vuex.vuejs.org/zh/guide/
 * 在vue的main.js中引入store,是其他文件中通过this.$store来调用,store中的几种属性,以user为例
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
  mutations,
  actions
});

export default store;