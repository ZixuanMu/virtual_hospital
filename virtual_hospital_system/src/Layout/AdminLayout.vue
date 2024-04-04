<template>

    <div class="common-layout">
    
        <el-container>
    
          <el-header>虚拟宠物医院学习系统</el-header>
    
          <el-container>
    
            <el-aside width="200px">
           <div>
        
          <el-menu :default-active="activeIndex" mode="vertical" @select="handleMenuSelect">
            <el-scrollbar>
            <el-menu-item index="/caseManage" @click="navigateTo('/caseManage')">
              病例管理
            </el-menu-item>
            <el-menu-item index="/testManage" @click="navigateTo('/testManage')">
              职能学习
            </el-menu-item>
            <!-- 更多导航栏项 -->
          </el-scrollbar>
          </el-menu>
        
        </div>
            </el-aside> 
            <el-main>
              <el-scrollbar ref="scrollbarRef" height="500px" always @scroll="scroll">
    
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
    
    <style scoped lang="scss">
    .el-container{
        .el-aside{
    
        width:230px;
        }
        .el-header{
        height:80px;
        position: relative;
    
        }
    
       
    
    }
    
    </style>