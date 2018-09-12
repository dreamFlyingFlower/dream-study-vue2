import Vue from "vue";
/**
 * 自定义全局指令,如v-model之类
 * name:指全局指令的名称,如v-model,在使用的要加上v-,即v-name
 * 以下都是自定义指令的钩子函数:
 *  bind:只调用一次,指令第一次绑定到元素时调用.在这里可以进行一次性的初始化设置
 *  inserted:当被绑定的元素插入到DOM中时触发
 *  update:所在组件的 VNode 更新时调用.但是可能发生在其子 VNode 更新之前.
 *    指令的值可能发生了改变,也可能没有.但是你可以通过比较更新前后的值来忽略不必要的模板更新
 *  componentUpdated:指令所在组件的 VNode 及其子 VNode 全部更新后调用
 *  unbind:只调用一次，指令与元素解绑时调用
 * 钩子函数的参数:
 *  el:指令所绑定的元素,可以用来直接操作 DOM
 *  binding:一个对象,包含以下属性:
 *    name:指令名,不包括v-前缀
 *    value:指令的绑定值,如:v-my-directive="1 + 1" 中,绑定值为 2
 *    oldValue:指令绑定的前一个值,仅在update和componentUpdated钩子中可用,无论值是否改变都可用
 *    expression:字符串形式的指令表达式.如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"
 *    arg:传给指令的参数,可选.例如 v-my-directive:foo 中,参数为 "foo"
 *    modifiers:一个包含修饰符的对象.例如:v-my-directive.foo.bar中,修饰符对象为{ oo:true,bar:true}
 *  vnode:Vue 编译生成的虚拟节点,相当于原生的node结点
 *  oldVnode:上一个虚拟节点,仅在update和componentUpdated钩子中可用
 * 除了el参数之外,其他都是只读的;若需要在钩子之间共享数据,可通过元素的dataset来设置
 * @example https://cn.vuejs.org/v2/guide/custom-directive.html
 */
Vue.directive("name",{
  bind: function () {},
  inserted: function (el) {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
});