import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import hello1 from "@/components/Hello01"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
    	path:'/hello1',
    	name:"Hello01",
    	component:hello1
    }
  ]
})
