<template>





<div class = "suffix">
  <el-card>
    <el-avatar class ="avatar"
        src="src\assets\logo.png"
      />
  <p>用户名: {{ userProfile.username }}</p>
  </el-card>
</div>

  <div class="personal-center">

    
    <!-- 基本信息 -->
    <div class="section profile">
      <el-card style="max-width:2000px" vertical-align="middle">
          <template #header>
       <div class="card-header">
         <h3>个人信息</h3>
       </div>
      </template>
           <p>用户名: {{userProfile.username}}</p>
          <p>用户id: {{userProfile.userid}}</p>
          <p>性别: {{userProfile.sex}}</p>
          <p>邮箱: {{ userProfile.email }} </p>
          <p>手机号码: {{ userProfile.phone }}</p>
          <el-button @click="ChangeInfomation">修改信息</el-button>


            <el-dialog v-model="InformationVisible" title="Shipping address" width="500">
             <el-form :model="form">
                <el-form-item label="Promotion name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
               </el-form-item>
             <el-form-item label="Zones" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select a zone">
                <el-option label="Zone No.1" value="shanghai" />
                <el-option label="Zone No.2" value="beijing" />
                 </el-select>
             </el-form-item>
              </el-form>
          <template #footer>
             <div class="dialog-footer">
              <el-button @click="InformationClose">Cancel</el-button>
             <el-button type="primary" @click="InformationClose">
              Confirm
          
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
      <el-button @click="changePassword">修改密码</el-button>



      
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

export default {
  data() {
    return {
      InformationVisible:false,
      userProfile: {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
        sex: '男',
        suffix: 'sda',
        userid: 'ssssss',
  
        // 其他个人资料信息
      },
      form:{
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      }
};
},
  methods: {

    ChangeInfomation(){
      this.InformationVisible = true
    },
    InformationClose(){
      this.InformationClose = false
    },
    changePassword() {
      // 跳转到修改密码页面或者触发修改密码功能
    },
    manageSecurity() {
      // 跳转到安全设置页面或者触发安全设置功能
    },
    submitFeedback() {
      // 跳转到意见反馈页面或者触发提交反馈功能
    },
    openHelpCenter() {
      // 跳转到帮助中心页面
    }
  }
};

</script>

<style scoped>
/* 样式可以根据需求进行调整 */
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

</style>
