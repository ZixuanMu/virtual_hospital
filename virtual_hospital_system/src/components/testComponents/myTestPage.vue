<template>
  <div class="exam-paper">
    <h2 class="exam-title">{{ examData.examde.content }}</h2>
    <p class="score">得分: {{ total }}</p>
    <el-card v-for="(question, questionIndex) in examData.examde.topicnumber" :key="questionIndex" class="question" :class="{
      'correct-answer': isCorrect(questionIndex),
      'wrong-answer': isWrong(questionIndex),
      'unanswered': isUnanswered(questionIndex)
    }">
      <h3 slot="header">题目序号: {{ question.tid }}</h3>
      <p>{{ question.content }}</p>
      <div class="options">
        <p v-for="(option, optionIndex) in options(questionIndex)" :key="optionIndex">
          <span>{{ optionIndexLabel(optionIndex) }}. </span>{{ option }}
        </p>
      </div>
      <p>考生选择答案: {{ getResult(questionIndex) }}</p>
      <p>正确答案: {{ question.answer }}</p>
    </el-card>
  </div>
</template>

<script>
import { getMyexam } from '@/api/examApi';
import { useRoute } from 'vue-router';

export default {
  data() {
    return {
      exid: '',
      examData: {
        examde: [],
        result: ["", ""],
      },
      total: ''
    };
  },
  computed: {
    parsedResult() {
      var str =this.examData.result.replace(/"/g, '')
      return str.split(",");
    }
  },
  methods: {
    options(questionIndex) {
      const question = this.examData.examde.topicnumber[questionIndex];
      return [
        question.contentA,
        question.contentB,
        question.contentC,
        question.contentD
      ];
    },
    getResult(questionIndex) {
      const result = this.parsedResult;
      return result[questionIndex] || "未作答";
    },
    optionIndexLabel(index) {
      return String.fromCharCode(65 + index);
    },
    isCorrect(questionIndex) {
      const result = this.parsedResult;
      return result[questionIndex] === this.examData.examde.topicnumber[questionIndex].answer;
    },
    isWrong(questionIndex) {
      const result = this.parsedResult;
      return result[questionIndex] && result[questionIndex] !== this.examData.examde.topicnumber[questionIndex].answer;
    },
    isUnanswered(questionIndex) {
  const result = this.parsedResult;
  return result[questionIndex] === "未作答";
},

    getMyExam1() {
      getMyexam({ exid: this.exid }).then(res => {
        this.examData.result = JSON.stringify(res.data.result);
        console.log(this.examData.result)
        this.total = res.data.total;
      }).catch(error=>{
        console.log("错误err:"+error)
    });
    },
    getExamByExide() {
      fetch(`http://106.54.206.14:8080//exams/getExamByExid?exid=${this.exid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => { 
        this.examData.examde = data.data;
        console.log(this.examData.examde)
      }).catch(error=>{
        console.log("错误err:"+error)
    });
    },
  },
  mounted() {
    this.exid = this.$route.query.exid;
    this.getMyExam1();
    this.getExamByExide();
  }
};
</script>

<style scoped>
/* 样式可以根据需要自行调整 */
.exam-paper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.exam-title {
  text-align: center;
  margin-bottom: 20px;
}

.score {
  align-self: flex-end;
  font-size: 24px;
}

.score-value {
  font-weight: bold;
}

.question {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
}

.correct-answer {
  border: 2px solid green;
}

.wrong-answer {
  border: 2px solid red;
}

.unanswered {
  border: 2px solid yellow;
}

.options {
  margin-top: 10px;
}

.options p {
  margin-bottom: 5px;
}

.options span {
  font-weight: bold;
}
</style>
