<template>
  <div>
    <!-- 悬浮球 -->
    <div
      class="floating-ball"
      ref="floatingBall"
      @mousedown="startDrag"
      @touchstart="startDrag"
      @click="clickOn"
    >
    <img src="../assets/help.jpg"  class="half-image" style=" width: 90px;
  height: 90px;">
    </div>

    <!-- 对话框 -->
    <el-dialog
      :visible="dialogVisible"
      title="对话框标题"
      @close="dialogVisible = false"
    >
      <p>对话框内容</p>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  data() {
    return {
      dialogVisible: false,
      dragging: false,
      initialMousePos: { x: 0, y: 0 },
      initialBallPos: { x: 0, y: 0 }
    };
  },
  methods: {
    startDrag(event) {
      this.dragging = true;
      this.initialMousePos = this.getMousePosition(event);
      this.initialBallPos = {
        x: this.$refs.floatingBall.offsetLeft,
        y: this.$refs.floatingBall.offsetTop
      };

      document.addEventListener('mousemove', this.drag);
      document.addEventListener('mouseup', this.endDrag);

      document.addEventListener('touchmove', this.drag);
      document.addEventListener('touchend', this.endDrag);
    },
    drag(event) {
      if (this.dragging) {
        const mousePos = this.getMousePosition(event);
        const deltaX = mousePos.x - this.initialMousePos.x;
        const deltaY = mousePos.y - this.initialMousePos.y;
        this.$refs.floatingBall.style.left = this.initialBallPos.x + deltaX + 'px';
        this.$refs.floatingBall.style.top = this.initialBallPos.y + deltaY + 'px';
      }
    },
    endDrag() {
      this.dragging = false;
      
this.dialogVisible = true;
      document.removeEventListener('mousemove', this.drag);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchmove', this.drag);
      document.removeEventListener('touchend', this.endDrag);
    },
    getMousePosition(event) {
      const touches = event.touches || [event];
      const { pageX, pageY } = touches[0];
      return { x: pageX, y: pageY };
    },
    clickOn(){

this.dialogVisible = true;
    }
  }
};
</script>

<style>
.floating-ball {
  position: fixed;
  width: 80px;
  height: 80px;
  background-color: #409eff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1999; 
}

.el-dialog {
  z-index: 2000; /* 确保对话框在悬浮球之上 */
}
</style>
