<template>
    <div class="container">
      <h2>病例学习</h2>
      <ul class="disease-list">
        <li v-for="(category, categoryName) in diseaseCategories" :key="categoryName">
          <h3>{{ categoryName }}</h3>
          <ul>
            <li v-for="(disease, diseaseName) in category" :key="diseaseName">
              <h4>{{ diseaseName }}</h4>
              <ul>
                <li>
                  <a :href="disease.infoUrl" target="_blank" rel="noopener noreferrer">介绍</a>
                </li>
                <li>
                  <a :href="disease.videoUrl" target="_blank" rel="noopener noreferrer">视频</a>
                  <!-- 其他视频 -->
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        diseaseCategories: {
          '传染病': {
            '犬瘟热': {
              infoUrl: 'https://baike.baidu.com/item/%E7%8A%AC%E7%98%9F%E7%83%AD/985418',
              videoUrl: 'https://www.bilibili.com/video/av20850867/?vd_source=1d980018049c093b481563dc7b59b82e'
            },
            '犬细小病毒': {
              infoUrl: '犬细小病毒文字介绍链接',
              videoUrl: '犬细小病毒视频链接'
            },
            // 其他传染病
          },
          '寄生虫病': {
            '蛔虫病': {
              infoUrl: '蛔虫病文字介绍链接',
              videoUrl: '蛔虫病视频链接'
            },
            '钩虫病': {
              infoUrl: '钩虫病文字介绍链接',
              videoUrl: '钩虫病视频链接'
            },
            // 其他寄生虫病
          }
          // 其他病例学习分类
        }
      };
    }
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .disease-list {
    list-style-type: none;
    padding-left: 0;
  }
  
  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  h4 {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  ul {
    padding-left: 20px;
  }
  
  p {
    margin-top: 0;
  }
  
  a {
    text-decoration: none;
    color: blue;
  }
  </style>
  