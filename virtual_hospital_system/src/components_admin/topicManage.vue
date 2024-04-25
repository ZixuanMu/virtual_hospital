<template>
    <div class="question-bank">

      
      <!-- 查询题目 -->
       <!-- 搜索栏 -->
    <el-input placeholder="输入搜索内容" v-model="searchInformation" clearable style="margin-bottom: 20px;">
                <template #append>
                    <el-button @click="searchInList">
                        <el-icon><search /></el-icon>
                    </el-button>
                </template>
  </el-input>

      
      
      
      
      <div>
      <el-input v-model="searchID" placeholder="删除id" class="search-input"></el-input>
      <el-button type="primary" class="add-button" @click="deleteQuestion()">删除题目</el-button>
            <!-- 添加题目按钮 -->
            <el-button type="primary" class="add-button" @click="showAddDialog">添加题目</el-button>
    </div>
  <el-table :data="questions" style="width: 100%" height="100vh">
    <el-table-column fixed prop="tid" label="ID" width="120" />
    <el-table-column prop="content" label="题干" width="120" />
    <el-table-column prop="contentA" label="选项A" width="120" />
    <el-table-column prop="contentB" label="选项B" width="120" />
    <el-table-column prop="contentC" label="选项C" width="120" />
    <el-table-column prop="contentD" label="选项D" width="120" />
    <el-table-column prop="answer" label="答案" width="120" />
  </el-table>
      <!-- 展示题目列表 -->
      <!-- <el-table>
  <tr>
    <td>id</td>
    <td>题干</td>
    <td>选项A</td>
    <td>选项B</td>
    <td>选项C</td>
    <td>选项D</td>
    <td>答案</td>
  </tr> -->
  <!-- 模板内直接访问，不需要使用 .value 方式访问 -->
  <!-- <tr v-for="(question, index) in questions" :key="index">
    <td>{{ question.tid }}</td>
    <td>{{ question.content }}</td>
    <td>{{ question.contenta }}</td>
    <td>{{ question.contentb }}</td>
    <td>{{ question.contentc }}</td>
    <td>{{ question.contentd }}</td>
    <td>{{ question.answer }}</td>
  </tr>  -->

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
  

    </div>
  </template>
  
  <script>


// 导入必要的函数和组件
import { topicget ,addTopic} from '@/api/api.js'; // 假设这是你的 API 请求函数
import { searchinListT } from '@/api/examApi';
import { ElMessage } from 'element-plus';
import{ref} from "vue";
// let questionsiii = [

// {answer: "A",
// content: "1",
// contentA: 
// "1",
// contentB: 
// "1",
// contentC: 
// "1",
// contentD: 
// "1",
// tid: 1}
// ]


// 在需要获取题库数据的地方调用 fetchQuestionData 函数
// 例如在 mounted 钩子中调用


  export default {
  data() {    
    return {
        searchID:1,
        questions:[], // question 数据
        searchInformation:'',
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
    methods: {
      searchInList(){
      if(this.searchInList === '') return
    console.log("sss",this.searchInformation);

    searchinListT({content:this.searchInformation})
.then(response =>{
    this.questions = response.data;
    console.log(response)
  })
 
  },
     
      showAddDialog() {
        // 显示添加题目对话框
        this.dialogVisible = true;
      },
      addQuestion() {


    addTopic(this.newQuestion.question,this.newQuestion.optionA,this.newQuestion.optionB,this.newQuestion.optionC,this.newQuestion.optionD,this.newQuestion.answer).then(response => {
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

deleteQuestion() {
  // Make the API request to delete the question
  fetch(`http://106.54.206.14:8080//topics/deleteTopicByTid?tid=${this.searchID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if needed
    },
  })
  .then(response => {
    if (response.status != 200) {
      throw new Error('Failed to delete question');
    }


      this.$router.go(0);
      this.$message({
          message: "删除成功",
          type: "success",
        }); 
  })
  .catch(error => {
    // Handle error
    console.error('Error deleting question:', error);
    // You might want to add some error handling logic here
  });
},

      
      async fetchQuestionData() {
      try {
        // 发起题库数据请求
        const res = await topicget();

        // 将获取到的题库数据赋值给组件的 questions 数据
        this.questions = res.data;
        
        // 输出获取到的题库数据
        console.log("question数组里面的值:", this.questions);
      } catch (error) {
        // 处理错误情况
        console.error('获取题库数据失败：', error);
        ElMessage.error('获取题库数据失败：' + error.message);
      }
    },
    async fetchData4() {
      await this.fetchQuestionData();
    },

  },
  mounted() {
     this.fetchData4();

    }
}
  </script>
  
  <style scoped>
  .question-bank {
    padding: 20px;
  }
  .search-input {
    max-width: 100px;
  }
  .add-button {
    margin-top: 20px;
  }
  </style>
  