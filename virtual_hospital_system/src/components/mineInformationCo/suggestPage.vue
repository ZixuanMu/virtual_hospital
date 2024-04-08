<template>
    <div class="feedback">
      <el-form  :model="feedback" label-width="100px" label-position="top">
        <el-form-item label="您的姓名">
          <el-input v-model="feedback.name" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item label="意见反馈">
          <el-input
    v-model="textarea2"
    style="width: 500px"
    :autosize="{ minRows: 18, maxRows: 100 }"
    type="textarea"
    placeholder="请输入您的反馈意见，我们会真心对待"
  ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFeedback">提交反馈</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        feedback: {
          name: '', // 姓名
          content: '' // 反馈内容
        }
      };
    },
    methods: {
      submitFeedback() {
        // 这里可以编写提交反馈的逻辑
        console.log('提交的反馈内容：', this.feedback);
        // 清空表单数据
        this.feedback.name = '';
        this.feedback.content = '';
        this.$message({
          message: `反馈成功，请耐心等候管理员处理`,
          type: "success",
        });
        // 可以根据实际情况做进一步的处理，比如发送网络请求等
      }
    }
  };
  </script>
  
  <style>
  .feedback {
    max-width: 500px;
    margin: auto auto;
  }
  </style>
  