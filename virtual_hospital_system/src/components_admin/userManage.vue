<template>
  <div style="padding: 20px;">

      <el-button type="primary" style="margin-bottom: 20px;" @click="userAdderVisable=true">新增用户</el-button>

      <!-- 搜索栏 -->
      <el-input placeholder="输入搜索内容" v-model="searchInformation" clearable style="margin-bottom: 20px;">
          <template #append>
              <el-button @click="searchInList">
                  <el-icon><search /></el-icon>
              </el-button>
          </template>
      </el-input>

      <!-- 病例显示列表 -->
      <el-card style="margin-bottom: 20px;" v-for="thisUser in userList" :key="thisUser.uid">
          <div>
              <span>Uid:{{ thisUser.uid }}</span>
              <el-button type="text" @click="showEditer(thisUser);currentUid=thisUser.uid">修改密码</el-button>
              <el-button type="text" @click="userDeleterVisable=true;currentUid=thisUser.uid">删除帐户</el-button>
          </div>
          <p style="color: lightcoral;" v-if="thisUser.ismanager === 1">管理员</p>
          <p style="color: blue;" v-if="thisUser.ismanager === 0">普通用户</p>
          <div>
              <p style="color: darkgray;">帐户名：{{ thisUser.username }}</p>
          </div>
          <div>
              <p style="color: darkgray;">密码：{{ thisUser.password }}</p>
          </div>
          <div>
            <p style="color: darkgray;" v-if="thisUser.sex === 1">性别：男</p>
            <p style="color: darkgray;" v-if="thisUser.sex === 0">性别：女</p>
          </div>
          <div>
              <p style="color: darkgray;">电话：{{ thisUser.phone }}</p>
          </div>
          <div>
              <p style="color: darkgray;">邮箱：{{ thisUser.email }}</p>
          </div>
      </el-card>
        <!-- 修改密码模块 -->
        <el-dialog v-model="userEditerVisable" title="修改密码">
        <el-form :model="userEditerList" ref="myEditerList">
            <el-form-item label="修改密码">
            <el-input v-model="userEditerList.password" placeholder="请输入新密码"></el-input>
            </el-form-item>
        </el-form>
        <div class="dialog-footer">
            <el-button @click="userEditerVisable = false">取消</el-button>
            <el-button type="primary" @click="editCase(userEditerList)">确定</el-button>
        </div>
        </el-dialog>
        <!-- 新增用户模块 -->
        <el-dialog v-model="userAdderVisable" title="新增用户">
        <el-form :model="caseAdderList" label-width = 'auto' ref="myAdderList" >
            <el-form-item label="用户名" >
            <el-input v-model="caseAdderList.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
            <el-input v-model="caseAdderList.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
            <el-input v-model="caseAdderList.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="电话">
            <el-input v-model="caseAdderList.phone" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="性别">
            <el-select v-model="caseAdderList.sex" placeholder="男或女">
                    <el-option  :value =1 label="男">男</el-option>
                    <el-option  :value =0 label="女">女</el-option>
             </el-select>
            </el-form-item>

            <el-form-item label="头像">
                <el-upload
                :limit=1
                :auto-upload="false" 
                :data="caseAdderList.suffix"
                :on-change="changesuffix"
                accept=".jpg,.png,.jpeg,.tif,.tiff,.gif,.webp,.svg,.bmp">
                <template #trigger>
                    <el-button size="small">选取图片</el-button>
                </template>
                </el-upload> 
            </el-form-item>
        </el-form>
        <div class="dialog-footer" >
            <el-button @click="userAdderVisable = false">取消</el-button>
            <el-button type="primary" @click="addCase">确定</el-button>
        </div>
        </el-dialog>


        <!-- 删除提示 -->
        <el-dialog v-model="userDeleterVisable" title="删除用户">
            <div>确定删除？</div>
            <div class="dialog-footer">
                <el-button @click="userDeleterVisable = false">取消</el-button>
                <el-button type="primary" @click="deleteUser(currentUid)">确定</el-button>
            </div>
        </el-dialog>
</div>
</template>

<script setup>
import { reactive,ref,onMounted,getCurrentInstance  } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { get_all_users,change_user_password,delete_user,register,getLikeUsers } from '@/api/api';
import { ElMessage } from 'element-plus';

const searchInformation = ref("")
const { proxy } = getCurrentInstance()
const currentUid = ref(0)
const userList = ref([])
const userEditerList = ref({
    email:'',
    ismanager: '',
    password: '',
    phone: '',
    sex: '',
    suffix: '',
    uid: '',
    username: ''
})
const caseAdderList = ref({
    email:'',
    ismanager: '',
    password: '',
    phone: '',
    sex: '',
    suffix: '',
    uid: '',
    username: ''
})
const userEditerVisable = ref(false)
const userAdderVisable = ref(false)
const userDeleterVisable = ref(false)

onMounted(()=>{
    get_all_users().then(res=>{
        console.log(res)
        userList.value=res.data
    })
    
})

// 搜索功能
const searchInList = () => {
     getLikeUsers(searchInformation.value).then(res=>{
        if(res.state === 200)
         {
             userList.value=res.data
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
const showEditer = (thisUser) => {
    userEditerVisable.value = true;
    userEditerList.value=thisUser;
}

// 上传编辑后的病例
const editCase = (data) => {
    console.log("uid:"+data.uid)
    console.log("password:"+data.password)
    change_user_password(data.uid,data.password).then(res=>{
        if(res.state === 200)
        {
            console.log("更改成功")
        }
    }).catch(error=>{
        console.log("错误err:"+error)
    });  
    userEditerVisable.value=false;
};

// 删除用户
const deleteUser = (thisUid) => {
    delete_user(thisUid).then(res=>{
        if(res.state === 200)
        {
            proxy.$message.success("删除成功")
            userDeleterVisable.value=false
            location.reload()
        }
    }).catch(error=>{
        console.log("删除报错："+error)
    })
}

// 新增用户-suffix相关
const changesuffix = (UploadFile) => {
    caseAdderList.value.suffix = UploadFile
}


// 新增用户
const addCase = () => {
    console.log(caseAdderList.value)
    let formData = new FormData();
    formData.append("email",caseAdderList.value.email);
    //formData.append("isManager",'0');
    formData.append("password",caseAdderList.value.password);
    formData.append("phone",caseAdderList.value.phone);
    formData.append("sex",caseAdderList.value.sex);
    formData.append("file",caseAdderList.value.suffix.raw);
    formData.append("uid",caseAdderList.value.uid);
    formData.append("username",caseAdderList.value.username);
    register(formData).then(res=>{
        if(res.state === 200)
        {
            ElMessage({
                message:'上传成功！',
                type:'success',
                duration:1500
            })
            userAdderVisable.value=false
            location.reload()
        }
        else if(res.state === 4001)
        {
            console.log("state:",res.state)
            ElMessage({
                message:'该用户名已存在。',
                type:'error',
                duration:1500
            })
        }
        else
        {
            console.log("state2:",res.state)
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
        userAdderVisable.value=false
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