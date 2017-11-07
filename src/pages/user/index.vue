<template>
  <div>
    <form>
      <input v-model="username" type="text" placeholder="请输入用户名">
      <input v-model="password" type="password" placeholder="请输入密码">
      <input type="button" name="" value="登录" @keyup.enter="login" @click="login">
      111 <input type="text" v-model="what">
      <p>222{{what}}</p>
    </form>
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
    created(){
      console.log(1111);
      this.animate();
    },
    computed:{
      what(){
        console.log(3333);
        return 111+Math.random();
      }
    },
    watch:{
      username:function(val){
        console.log(val);
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
      },
      animate(){
        console.log(2222);
      }
    }
  }
</script>