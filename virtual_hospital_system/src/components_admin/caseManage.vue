<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="caseAdderVisable=true">新增病例</el-button>

        <!-- 搜索栏 -->
        <el-input placeholder="输入搜索内容" v-model="searchInformation" clearable style="margin-bottom: 20px;">
            <template #append>
                <el-button @click="searchInList">
                    <el-icon><search /></el-icon>
                </el-button>
            </template>
        </el-input>

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
            <el-form-item label="图片1">
                <el-upload
                :limit=1
                :auto-upload="false" 
                :data="caseAdderList.photo1"
                :on-change="changePhoto1"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" 
                    @click="submitUpload">上传</el-button> -->
                </el-upload>
            </el-form-item>

            <el-form-item label="图片2">
                <el-upload
                :limit=1
                :auto-upload="false" 
                :data="caseAdderList.photo2"
                :on-change="changePhoto2"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" 
                    @click="submitUpload">上传</el-button> -->
                </el-upload>
            </el-form-item>

            <el-form-item label="视频">
                <el-upload
                :limit=1
                :auto-upload="false" 
                :data="caseAdderList.video4"
                :on-change="changeVideo4"
                accept=".mp4,.m3ug,.flv,.mov,.dvr">
                <template #trigger>
                    <el-button size="small">选取视频</el-button>
                </template>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" 
                    @click="submitUpload">上传</el-button> -->
                </el-upload>
            </el-form-item>

        </el-form>
        <div class="dialog-footer">
            <el-button @click="caseAdderVisable = false">取消</el-button>
            <el-button type="primary" @click="addCase">确定</el-button>
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
import { Plus } from '@element-plus/icons-vue'
import 'video.js/dist/video-js.css'
import { get_all_cases,change_cname,change_photo1,change_photo2,change_type,change_video4,change_word1,change_word2,change_word3,change_word4,delete_case,insert_case,getLikeCases } from '@/api/api';
import { ElMessage } from 'element-plus';

const searchInformation = ref("")
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
    video4:''
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
    video4:''
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

// 新增病例-图片1相关
const changePhoto1 = (UploadFile) => {
    caseAdderList.value.photo1 = UploadFile
}
// const uploadPhoto1 = (response,file,fileList) => {
//     caseAdderList.value.photo1 = response.url
//     console.log("res:"+response)
//     console.log("file:"+file)
//     console.log("fileList:"+fileList)
// }

// 新增病例-图片2相关
const changePhoto2 = (UploadFile) => {
    caseAdderList.value.photo2 = UploadFile
}

// 新增病例-视频相关
const changeVideo4 = (UploadFile) => {
    caseAdderList.value.video4 = UploadFile
}

// 新增病例
const addCase = () => {
    console.log(caseAdderList.value)
    let formData = new FormData();
    formData.append("cname",caseAdderList.value.cname);
    formData.append("word1",caseAdderList.value.word1);
    formData.append("word2",caseAdderList.value.word2);
    formData.append("word3",caseAdderList.value.word3);
    formData.append("word4",caseAdderList.value.word4);
    formData.append("type",caseAdderList.value.type);
    formData.append("photo1",caseAdderList.value.photo1.raw);
    formData.append("photo2",caseAdderList.value.photo2.raw);
    formData.append("video4",caseAdderList.value.video4.raw);
    insert_case(formData).then(res=>{
        if(res.state === 200)
        {
            ElMessage({
                message:'上传成功！',
                type:'success',
                duration:1500
            })
            caseAdderVisable.value=false
            location.reload()
        }
        else
        {
            ElMessage({
                message:'上传失败，请检查是否填满选项，并等待文件传输完毕。',
                type:'error',
                duration:1500
            })
        }
    }).catch(err=>{
        ElMessage({
                message:'服务器出错啦',
                type:'error',
                duration:1500
            })
        caseAdderVisable.value=false
        console.error(err)
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