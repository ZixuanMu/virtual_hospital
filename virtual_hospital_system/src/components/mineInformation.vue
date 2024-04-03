<template>





<div class = "suffix">
  <el-card>
    <el-avatar class ="avatar" :size ="100"
    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
  <p> {{ userProfile.username }}</p>
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

                <table class="information_text">
                <tr>
                  <td class="text">用户名:</td>
                  <td class="text">{{userProfile.username}}</td>
                </tr>
                <tr>
                  <td class="text">用户id:</td>
                  <td class="text">{{userProfile.userid}}</td>
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


            <el-dialog v-model="InformationVisible" title="Shipping address" width="500">
              <table class="information_change">
                <tr>
                  <td class="text">用户名:</td>
                  <el-input v-model="userProfile.username">{{userProfile.username}}</el-input>
                </tr>
                <tr>
                  <td class="text">用户id:</td>
                  <el-input v-model="userProfile.userid">{{userProfile.userid}}</el-input>
                </tr>
                <tr>
                  <td class="text">性别:</td>
                  <el-select v-model="userProfile.sex" placeholder="男">
                      <el-option  :value =1 label="男">男</el-option>
                        <el-option  :value =0 label="女">女</el-option>
                  </el-select>
                </tr>
                <tr>
                  <td class="text">邮箱:</td>
                  <el-input v-model="userProfile.email">{{userProfile.email}}</el-input>
                </tr>
                <tr>
                  <td class="text">手机号码: </td>
                  <el-input v-model="userProfile.phone">{{userProfile.phone}}</el-input>
                </tr>
            </table>
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
        username: '尹茂椿萱',
        email: 'yinmao@example.com',
        phone: '+1234567890',
        sex:1,
        suffix: 'bg',
        userid: 'ssssss',
  
        // 其他个人资料信息
      },
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
.information_text {
  border-spacing: 15px; /* 设置表格的间距 */
}

.text {
  padding: 10px; /* 设置单元格内边距 */
}

</style>
