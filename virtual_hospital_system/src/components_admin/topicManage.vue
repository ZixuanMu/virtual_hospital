<template>
    <div class="question-bank">
      <!-- 查询题目 -->
      <el-input v-model="searchQuery" placeholder="搜索题目" class="search-input"></el-input>
  
      <!-- 展示题目列表 -->
      <el-table :data="filteredQuestions" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="question" label="题目"></el-table-column>
        <el-table-column prop="options" label="选项"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="editQuestion(row)">编辑</el-button>
            <el-button type="text" @click="deleteQuestion(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 添加题目 -->
      <el-dialog v-model="dialogVisible" title="添加题目" @update:visible="dialogVisible = $event">
        <el-form :model="newQuestion" ref="newQuestionForm" :rules="rules" label-width="100px">
          <el-form-item label="题目" prop="question">
            <el-input v-model="newQuestion.question"></el-input>
          </el-form-item>

          <el-form-item label="选项A" prop="optionA">
            <el-input v-model="newQuestion.optionA"></el-input>
          </el-form-item>
          <el-form-item label="选项B" prop="optionB">
            <el-input v-model="newQuestion.optionB"></el-input>
          </el-form-item>
          <el-form-item label="选项C" prop="optionC">
            <el-input v-model="newQuestion.optionC"></el-input>
          </el-form-item>
          <el-form-item label="选项D" prop="optionD">
            <el-input v-model="newQuestion.optionD"></el-input>
          </el-form-item>
          <el-form-item label="答案" prop="answer">
            <el-input v-model="newQuestion.answer"></el-input>
          </el-form-item>
        </el-form>
        <div  class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addQuestion">确定</el-button>
        </div>
      </el-dialog>
      
      <!-- 修改题目 -->
      <el-dialog v-model="editDialogVisible" title="编辑题目" @update:visible="editDialogVisible = $event">
        <el-form :model="editedQuestion" ref="editQuestionForm" :rules="rules" label-width="100px">
          <el-form-item label="题目" prop="question">
            <el-input v-model="editedQuestion.question"></el-input>
          </el-form-item>
          <el-form-item label="选项" prop="options">
            <el-input v-model="editedQuestion.options"></el-input>
          </el-form-item>
        </el-form>
        <div  class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEditedQuestion">保存</el-button>
        </div>
      </el-dialog>
  
      <!-- 添加题目按钮 -->
      <el-button type="primary" class="add-button" @click="showAddDialog">添加题目</el-button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
        
      return {
        questions: [ // 示例题目
        { id: 1, question: 'What is the capital of France?', options: 'A. London, B. Paris, C. Rome, D. Berlin' },
        { id: 2, question: 'Which planet is closest to the Sun?', options: 'A. Earth, B. Mercury, C. Mars, D. Venus' }
      ],
        searchQuery: '', // 搜索查询
        dialogVisible: false, // 添加题目对话框可见性
        editDialogVisible: false, // 编辑题目对话框可见性
        newQuestion: { 
          question: '', 
          optionA: '', 
          optionB: '', 
          optionC: '', 
          optionD: '' ,
          answer:'',
        }, // 新增题目
        editedQuestion: { id: '', question: '', options: '' }, // 编辑的题目
        rules: { // 表单验证规则
          question: [
            { required: true, message: '请输入题目', trigger: 'blur' }
          ],
          optionA: [
            { required: true, message: '请输入选项A', trigger: 'blur' }
          ],
          optionB: [
            { required: true, message: '请输入选项B', trigger: 'blur' }
          ],
          optionC: [
            { required: true, message: '请输入选项C', trigger: 'blur' }
          ],
          optionD: [
            { required: true, message: '请输入选项D', trigger: 'blur' }
          ],
          answer:[
            {required: true, mess :'请输入答案',trigger:'blur'}
          ]
        }
      };
    },
    computed: {
      filteredQuestions() {
        // 根据搜索查询过滤题目列表
        return this.questions.filter(question =>
          question.question.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
     
      showAddDialog() {
        // 显示添加题目对话框
        this.dialogVisible = true;
      },
      addQuestion() {
  // Prepare data for the request
  const requestData = {
    content: this.newQuestion.question,
    contenta: this.newQuestion.optionA,
    contentb: this.newQuestion.optionB,
    contentc: this.newQuestion.optionC,
    contentd: this.newQuestion.optionD,
    answer: this.newQuestion.answer
  };
  console.log(requestData);
  // Make the API request to add a new question
  fetch('http://106.54.206.14:8080/topics/addTopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }else if(response.status ===500){
      throw new Error('报错码：500')
    }
    return response.json();
  })
  .then(data => {
    // Handle success response
    console.log(data); // Assuming you want to log the response
    this.dialogVisible = false; // Close dialog on success
    // Clear the form fields
    this.newQuestion = {
      content: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      answer: ''
    };
  })
  .catch(error => {
    // Handle error
    console.error('Error adding question:', error);
    // You might want to add some error handling logic here
  });
},

deleteQuestion(id) {
  // Make the API request to delete the question
  fetch(`/topics/deleteTopic/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if needed
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete question');
    }
    // Remove the question from the local list if the request is successful
    this.questions = this.questions.filter(question => question.id !== id);
  })
  .catch(error => {
    // Handle error
    console.error('Error deleting question:', error);
    // You might want to add some error handling logic here
  });
},

      editQuestion(question) {
        // 打开编辑题目对话框并填充编辑内容
        this.editedQuestion = { ...question };
        this.editDialogVisible = true;
      },
      saveEditedQuestion() {
        // 保存编辑后的题目内容
        const index = this.questions.findIndex(q => q.id === this.editedQuestion.id);
        if (index !== -1) {
          this.questions[index] = { ...this.editedQuestion };
          this.editDialogVisible = false;
          // 清空编辑题目表单
          this.$refs.editQuestionForm.resetFields();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .question-bank {
    padding: 20px;
  }
  .search-input {
    margin-bottom: 20px;
  }
  .add-button {
    margin-top: 20px;
  }
  </style>
  