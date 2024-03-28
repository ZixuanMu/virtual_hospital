<template>
<div class = "suffix">
  <img  style="width:30px;height:30px;">
  <p>用户名: {{ userProfile.username }}</p>
</div>

  <div class="personal-center">
    <!-- 基本信息 -->
    <div class="section profile">
      <h2 >基本信息</h2>
      <div>
        <p>用户名: <el-input v-model="userProfile.username" type="text"></el-input></p>
        <p>用户id: <el-input v-model="userProfile.userid" type="text"></el-input></p>
        <p>性别: <el-input v-model="userProfile.sex" type="text"></el-input></p>
        <p>邮箱: <el-input v-model="userProfile.email" type="email"></el-input></p>
        <p>手机号码: {{ userProfile.phone }}</p>
        <!-- 其他个人资料信息 -->
        <el-button @click="updateProfile">保存修改</el-button>
      </div>
    </div>

    <!-- 账户管理 -->
    <div class="section account-management">
      <h2>账户管理</h2>
      <div>
        <el-button @click="changePassword">修改密码</el-button>
        <!-- 其他账户管理选项 -->
      </div>
    </div>

    <!-- 用户反馈与帮助 -->
    <div class="section feedback-help">
      <h2>用户反馈</h2>
      <div>
        <el-button @click="submitFeedback">意见反馈</el-button>
        <!-- 其他用户反馈与帮助选项 -->
      </div>
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
  max-width: 600px;
  margin: 0 auto;
}

.section {
  margin-bottom: 20px;
}

h2 {
  margin-bottom: 10px;
  text-align: left;
}
p{
  text-align:left;
}
</style>
