<template>


<div class="personal-center">

    
<!-- 基本信息 -->
<div class="section profile">

  
  <el-card style="max-width:2000px" vertical-align="middle">
    <div class="putOut">
        <el-avatar class="avatar" :size="100" :src="userProfile.suffix" />
        <p class="username">{{ userProfile.username }}</p>
    </div>
  </el-card>
  

      <el-card style="max-width:2000px" vertical-align="middle">
          <template #header>
       <div class="card-header">
         <h3>个人信息</h3>
       </div>
      </template>

                <table class="information_text">
                <tr>
                  <td class="text">用户名:</td>
                  <td class="text">{{userProfile.username}}</td>
                </tr>
                <tr>
                  <td class="text">用户id:</td>
                  <td class="text">{{userProfile.uid}}</td>
                </tr>
                <tr>
                  <td class="text">性别:</td>
                  <td class="text" v-if="userProfile.sex === 1">男</td>
                  
                  <td class="text" v-if="userProfile.sex === 0">女</td>

                </tr>
                <tr>
                  <td class="text">邮箱:</td>
                  <td class="text">{{ userProfile.email }}</td>
                </tr>
                <tr>
                  <td class="text">手机号码: </td>
                  <td class="text">{{ userProfile.phone }}</td>
                </tr>
            </table>
          <el-button @click="ChangeInfomation">修改信息</el-button>
          <el-button @click="ChangeSuffix">修改头像</el-button>


            <el-dialog v-model="InformationVisible" title="Shipping address" width="500">
              <table class="information_change">
                <tr>
                  <td class="text">用户名:</td>
                  <el-input v-model="updatedUserProfile.username"></el-input>
                </tr>
                <tr>
                  <td class="text">用户id:</td>
                  <td>{{userProfile.uid}}</td>
                </tr>
                <tr>
                  <td class="text">性别:</td>
                  <el-select v-model="updatedUserProfile.sex" placeholder="男">
                      <el-option  :value =1 label="男">男</el-option>
                        <el-option  :value =0 label="女">女</el-option>
                  </el-select>
                </tr>
                <tr>
                  <td class="text">邮箱:</td>
                  <el-input v-model="updatedUserProfile.email"></el-input>
                </tr>
                <tr>
                  <td class="text">手机号码: </td>
                  <el-input v-model="updatedUserProfile.phone"></el-input>
                </tr>
            </table>
          <template #footer>
             <div class="dialog-footer">
              <el-button @click="InformationClose">取消</el-button>
             <el-button type="primary" @click="saveInformation4">
              保存修改
          
            </el-button>
      </div>
    </template>
  </el-dialog>






     </el-card>
    </div>

    <!-- 账户管理 -->
    <div class="section account-management">
      <el-card style="max-width:2000px" vertical-align="middle">
          <template #header>
       <div class="card-header">
         <h3>账户管理</h3>
       </div>
      </template>
      <el-button @click="changePassword2">修改密码</el-button>


        
      <el-dialog v-model="passwordChangeVisible" title="修改密码" width="500">
              <table class="password_change">
                <tr>
                  <td class="text">原密码：</td>
                  <el-input  show-password v-model="passwordChangefile.opassword"></el-input>
                </tr>
                <tr>
                  <td class="text">修改密码:</td>
                  <el-input  show-password  v-model="passwordChangefile.npassword"></el-input>
                </tr>
            </table>
          <template #footer>
             <div class="dialog-footer">
              <el-button @click="InformationClose">取消</el-button>
             <el-button type="primary" @click="passwordChangeConfirm">
              确认修改
          
            </el-button>
      </div>
    </template>
  </el-dialog>


      
     </el-card>
    </div>

    <!-- 用户反馈与帮助 -->
    <div class="section feedback-help">
      <el-card style="max-width:2000px" vertical-align="middle">
          <template #header>
       <div class="card-header">
         <h3>用户反馈</h3>
       </div>
      </template>
      <el-button @click="submitFeedback">意见反馈</el-button>
     </el-card>
    </div>
  </div>

