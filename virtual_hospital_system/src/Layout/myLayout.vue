<template>
<div class="common-layout">
    <el-container class="container">
    <el-aside class="aside">
    </el-aside>
    <el-container>
        <el-header class="header">Header</el-header>
        <el-main class="main"><router-view/></el-main>
    </el-container>
    </el-container>
</div>
</template>

<script lang="ts" setup >
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