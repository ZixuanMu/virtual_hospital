<template>
  <el-button type="primary" @click="somethingHappen()">
    go home
  </el-button>
  <!-- <router-link to="/layout">go to layout</router-link> -->
  <router-view></router-view>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { router } from '@/router/index.js'

export default {
  // 组件逻辑
  setup(){
    const router = useRouter();
    const somethingHappen = () => {
      console.log("触发");
      router.push('/layout');
    };
    onMounted(()=>{
      console.log("已挂载");
    });
    return {
      somethingHappen
    };
  }
}
  


</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>