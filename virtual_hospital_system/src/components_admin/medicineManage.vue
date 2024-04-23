<template>
    <div style="padding: 20px;">

        <el-button type="primary" style="margin-bottom: 20px;" @click="medicineAdderVisable=true">新增药品</el-button>

        <!-- 搜索栏 -->
        <el-input placeholder="输入搜索内容" v-model="searchInformation" clearable style="margin-bottom: 20px;">
            <template #append>
                <el-button @click="searchInList">
                    <el-icon><search /></el-icon>
                </el-button>
            </template>
        </el-input>

        <!-- 药品显示列表 -->
        <el-card style="margin-bottom: 20px;" v-for="(thisMedicine,index) in medicineList" :key="thisMedicine.mid">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>{{ thisMedicine.mname }}</span>
                <div style="margin-left: auto;">
                <el-button type="primary" @click="showEditer(thisMedicine);currentMid=thisMedicine.mid" style="position: relative;">编辑</el-button>
                <el-button type="danger" @click="medicineDeleterVisable=true;currentMid=thisMedicine.mid"style="position: relative;">删除</el-button>
                <el-icon size="medium"@click="toggleExpand(index)">
                    <ArrowDown v-if="!isExpanded[index]" />
                    <ArrowUp v-if="isExpanded[index]" />
                </el-icon>
                </div>
            </div>
            <div v-if="isExpanded[index]">
                <p style="color: lightseagreen;">id：{{ thisMedicine.mid }}</p>
                <div>
                    <p style="color: darkgray;">药品内容：</p>
                    <p>{{ thisMedicine.content }}</p>
                </div>
            </div>
        </el-card>

        <!-- 编辑药品模块 -->
        <el-dialog v-model="medicineEditerVisable" title="编辑药品">
        <el-form :model="medicineEditerList" ref="myEditerList">
            <el-form-item label="药品名称">
            <el-input v-model="medicineEditerList.mname" placeholder="请输入药品名称"></el-input>
            </el-form-item>
            <el-form-item label="药品内容">
            <el-input v-model="medicineEditerList.content" placeholder="请输入药品内容"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="medicineEditerVisable = false">取消</el-button>
            <el-button type="primary" @click="editCase(medicineEditerList)">确定</el-button>
        </div>
        </el-dialog>

        <!-- 新增药品模块 -->
        <el-dialog v-model="medicineAdderVisable" title="新增药品">
        <el-form :model="medicineAdderList" ref="myAdderList">
            <el-form-item label="药品名称" >
            <el-input v-model="medicineAdderList.mname" placeholder="请输入药品名称"></el-input>
            </el-form-item>
            <el-form-item label="药品内容">
            <el-input v-model="medicineAdderList.content" placeholder="请输入药品内容"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="medicineAdderVisable = false">取消</el-button>
            <el-button type="primary" @click="addCase">确定</el-button>
        </div>
        </el-dialog>


        <!-- 删除提示 -->
        <el-dialog v-model="medicineDeleterVisable" title="删除病例">
            <div>确定删除？</div>
            <div class="dialog-footer">
                <el-button @click="medicineDeleterVisable = false">取消</el-button>
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
const medicineList = ref([])
const isExpanded = reactive({})
const medicineEditerList = ref({
    content:'',
    mid:'',
    mname:''
})
const medicineAdderList = ref({
    content:'',
    mid:'',
    mname:''
})
const medicineEditerVisable = ref(false)
const medicineAdderVisable = ref(false)
const medicineDeleterVisable = ref(false)

onMounted(()=>{
    get_all_medicine().then(res=>{
        console.log("data",res.data)
        medicineList.value=res.data
    })
})

const toggleExpand = (index) => {
    isExpanded[index] = !isExpanded[index];
}

// 搜索功能
const searchInList = () => {
    if(searchInformation.value === ''){
        get_all_medicine().then(res=>{
        medicineList.value=res.data
    }) 
    }else{  
    getMedicineByMname(searchInformation.value).then(res=>{
        if(res.state === 200)
        {
            medicineList.value=[res.data]
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
const showEditer = (thisMedicine) => {
    medicineEditerVisable.value = true;
    medicineEditerList.value=thisMedicine;
}

// 上传编辑后的药品
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
    medicineEditerVisable.value=false;
    }
};

// 删除药品
const deleteCase = (thisMid) => {
    delete_medicine(thisMid).then(res=>{
        if(res.state === 200)
        {
            proxy.$message.success("删除成功")
            medicineDeleterVisable.value=false
            location.reload()
        }
    }).catch(error=>{
        console.log("删除报错："+error)
    })
}
// 新增药品
const addCase = () => {
    console.log(medicineAdderList.value)
    insert_medicine(medicineAdderList.value.mname,medicineAdderList.value.content).then(res=>{
        if(res.state === 200)
        {
            ElMessage({
                message:'上传成功！',
                type:'success',
                duration:1500
            })
            medicineAdderVisable.value=false
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
        medicineAdderVisable.value=false
        console.error(err)
    })
}
</script>
