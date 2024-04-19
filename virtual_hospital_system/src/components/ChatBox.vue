<template>
  <div class="chat-container">
    <!-- 加载效果 -->
    <div v-if="loading" class="loading-overlay">
      <img src="../assets/loading.gif" alt="Loading">
    </div>
    
    <div class="chat-dialog">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'sent': message.sender === 'user', 'received': message.sender === 'bot' }">
        {{ message.text }}
      </div>
    </div>
    
    <div class="input-container">
      <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" placeholder="请输入您的消息" />
      <button :disabled="loading" @click="sendMessage" :class="{ 'loading': loading }">发送</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { chatWithGpt } from '@/api/api';

export default {
  data() {
    return {
      inputMessage: '',
      messages: [],
      loading: false // 添加 loading 状态
    };
  },
  methods: {
    async sendMessage() {
      if (this.inputMessage.trim() === '' || this.loading) return;

      // 设置 loading 状态为 true
      this.loading = true;

      chatWithGpt({txt:this.inputMessage}).then(response => {
        console.log("res:",response.data)
        this.messages.push({ text: this.inputMessage, sender: 'user' });
        this.inputMessage = '';
        setTimeout(() => {
          this.messages.push({ text: response.data, sender: 'bot' });
          this.loading = false; // 收到响应后恢复按钮状态
        }, 500)
      }).catch(error => {
        console.error("Error:", error);
        this.loading = false; // 在发生错误时也要确保按钮状态恢复
      });
    }
  }
};
</script>

<style scoped>
.chat-container {
  z-index: 100000;
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.chat-dialog {
  z-index: 10000;
  height: 500px;
  padding: 10px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
}

.sent {
  background-color: #007bff;
  color: white;
  text-align: right;
  white-space: pre-wrap
}

.received {
 white-space: pre-wrap;
  background-color: #f0f0f0;
  color: #333;
  text-align: left;
}

.input-container {
  display: flex;
  padding: 10px;
}

.input-container input {
  flex: 1;
  padding: 5px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #ccc;
  border-right: none;
}

.input-container button {
  padding: 5px 10px;
  border-radius: 0 5px 5px 0;
  border: 1px solid #007bff;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
.input-container button.loading {
  cursor: not-allowed; /* 禁用鼠标事件 */
  background-image: "../assets/help.jpg"; /* 替换为等待图案的路径 */
  background-repeat: no-repeat;
  background-position: center;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-overlay img {
  width: 50px; /* 调整加载图标的大小 */
  height: 50px;
}
</style>
