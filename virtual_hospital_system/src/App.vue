<template>
  <router-view v-if="$route.path === '/'">
    <div id="login"> 
      <div id="login-form">
        <h1>登录页面</h1>
        <label for="username"><i class="el-icon-user-solid" style="color: #c1c1c1"></i></label>
        <input type="text" placeholder="用户名" name="username"  id="username" autocapitalize="off" v-model.trim=username aria-autocomplete="off">
        <label for="password"><i class="el-icon-right" style="color:#c1c1c1"></i></label>
        <input type="password" placeholder="密码" name="password" id="password" autocapitalize="off" v-model.trim="password">
       <div>
         <el-button type="primary" @click="Userlogin()">用户登录</el-button>
         <el-button type="primary" @click="Adminlogin()">管理员登录</el-button>
       </div>
      </div>
    </div> 
  </router-view>
    <div v-else>
      <router-view></router-view>
    </div>


</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { router } from '@/router/index.js'

export default {
  // 组件逻辑
  setup(){
    const router = useRouter();
    const Userlogin = () => {
      console.log("触发");
      router.push('/Userlayout');
    };
    const Adminlogin = () => {
      console.log("触发");
      router.push('/Userlayout');
    };
    return {
      Userlogin,
      Adminlogin
    };
  },
  methods: {
      openNewWindow() {
        // 使用 Vue Router 的编程式导航打开新路由
        this.$router.push({ name: 'Userlayout' });
      }
    }
  /*data(){
    return {
      username:"",
      password:""
    }
  },
  methods:{
    login(){
      if(this.username === "admin" && this.password === "123456"){
        this.$router.push("/layout") 
      }else{
        alert("用户名或密码错误")
      }
    }
  }*/
  
}
  
</script>

<style lang="scss" scoped>
#login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-image: url("./assets/bg.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
}

#login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50vw;
  min-width: 300px;
  max-width: 400px;
  display: flex;
  flex-direction: column ;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);

  h1{
    width: 60%;
    margin: 50px auto 20px;
    color: #c1c1c1;
    text-align: center;
  }

  input{
    width:60%;
    margin: 15px auto;
    outline: none;
    border: none;
    padding: 10px;
    border-bottom: 1px solid #fff;
    background: transparent;
    color: white;
  }

  label {
    width: 60%;
    margin: 0 auto;
    position: relative;
    top: 30px;
    left:-15px;
  }
  div{
    width: 60%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  button{
    background-color: rgba(9, 108, 144, 0.5);
    margin: 10px 25px 40px 25px;
  }
  p {
    width: 60%;
    margin: 8px auto;
    position: relative;
    left: -15px;
    color: #ff0000;
    font-size: 8px;
  }
}
input {
  -webkit-text-fill-color: #ffffff !important;
  transition: background-color 5000s ease-in-out ,width 1s ease-out!important;
}
</style>