<template>
  <div>
    app
  </div>
  <el-button type="primary" @click="somethingHappen()">
    go home
  </el-button>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

export default {
  // 组件逻辑
  setup(){
    const router = useRouter();
    const somethingHappen = () => {
      console.log("触发");
      router.push('/3dviews')
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