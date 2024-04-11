<template>
    <div class="map">
        <!-- 按钮区域 -->
        <div>
            <el-popover
                placement="top-start"
                content="前台"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(4)" style="position: absolute;bottom:10%;left:49%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="档案室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(5)" style="position: absolute;top:40%;left:49%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="诊室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(6)" style="position: absolute;top:5%;left:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="免疫室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(7)" style="position: absolute;top:20%;left:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="化验室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(8)" style="position: absolute;top:35%;left:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="影像室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(9)" style="position: absolute;top:50%;left:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="专科检查室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(10)" style="position: absolute;top:65%;left:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="处置室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(11)" style="position: absolute;top:5%;right:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="药房"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(12)" style="position: absolute;bottom:28%;left:49%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="注射室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(13)" style="position: absolute;top:20%;right:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="手术准备室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(14)" style="position: absolute;top:35%;right:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="手术室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(15)" style="position: absolute;top:50%;right:10%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="住院部"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(16)" style="position: absolute;top:10%;left:49%"><Location /></el-icon>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="病理剖检室"
                trigger="hover">
                <template #reference>
                    <el-icon class="m-2" @click="switchToView(17)"style="position: absolute;top:65%;right:10%"><Location /></el-icon>
                </template>
            </el-popover>
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