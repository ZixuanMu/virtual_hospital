<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="studyAdderVisable=true">新增学习</el-button>
        <!-- 搜索栏 -->
        <el-input placeholder="输入1,2,3搜索前台，医助，兽医" v-model="searchInformation" clearable style="margin-bottom: 20px;">
            <template #append>
                <el-button @click="searchInList">
                    <el-icon><search /></el-icon>
                </el-button>
            </template>
        </el-input>
        <el-card style="margin-bottom: 20px;" v-for="(thisStudy,index) in studyList" :key="thisStudy.did">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>{{ thisStudy.name }}</span>
                <div style="margin-left: auto;">
                <el-button type="primary" @click="showEditer(thisStudy);currentCid=thisStudy.did" style="position: relative;">编辑</el-button>
                <el-button type="danger" @click="studyDeleterVisable=true;currentDid=thisStudy.did"style="position: relative;">删除</el-button>
                <el-icon size="medium"@click="toggleExpand(index)">
                    <ArrowDown v-if="!isExpanded[index]" />
                    <ArrowUp v-if="isExpanded[index]" />
                </el-icon>
                </div>
            </div>
            <div v-if="isExpanded[index]">
                <p style="color: lightseagreen;">id：{{ thisStudy.did }}</p>
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

        <!-- 编辑学习模块 -->
        <el-dialog v-model="studyEditerVisable" title="编辑">
        <el-form :model="studyEditerList" ref="myEditerList">
            <el-form-item label="角色">
            <el-input v-model="studyEditerList.actor" placeholder="请更换角色"></el-input>
            </el-form-item>
            <el-form-item label="职责名">
            <el-input v-model="studyEditerList.name" placeholder="请输入职责名"></el-input>
            </el-form-item>
            <el-form-item label="职责描述">
            <el-input v-model="studyEditerList.content" placeholder="职责描述"></el-input>
            </el-form-item>
            <el-form-item label="示例图片">
                <el-upload
                class="upload-demo"
                list-type="picture"
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="studyEditerList.pic"
                :on-change="changeEditerPic"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload>
            </el-form-item>          
            <el-form-item label="视频演示">
                <el-upload
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="studyEditerList.video"
                :on-change="changeEditerVideo"
                accept=".mp4,.m3ug,.flv,.mov,.dvr">
                <template #trigger>
                    <el-button size="small">选取视频</el-button>
                </template>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="studyEditerVisable = false">取消</el-button>
            <el-button type="primary" @click="editStudy(studyEditerList)">确定</el-button>
        </div>
        </el-dialog>

        <!-- 新增学习模块 -->
        <el-dialog v-model="studyAdderVisable" title="新增学习">
        <el-form :model="studyAdderList" ref="myAdderList">
            <el-form-item label="角色">
            <el-select v-model="studyAdderList.actor" placeholder="前台医助或兽医">
                    <el-option  :value = 1 label="前台">前台</el-option>
                    <el-option  :value = 2 label="医助">医助</el-option>
                    <el-option  :value = 3 label="兽医">兽医</el-option>
             </el-select>
             </el-form-item>
            <el-form-item label="职责名">
            <el-input v-model="studyAdderList.name" placeholder="职责名"></el-input>
            </el-form-item>
            <el-form-item label="职责描述">
            <el-input v-model="studyAdderList.content" placeholder="职责描述"></el-input>
            </el-form-item>
            <el-form-item label="示例图片">
                <el-upload
                class="upload-demo"
                list-type="picture"
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="studyAdderList.pic"
                :on-change="changePic"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload>
            </el-form-item>

            <el-form-item label="视频">
                <el-upload
                :limit=1
                :auto-upload="false" 
                :data="studyAdderList.video"
                :on-change="changeAdderVideo"
                accept=".mp4,.m3ug,.flv,.mov,.dvr">
                <template #trigger>
                    <el-button size="small">选取视频</el-button>
                </template>
                </el-upload>
            </el-form-item>

        </el-form>
        <div class="dialog-footer">
            <el-button @click="studyAdderVisable = false">取消</el-button>
            <el-button type="primary" @click="addStudy">确定</el-button>
        </div>
        </el-dialog>

        
        <!-- 删除提示 -->
        <el-dialog v-model="studyDeleterVisable" title="删除病例">
            <div>确定删除？</div>
            <div class="dialog-footer">
                <el-button @click="studyDeleterVisable = false">取消</el-button>
                <el-button type="primary" @click="deleteDuty(currentDid)">确定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>
