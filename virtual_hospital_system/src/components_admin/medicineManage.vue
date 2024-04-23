<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="caseAdderVisable=true">新增药品</el-button>

        <!-- 搜索栏 -->
        <el-input placeholder="输入搜索内容" v-model="searchInformation" clearable style="margin-bottom: 20px;">
            <template #append>
                <el-button @click="searchInList">
                    <el-icon><search /></el-icon>
                </el-button>
            </template>
        </el-input>

        <!-- 药品显示列表 -->
        <el-card style="margin-bottom: 20px;" v-for="(thisCase,index) in caseList" :key="thisCase.mid">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>{{ thisCase.mname }}</span>
                <div style="margin-left: auto;">
                <el-button type="primary" @click="showEditer(thisCase);currentMid=thisCase.mid" style="position: relative;">编辑</el-button>
                <el-button type="danger" @click="caseDeleterVisable=true;currentMid=thisCase.mid"style="position: relative;">删除</el-button>
                <el-icon size="medium"@click="toggleExpand(index)">
                    <ArrowDown v-if="!isExpanded[index]" />
                    <ArrowUp v-if="isExpanded[index]" />
                </el-icon>
                </div>
            </div>
            <div v-if="isExpanded[index]">
                <p style="color: lightseagreen;">id：{{ thisCase.mid }}</p>
                <div>
                    <p style="color: darkgray;">药品内容：</p>
                    <p>{{ thisCase.content }}</p>
                </div>
            </div>
        </el-card>

        <!-- 编辑药品模块 -->
        <el-dialog v-model="caseEditerVisable" title="编辑药品">
        <el-form :model="caseEditerList" ref="myEditerList">
            <el-form-item label="药品名称">
            <el-input v-model="caseEditerList.mname" placeholder="请输入药品名称"></el-input>
            </el-form-item>
            <el-form-item label="药品内容">
            <el-input v-model="caseEditerList.content" placeholder="请输入药品内容"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="caseEditerVisable = false">取消</el-button>
            <el-button type="primary" @click="editCase(caseEditerList)">确定</el-button>
        </div>
        </el-dialog>

        <!-- 新增药品模块 -->
        <el-dialog v-model="caseAdderVisable" title="新增药品">
        <el-form :model="caseAdderList" ref="myAdderList">
            <el-form-item label="药品名称" placeholder="请输入药品名称">
            <el-input v-model="caseAdderList.mname"></el-input>
            </el-form-item>
            <el-form-item label="药品内容">
            <el-input v-model="caseAdderList.content" placeholder="请输入药品内容"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="caseAdderVisable = false">取消</el-button>
            <el-button type="primary" @click="addCase">确定</el-button>
        </div>
        </el-dialog>


        <!-- 删除提示 -->
        <el-dialog v-model="caseDeleterVisable" title="删除药品">
            <div>确定删除？</div>
            <div class="dialog-footer">
                <el-button @click="caseDeleterVisable = false">取消</el-button>
                <el-button type="primary" @click="deleteCase(currentMid)">确定</el-button>
            </div>
        </el-dialog>
    </div>
    
</template>
<script setup>
import { reactive,ref,onMounted,getCurrentInstance  } from 'vue';
import { get_all_medicine,insert_medicine,change_mname,change_content,delete_medicine,getMedicineByMname } from '@/api/medicineApi';
import { ElMessage } from 'element-plus';

const searchInformation = ref("")
const { proxy } = getCurrentInstance()
const currentMid = ref(0)
const caseList = ref([])
const isExpanded = reactive({})
const caseEditerList = ref({
    content:'',
    mid:'',
    mname:''
})
const caseAdderList = ref({
    content:'',
    mid:'',
    mname:''
})
const caseEditerVisable = ref(false)
const caseAdderVisable = ref(false)
const caseDeleterVisable = ref(false)

onMounted(()=>{
    get_all_medicine().then(res=>{
        console.log("data",res.data)
        caseList.value=res.data
    })
})

const toggleExpand = (index) => {
    isExpanded[index] = !isExpanded[index];
}

// 搜索功能
const searchInList = () => {
    if(searchInformation.value === ''){
        get_all_medicine().then(res=>{
        caseList.value=res.data
    }) 
    }else{  
    getMedicineByMname(searchInformation.value).then(res=>{
        if(res.state === 200)
        {
            caseList.value=[res.data]
        }
    }).catch(err=>{
        ElMessage({
            message:"服务器或网络出错",
            type:"error",
            duration:1500
        })
        console.log(err)
    }) }
}

// 显示编辑列表并赋值
const showEditer = (thisCase) => {
    caseEditerVisable.value = true;
    caseEditerList.value=thisCase;
}

// 上传编辑后的病例
const editCase = (data) => {
    if(data.mname === ''){
        ElMessage({
                message:'药品名称不能为空',
                type:'error',
                duration:1500
            })
    }else if(data.content === ''){
        ElMessage({
                message:'药品内容不能为空',
                type:'error',
                duration:1500
            })
    }else{
    change_mname(data.mid,data.mname).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    change_content(data.mid,data.content).then(res=>{
    }).catch(error=>{
        console.log("错误err:"+error)
    });
    ElMessage({
        message:"更改信息成功！",
        type:"success"
    })
    caseEditerVisable.value=false;
    }
};

// 删除病例
const deleteCase = (thisMid) => {
    delete_medicine(thisMid).then(res=>{
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
// 新增药品
const addCase = () => {
    console.log(caseAdderList.value)
    insert_medicine(caseAdderList.value.mname,caseAdderList.value.content).then(res=>{
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
                message:'上传失败，请检查是否重复。',
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