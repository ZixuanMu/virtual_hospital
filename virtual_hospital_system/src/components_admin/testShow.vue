<template>
    <div class="exam-container">
      <h1>{{ examData.content }}</h1>
      <el-card v-for="topic in examData.topicnumber" :key="topic.tid" class="exam-card">
        <p>{{ topic.content }}</p>
        <p>A. {{ topic.contentA }}</p>
        <p>B. {{ topic.contentB }}</p>
        <p>C. {{ topic.contentC }}</p>
        <p>D. {{ topic.contentD }}</p>
        <p>答案： {{ topic.answer }}</p>
      </el-card>
    </div>
  </template>
  
  <script>
    import { useRoute } from 'vue-router';
  const route = useRoute();
  export default {
    data() {
      return {
        examData: {
            exid:'',
            content:'',
            topicnumber:[],
        }
      };
    },
    mounted() {
      // 获取通过路由传递的数据
      this.examData.exid = this.$route.query.exid;
      this.examData.content = this.$route.query.content;
      this.examData.topicnumber = JSON.parse(this.$route.query.topicnumber);
      console.log(this.examData.topicnumber)

    }
  };
  </script>
  
  <style>
  .exam-container {
    padding: 20px;
  }
  
  .exam-card {
    margin-bottom: 20px;
  }
  </style>
  