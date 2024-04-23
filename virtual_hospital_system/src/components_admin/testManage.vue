<template>
  <div>
    <!-- 添加试卷按钮 -->
    <el-button type="primary" class="add-exam-button" @click="showAddExamDialog">新增试卷</el-button>

    
    <!-- 试卷列表 -->
    <el-card class="exam-list" v-for="exam in exams" :key="exam.exid">
      <div>
        <span>考试科目:{{ exam.content }}</span>
    
        <div>
          
        <span>包含题号:{{ exam.topicnumber }}</span>
      </div>
      <div>
        <span>考试时间:{{ exam.time }}分钟 </span>
        </div>
      </div>
         <el-button type="primary"  @click="getExamByExid(exam.exid)">查看试卷</el-button>
        <el-button type="text" @click="editExamName(exam)">编辑科目名</el-button>
        <el-button type="text" @click="editExamQuestions(exam)">修改试卷题号</el-button>
        <el-button type="text" @click="deleteExam(exam.exid)">删除试卷</el-button>
     
    </el-card>

    <!-- 新增试卷对话框 -->
    <el-dialog v-model="addExamDialogVisible" title="新增试卷">
      <el-form :model="newExam" ref="newExamForm">
        <el-form-item label="考试名称" prop="name">
          <el-input v-model="newExam.name"></el-input>
        </el-form-item>
        <el-form-item label="题目ID列表" prop="questionIds">
          <el-button type="primary" class="add-question-button" @click="showQuestionPickerDialog">选择题目</el-button>

        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="addExamDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addExam">确定</el-button>
      </div>
    </el-dialog>

    <!-- 题库选择题目对话框 -->
    <el-dialog v-model="questionPickerDialogVisible" title="选择题目" @close="questionPickerDialogVisible = false">
      <el-table :data="questions" style="width: 100%" height="350px" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="tid" label="ID" width="120"></el-table-column>
        <el-table-column prop="content" label="题干" width="120"></el-table-column>
        <el-table-column prop="contentA" label="选项A" width="120"></el-table-column>
        <el-table-column prop="contentB" label="选项B" width="120"></el-table-column>
        <el-table-column prop="contentC" label="选项C" width="120"></el-table-column>
        <el-table-column prop="contentD" label="选项D" width="120"></el-table-column>
        <el-table-column prop="answer" label="答案" width="120"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addExam">确定</el-button>
        <el-button @click="questionPickerDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>


    <!-- 修改试卷题目对话框 -->
    <el-dialog v-model="editExamDialogVisible" title="修改试卷题目">
      <el-form :model="editedExam" ref="editExamForm">
        <el-form-item label="题目ID列表" prop="questionIds">
          <el-input v-model="editedExam.questionIds" placeholder="请输入题目ID（20道题），用逗号分隔"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="editExamDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEditedExam">保存</el-button>
      </div>
    </el-dialog>
</template>

<script>


import { addExamm,getExams,changeEname } from '@/api/examApi.js'; // 假设这是你的添加试卷的 API 请求函数
import { topicget } from '@/api/api.js'; // 假设这是你的题库数据获取函数
import { ElMessage } from 'element-plus';



export default {
  data() {
    return {
      exams: [],
      addExamDialogVisible: false, // 新增试卷对话框可见性
      questionPickerDialogVisible: false, // 题库选择题目对话框可见性
      newExam: {
        name: '', // 考试名称
        questionIds: [] // 题目ID列表
      },
      questions: [] ,// 题库数据
      editExamDialogVisible: false, // 修改试卷题目对话框可见性
      editedExam: { id: '', questionIds: '' } ,// 被编辑的试卷信息
      selection:[]
    };
  },
  methods: {
    handleSelectionChange(selection) {
    this.newExam.questionIds = selection.map(question => question.tid).join(',');
  },
       // 显示新增试卷对话框
       showAddExamDialog() {
      this.addExamDialogVisible = true;

    },

    // 添加试卷
    addExam() {
      addExamm(this.newExam.name, this.newExam.questionIds)
        .then(response => {
          // 处理成功情况
          console.log(response); // 假设输出成功信息
          this.addExamDialogVisible = false; // 关闭对话框
          this.$message.success('添加试卷成功'); 
          this.$router.go(0)// 提示添加成功
        })
        .catch(error => {
          // 处理失败情况
          console.error('添加试卷失败：', error);
          this.$message.error('添加试卷失败：' + error.message); // 提示失败信息
        });
    },
   
    // 获取题库数据
    async fetchQuestionData() {
      try {
        const res = await topicget();
        this.questions = res.data;
      } catch (error) {
        console.error('获取题库数据失败：', error);
        this.$message.error('获取题库数据失败：' + error.message);
      }
    },
    // 显示题库选择题目对话框
    showQuestionPickerDialog() {
      this.fetchQuestionData(); // 获取题库数据
      this.questionPickerDialogVisible = true;
    },
    // 将选中的题目添加到试卷的题目ID列表中

   
    // 显示新增试卷对话框
    showAddExamDialog() {
      this.addExamDialogVisible = true;
    },
    editExamName(exam) {
      try{
      // 编辑试卷名称
      const newName = prompt('请输入新的考试名称', exam.name);
      if (newName !== null && newName.trim() !== '') {
        exam.name = newName.trim();
        console.log("shijuan",exam.name)
       
        const res=changeEname(exam.exid,exam.name)
        console.log("res:",res);
        
      this.$router.go(0);
      }
    }
        catch(error){
          ElMessage.error('修改试卷名失败：' + error.message);

        }
      },
    editExamQuestions(exam) {
      // 打开修改试卷题目对话框
      this.editedExam = { ...exam };
      this.editExamDialogVisible = true;
    },
    saveEditedExam() {
      // 保存修改后的试卷题目
      const index = this.exams.findIndex(exam => exam.id === this.editedExam.id);
      if (index !== -1) {
        this.exams[index].questionIds = this.editedExam.questionIds;
        this.editExamDialogVisible = false;
        // 清空编辑试卷题目表单
        this.$refs.editExamForm.resetFields();
      }
    },
    deleteExam(examId) {
      fetch(`http://106.54.206.14:8080//exams/deleteExamByExid?exid=${examId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if needed
    },
  })
  .then(response => {
    if (response.status != 200) {
      throw new Error('Failed to delete exam');
    }


      this.$router.go(0);
      this.$message({
          message: "删除成功",
          type: "success",
        });
  })
  .catch(error => {
    // Handle error
    console.error('Error deleting exam:', error);
    // You might want to add some error handling logic here
  });
    },
     getExamByExid(Exid) {
      fetch(`http://106.54.206.14:8080//exams/getExamByExid?exid=${Exid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if needed
    },
  }).then(response => response.json()).then(data =>{ 
    // Navigate to the 'testShow' route with query parameters
    this.$router.push({
      path: '/testShow', // Assuming 'testShow' is the name of the route
      query: { time:data.data.time,exid:data.data.exid,content:data.data.content,topicnumber:JSON.stringify(data.data.topicnumber) }
    
    });
    console.log(data.data.topicnumber)
  })},
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
  }
</script>

<style scoped>
.exam-management {
  padding: 20px;
}
.add-exam-button {
  margin-bottom: 20px;
}
.exam-list {
  margin-bottom: 20px;
}
.dialog-footer {
  text-align: right;
}
</style>
