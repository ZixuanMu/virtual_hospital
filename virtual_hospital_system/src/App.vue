<template>
  <router-view v-if="$route.path === '/'">
    <div id="login"> 
      <div id="login-form">
        <h1>登录页面</h1>
        <label for="username"><i class="el-icon-user-solid" style="color: #c1c1c1"></i></label>
        <input type="text" placeholder="用户名" name="username"  id="username" autocapitalize="off" v-model.trim=loginForm.username aria-autocomplete="off">
        <label for="password"><i class="el-icon-right" style="color:#c1c1c1"></i></label>
        <input type="password" placeholder="密码" name="password" id="password" autocapitalize="off" v-model.trim="loginForm.password">
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
import { ElMessage } from 'element-plus';
import { ref } from 'vue'; // 引入 Vue 3 中的 ref 函数

export default {
<<<<<<< HEAD
  setup() {
    // 定义登录表单数据
    const loginForm = ref({
      username: '',
      password: ''
    });

    // 定义用户登录函数
    const Userlogin = async () => {
  try {
    const username = encodeURIComponent(loginForm.value.username); // 编码用户名
    const password = encodeURIComponent(loginForm.value.password); // 编码密码

    const response = await fetch(`http://106.54.206.14:8080/users/login?username=${username}&password=${password}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('登录失败');
    }

    const data = await response.json();
    console.log('用户登录成功', data);
    router.push('/Layout/UserLayout');
  } catch (error) {
    console.error('用户登录失败', error.message);
    ElMessage.error('密码或用户名错误');
  }
};

    // 定义管理员登录函数（如果需要的话）
    const Adminlogin = async () => {
  try {
    const username = encodeURIComponent(loginForm.value.username); // 编码用户名
    const password = encodeURIComponent(loginForm.value.password); // 编码密码

    const response = await fetch(`http://106.54.206.14:8080/users/login?username=${username}&password=${password}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('登录失败');
    }

    const data = await response.json();
    console.log('用户登录成功', data);
    router.push('/Layout/AdminLayout');
  } catch (error) {
    console.error('用户登录失败', error.message);
    ElMessage.error('密码或用户名错误');
  }
};


    // 返回给组件的数据和方法
=======
  // 组件逻辑
  setup(){
    const router = useRouter();
    const Userlogin = () => {
      console.log("触发");
      router.push('/UserLayout');
    };
    const Adminlogin = () => {
      console.log("触发");
      router.push('/AdminLayout');
    };
>>>>>>> 1fd298e6311e454195d3f074395f12094402cea8
    return {
      loginForm,
      Userlogin,
      Adminlogin
    };
  }
};

  
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