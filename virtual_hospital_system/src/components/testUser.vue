<template>
    <button @click="openNewWindow">打开新窗口</button>
  </template>
  
  <script>
  export default {
    methods: {
      openNewWindow() {
        // 使用 Vue Router 的编程式导航打开新路由
        this.$router.push({ name: 'testPage' });
      }
    }
  }
  </script>
  