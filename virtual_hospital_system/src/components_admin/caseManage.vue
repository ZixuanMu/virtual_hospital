<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="addCase">新增病例</el-button>

        <el-card style="margin-bottom: 20px;" v-for="thisCase in caseList" :key="thisCase.cid">
            <div>
                <span>{{ thisCase.cname }}</span>
                <el-button type="text" @click="editCase(thisCase)">编辑</el-button>
                <el-button type="text" @click="deleteCase(thisCase.cid)">删除</el-button>
            </div>
            <div>
                <p style="color: darkgray;">文字记录1：</p>
                <p>{{ thisCase.word1 }}</p>
            </div>
            <div>
                <p style="color: darkgray;">文字记录2：</p>
                <p>{{ thisCase.word2 }}</p>
            </div>
            <div>
                <p style="color: darkgray;">文字记录3：</p>
                <p>{{ thisCase.word3 }}</p>
            </div>
            <div>
                <p style="color: darkgray;">文字记录4：</p>
                <p>{{ thisCase.word4 }}</p>
            </div>
            <div >
                <img :src="thisCase.photo1" class="caseImg"></img>
                <img :src="thisCase.photo2" class="caseImg"></img>
            </div>
            <div>
                <video-player src="thisCase.video4"></video-player>
            </div>
        </el-card>
    </div>
    
</template>
<script setup>
import { reactive,ref,onMounted  } from 'vue';
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { getAllCases,changeCname,changePhoto1,changePhoto2,changeType,changeWord1,changeWord2,changeWord3,changeWord4 } from '@/api/api';



const caseList = ref([])//定义响应式数组变量，存放全部病例

onMounted(()=>{
    getAllCases().then(res=>{
        console.log(res)
        caseList.value=res.data
    })
})

const editCase = (thisCase) => {

};

const deleteCase = (cid) => {

}

const addCase = () => {

}
</script>
<style>
.caseImg
{
    width:auto;
    height:200px;
    margin-right: 20px;
}
</style>