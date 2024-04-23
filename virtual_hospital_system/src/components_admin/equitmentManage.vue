<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="equipmentAdderVisable=true">新增器具</el-button>
        
        <!-- 搜索栏 -->
        <el-input placeholder="输入搜索内容" v-model="searchInformation" clearable style="margin-bottom: 20px;">
            <template #append>
                <el-button @click="searchInList">
                    <el-icon><search /></el-icon>
                </el-button>
            </template>
        </el-input>

        <!-- 器具显示列表 -->
        <el-card style="margin-bottom: 20px;" v-for="(thisEquipment,index) in equipmentList" :key="thisEquipment.eid">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>{{ thisEquipment.ename }}</span>
                <div style="margin-left: auto;">
                <el-button type="primary" @click="showEditer(thisEquipment);currentEid=thisEquipment.eid" style="position: relative;">编辑</el-button>
                <el-button type="danger" @click="equipmentDeleterVisable=true;currentEid=thisEquipment.eid"style="position: relative;">删除</el-button>
                <el-icon size="medium"@click="toggleExpand(index)">
                    <ArrowDown v-if="!isExpanded[index]" />
                    <ArrowUp v-if="isExpanded[index]" />
                </el-icon>
                </div>
            </div>
            <div v-if="isExpanded[index]">
                <p style="color: lightseagreen;">id:{{ thisEquipment.eid }}</p>
                <div>
                    <p style="color: darkgray;">器具功能：</p>
                    <p>{{ thisEquipment.fun }}</p>
                </div>
                <div>
                    <p style="color: darkgray;">操作流程：</p>
                    <p>{{ thisEquipment.operation }}</p>
                </div>
                <div>
                    <p style="color: darkgray;">图片：</p>
                    <img :src="thisEquipment.suffix" class="caseImg"></img>
                </div>
                <div>
                    <p style="color: darkgray;">演示：</p>
                    <video-player :src="thisEquipment.video" :controls="true" :autoplay="false" style="width: 100%;height: 400px;"></video-player>
                </div>
            </div>
        </el-card>

        <!-- 编辑器具模块 -->
        <el-dialog v-model="equipmentEditerVisable" title="编辑器具">
        <el-form :model="equipmentEditerList" ref="myEditerList">
            <el-form-item label="器具名称">
            <el-input v-model="equipmentEditerList.ename" placeholder="请输入器具名称"></el-input>
            </el-form-item>
            <el-form-item label="器具功能">
            <el-input v-model="equipmentEditerList.fun" placeholder="请输入器具功能"></el-input>
            </el-form-item>
            <el-form-item label="操作流程">
            <el-input v-model="equipmentEditerList.operation" placeholder="请输入操作流程"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                class="upload-demo"
                list-type="picture"
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="equipmentEditerList.suffix"
                :on-change="changeEditerSuffix"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload>
            </el-form-item>

            <el-form-item label="演示">
                <el-upload
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="equipmentEditerList.video"
                :on-change="changeEditerVideo"
                accept=".mp4,.m3ug,.flv,.mov,.dvr">
                <template #trigger>
                    <el-button size="small">选取视频</el-button>
                </template>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="equipmentEditerVisable = false">取消</el-button>
            <el-button type="primary" @click="editEquipment(equipmentEditerList)">确定</el-button>
        </div>
        </el-dialog>

        <!-- 新增器具模块 -->
        <el-dialog v-model="equipmentAdderVisable" title="新增器具">
        <el-form :model="equipmentAdderList" label-width = 'auto' ref="myAdderList">
            <el-form-item label="器具名称">
            <el-input v-model="equipmentAdderList.ename" placeholder="请输入器具名称"></el-input>
            </el-form-item>
            <el-form-item label="器具功能">
            <el-input v-model="equipmentAdderList.fun" placeholder="请输入器具功能"></el-input>
            </el-form-item>
            <el-form-item label="操作流程">
            <el-input v-model="equipmentAdderList.operation" placeholder="请输入操作流程"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <el-upload
                class="upload-demo"
                list-type="picture"
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="equipmentAdderList.suffix"
                :on-change="changeSuffix"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload>
            </el-form-item>

            <el-form-item label="演示">
                <el-upload
                :before-remove="beforeRemove"
                :limit=1
                :auto-upload="false" 
                :data="equipmentAdderList.video"
                :on-change="changeVideo"
                accept=".mp4,.m3ug,.flv,.mov,.dvr">
                <template #trigger>
                    <el-button size="small">选取视频</el-button>
                </template>
                </el-upload>
            </el-form-item>

        </el-form>
        <div class="dialog-footer">
            <el-button @click="equipmentAdderVisable = false">取消</el-button>
            <el-button type="primary" @click="addEquipment">确定</el-button>
        </div>
        </el-dialog>


        <!-- 删除提示 -->
        <el-dialog v-model="equipmentDeleterVisable" title="删除器具">
            <div>确定删除？</div>
            <div class="dialog-footer">
                <el-button @click="equipmentDeleterVisable = false">取消</el-button>
                <el-button type="primary" @click="deleteEquipment(currentEid)">确定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>
