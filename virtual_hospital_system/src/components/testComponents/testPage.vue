<template>


  <div class="page">
    <el-row class="test-paper">
    <el-container>
      <el-aside width="300px">

        <el-card  shadow="hover" style="min-height: 650px">
          <h4>题号：</h4>
          <div class="all-serial-number">
            <el-button
              @click="handleLeft(index)"
              v-for="(item, index) in examDetails"
              :key="index"
              class="serial-number"
              size="mini"
              :class="{
              'yi-zuo-da': item.da !='未作答'
              }"
            >
              {{ index + 1 }}
            </el-button>
          </div>
          <div style="display: grid; place-items: center;">
    <el-button @click="getSubmit" type="primary" plain>提交</el-button>
</div>

        </el-card>
      </el-aside>
      <el-main >       
        <el-card style="min-height: 650px">
          <div
            @click="getChenge"
            v-for="(shiTi, index) in examDetails"
            :key="index"
            :id="'id' + index"
            class="exam-details"
            :class="{ 'skip-style': index === navgatorIndex }"
          >
            <!-- 试题 -->
            <div class="shi-ti-style">
              <!-- 题目 -->
              <div>{{ index + 1 }}、{{ shiTi.content }}</div>
              <!-- 选项 -->
              <div class="xuan-xiang-style">
                <!-- 单选 -->
                <el-radio-group
                  @input="gegegegeg(shiTi, index)"
                  v-model="shiTi.da"
                >
                  <el-radio
                    v-for="(dan, danIdnex) in shiTi.options"
                    :label="danIdnex"
                    :key="danIdnex"
                  >
                    {{ dan }}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
            <!-- 标记 -->
            <div class="mark-style">
              <el-tooltip
                :content="shiTi.mark ? '已标记' : '可标记'"
                placement="right"
                effect="light"
              >
                <a
                  @click="getChangMark(index)"
                  class="el-icon-star-on"
                  :class="{ mark: shiTi.mark }"
                ></a>
              </el-tooltip>
            </div>
          </div>
        </el-card></el-main>
    </el-container>
    </el-row>
  </div>
</template>

<script>
import { admitexam } from "@/api/examApi";
import { ElMessage } from 'element-plus';

export {admitexam} from "@/api/examApi"
export default {
  data() {
    return {
      examDetails: [

        // 其他单选题目...
      ],
      userAnswers:'',
      navgatorIndex: null,
      listBoxState: true, //点击导航栏时，暂时停止监听页面滚动
      isSkip: true,
      isShiTi: false,
      exid:'',
      total:'',
    };
  },
  methods: {
  
          getSubmit() {

  this.examDetails.forEach((exam, index) => {
      // 将用户答案拼接到字符串中
      if(exam.da===0){
      this.userAnswers += 'A';
      if (index !== this.examDetails.length - 1) {
        this.userAnswers += ','; // 在除了最后一个答案外，添加逗号分隔符
      }
    }
    else if(exam.da === 1){
      this.userAnswers += 'B';
      if (index !== this.examDetails.length - 1) {
        this.userAnswers += ','; // 在除了最后一个答案外，添加逗号分隔符
      }
    }
    else if(exam.da ===2){
      this.userAnswers += 'C';
      if (index !== this.examDetails.length - 1) {
        this.userAnswers += ','; // 在除了最后一个答案外，添加逗号分隔符
      }
    }
    else if(exam.da ===3){
      this.userAnswers += 'D';
      if (index !== this.examDetails.length - 1) {
        this.userAnswers += ','; // 在除了最后一个答案外，添加逗号分隔符
      }
    }
    else{
      this.userAnswers += exam.da ;
      if (index !== this.examDetails.length - 1) {
        this.userAnswers += ','; // 在除了最后一个答案外，添加逗号分隔符
      }
    }
    console.log("da:",exam.da)
    });
    console.log(this.userAnswers)
        admitexam(this.exid,this.userAnswers).then(res => {
        console.log("res.stas",res.status)
        if (res.state === 200){
        ElMessage({
                message:"提交成功",
                type:'succes',
              })
              setTimeout(() => {
      this.$router.go(-1)
    }, 500);
      }
        console.log('res:',res)})
      },


    
    // 点击导航菜单，页面滚动到指定位置

    handleLeft(index) {
      this.navgatorIndex = index;
      this.$el.querySelector(`#id${index}`).scrollIntoView({
        top: "100px",
        behavior: "smooth", // 平滑过渡
        block: "center", // 上边框与视窗顶部平齐。默认值
      });
      this.listBoxState = false;
      //定时器
      let timeId;
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        this.listBoxState = true;
      }, 200);
    },
    // 监听页面元素滚动，改变导航栏选中
    scrollToTop() {
      // dom滚动位置
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.listBoxState) {
        if (this.listBox != undefined) {
          //作用是点击导航栏时，延迟这里执行。
          this.listBox.map((v, i) => {
            // 获取监听元素距离视窗顶部距离
            var offsetTop = document.getElementById(`id${i}`).offsetTop;
            // 获取监听元素本身高度
            var scrollHeight = document.getElementById(`id${i}`).scrollHeight;
            if (
              scrollTop >= offsetTop &&
              scrollTop <= offsetTop + scrollHeight
            ) {
              // 导航栏背景色选中
              this.navgatorIndex = i;
            }
          });
        }
      }
    },
    // 标记 或者 收藏
    // 标记 或者 收藏
    getChangMark(num) {
      this.examDetails[num].mark = !this.examDetails[num].mark;
    },
    gegegegeg(val, num) {
      console.log(val);
    },
    // 跳转样式 取消
    getChenge() {
      this.navgatorIndex = null;
    },

  },
  mounted() {
    // 获取通过路由传递的数据
    this.exid = this.$route.query.exid;
    this.examDetails = JSON.parse(this.$route.query.topicnumber).map((topic) => ({
      content: topic.content,
      options: [topic.contentA, topic.contentB, topic.contentC,topic.contentD],
      da: '未作答',
      mark: false,
    }));
    console.log(this.examDetails)
  },
};
</script>

<style scoped>
/* 骨架 */
.page {
  padding: 10px;
  overflow-x: scroll;
  overflow-y: scroll;
}
.test-paper {
  width: 100%;

  min-height: 650px;
}
::v-deep .el-card__body {
  padding: 10px;
  height: calc(100vh - 110px);
  overflow-y: scroll;
}
.answer-sheet {
  display: inline-block;
  margin-right: 10px;
}
.test-questions {
  display: inline-block;
  width: calc(100% - 340px);
}
</style>

<style scoped>
/* 具体样式：答题卡样式 */
/* .all-serial-number */
.serial-number {
  margin: 8px;
  width: 45px;
  height: 45px;
  font-size: 16px;
}


/* 具体样式：试题样式 */
.exam-details {
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid pink;
  border-radius: 5px;
  height: 150px;
  background: #fff;
}
/* 指定 跳转 题目样式 */
.skip-style {
  border: 2px solid yellow;
}
.shi-ti-style {
  display: inline-block;
  width: calc(100% - 30px);
}
/* 选项样式 */
.xuan-xiang-style {
  margin-top: 20px;
}
/* 标记样式 */
.mark-style {
  float: right;
  text-align: center;
  width: 30px;
}
/* 标记样式 */
.el-icon-star-on {
  font-size: 25px;
}
/* 标记样式 */
.mark {
  color: #f7ba2a;
}
</style>

<style scoped>
/* 联动样式 */
.yi-zuo-da {
  color: #fff;
  background: dodgerblue;
}
.el-aside {
background-color: #ffffff;
}
</style>

