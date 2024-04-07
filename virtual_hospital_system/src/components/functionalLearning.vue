<template>
    <div class="content">
      <div class="images">
        <img src="../assets/roleplay.jpg"  class="half-image">
        <img src="../assets/casestudy.jpg"  class="half-image">
      </div>
      <div class="buttons">
        <button @click="openNewWindow1">角色扮演</button>
        <button @click="openNewWindow2">病例学习</button>
      </div>
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
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.images {
  display: flex;
}

.half-image {
  width: 50%;
  height: auto;
}

.buttons {
  display: flex;
  justify-content: center;
  position: inherit;
}

button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #e3ecf2;
  color: rgb(11, 11, 11);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

button:hover {
  background-color: #2ac1c6;
}
</style>
