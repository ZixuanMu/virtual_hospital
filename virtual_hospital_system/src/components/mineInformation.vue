<template>





<div class = "suffix">
  <el-card>
    <div class="putOut">
        <el-avatar class="avatar" :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <p class="username">{{ userProfile.username }}</p>
    </div>
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


            <el-dialog v-model="InformationVisible" title="Shipping address" width="500">
              <table class="information_change">
                <tr>
                  <td class="text">用户名:</td>
                  <el-input v-model="userProfile.username">{{userProfile.username}}</el-input>
                </tr>
                <tr>
                  <td class="text">用户id:</td>
                  <td>{{userProfile.uid}}</td>
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


        
      <el-dialog v-model="passwordChangeVisible" title="Shipping address" width="500">
              <table class="password_change">
                <tr>
                  <td class="text">原密码：</td>
                  <el-input v-model="userProfile.password"></el-input>
                </tr>
                <tr>
                  <td class="text">修改密码:</td>
                  <el-input v-model="userProfile.passwordCh"></el-input>
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

import { ElMessage } from 'element-plus';

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
        passwordCh: ''
      }
    };
  },
  methods: {
    // 获取用户数据
    async fetchUserData() {
      try {
        // 获取存储在本地的 Token
        const token = localStorage.getItem('token'); 

        // 发送请求获取用户数据，并在请求头部中添加 Token
        const response = await fetch(`http://106.54.206.14:8080/users/get_user`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        // 将获取到的用户数据赋值给 userProfile 对象
        this.userProfile = userData.data;
      } catch (error) {
        console.error(error);
        ElMessage.error('获取用户数据失败：' + error.message);
      }
    },
    // 修改个人信息
    ChangeInfomation() {
      this.InformationVisible = true;
    },
    // 关闭修改个人信息对话框
    InformationClose() {
      this.InformationVisible = false;
    },
    // 保存个人信息
    async saveInformation() {
      try {
        // 发送请求保存修改后的个人信息
        const response = await fetch('API_URL_HERE', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.userProfile)
        });
        if (!response.ok) {
          throw new Error('Failed to save user information');
        }
        ElMessage.success('个人信息修改成功');
        // 关闭修改个人信息对话框
        this.InformationVisible = false;
      } catch (error) {
        console.error(error);
        ElMessage.error('保存个人信息失败：' + error.message);
      }
    },
    // 其他方法...
  },
  mounted() {
    // 在组件挂载时获取用户数据
    this.fetchUserData();
  }
};

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
