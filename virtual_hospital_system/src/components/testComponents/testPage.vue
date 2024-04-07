<template>


  <div class="page">
    <el-row class="test-paper">
    <el-container>
      <el-aside width="300px">

        <el-card  shadow="hover" style="min-height: 650px">
          <h4>序号：</h4>
          <div class="all-serial-number">
            <el-button
              @click="handleLeft(index)"
              v-for="(item, index) in examDetails"
              :key="index"
              class="serial-number"
              size="mini"
              :class="{
                'yi-zuo-da': item.da.length != 0,
              }"
            >
              {{ index + 1 }}
            </el-button>
          </div>
          <div>
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
              <div>{{ index + 1 }}、{{ shiTi.timu }}</div>
              <!-- 选项 -->
              <div class="xuan-xiang-style">
                <!-- 单选 -->
                <el-radio-group
                  @input="gegegegeg(shiTi, index)"
                  v-model="shiTi.da"
                >
                  <el-radio
                    v-for="(dan, danIdnex) in shiTi.xuanxiang"
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
export default {
  data() {
    return {
      examDetails: [
        {
          timu: "《山行》是描绘了( C )的景色。",
          xuanxiang: ["A、春天", "B、夏天", "C、秋天", " D、冬天"],
          // 答案存放字符串
          da: "C",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        {
          timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
          xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
          // 答案存放字符串
          da: "B",
          mark: false,
        },
        // 其他单选题目...
      ],
      navgatorIndex: null,
      listBoxState: true, //点击导航栏时，暂时停止监听页面滚动
      isSkip: true,
      isShiTi: false,
    };
  },
  methods: {

          getSubmit() {
        let score = 0; // 初始化得分为0
        this.examDetails.forEach((question) => {
          // 遍历每个问题
          if (question.da === question.correctAnswer) {
            // 如果用户的答案等于正确答案
            score++; // 分数加1
          }
        });

        // 提示用户分数
        this.$message({
          message: `您的分数为: ${score}`,
          type: "success",
        });
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
    // 提交
   
      // 0代表A 1代表B 2代表C 3代表D 4代表E 5代表F 6代表G 7代表H 8代表I 9代表J 10代表K... （ 可以用字符串 或者数组的 方法 将至 替换； 回显同理 实例中有一个回显的实例 ）
      // 1、 其中判断题可以 用A、B 或者用 对、错 需要单独处理。
      // 2、简单题也需要 单独处理。
      // [0, 0, 0, 0, 0, Array(1), Array(1), Array(1), Array(1), '12', '1212']
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

