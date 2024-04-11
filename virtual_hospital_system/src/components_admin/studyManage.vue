<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="caseAdderVisable=true">新增学习</el-button>

        <!-- 搜索栏 -->
        <el-input placeholder="输入搜索内容" v-model="searchInformation" clearable style="margin-bottom: 20px;">
            <template #append>
                <el-button @click="searchInList">
                    <el-icon><search /></el-icon>
                </el-button>
            </template>
        </el-input>

        <!-- 病例显示列表 -->
        <!-- <el-card style="margin-bottom: 20px;" v-for="thisCase in caseList" :key="thisCase.did">
            <div>
                <span>{{ thisCase.did }}</span>
                <el-button type="text" @click="showEditer(thisCase);currentDid=thisCase.did">编辑</el-button>
                <el-button type="text" @click="caseDeleterVisable=true;currentDid=thisCase.did">删除</el-button>
            </div>
            <p style="color: lightseagreen;">{{ thisCase.actor }}</p>
            <div>
                <p style="color: darkgray;">文字记录1：{{ thisCase.name }}</p>
            </div>
            <div>
                <p style="color: darkgray;">文字记录2：{{ thisCase.content }}</p>
            </div>
            <div>
                <video-player :src="thisCase.video" :controls="true" :autoplay="false" style="width: 100%;height: 400px;"></video-player>
            </div>
        </el-card> -->
        <el-card style="margin-bottom: 20px;" v-for="(thisCase,index) in caseList" :key="thisCase.did">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>{{ thisCase.did }}</span>
                <el-button type="primary" @click="showEditer(thisCase);currentCid=thisCase.did" style="position: absolute;left:70%">编辑</el-button>
                <el-button type="danger" @click="caseDeleterVisable=true;currentDid=thisCase.did"style="position: absolute;left:80%">删除</el-button>
                <el-icon size="medium"@click="toggleExpand(index)">
                    <ArrowDown v-if="!isExpanded[index]" />
                    <ArrowUp v-if="isExpanded[index]" />
                </el-icon>
            </div>
            <div v-if="isExpanded[index]">
                <p style="color: lightseagreen;">角色：{{ thisCase.actor }}</p>
                <div>
                    <p style="color: darkgray;">职责名：</p>
                    <p>{{ thisCase.name }}</p>
                </div>
                <div>
                    <p style="color: darkgray;">职责内容：</p>
                    <p>{{ thisCase.content }}</p>
                </div>
                <div>
                    <p style="color: darkgray;">演示：</p>
                    <video-player :src="thisCase.video" :controls="true" :autoplay="false" style="width: 100%;height: 400px;"></video-player>
                </div>
            </div>
        </el-card>

        <!-- 编辑学习模块 -->
        <el-dialog v-model="caseEditerVisable" title="编辑">
        <el-form :model="caseEditerList" ref="myEditerList">
            <el-form-item label="角色actor">
            <el-input v-model="caseEditerList.actor" placeholder="请更换角色"></el-input>
            </el-form-item>
            <el-form-item label="这个name">
            <el-input v-model="caseEditerList.name" placeholder="请输入name"></el-input>
            </el-form-item>
            <el-form-item label="描述content">
            <el-input v-model="caseEditerList.content" placeholder="请输入content"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="caseEditerVisable = false">取消</el-button>
            <el-button type="primary" @click="editCase(caseEditerList)">确定</el-button>
        </div>
        </el-dialog>

        <!-- 新增学习模块 -->
        <el-dialog v-model="caseAdderVisable" title="新增学习">
        <el-form :model="caseAdderList" ref="myAdderList">
            <el-form-item label="角色actor" placeholder="请输入角色名">
            <el-input v-model="caseAdderList.actor"></el-input>
            </el-form-item>
            <el-form-item label="学习的name">
            <el-input v-model="caseAdderList.name" placeholder="请输入name"></el-input>
            </el-form-item>
            <el-form-item label="描述content">
            <el-input v-model="caseAdderList.content" placeholder="请输入content"></el-input>
            </el-form-item>
            <el-form-item label="视频">
                <el-upload
                :limit=1
                :auto-upload="false" 
                :data="caseAdderList.video"
                :on-change="changeVideo"
                accept=".mp4,.m3ug,.flv,.mov,.dvr">
                <template #trigger>
                    <el-button size="small">选取视频</el-button>
                </template>
                <el-button style="margin-left: 10px;" size="small" type="success" 
                    @click="submitUpload">上传</el-button>
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
import { get_all_duties,change_actor,change_name,change_content,change_video,delete_duty,getDutyByActor,getDutyByName,insert_duty } from '@/api/api';
import { ElMessage } from 'element-plus';

const searchInformation = ref("")
const { proxy } = getCurrentInstance()
const currentDid = ref(0)
const caseList = ref([])//定义响应式数组变量
const isExpanded = reactive({})
const caseEditerList = ref({
    actor: "",
    content: "",
    did: "",
    name: "",
    video: ""
})
const caseAdderList = ref({
    actor: "",
    content: "",
    did: "",
    name: "",
    video: ""
})
const caseEditerVisable = ref(false)
const caseAdderVisable = ref(false)
const caseDeleterVisable = ref(false)

onMounted(()=>{
    get_all_duties().then(res=>{
        console.log(res)
        caseList.value=res.data
    }) 
})

const toggleExpand = (index) => {
    isExpanded[index] = !isExpanded[index];
}

// 搜索功能
const searchInList = () => {
    getDutyByActor(searchInformation.value).then(res=>{
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
    caseEditerVisable.value=false;
    location.reload()
};

// 删除职责
const deleteDuty = (thisDid) => {
    delete_duty(thisDid).then(res=>{
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

// 新增病例-视频相关
const changeVideo = (UploadFile) => {
    caseAdderList.value.video = UploadFile
}

// 新增病例
const addCase = () => {
    console.log(caseAdderList.value)
    let formData = new FormData();
    formData.append("actor",caseAdderList.value.actor);
    formData.append("content",caseAdderList.value.content);
    formData.append("name",caseAdderList.value.name);
    formData.append("video",caseAdderList.value.video.raw);
    insert_duty(formData).then(res=>{
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