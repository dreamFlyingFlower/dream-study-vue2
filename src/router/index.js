import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // 定义子组件的时候,子组件路径的前面不能加/,否则找不到路径
    // 在页面中跳转的时候可以使用this.$router.push('example/exma1')
    {
      path:"/example",
      component:()=>import('@/views/example/index'),
      children:[
        {
          path:"exam1",
          component:()=>import('@/views/example/exam1')
        },
        {
          path:"exam2",
          component:()=>import('@/views/example/exam2')
        }
      ]
    }
  ]
})
