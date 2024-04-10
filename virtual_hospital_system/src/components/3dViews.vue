<template>
3dviews 11111
<el-button @click="switchToView"></el-button>
</template>

<script setup>
import { ref,onMounted, onBeforeMount } from 'vue'
import { Viewer } from 'photo-sphere-viewer'
import * as Marker from 'photo-sphere-viewer/dist/plugins/markers' // 引入插件
import 'photo-sphere-viewer/dist/plugins/markers.css' // 引入标注样式
import router from '@/router';
import { ElMessage } from 'element-plus';
const switchToView = () =>{
    router.push('/fullScreenView')
    ElMessage({
        message:"let's go",
        type:"success",
        duration:1500
    })
}
</script>

<style>
</style>./3dViews.vue