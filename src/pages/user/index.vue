<template>
  <div>
    <input type="text" placeholder="请输入用户名">
    <input type="password" placeholder="请输入密码">
    <input type="button" name="" value="登录" @keyup.enter="login" @click="login">
    <!-- <componet :is="tem" :test="test11"></componet> -->
  </div>
</template>

<script>
  export default{
    data(){
      return {
        username:"",
        password:""
      }
    },
    methods:{
      login(){
        $.ajax({
          url:"http://127.0.0.1:8080/com.wy.springjava/login",
          data:{
            username:this.username,
            password:this.password
          },
          type:'post',
          contentType:"application/json;charset=utf8",
          success:function(rs){
            console.log(rs);
          }
        });
      }
    }
  }
</script>