<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">核心文档</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">社区</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">推特</a></li>
      <li><a @click="testii();">测试</a></li>
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
  export default{

  }
</script>