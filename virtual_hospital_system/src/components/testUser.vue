<template>
  <div>
    <h2>线上考试列表</h2>
    <el-card v-for="exam in exams" :key="exam.exid" class="exam" :header="exam.content">
      <p>考试时间:10分钟 </p>
      <el-button @click="joinExam(exam.exid)">加入考试</el-button>
      <el-button @click="showScore(exam.score)">查看考试成绩</el-button>
    </el-card>
  </div>
</template>

<script>
import { getExams} from '@/api/api';
export default {
  data() {
    return {
      exams: [
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
    },
    async  getExams5() {
      try {
        // 发起题库数据请求
        const res = await getExams();
        console.log("res:",res);
        // 将获取到的题库数据赋值给组件的 questions 数据
        this.exams = res.data;
        
        // 输出获取到的题库数据
        console.log("exam数组里面的值:", this.exams);
      } catch (error) {
        // 处理错误情况
        console.error('获取题库数据失败：', error);
        ElMessage.error('获取题库数据失败：' + error.message);
      }
    },
  },
  mounted() {
     this.getExams5();

    }
};
</script>

<style scoped>
.exam {
  margin-bottom: 10px;
}
</style>
