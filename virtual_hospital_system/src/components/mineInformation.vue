<template>






<div class = "suffix">
  <img  style="width:30px;height:30px;">
  <p>用户名: {{ userProfile.username }}</p>
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
           <p>用户名: <el-input v-model="userProfile.username" type="text"></el-input></p>
          <p>用户id: <el-input v-model="userProfile.userid" type="text"></el-input></p>
          <p>性别: <el-input v-model="userProfile.sex" type="text"></el-input></p>
          <p>邮箱: <el-input v-model="userProfile.email" type="email"></el-input></p>
          <p>手机号码: {{ userProfile.phone }}</p>
          <el-button @click="updateProfile">保存修改</el-button>
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
      userProfile: {
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
        sex: '男',
        suffix: 'sda',
        userid: 'ssssss',
  
        // 其他个人资料信息
      },
    };
  },
  methods: {
    updateProfile() {
      // 在这里发送更新个人资料的请求，示例中只是简单地展示了修改后的信息
      alert('个人资料已更新');
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
