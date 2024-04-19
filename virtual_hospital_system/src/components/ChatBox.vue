<template>
  <div class="chat-container">
    <div class="chat-dialog">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'sent': message.sender === 'user', 'received': message.sender === 'bot' }">
        {{ message.text }}
      </div>
    </div>
    <div class="input-container">
      <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" placeholder="请输入您的消息" />
      <button @click="sendMessage">发送</button>
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
      messages: []
    };
  },
  methods: {
    async sendMessage() {
      if (this.inputMessage.trim() === '') return;

      // // 发送用户消息到后端
     
      chatWithGpt({txt:this.inputMessage}).then(response => {
        console.log("res:",response.data)
        this.messages.push({ text: this.inputMessage, sender: 'user' });
        this.inputMessage = '';
      setTimeout(() => {
      // 将后端返回的消息显示在对话框中
      this.messages.push({ text: response.data, sender: 'bot' });
      // 清空输入框
      },500)
    },
      )}
      // 将用户消息显示在对话框中
     

  }
};
</script>

<style scoped>
.chat-container {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.chat-dialog {
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
}

.received {
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
</style>
