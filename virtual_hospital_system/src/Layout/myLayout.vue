<template>
    <div>
      <el-menu :default-active="activeIndex" mode="vertical" @select="handleMenuSelect">
        <el-menu-item index="/3dviews" @click="navigateTo('/3dviews')">
          3D导览
        </el-menu-item>
        <el-menu-item index="/functionalLearning" @click="navigateTo('/functionalLearning')">
          职能学习
        </el-menu-item>
        <el-menu-item index="/mineInformation" @click="navigateTo('/mineInformation')">
          个人信息
        </el-menu-item>
        <el-menu-item index="/testUser" @click="navigateTo('/testUser')">
          测试用户
        </el-menu-item>
        <!-- 更多导航栏项 -->
      </el-menu>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'
  export default {
    setup(){
    const router = useRouter();
    const navigateTo = (path) => {
      router.push(path);
    };
    return {
      navigateTo
    };
  }
  }
  </script>

<style scoped lang="scss">
.container{
    .aside{
    background: #797979;
    width:230px;
    }
    .header{
    background: #a1e9d2;
    height:80px;
    }
}

</style>