<script setup>
import { reactive,ref,onMounted,getCurrentInstance  } from 'vue';
import { VideoPlayer } from '@videojs-player/vue'
import { Plus } from '@element-plus/icons-vue'
import 'video.js/dist/video-js.css'
import { change_ename,change_suffix,change_fun,change_video,change_operation,delete_equipment,insert_equipment,getEquipmentByEname,get_all_equipment } from '@/api/eqApi';
import { ElMessage,ElMessageBox } from 'element-plus';

const searchInformation = ref("")
const { proxy } = getCurrentInstance()
const currentEid = ref(0)
const equipmentList = ref([])//定义响应式数组变量，存放全部病例
const isExpanded = reactive({})
const equipmentEditerList = ref({
    eid:'',
    ename:'',
    fun:'',
    operation:'',
    suffix:'',
    video:''
})
const equipmentAdderList = ref({
    eid:'',
    ename:'',
    fun:'',
    operation:'',
    suffix:'',
    video:''
})
const equipmentEditerVisable = ref(false)
const equipmentAdderVisable = ref(false)
const equipmentDeleterVisable = ref(false)
const suffixChange = ref(false)
const videoChange = ref(false)

onMounted(()=>{
    get_all_equipment().then(res=>{
        console.log(res)
        equipmentList.value=res.data
    })
})

const toggleExpand = (index) => {
    isExpanded[index] = !isExpanded[index];
}

// 搜索功能
const searchInList = () => {
    getEquipmentByEname(searchInformation.value).then(res=>{
        console.log("搜索内容：",searchInformation.value)
        console.log("state",res.state)
        console.log(res)
        if(res.state === 200)
        {
            equipmentList.value=[res.data]
            console.log(res.data)
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
const showEditer = (thisEquipment) => {
    equipmentEditerVisable.value = true;
    equipmentEditerList.value=thisEquipment;
}

//编辑器具-图片相关
const changeEditerSuffix = (UploadFile) => {
    equipmentEditerList.value.suffix = UploadFile
    suffixChange.value = true
}

// 新增器具-视频相关
const changeEditerVideo = (UploadFile) => {
    equipmentEditerList.value.video = UploadFile
    videoChange.value = true
}
// 上传编辑后的器具
const editEquipment = (data) => {
    change_ename(data.eid,data.ename).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_fun(data.eid,data.fun).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_operation(data.eid,data.operation).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    if (suffixChange.value === true){
        let suffix = new FormData();
        suffix.append("eid",data.eid)
        suffix.append("suffix",data.suffix.raw)
        change_suffix(suffix).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log("错误err:"+error)
        });
        suffixChange.value = false
    }
    if (videoChange.value === true){
        let video = new FormData();
        video.append("eid",data.eid)
        video.append("video",data.video.raw)
        change_video(video).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log("错误err:"+error)
        });
        videoChange.value = false
    }
    ElMessage({
        message:"更改信息成功！请耐心等待文件传输完毕",
        type:"success"
    })
    equipmentEditerVisable.value=false;
};

// 删除病例
const deleteEquipment = (thisEid) => {
    delete_equipment(thisEid).then(res=>{
        if(res.state === 200)
        {
            proxy.$message.success("删除成功")
            equipmentDeleterVisable.value=false
            location.reload()
        }
    }).catch(error=>{
        console.log("删除报错："+error)
    })
}

// 新增器具-图片相关
const changeSuffix = (UploadFile) => {
    equipmentAdderList.value.suffix = UploadFile
}

// 新增器具-视频相关
const changeVideo = (UploadFile) => {
    equipmentAdderList.value.video = UploadFile
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

// 新增器具
const addEquipment = () => {
    console.log(equipmentAdderList.value)
    let formData = new FormData();
    formData.append("ename",equipmentAdderList.value.ename);
    formData.append("fun",equipmentAdderList.value.fun);
    formData.append("operation",equipmentAdderList.value.operation);
    formData.append("suffix",equipmentAdderList.value.suffix.raw);
    formData.append("video",equipmentAdderList.value.video.raw);
    insert_equipment(formData).then(res=>{
        if(res.state === 200)
        {
            ElMessage({
                message:'上传成功！',
                type:'success',
                duration:1500
            })
            equipmentAdderVisable.value=false
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
        equipmentAdderVisable.value=false
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