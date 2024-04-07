<template>

<div class="common-layout">

    <el-container hight="50px">

      <el-header>      <div>
        <img src="../assets/医院.png" alt="" />
        <span>虚拟宠物医院学习系统</span>
      </div></el-header>

      <el-container>

        <el-aside width="200px">
       <div>
    
      <el-menu active-text-color="#409Eff"
        background-color="#545c64"
        text-color="#fff" unique-opened 
      :default-active="activeIndex" mode="vertical" @select="handleMenuSelect">
        <el-scrollbar>
        <el-menu-item index="/3dviews" @click="navigateTo('/3dviews')">
          3 D 导览
        </el-menu-item>
        <el-menu-item index="/functionalLearning" @click="navigateTo('/functionalLearning')">
          

          职能学习

        </el-menu-item>
        <el-menu-item index="/testUser" @click="navigateTo('/testUser')">

          测试模块

        </el-menu-item>
        <el-menu-item index="/mineInformation" @click="navigateTo('/mineInformation')">

          个人信息

        </el-menu-item>
        <!-- 更多导航栏项 -->
      </el-scrollbar>
      </el-menu>
    
    </div>
        </el-aside> 
        <el-main>
          <el-scrollbar ref="scrollbarRef" height="600px" always @scroll="scroll">

          <div>
          <router-view></router-view>
          </div>
        </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
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
 <style>
 .el-header {
background-color: #363d40;
display: flex;
justify-content: space-between;
padding-left: 0;
align-items: center;
color: #fff;
font-size: 20px;
}

.el-header > div {
display: flex;
align-items: center;
}

.el-header > div > span {
margin-left: 15px;
}

.el-aside {
background-color: #313743;
}

.el-aside .el-menu {
border-right: none;
}

.el-main {
background-color: #e9edf1;
}

.iconfont {
margin-right: 10px;
}
.cell-item {
  display: flex;
  align-items: center;
}
  </style>