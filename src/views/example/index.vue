<template>
  <div id="example">
    <router-view></router-view>

    <router-view name="header"></router-view>
    <router-view name="nav"></router-view>
    <router-view name="content"></router-view>
  </div>
</template>
<script>
// 若是有子组件,且通过vue-roter跳转组件,则需要一个父页面,父页面必须有一个router-view标签来承载子页面
// 而router/index.js中的写法也需要注意
export default {
  // 路由可以根据router-view的name属性进行匹配
  // 下方的header,nav,content是3个组件,前面的key必须是字符串,和上方视图的router-view的name值对应
  // {
  //   path:"/",components:{
  //     "default":header,
  //     "header":header,
  //     "nav":nav,
  //     "content":content
  //   }
  // }

  // Vue生命周期
  // 开始创建一个Vue实例对象
  // new Vue();
  // 初始化一个Vue空实例对象,此时,该对象身上只有默认的一些生命周期函数和默认事件,其他的未创建
  // Init event & Lifecycle
  // Vue生命周期遇到的第一个生命周期函数,实例完全被创建之后会调用
  // 该钩子被调用之前,data和methods中的数据还没有初始化
  beforeCreate() {},
  // data和methods注入
  // Init Injections & reactivity
  // 该钩子函数被调用时,data和methods已经初始化完毕
  created() {},
  // Vue在调用该钩子函数之前,会将页面,数据模板加载到内存中并完成必要的赋值等操作,但是还没渲染到页面中
  // 在beforeMount执行的时候,页面中的元素,还没有被真正的替换完成,仍然是一些模板字符串,这就会导致{{}}这种操作会有短暂的不协调
  beforeMount() {},
  // 此时内存中的模板已经渲染到页面中,Vue实例也已经完成创建好了
  // 到此时,正常的Vue声明周期已经完成
  mounted() {},
  // 以下是运行时钩子函数
  // data中的数据没有被更改刷新之前的操作,数据仍然是旧的
  beforeUpdate() {},
  // 数据更新之后的操作,此时数据已经是最新的了
  updated() {},
  // Vue实例即将被销毁.此时data和methods中的数据和方法仍然可用
  beforeDestroy() {},
  // 组件完全被销毁
  destroyed() {},
  // 组件数据,必须是一个方法,并且返回一个对象
  data() {
    return {};
  },
  // 引用外部组件,自定义内部组件
  components: {
    login: {
      template: "<h1>这是一个私有的自定义组件,{{msg}}</h1>",
      // 该data和外部的data作用一样,可以在内部组件使用
      data() {
        return {
          msg: "这是自定义组件内部的数据,和外部组件数据可互通",
        };
      },
    },
  },
  watch: {
    // 监听路由
    "$route.path": function (newVal, oldVal) {},
  },
  methods: {
    // 利用axios发送ajax请求,用到比较少的合并请求
    merge: function () {
      this.$axios
        // 合并请求,要么都成功,要么都失败
        .all([this.$axios.get(), this.$axios.post()])
        // 处理结果,根据顺序对应结果,有多少请求就有多少结果
        .then(
          this.$axios.spread((res1, res2) => {
            console.log(res1);
            console.log(res2);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>