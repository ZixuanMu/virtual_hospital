<template>
    <div class="map">
        <!-- 按钮区域 -->
        <div>
            <button @click="switchToView(4)" style="position: absolute;bottom:10%;left:47%">前台</button>
            <button @click="switchToView(5)" style="position: absolute;top:40%;left:46%">档案室</button>
            <button @click="switchToView(6)" style="position: absolute;top:5%;left:10%">诊室</button>
            <button @click="switchToView(7)" style="position: absolute;top:20%;left:10%">免疫室</button>
            <button @click="switchToView(8)" style="position: absolute;top:35%;left:10%">化验室</button>
            <button @click="switchToView(9)" style="position: absolute;top:50%;left:10%">影像室</button>
            <button @click="switchToView(10)" style="position: absolute;top:65%;left:8%">专科检查室</button>
            <button @click="switchToView(11)" style="position: absolute;top:5%;right:10%">处置室</button>
            <button @click="switchToView(12)" style="position: absolute;bottom:28%;left:47%">药房</button>
            <button @click="switchToView(13)" style="position: absolute;top:20%;right:10%">注射室</button>
            <button @click="switchToView(14)" style="position: absolute;top:35%;right:8%">手术准备室</button>
            <button @click="switchToView(15)" style="position: absolute;top:50%;right:10%">手术室</button>
            <button @click="switchToView(16)" style="position: absolute;top:10%;left:46%">住院部</button>
            <button @click="switchToView(17)"style="position: absolute;top:65%;right:8%">病理剖检室</button>
        </div>
    </div>
    
</template>

<script setup>
import { ref,onMounted, onBeforeMount } from 'vue'
import router from '@/router';
import { ElMessage } from 'element-plus';
const switchToView = (departmentId) =>{
    router.push({
        path:'/fullScreenView',
        query:{
            did:departmentId
        }
    })
}
</script>


<style>
.map {
  background-image: url("@/assets/map.png");
  height:95vh;
  background-size: 100% 100%; /* 背景图铺满容器 */
  position: relative;
}
</style>./3dViews.vue