<template>
  <div style="padding: 20px;">
      <el-card style="margin-bottom: 20px;" v-for="(thisStudy,index) in studyList" :key="thisStudy.did">
          <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>{{ thisStudy.name }}</span>
              <el-icon size="medium"@click="toggleExpand(index)">
                  <ArrowDown v-if="!isExpanded[index]" />
                  <ArrowUp v-if="isExpanded[index]" />
              </el-icon>
          </div>
          <div v-if="isExpanded[index]">
              <p style="color: darkgray;">角色：</p>
              <p style="color: black;" v-if="thisStudy.actor === 1">前台</p>
              <p style="color: black;" v-if="thisStudy.actor === 2">医助</p>
              <p style="color: black;" v-if="thisStudy.actor === 3">兽医</p>
              <div>
                  <p style="color: darkgray;">职责名：</p>
                  <p>{{ thisStudy.name }}</p>
              </div>
              <div>
                  <p style="color: darkgray;">职责内容：</p>
                  <p>{{ thisStudy.content }}</p>
              </div>
              <div>
                    <p style="color: darkgray;">示例图片：</p>
                    <img :src="thisStudy.pic" class="studyImg"></img>
                </div>
              <div>
                  <p style="color: darkgray;">演示：</p>
                  <video-player :src="thisStudy.video" :controls="true" :autoplay="false" style="width: 100%;height: 400px;"></video-player>
              </div>
          </div>
      </el-card>
  </div>
  
</template>
<script setup>
import { reactive,ref,onMounted  } from 'vue';
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { getDutyByActor } from '@/api/api';

const studyList = ref([])//定义响应式数组变量
const isExpanded = reactive({})

onMounted(()=>{
  getDutyByActor({actor: 1}).then(res=>{
      console.log(res)
      studyList.value=res.data
  }) 
})

const toggleExpand = (index) => {
  isExpanded[index] = !isExpanded[index];
}
</script>
<style>
</style>