</template>

<script>
// api.js
import { fetchUserData, changeUserInformation,changePasswordgePassword, changePassword } from '@/api/mineInformationApi.js';
import { ElMessage } from 'element-plus';


const fetchUserData4 = async (userProfile) => {
  try {
    const res = await fetchUserData();
    userProfile.username = res.data.username;
    userProfile.email = res.data.email;
    userProfile.phone = res.data.phone;
    userProfile.sex = res.data.sex;
    userProfile.uid = res.data.uid;
    userProfile.suffix =res.data.suffix;
    userProfile.password = res.data.password;
    userProfile.passwordCh = ''; // 这里可能需要根据实际情况设置初始值
    console.log("User profile updated:", userProfile);
  } catch (error) {
    console.error('获取用户数据失败：', error);
    ElMessage.error('获取用户数据失败：' + error.message);
  }
};

export { fetchUserData4 };

export default {
  data() {
    return {
      InformationVisible: false,
      passwordChangeVisible: false,
      userProfile: {
        username: '',
        email: '',
        phone: '',
        sex: '',
        uid: '',
        password: '',

      },
      passwordChangefile:{
        opassword:'',
        npassword:''
      },
      // 修改后的用户个人信息数据
      updatedUserProfile: {
        username: '',
        email: '',
        phone: '',
        sex: ''
      },
    };
  },
  methods: {
    ChangeSuffix(){},
    changePassword2(){
      this.passwordChangeVisible =true;
    },
    passwordChangeConfirm(){
      console.log(this.passwordChangefile)
      changePassword(
       this.passwordChangefile.opassword,
       this.passwordChangefile.npassword
    ).then(res => {
        console.log("res:",res)
        if (res.state === null) {
          ElMessage.error('原密码错误：' + error.message);
        }
        if(res.state === 200){
          ElMessage.success("修改成功，请重新登录");
          setTimeout(()=>{
            this.$router.push('/')
          },1500);
          
        }
          
    }).catch(error=>{
      console.error('失败：');
        ElMessage.error('密码错误，修改失败');

        });

    },
    async fetchData() {
      await fetchUserData4(this.userProfile);
   
    },
    submitFeedback(){
      this.$router.push("/mineInformationCo/suggestPage")
    },
    // 关闭修改信息对话框
    closeInformationDialog() {
      this.InformationVisible = false;
    },
    
    ChangeInfomation() {
      this.updatedUserProfile = { ...this.userProfile };
      this.InformationVisible = true;

    },
    // 关闭修改个人信息对话框
    InformationClose() {
      
      this.InformationVisible = false;
    },
    // 保存个人信息
    saveInformation4()
{


  changeUserInformation(
       this.updatedUserProfile.username,
        this.updatedUserProfile.email,
        this.updatedUserProfile.phone,
        this.updatedUserProfile.sex
    ).then(res => {
        console.log("res:",res)
        if (res.state === 200) {
          ElMessage.success('个人信息修改成功');

          this.informationVisible = false;
          this.$router.go(0)
        }
          
    }).catch(error=>{
      console.error('保存个人信息失败：', error);
        ElMessage.error('保存个人信息失败：' + error.message);

        });

}


}  ,
mounted() {
    this.fetchData();
    console.log("已经挂载")
  },
}
</script>

<style scoped>

.putOut {
  display: flex;
  align-items: flex-start; 
  justify-content: flex-start; /* 整体内容居左 */
}

.avatar {
  margin-right: 10px; /* 可以调整 avatar 和用户名之间的间距 */
}
.personal-center {
  max-width: 2000px;
  margin: 0 auto;
}

.section {
  margin-bottom: 20px;
}

h3 {
  margin: 0px;
  text-align: left;
}
p{
  text-align:left;
}
.information_text {
  border-spacing: 15px; /* 设置表格的间距 */
}

.text {
  padding: 10px; /* 设置单元格内边距 */
}
.username {
  font-weight: bold; /* 加粗 */
  font-size: 24px; /* 加大 */
}
</style>
