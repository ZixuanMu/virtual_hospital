<template>
  111
  <div>
    app
  </div>
  <el-button v-on:click="navigate()">
    go home
  </el-button>
</template>

<script>
import { useRouter } from 'vue-router';
const router = useRouter()

export default {
  components: {
  },
  // 组件逻辑
}

function navigate(){
  router.push('/')
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>