<template>
  <div style="padding: 20px;">

      <!-- 搜索栏 -->
      <el-input placeholder="输入搜索内容" v-model="searchInformation" clearable style="margin-bottom: 20px;">
          <template #append>
              <el-button @click="searchInList">
                  <el-icon><search /></el-icon>
              </el-button>
          </template>
      </el-input>
</div>
      <!-- 病例显示列表 -->
      <el-card style="margin-bottom: 20px;" v-for="thisCase in caseList" :key="thisCase.cid">
          <div>
              <span>{{ thisCase.cname }}</span>
              <el-button type="text" @click="showEditer(thisCase);currentCid=thisCase.cid">编辑</el-button>
              <el-button type="text" @click="caseDeleterVisable=true;currentCid=thisCase.cid">删除</el-button>
          </div>
          <p style="color: lightseagreen;">{{ thisCase.type }}</p>
          <div>
              <p style="color: darkgray;">文字记录1：{{ thisCase.word1 }}</p>
          </div>
          <div>
              <p style="color: darkgray;">文字记录2：{{ thisCase.word2 }}</p>
          </div>
          <div>
              <p style="color: darkgray;">文字记录3：{{ thisCase.word3 }}</p>
          </div>
          <div>
              <p style="color: darkgray;">文字记录4：{{ thisCase.word4 }}</p>
          </div>
          <div >
              <img :src="thisCase.photo1" class="caseImg"></img>
              <img :src="thisCase.photo2" class="caseImg"></img>
          </div>
          <div>
              <video-player :src="thisCase.video4" :controls="true" :autoplay="false" style="width: 100%;height: 400px;"></video-player>
          </div>
      </el-card>

</template>
<script setup>
import { reactive,ref,onMounted,getCurrentInstance  } from 'vue';
import { VideoPlayer } from '@videojs-player/vue'
import { Plus } from '@element-plus/icons-vue'
import 'video.js/dist/video-js.css'
import { get_all_cases,getLikeCases } from '@/api/api';
import { ElMessage } from 'element-plus';

const searchInformation = ref("")
const { proxy } = getCurrentInstance()
const currentCid = ref(0)
const caseList = ref([])//定义响应式数组变量，存放全部病例

onMounted(()=>{
  get_all_cases().then(res=>{
      console.log(res)
      caseList.value=res.data
  })
})

// 搜索功能
const searchInList = () => {
  getLikeCases(searchInformation.value).then(res=>{
      if(res.state === 200)
      {
          caseList.value=res.data
      }
  }).catch(err=>{
      ElMessage({
          message:"服务器或网络出错",
          type:"error",
          duration:1500
      })
      console.log(err)
  })
}

</script>
<style>
.caseImg
{
  width:40%;
  height:auto;
  margin-right: 20px;
}
</style>