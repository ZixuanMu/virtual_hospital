<template>
  <div class="floating-ball" :style="{ right: ballPosition.right + 'px', bottom: ballPosition.bottom + 'px' }" @mousedown="startDrag">
    <div class="ball" @click="toggleDrawer">
      <i class="el-icon-chat-line"></i>
      <img src="../assets/help.jpg"  class="half-image"style=" border-radius: 50%;height: 80px;width: 80px;">

    </div>
  </div>

  <el-drawer v-model="drawerVisible" title="I am the title" :with-header="false" style="z-index: 100000;">
    <ChatBox style="z-index: 100000;"/>
  </el-drawer>
</template>

<script>
import { ref, onMounted } from 'vue';
import ChatBox from './ChatBox.vue'; // 假设这是与ChatGPT对接的聊天框组件

export default {
  components: {
    ChatBox
  },
  data() {
    return {
      ballPosition: { right: 20, bottom: 20 }, // 初始位置调整为右下角
      drawerVisible: false
    };
  },
  methods: {
    startDrag(event) {
      const ball = event.target.parentNode;
      const initialMouseX = event.clientX;
      const initialMouseY = event.clientY;
      const initialBallX = ball.offsetLeft;
      const initialBallY = ball.offsetTop;

      const onMouseMove = (event) => {
        const deltaX = event.clientX - initialMouseX;
        const deltaY = event.clientY - initialMouseY;
        this.ballPosition.left = initialBallX + deltaX;
        this.ballPosition.top = initialBallY + deltaY;
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    toggleDrawer() {
      this.drawerVisible = !this.drawerVisible;
    }
  }
};
</script>

<style>
.floating-ball {
  position: fixed;
  z-index: 9999;
}

.ball {
  width: 60px;
  height: 60px;
  background-color: #007bff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
}

.ball i {
  font-size: 24px;
}
</style>
