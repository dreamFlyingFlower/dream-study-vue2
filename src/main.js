// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// jshint esversion:6
// jshint node:true
import Vue from 'vue';
import App from './App';
import router from './router';
import $ from "jquery";

//阻止vue在启动时生成生产提示
Vue.config.productionTip = false;
//性能追踪
Vue.config.performance = true;
//取消所有默认的日志和警告
Vue.config.slient=false;

let configObject;

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  methods:{
	  config:function(){
		  $.ajax({
			  url:"static/config.json",
			  type:"get",
			  cache:false,
			  async:false,
			  success:function(result){
//				  处理result
				  sessionStorage.setItem("config",JSON.stringify(result));
			  }
		  });
	  }
  }
});
vm.config();