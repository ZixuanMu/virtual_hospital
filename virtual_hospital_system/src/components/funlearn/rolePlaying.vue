<template>
  <div class="container">
    <div class="image-wrapper">
      <img src="@/assets/qiantai.png" alt="图片1" class="image">
      <button @click="openNewWindow1">前台</button>
    </div>
    <div class="image-wrapper">
      <img src="@/assets/yizhu.png" alt="图片2" class="image">
      <button @click="openNewWindow2">医助</button>
    </div>
    <div class="image-wrapper">
      <img src="@/assets/shouyi.png" alt="图片3" class="image">
      <button @click="openNewWindow3">兽医</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openNewWindow1() {
      // 使用 Vue Router 的编程式导航打开新路由
      this.$router.push({ name: 'qiantai' });
    },
    openNewWindow2() {
      // 使用 Vue Router 的编程式导航打开新路由
      this.$router.push({ name: 'yizhu' });
    },
    openNewWindow3() {
      // 使用 Vue Router 的编程式导航打开新路由
      this.$router.push({ name: 'shouyi' });
    }
}
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image-wrapper {
  width: calc(100% / 3);
  text-align: center;
}

.image {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.button:hover {
  background-color: #2980b9;
}
</style>
