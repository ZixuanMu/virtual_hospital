<template>
    <div>
      <h2>Layout.vue</h2>
      <router-link to="/3dviews">3dviews </router-link>
      <router-link to="/functionalLearning">functionalLearning </router-link>
      <router-link to="/mineInformation">mineInformation </router-link>
      <router-link to="/testUser">testUser </router-link>
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
  }
  </script>

<style scoped lang="scss">
.container{
    .aside{
    background: #797979;
    width:230px;
    }
    .header{
    background: #a1e9d2;
    height:80px;
    }
}

</style>