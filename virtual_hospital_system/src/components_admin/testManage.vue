<template>
  <div class="exam-management">
    <!-- 新增试卷按钮 -->
    <el-button type="primary" class="add-exam-button" @click="showAddExamDialog">新增试卷</el-button>

    <!-- 试卷列表 -->
    <el-card class="exam-list" v-for="exam in exams" :key="exam.id">
      <div>
        <span>{{ exam.name }}</span>
        <el-button type="text" @click="editExamName(exam)">编辑</el-button>
        <el-button type="text" @click="deleteExam(exam.id)">删除</el-button>
      </div>
      <div v-for="(questionId, index) in exam.questions" :key="index">
        <span>{{ index + 1 }}. </span>
        <span>{{ getQuestionById(questionId) }}</span>
      </div>
      <el-button type="text" @click="editExamQuestions(exam)">修改试卷题目</el-button>
    </el-card>

    <!-- 新增试卷对话框 -->
    <el-dialog v-model="addExamDialogVisible" title="新增试卷">
      <el-form :model="newExam" ref="newExamForm">
        <el-form-item label="考试名称" prop="name">
          <el-input v-model="newExam.name"></el-input>
        </el-form-item>
        <el-form-item label="题目ID列表" prop="questionIds">
          <el-input v-model="newExam.questionIds" placeholder="请输入题目ID，用逗号分隔"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="addExamDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addExam">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改试卷题目对话框 -->
    <el-dialog v-model="editExamDialogVisible" title="修改试卷题目">
      <el-form :model="editedExam" ref="editExamForm">
        <el-form-item label="题目ID列表" prop="questionIds">
          <el-input v-model="editedExam.questionIds" placeholder="请输入题目ID，用逗号分隔"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="editExamDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEditedExam">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  data() {
    return {
      exams: [
        {
          id: 1,
          name: '考试一',
          questions: [1, 2, 3, 4, 5] // 示例题目ID列表
        },
        {
          id: 2,
          name: '考试二',
          questions: [6, 7, 8, 9, 10] // 示例题目ID列表
        }
      ], // 试卷列表
      addExamDialogVisible: false, // 新增试卷对话框可见性
      newExam: { name: '', questionIds: '' }, // 新增试卷信息
      editExamDialogVisible: false, // 修改试卷题目对话框可见性
      editedExam: { id: '', questionIds: '' } // 被编辑的试卷信息
    };
  },
  methods: {
    showAddExamDialog() {
      // 显示新增试卷对话框
      this.addExamDialogVisible = true;
    },
    addExam() {
      // 将新增试卷信息添加到试卷列表
      const exam = { id: this.exams.length + 1, ...this.newExam };
      this.exams.push(exam);
      this.addExamDialogVisible = false;
      // 清空新增试卷表单
      this.$refs.newExamForm.resetFields();
    },
    editExamName(exam) {
      // 编辑试卷名称
      const newName = prompt('请输入新的考试名称', exam.name);
      if (newName !== null && newName.trim() !== '') {
        exam.name = newName.trim();
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
      // 根据ID删除试卷
      this.exams = this.exams.filter(exam => exam.id !== examId);
    },
    getQuestionById(questionId) {
      // 通过题目ID获取题目内容
      // 这里假设有一个题目列表 questions，你需要实现一个方法来从题目列表中根据ID获取题目内容
 
    }
  },

};

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
