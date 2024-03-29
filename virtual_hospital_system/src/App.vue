<template>
   <router-view v-if="$route.path === '/'">

      <el-button type="primary" @click="somethingHappen()">

      </el-button>
      <button @click="openNewWindow">打开新窗口</button>
  </router-view>
    <div v-else>
      <router-view></router-view>
    </div>


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
  },
  methods: {
      openNewWindow() {
        // 使用 Vue Router 的编程式导航打开新路由
        this.$router.push({ name: 'testPage' });
      }
    }
}
  


</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>