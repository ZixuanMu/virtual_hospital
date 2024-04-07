<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="addCase">新增病例</el-button>

        <!-- 病例显示列表 -->
        <el-card style="margin-bottom: 20px;" v-for="thisCase in caseList" :key="thisCase.cid">
            <div>
                <span>{{ thisCase.cname }}</span>
                <el-button type="text" @click="showEditer(thisCase);currentCid=thisCase.cid">编辑</el-button>
                <el-button type="text" @click="caseDeleterVisable=true;currentCid=thisCase.cid">删除</el-button>
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
            <el-input v-model="caseEditerList.cname" placeholder="请输入病例名"></el-input>
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
            <el-button type="primary" @click="editCase(caseEditerList)">确定</el-button>
        </div>
        </el-dialog>

        <!-- 新增病例模块 -->
        <el-dialog v-model="caseAdderVisable" title="新增病例">
        <el-form :model="caseAdderList" ref="myAdderList">
            <el-form-item label="病例名" placeholder="请输入病例名">
            <el-input v-model="caseAdderList.cname"></el-input>
            </el-form-item>
            <el-form-item label="病例种类">
            <el-input v-model="caseAdderList.type" placeholder="请输入病例种类"></el-input>
            </el-form-item>
            <el-form-item label="文字记录1">
            <el-input v-model="caseAdderList.word1" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="文字记录2">
            <el-input v-model="caseAdderList.word2" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="文字记录3">
            <el-input v-model="caseAdderList.word3" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="文字记录4">
            <el-input v-model="caseAdderList.word4" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="图片1"  prop="image">
                <el-tooltip class="item" effect="dark" :content="tag.name" placement="top-start" v-for="(tag,index) in fileList" :key="index">
                    <el-tag style="margin-right:10px;display:flex;" :disable-transitions="false" @close="handleClose(index)" closable  @click="downloadFile(tag)"><i class="el-icon-paperclip"></i><span class="tagtext">{{tag.name}}</span></el-tag>
                </el-tooltip>
                <el-upload
                    class="upload-demo" 
                    action  
                    :http-request="uploadFile"
                    ref="upload"
                    :limit="fileLimit"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-exceed="handleExceed"
                    :before-upload="beforeUpload"
                    :show-file-list="false"
                    :headers="headers"
                    >
                    <!-- action="/api/file/fileUpload" -->
                    <el-button class="btn"><i class="el-icon-paperclip"></i>上传附件</el-button>
                </el-upload>
            </el-form-item>

        </el-form>
        <div class="dialog-footer">
            <el-button @click="caseAdderVisable = false">取消</el-button>
            <el-button type="primary" @click="">确定</el-button>
        </div>
        </el-dialog>


        <!-- 删除提示 -->
        <el-dialog v-model="caseDeleterVisable" title="删除病例">
            <div>确定删除？</div>
            <div class="dialog-footer">
                <el-button @click="caseDeleterVisable = false">取消</el-button>
                <el-button type="primary" @click="deleteCase(currentCid)">确定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>
<script setup>
import { reactive,ref,onMounted,getCurrentInstance  } from 'vue';
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { get_all_cases,change_cname,change_photo1,change_photo2,change_type,change_video4,change_word1,change_word2,change_word3,change_word4,delete_case,insert_case } from '@/api/api';

const { proxy } = getCurrentInstance()
const currentCid = ref(0)
const caseList = ref([])//定义响应式数组变量，存放全部病例
const caseEditerList = ref({
    cid:'',
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
const caseAdderList = ref({
    cid:'',
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

// 显示编辑列表并赋值
const showEditer = (thisCase) => {
    caseEditerVisable.value = true;
    caseEditerList.value=thisCase;
}

// 上传编辑后的病例
const editCase = (data) => {
    console.log("cid:"+data.cid)
    console.log("cname:"+data.cname)
    change_cname(data.cid,data.cname).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_word1(data.cid,data.word1).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_word2(data.cid,data.word2).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_word3(data.cid,data.word3).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_word4(data.cid,data.word4).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_type(data.cid,data.type).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    caseEditerVisable.value=false;
};

// 删除病例
const deleteCase = (thisCid) => {
    delete_case(thisCid).then(res=>{
        if(res.state === 200)
        {
            proxy.$message.success("删除成功")
            caseDeleterVisable.value=false
            location.reload()
        }
    }).catch(error=>{
        console.log("删除报错："+error)
    })
}

const addCase = () => {
    caseAdderVisable.value=true
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