<script setup>
import { reactive,ref,onMounted,getCurrentInstance  } from 'vue';
import { VideoPlayer } from '@videojs-player/vue'
import { Plus } from '@element-plus/icons-vue'
import 'video.js/dist/video-js.css'
import { get_all_duties,change_actor,change_name,change_content,change_video,delete_duty,getDutyByActor,insert_duty,change_pic } from '@/api/api';
import { ElMessage,ElMessageBox } from 'element-plus';

const searchInformation = ref("")
const { proxy } = getCurrentInstance()
const currentDid = ref(0)
const studyList = ref([])//定义响应式数组变量
const isExpanded = reactive({})
const studyEditerList = ref({
    actor: "",
    content: "",
    did: "",
    name: "",
    pic:"",
    video: ""
})
const studyAdderList = ref({
    actor: "",
    content: "",
    did: "",
    name: "",
    pic:"",
    video: ""
})
const studyEditerVisable = ref(false)
const studyAdderVisable = ref(false)
const studyDeleterVisable = ref(false)
const videoChange = ref(false)
const picChange = ref(false)

console.log(studyList)
onMounted(()=>{
    get_all_duties().then(res=>{
        console.log(res)
        studyList.value=res.data
    }) 
})

const toggleExpand = (index) => {
    isExpanded[index] = !isExpanded[index];
}

// 搜索功能
const searchInList = () => {
    if(searchInformation.value === ''){
        get_all_duties().then(res=>{
        console.log(res)
        studyList.value=res.data
    }) 
    }else{  
    getDutyByActor({actor:searchInformation.value}).then(res=>{
        console.log("value",searchInformation.value)
        if(res.state === 200)
        {
            studyList.value=res.data
        }
    }).catch(err=>{
        ElMessage({
            message:"服务器或网络出错",
            type:"error",
            duration:1500
        })
        console.log(err)
    })   }
}

// 显示编辑列表并赋值
const showEditer = (thisStudy) => {
    studyEditerVisable.value = true;
    studyEditerList.value=thisStudy;
}

//编辑病例-图片视频相关
const changeEditerPic = (UploadFile) => {
    studyEditerList.value.pic = UploadFile
    picChange.value = true
    console.log("pic:"+picChange.value)
}

const changeEditerVideo = (UploadFile) => {
    studyEditerList.value.video = UploadFile
    videoChange.value = true
}



// 上传编辑后的病例
const editStudy = (data) => {
    console.log("did:"+data.did)
    console.log("actor:"+data.actor)
    change_actor(data.did,data.actor).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_name(data.did,data.name).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_content(data.did,data.content).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    if (picChange.value === true){
        let pic = new FormData();
        pic.append("file",data.pic.raw)
        pic.append("did",data.did)
        change_pic(pic).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log("错误err:"+error)
        });
        picChange.value = false
    }
    if (videoChange.value === true){
        let video = new FormData();
        video.append("did",data.did)
        video.append("file",data.video.raw)
        change_video(video).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log("错误err:"+error)
        });
        videoChange.value = false
    }
    ElMessage({
        message:"更改信息成功！请重新刷新",
        type:"success"
    })
    studyEditerVisable.value=false;
};

// 删除职责
const deleteDuty = (thisDid) => {
    delete_duty(thisDid).then(res=>{
        if(res.state === 200)
        {
            proxy.$message.success("删除成功")
            studyDeleterVisable.value=false
            location.reload()
        }
    }).catch(error=>{
        console.log("删除报错："+error)
    })
}

// 新增病例-图片视频相关
const changePic = (UploadFile) => {
    studyAdderList.value.pic = UploadFile
}

const changeAdderVideo = (UploadFile) => {
    studyAdderList.value.video = UploadFile
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
const addStudy = () => {
    console.log(studyAdderList.value)
    let formData = new FormData();
    formData.append("pic",studyAdderList.value.pic.raw);
    formData.append("video",studyAdderList.value.video.raw);
    formData.append("actor",studyAdderList.value.actor);
    formData.append("content",studyAdderList.value.content);
    formData.append("name",studyAdderList.value.name);
    insert_duty(formData).then(res=>{

        console.log(res)
        if(res.state === 200)
        {
            ElMessage({
                message:'上传成功！',
                type:'success',
                duration:1500
            })
            studyAdderVisable.value=false
            location.reload()
        }
        else
        {
            ElMessage({
                message:'上传失败，请检查是否填满选项或职责名重复，并等待文件传输完毕。',
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
        studyAdderVisable.value=false
        console.error(err)
    })
}
</script>
<style>
</style>