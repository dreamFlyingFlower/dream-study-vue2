/**
 * 自定义vue全局属性或方法或其他
 * 定义完成之后需要在main.js中用import引入,并且使用Vue.use
 */
export default{
  install:(vue)=>{
    Vue.prototype.$test1=function(){
      console.log(this);
    },
    Vue.prototype.$global={
      baseUrl:""
    }
  }
}