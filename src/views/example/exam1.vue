<template>
  <div>
    <h1>欢迎来到栗子1</h1>
    <h1 @test.stop="testStop"></h1>
    <input v-bind="testBind" v-model="testModel" />
    <h1 v-for="(val, key, i) in testObj" :key="key" ref="h1">
      {{ i }},{{ val }}
    </h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // v-bind绑定的值只能是从数据层到视图层,视图层不能改变数据层,是单项绑定
      testBind: 1,
      // v-model是双向绑定
      testModel: 2,
      testObj: {
        key1: val1,
        key2: val2,
      },
    };
  },
  created() {},
  methods: {
    testStop() {
      console.log("stop组织冒泡");
    },
    testPrevent() {
      console.log("prevent阻止默认事件");
    },
    testCapture() {
      console.log("capture添加事件监听器时使用事件捕获模式");
    },
    testSelf() {
      console.log("sefl只当事件在该元素本身触发时触发回调");
    },
    testOnce() {
      console.log("只触发一次");
    },
    testRef(){
      // ref是代表了整个DOM元素,所有被ref标识的DOM元素都会放到refs中,可以快速操作
      // 如果ref标识的是一个组件,可以获得组件中所有的属性,方法等
      console.log(this.$refs.h1);
    },
    testRoute(){
      // 获得当前页面URL地址信息,参数信息
      console.log(this.$route);
      // 使用query获得路由URL中的参数,此时参数直接拼接在URL后,形式为ip:port/login?name=xxxx&age=xxx
      console.log(this.$route.query.name);
      console.log(this.$route.query.age);
      // 使用params获得URL中的参数,参数是通过:(冒号)进行分割,形式为ip:port/login/12/飞仙
      // 此时路由Router必须是完全匹配的模式,定义的path必须是/login/:id/:name,login后的参数个数必须完全相同,否则无法跳转
      console.log(this.$route.params.id);
      console.log(this.$route.params.name);
      // 不管是用query还是params获得URL中的参数,参数都会显示在URL中,不能对参数进行保密
    }
  },
  // 自定义私有过滤器
  filters: {},
  // 自定义私有指令
  directives: {},
};
</script>