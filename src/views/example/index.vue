<template>
  <div id="example">
    <router-view></router-view>
  </div>
</template>
<script>
// 若是有子组件,且通过vue-roter跳转组件,则需要一个父页面,父页面必须有一个router-view标签来承载子页面
// 而router/index.js中的写法也需要注意
export default {

}
</script>