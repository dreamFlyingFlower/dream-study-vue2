<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">核心文档</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">社区</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">推特</a></li>
      <li><a href="javascipt:void(0);" v-on:click="testii();">测试</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <div v-html="testhtml"></div>
    <div v-if="ok">这是if 的测试</div>
    <div v-show="!ok">这是show的测试</div>
    <input v-model.lazy="msg" @change="change();" />
    <componet :is="tem" :test="test11"></componet>
  </div>
</template>

<script>
import * as Test01 from "../Test/Test01.js";
import * as common from "../config/common.js";

let test =1;
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      test11:234,
      tem:tem,
      ok:true,
      testhtml:"<a href='https://www.baidu.com' target='_blank'>this is a test</a>"
    }
  },
  methods:{
    testii(){
      $.ajax({
        url:"static/config.json",
        async:false,
        type:"get",
        cache:false,
        success:function(result){
          console.log(result);
        }
      });
    },
    change(){
      console.log(this.msg);
    }
  }
}
function test(){
  console.log(this);
}
var tem = {
  template:"<span @click='gaibian'>{{test}}</span>",
  props:['test'],
  methods:{
    gaibian:function(){
      test+=1;
      console.log(test);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
