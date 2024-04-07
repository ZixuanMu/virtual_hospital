<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="addCase">新增病例</el-button>

        <!-- 病例显示列表 -->
        <el-card style="margin-bottom: 20px;" v-for="thisCase in caseList" :key="thisCase.cid">
            <div>
                <span>{{ thisCase.cname }}</span>
                <el-button type="text" @click="showEditer(thisCase)">编辑</el-button>
                <el-button type="text" @click="caseDeleterVisable=true">删除</el-button>
            </div>
            <p style="color: lightseagreen;">{{ thisCase.type }}</p>
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

        <!-- 编辑病例模块 -->
        <el-dialog v-model="caseEditerVisable" title="编辑病例">
        <el-form :model="caseEditerList" ref="myEditerList">
            <el-form-item label="病例名">
            <el-input v-model="caseEditerList.cname"></el-input>
            </el-form-item>
            <el-form-item label="病例种类">
            <el-input v-model="caseEditerList.type" placeholder="请输入病例种类"></el-input>
            </el-form-item>
            <el-form-item label="文字记录1">
            <el-input v-model="caseEditerList.word1" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="文字记录2">
            <el-input v-model="caseEditerList.word2" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="文字记录3">
            <el-input v-model="caseEditerList.word3" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="文字记录4">
            <el-input v-model="caseEditerList.word4" placeholder="请输入文字记录"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="caseEditerVisable = false">取消</el-button>
            <el-button type="primary" @click="editCase">确定</el-button>
        </div>
        </el-dialog>

        <!-- 删除提示 -->
        <el-dialog v-model="caseDeleterVisable" title="删除病例">
            <div>确定删除？</div>
            <div class="dialog-footer">
                <el-button @click="caseDeleterVisable = false">取消</el-button>
                <el-button type="primary" @click="deleteCase">确定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>
<script setup>
import { reactive,ref,onMounted  } from 'vue';
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { get_all_cases,change_cname,change_photo1,change_photo2,change_type,change_video4,change_word1,change_word2,change_word3,change_word4,delete_case,insert_case } from '@/api/api';



const caseList = ref([])//定义响应式数组变量，存放全部病例
const caseEditerList = ref({
    cid:0,
    cname:'',
    type:'',
    word1:'',
    word2:'',
    word3:'',
    word4:'',
    photo1:'',
    photo2:'',
    viedeo4:''
})
const caseEditerVisable = ref(false)
const caseAdderVisable = ref(false)
const caseDeleterVisable = ref(false)
onMounted(()=>{
    get_all_cases().then(res=>{
        console.log(res)
        caseList.value=res.data
    })
})

const showEditer = (thisCase) => {
    caseEditerVisable.value = true;
    caseEditerList.value=thisCase;
}

const editCase = (thisCase) => {
    change_cname({cid:caseEditerList.cid,cname:caseEditerList.cname});
    change_word1({cid:caseEditerList.cid,word1:caseEditerList.word1});
    change_word2({cid:caseEditerList.cid,word2:caseEditerList.word2});
    change_word3({cid:caseEditerList.cid,word3:caseEditerList.word3});
    change_word4({cid:caseEditerList.cid,word4:caseEditerList.word4});
    change_type({cid:caseEditerList.cid,type:caseEditerList.type});
    caseEditerVisable.value=false;
};

const deleteCase = (cid) => {
    delete_case()
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