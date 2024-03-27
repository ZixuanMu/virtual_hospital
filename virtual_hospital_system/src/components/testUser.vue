<template>
    <div>
      <h1>{{ examTitle }}</h1>
      <div v-if="!examStarted">
        <el-button @click="startExam">开始考试</el-button>
      </div>
      <div v-else>
        <div v-for="(question, index) in questions" :key="index">
          <h3>问题 {{ index + 1 }}</h3>
          <p>{{ question.text }}</p>
          <ul>
            <li v-for="(option, optionIndex) in question.options" :key="optionIndex">
              <input type="radio" :name="'question_' + index" :value="option" v-model="selectedAnswers[index]">
              {{ option }}
            </li>
          </ul>
        </div>
        <button @click="submitExam">提交考试</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        examTitle: '计算机科学考试',
        examStarted: false,
        selectedAnswers: [],
        questions: [
          {
            text: '以下哪个不是编程语言？',
            options: ['Python', 'HTML', 'Java', 'CSS'],
            correctAnswer: 'HTML'
          },
          {
            text: 'HTML 是什么的缩写？',
            options: ['Hyper Text Markup Language', 'High Tech Makeup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
            correctAnswer: 'Hyper Text Markup Language'
          },
          // 添加更多问题...
        ]
      };
    },
    methods: {
      startExam() {
        this.examStarted = true;
        // 初始化答案数组
        this.selectedAnswers = new Array(this.questions.length).fill('');
      },
      submitExam() {
        // 计算分数等操作
        // 这里只是简单展示选择的答案
        alert('已提交答案：' + this.selectedAnswers.join(', '));
      }
    }
  };
  </script>
  
  <style scoped>
  /* 可以在这里添加样式 */
  </style>
  