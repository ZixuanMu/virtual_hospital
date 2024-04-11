<template>
    <button @click="switchToView(4)">前台</button>
    <button @click="switchToView(5)">档案室</button>
    <button @click="switchToView(6)">诊室</button>
    <button @click="switchToView(7)">免疫室</button>
    <button @click="switchToView(8)">化验室</button>
    <button @click="switchToView(9)">影像室</button>
    <button @click="switchToView(10)">专科检查室</button>
    <button @click="switchToView(11)">处置室</button>
    <button @click="switchToView(12)">药房</button>
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
</style>./3dViews.vue