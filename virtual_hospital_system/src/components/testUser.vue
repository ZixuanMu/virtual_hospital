<template>
  <div>
    <h2>线上考试列表</h2>
    <el-card v-for="exam in exams" :key="exam.id" class="exam" :header="exam.name">
      <p>日期: {{ exam.date }}</p>
      <p>时间: {{ exam.time }}</p>
      <el-button @click="joinExam(exam.id)">加入考试</el-button>
      <el-button @click="showScore(exam.score)">查看考试成绩</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exams: [
        { id: 1, name: '数学考试', date: '2024-04-10', time: '10:00', score: 50 },
        { id: 2, name: '语文考试', date: '2024-04-15', time: '14:00', score: 90 },
        { id: 3, name: '英语考试', date: '2024-04-20', time: '09:30', score: -1 }
      ]
    };
  },
  methods: {
    joinExam(id) {
      // 使用 Vue Router 的编程式导航打开新路由
      this.$router.push({ name: 'testPage' });
      // 这里可以添加加入考试的逻辑，比如跳转到考试页面或者执行其他操作
      console.log('加入考试 ID:', id);
    },
    showScore(score) {
      if (score >= 60) {
        this.$message({
          message: '您的考试成绩是：' + score + '，恭喜您通过了考试！',
          type: 'success'
        });
      } else if(score >= 0){
        this.$message({
          message: '您的考试成绩是：' + score + '，很抱歉，您未通过考试。',
          type: 'warning'
        }
        );
      }else if(score === -1){
        this.$message({
          message: '未参加考试，请先参加考试！',
          type: 'warning'
        }
        );

      }else{
        this.$message({
          message: '后台系统错误',
          type: 'warning'
        }
        );
      }
    }
  }
};
</script>

<style scoped>
.exam {
  margin-bottom: 10px;
}
</style>
