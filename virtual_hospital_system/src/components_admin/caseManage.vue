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
        <el-card style="margin-bottom: 20px;" v-for="(thisCase,index) in caseList" :key="thisCase.cid">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>{{ thisCase.cname }}</span>
                <div style="margin-left: auto;">
                <el-button type="primary" @click="showEditer(thisCase);currentCid=thisCase.cid" style="position: relative;">编辑</el-button>
                <el-button type="danger" @click="caseDeleterVisable=true;currentCid=thisCase.cid"style="position: relative;">删除</el-button>
                <el-icon size="medium"@click="toggleExpand(index)">
                    <ArrowDown v-if="!isExpanded[index]" />
                    <ArrowUp v-if="isExpanded[index]" />
                </el-icon>
                </div>
            </div>
            <div v-if="isExpanded[index]">
                <p style="color: lightseagreen;">{{ thisCase.type }}</p>
                <div>
                    <p style="color: darkgray;">接诊记录：</p>
                    <p>{{ thisCase.word1 }}</p>
                </div>
                <div>
                    <p style="color: darkgray;">病例检查：</p>
                    <p>{{ thisCase.word2 }}</p>
                </div>
                <div>
                    <p style="color: darkgray;">诊断结果：</p>
                    <p>{{ thisCase.word3 }}</p>
                </div>
                <div>
                    <p style="color: darkgray;">治疗方案：</p>
                    <p>{{ thisCase.word4 }}</p>
                </div>
                <div>
                    <p style="color: darkgray;">接诊图片：</p>
                    <img :src="thisCase.photo1" class="caseImg"></img>
                    <p style="color: darkgray;">诊断结果：</p>
                    <img :src="thisCase.photo2" class="caseImg"></img>
                </div>
                <div>
                    <p style="color: darkgray;">方案演示：</p>
                    <video-player :src="thisCase.video4" :controls="true" :autoplay="false" style="width: 100%;height: 400px;"></video-player>
                </div>
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
            <el-form-item label="接诊记录">
            <el-input v-model="caseEditerList.word1" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="病例检查">
            <el-input v-model="caseEditerList.word2" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="诊断结果">
            <el-input v-model="caseEditerList.word3" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="治疗方案">
            <el-input v-model="caseEditerList.word4" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="接诊图片">
                <el-upload
                class="upload-demo"
                list-type="picture"
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="caseEditerList.photo1"
                :on-change="changeEditerPhoto1"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload>
            </el-form-item>

            <el-form-item label="诊断结果">
                <el-upload
                class="upload-demo"
                list-type="picture"
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="caseEditerList.photo2"
                :on-change="changeEditerPhoto2"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload>
            </el-form-item>

            <el-form-item label="方案演示">
                <el-upload
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="caseEditerList.video4"
                :on-change="changeEditerVideo4"
                accept=".mp4,.m3ug,.flv,.mov,.dvr">
                <template #trigger>
                    <el-button size="small">选取视频</el-button>
                </template>
                </el-upload>
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
            <el-form-item label="接诊记录">
            <el-input v-model="caseAdderList.word1" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="病例检查">
            <el-input v-model="caseAdderList.word2" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="诊断结果">
            <el-input v-model="caseAdderList.word3" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="治疗方案">
            <el-input v-model="caseAdderList.word4" placeholder="请输入文字记录"></el-input>
            </el-form-item>
            <el-form-item label="接诊图片">
                <el-upload
                class="upload-demo"
                list-type="picture"
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="caseAdderList.photo1"
                :on-change="changePhoto1"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload>
            </el-form-item>

            <el-form-item label="诊断结果">
                <el-upload
                class="upload-demo"
                list-type="picture"
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="caseAdderList.photo2"
                :on-change="changePhoto2"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload>
            </el-form-item>

            <el-form-item label="方案演示">
                <el-upload
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="caseAdderList.video4"
                :on-change="changeVideo4"
                accept=".mp4,.m3ug,.flv,.mov,.dvr">
                <template #trigger>
                    <el-button size="small">选取视频</el-button>
                </template>
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
import { ElMessage,ElMessageBox } from 'element-plus';

const searchInformation = ref("")
const { proxy } = getCurrentInstance()
const currentCid = ref(0)
const caseList = ref([])//定义响应式数组变量，存放全部病例
const isExpanded = reactive({})
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
const photo1Change = ref(false)
const photo2Change = ref(false)
const video4Change = ref(false)

onMounted(()=>{
    get_all_cases().then(res=>{
        console.log(res)
        caseList.value=res.data
    })
})

const toggleExpand = (index) => {
    isExpanded[index] = !isExpanded[index];
}

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

//编辑病例-图片视频相关
const changeEditerPhoto1 = (UploadFile) => {
    caseEditerList.value.photo1 = UploadFile
    photo1Change.value = true
    console.log("photo1:"+photo1Change.value)
}

// 新增病例-图片2相关
const changeEditerPhoto2 = (UploadFile) => {
    caseEditerList.value.photo2 = UploadFile
    photo2Change.value = true
    console.log("photo2:"+photo2Change.value)
}

// 新增病例-视频相关
const changeEditerVideo4 = (UploadFile) => {
    caseEditerList.value.video4 = UploadFile
    video4Change.value = true
    console.log("video4:"+video4Change.value)
}
// 上传编辑后的病例
const editCase = (data) => {
    change_cname(data.cid,data.cname).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_word1(data.cid,data.word1).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_word2(data.cid,data.word2).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_word3(data.cid,data.word3).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_word4(data.cid,data.word4).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_type(data.cid,data.type).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    if (photo1Change.value === true){
        let photo1 = new FormData();
        photo1.append("cid",data.cid)
        photo1.append("photo1",data.photo1.raw)
        change_photo1(photo1).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log("错误err:"+error)
        });
        photo1Change.value = false
    }
    if (photo2Change.value === true){
        let photo2 = new FormData();
        photo2.append("cid",data.cid)
        photo2.append("photo2",data.photo2.raw)
        change_photo2(photo2).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log("错误err:"+error)
        });
        photo2Change.value = false
    }
    if (video4Change.value === true){
        let video4 = new FormData();
        video4.append("cid",data.cid)
        video4.append("video4",data.video4.raw)
        change_video4(video4).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log("错误err:"+error)
        });
        video4Change.value = false
    }
    ElMessage({
        message:"更改信息成功！请耐心等待文件传输完毕",
        type:"success"
    })
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

// 新增病例-图片2相关
const changePhoto2 = (UploadFile) => {
    caseAdderList.value.photo2 = UploadFile
}

// 新增病例-视频相关
const changeVideo4 = (UploadFile) => {
    caseAdderList.value.video4 = UploadFile
}

// 上传插件事件相关
const beforeRemove = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `确定要移除文件 ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
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