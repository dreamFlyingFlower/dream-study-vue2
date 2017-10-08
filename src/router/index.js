import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import hello1 from "@/components/Hello01"

Vue.use(Router)

export default new Router({
//	base:"/dist",//当用tomcat发布的时,放在webapps文件中的文件夹名称,打包发布的时候放开
	routes:[{
		path:"/",
		name:"Hello",
		component:Hello
	},{
		path:"/hello1",
		name:"Hello1",
		component:hello1
	}
  ]
})
