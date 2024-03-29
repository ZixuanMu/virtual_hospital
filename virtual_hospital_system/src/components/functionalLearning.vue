<template>
    <div id="learn">
      <h1>学习中心</h1>
      <button @click="openNewWindow1">角色扮演</button>
      <button @click="openNewWindow2">病例学习</button>
    </div>
  </template>
  
  <script>
    export default {
    methods: {
      openNewWindow1() {
        // 使用 Vue Router 的编程式导航打开新路由
        this.$router.push({ name: 'roleplaying' });
      },
      openNewWindow2() {
        // 使用 Vue Router 的编程式导航打开新路由
        this.$router.push({ name: 'casestudying' });
      }
      
    }
  }
  </script>
  
  <style>
  #learn {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 18px;
  }
  </style>