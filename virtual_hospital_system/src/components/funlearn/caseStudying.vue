<template>
  <div class="container">
    <input v-model="searchKeyword" type="text" placeholder="输入关键字搜索" class="search-input">
    <button @click="searchCases" class="search-button">搜索</button>
    <ul class="case-list">
      <li v-for="caseItem in cases" :key="caseItem.cid" class="case-item">
        <p class="case-name">{{ caseItem.cname }}</p>
        <p class="case-type">{{ caseItem.type }}</p>
        <!-- 其他病例信息展示 -->
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getCaseByCid, getCaseByCname, getCaseByType, getLikeCases, getAllCases } from '@/api/api.js';

export default {
  data() {
    return {
      searchKeyword: '',
      cases: []
    };
  },
  methods: {
    async searchCases() {
      // 根据关键字搜索病例
      if (this.searchKeyword) {
        this.cases = await getLikeCases(this.searchKeyword);
      } else {
        // 如果关键字为空，则获取所有病例
        this.cases = await getAllCases();
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.search-input {
  width: 70%;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.case-list {
  list-style-type: none;
  padding: 0;
}

.case-item {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
}

.case-name {
  font-size: 18px;
  margin-bottom: 5px;
}

.case-type {
  font-size: 16px;
  color: #666;
}
</style>
