<template>
  <div class="chat-container">
    <div class="chat-dialog">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="{ 'sent': message.sender === 'user', 'received': message.sender === 'bot' }">
        {{ message.text }}
      </div>
    </div>
    <div class="input-container">
      <input type="text" v-model="inputMessage" @keyup.enter="sendMessage" placeholder="Type your message here..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

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
      // const response = await this.sendToBackend(this.inputMessage);
      
      // 将用户消息显示在对话框中
      this.messages.push({ text: this.inputMessage, sender: 'user' });

      // 将后端返回的消息显示在对话框中
      this.messages.push({ text: response.data, sender: 'bot' });

      // 清空输入框
      this.inputMessage = '';
    },
    async sendToBackend(message) {
      // 在这里向后端发送消息，然后从后端获取回复
      // 你需要实现与后端的通信，这可能涉及到使用 fetch 或 axios 等工具发送请求
      // 以下代码只是一个示例，实际情况需要根据你的后端接口进行修改

      const url = `http://105.54.206.14:8080/assistance/gethelp?txt=${encodeURIComponent(message)}`;

      const response = await fetch(url);
      console.log(response);
      return await response.json();
    }
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
