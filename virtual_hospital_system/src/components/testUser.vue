
  <template>
    <div>
      <h2>线上考试列表</h2>
      <div v-for="exam in exams" :key="exam.id" class="exam">
        <h3>{{ exam.name }}</h3>
        <p>日期: {{ exam.date }}</p>
        <p>时间: {{ exam.time }}</p>
        <button @click="joinExam(exam.id)">加入考试</button>
        <router-link :to="'/exam/' + exam.id">查看考试成绩</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        exams: [
          { id: 1, name: '数学考试', date: '2024-04-10', time: '10:00' },
          { id: 2, name: '语文考试', date: '2024-04-15', time: '14:00' },
          { id: 3, name: '英语考试', date: '2024-04-20', time: '09:30' }
        ]
      };
    },
    methods: {
      joinExam(id) {
        // 使用 Vue Router 的编程式导航打开新路由
        this.$router.push({ name: 'testPage' });
        // 这里可以添加加入考试的逻辑，比如跳转到考试页面或者执行其他操作
        console.log('加入考试 ID:', id);
      }
    }
  };
  </script>
  
  <style scoped>
  .exam {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  </style>
  