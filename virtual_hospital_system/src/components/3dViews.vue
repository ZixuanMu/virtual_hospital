<template>
    <div class="map">
        <!-- 按钮区域 -->
        <div>
            <el-popover
                placement="top-start"
                content="前台"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;bottom:10%;left:49%">
                        <p>前台</p>
                    <el-icon class="m-2" @click="switchToView(4)" ><Location /></el-icon>
                    
                    </div>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="档案室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:40%;left:49%">
                        <p>档案室</p>
                        <el-icon class="m-2" @click="switchToView(5)"><Location /></el-icon>
                        
                    </div>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="诊室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:5%;left:10%">
                        <p>诊室</p>
                        <el-icon class="m-2" @click="switchToView(6)"><Location /></el-icon>
                        
                    </div>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="免疫室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:20%;left:10%">
                        <p>免疫室</p>
                        <el-icon class="m-2" @click="switchToView(7)"><Location /></el-icon>
                        
                    </div>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="化验室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:35%;left:10%">
                        <p>化验室</p>
                        <el-icon class="m-2" @click="switchToView(8)"><Location /></el-icon>
                        
                    </div>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="影像室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:50%;left:10%">
                        <p>影像室</p>
                        <el-icon class="m-2" @click="switchToView(9)"><Location /></el-icon>
                        
                    </div>
                    
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="专科检查室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:65%;left:10%">
                        <p>专科检查室</p>
                        <el-icon class="m-2" @click="switchToView(10)"><Location /></el-icon>
                        
                    </div>
                    
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="处置室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:5%;right:10%">
                        <p>处置室</p>
                        <el-icon class="m-2" style="position: absolute;right:0" @click="switchToView(11)"><Location /></el-icon>
                        
                    </div>
                    
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="药房"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;bottom:28%;left:49%">
                        <p>药房</p>
                        <el-icon class="m-2" @click="switchToView(12)"><Location /></el-icon>
                        
                    </div>
                    
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="注射室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:20%;right:10%">
                        <p>注射室</p>
                        <el-icon class="m-2" style="position: absolute;right:0" @click="switchToView(13)"><Location /></el-icon>
                        
                    </div>
                   
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="手术准备室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:35%;right:10%">
                        <p>手术准备室</p>
                        <el-icon class="m-2" style="position: absolute;right:0" @click="switchToView(14)"><Location /></el-icon>
                        
                    </div>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="手术室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:50%;right:10%">
                        <p>手术室</p>
                        <el-icon class="m-2" style="position: absolute;right:0" @click="switchToView(15)"><Location /></el-icon>
                        
                    </div>
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="住院部"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:10%;left:49%">
                        <p>住院部</p>
                        <el-icon class="m-2" @click="switchToView(16)"><Location /></el-icon>
                        
                    </div>
                    
                </template>
            </el-popover>
            <el-popover
                placement="top-start"
                content="病理剖检室"
                trigger="hover">
                <template #reference>
                    <div style="position: absolute;top:65%;right:10%">
                        <p>病理剖检室</p>
                        <el-icon class="m-2" style="position: absolute;right:0" @click="switchToView(17)"><Location /></el-icon>
                        
                    </div>
                    
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