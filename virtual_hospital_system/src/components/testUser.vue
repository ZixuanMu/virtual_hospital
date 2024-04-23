<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
    <el-menu-item index="2">未参与的考试</el-menu-item>
      <el-menu-item index="1">已参与的考试</el-menu-item>
     
    </el-menu>

    <div>
            <!-- 根据菜单选择的不同，展示不同的考试列表 -->
      <el-card v-for="exam in selectedExams" :key="exam.exid" class="exam" >

        <template #header>
            <span class="card-header-title" >{{exam.content}}</span>
            <span v-if="exam.completed" class="right-tag" style=" float: right;">分数：{{ exam.score }}/{{ exam.totalsocre }}</span>
       </template>

        <p>考试时间:{{ exam.time }}分钟 </p>
        <el-button  v-if="exam.completed"@click="getMyExam1(exam.exid)">查看考试记录</el-button>
        <el-button v-if="!exam.completed" @click="getExamByExid(exam.exid)">加入考试</el-button>
        <!-- <el-button v-if="exam.completed" @click="showScore(exam.exid)">查看考试成绩</el-button> -->
        <el-button v-if="exam.completed" @click="getExamByExid(exam.exid)">重新考试</el-button>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getExams,getCompletedExams,getMyexam} from '@/api/examApi';
import { SelectProps } from 'element-plus/es/components/select/src/select';
export default {
  


  data() {
    return {
      exams: [],
      completedExams: [],
      activeIndex2: '2', // 默认选中已参与的考试
      scores:'',
    };
  },
  methods: {
    handleSelect(index) {
      // 当菜单项被选择时执行的操作
      console.log('选择了菜单项', index);
      // 在这里你可以根据选择的菜单项执行不同的逻辑
      // 例如根据选择的菜单项切换显示不同的考试列表
      if (index === '1') {
        // 显示已参与的考试列表

        this.activeIndex2 = '1';
      } else if (index === '2') {
        // 显示未参与的考试列表
        this.activeIndex2 = '2';
      }
    },
    getUncompletedExams() {
      this.exams = this.exams.map(exam => {
      // 如果当前考试的ID在已参加的考试ID列表中，则将其设置为已参加
      if (this.completedExams.includes(exam.exid)) {
        exam.completed = true;
        getMyexam({ exid: exam.exid }).then(res => {
 
            exam.score = res.data.total
            });
      } else {
        exam.completed = false;
      }
      return exam;
    });
    },
    getExamByExid(Exid) {
      //参加考试
      fetch(`http://106.54.206.14:8080//exams/getExamByExid?exid=${Exid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if needed
    },
  }).then(response => response.json()).then(data =>{ 
    // Navigate to the 'testShow' route with query parameters
    this.$router.push({
      path: '/testPage', // Assuming 'testShow' is the name of the route
      query: { time:data.data.time,exid:data.data.exid,content:data.data.content,topicnumber:JSON.stringify(data.data.topicnumber) }
    
    });

  })
 
    },

    getMyExam1(Exid) {
   
    this.$router.push({
      path: '/myTestPage', // Assuming 'testShow' is the name of the route
      query: { exid:Exid }
    
    });

    },




     
    showScore(exid) {
       getMyexam({ exid: exid }).then(res => {
 
        this.scores = res.data.total
      });
    
      setTimeout(() => {
      console.log('500ms后执行的方法');
      this.$message({
          message: '您的考试成绩是：' + this.scores ,
          type: 'success'
        });},500);
    //  // 分数展示
    //   if (this.score >= 60) {
    //     this.$message({
    //       message: '您的考试成绩是：' + this.score + '，恭喜您通过了考试！',
    //       type: 'success'
    //     });
    //   } else if(this.score >= 0){
    //     this.$message({
    //       message: '您的考试成绩是：' + this.score + '，很抱歉，您未通过考试。',
    //       type: 'warning'
    //     }
    //     );
    //   }else if(this.score === -1){
    //     this.$message({
    //       message: '未参加考试，请先参加考试！',
    //       type: 'warning'
    //     }
    //     );

    //   }else{
    //     this.$message({
    //       message: '后台系统错误',
    //       type: 'warning'
    //     }
    //     );
    //   }
    
    },

    async  getExams5() {
      //获取所有考试
      try {
        // 发起题库数据请求
        const res = await getExams();
 
        // 将获取到的题库数据赋值给组件的 questions 数据
        this.exams = res.data;
        console.log("data:",res.data);
        console.log("data:",this.exams);
        this.exams = this.exams.map(exam => {
          exam.totalsocre =exam.topicnumber.split(',').length*5;
          return exam;
        })
        
        console.log("exams:",this.exams)

      } catch (error) {
        // 处理错误情况
        
      }
    },
    async getCompletedExamsList() {
      try {
        const res = await getCompletedExams();
        this.completedExams = res.data;
      } catch (error) {
       
        this.$message.error('获取已考试卷失败：' + error.message);
      }
    },
  },
  computed: {
    // 根据菜单选择，返回相应的考试列表
    selectedExams() {
      this.getUncompletedExams(); 
      if (this.activeIndex2 === '1') {
        console.log("exams:",this.exams);
        return this.exams.filter(exam => exam.completed); // 已参与的考试
  
      } else if (this.activeIndex2 === '2') {
        
         return this.exams.filter(exam => !exam.completed);// 未参与的考试
      } else {
        return []; // 其他情况返回空列表
      }
    },
  },
  mounted() {
     this.getExams5();

     this.getCompletedExamsList(); 



    }
};
</script>

<style scoped>
.el-menu {
  z-index: 1000; /* 菜单的 z-index 值 */
}

.exam {
  margin-bottom: 10px;
}
</style>