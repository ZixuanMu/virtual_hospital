<template>
   <router-view v-if="$route.path === '/'">
    <h1>登录页</h1>
    <form @submit.prevent="login">
       <div>
          <label for="">用户名：</label>
          <input type="text" v-model="username">
       </div>
       <div>
          <label for="">密码：</label>
          <input type="password" v-model="password">
       </div>
       <el-button type="primary" @click="somethingHappen()">登录</el-button>
    </form>
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
    const somethingHappen = () => {
      console.log("触发");
      router.push('/layout');
    };
    onMounted(()=>{
      console.log("已挂载");
    });
    return {
      somethingHappen
    };
  },
  methods: {
      openNewWindow() {
        // 使用 Vue Router 的编程式导航打开新路由
        this.$router.push({ name: 'layout' });
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

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>