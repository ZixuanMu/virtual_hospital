<template>
    <div class="page">
      <el-row class="test-paper">
        <el-col class="answer-sheet">
          <el-card style="min-height: 800px" shadow="hover">
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
              <el-button @click="getSubmit" type="primary" plain>提 交</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col class="test-questions">
          <el-card style="min-height: 800px" shadow="hover">
            <div
              @click="getChenge"
              v-for="(shiTi, index) in examDetails"
              :key="index"
              :id="'id' + index"
              class="exam-details"
              :class="{ 'skip-style': index === navgatorIndex }"
            >
              <!-- isShiTi -->
              <!-- 试题 -->
              <div class="shi-ti-style">
                <!-- 题目 -->
                <div>{{ index + 1 }}、{{ shiTi.timu }}</div>
                <!-- 选项 -->
                <div class="xuan-xiang-style">
                  <!-- 单选 -->
                  <el-radio-group
                    @input="gegegegeg(shiTi, index)"
                    v-if="shiTi.type == '单选'"
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
                  <!-- 多选 -->
                  <el-checkbox-group
                    @change="gegegegeg(shiTi, index)"
                    v-else-if="shiTi.type == '多选'"
                    v-model="shiTi.da"
                  >
                    <!-- label绑定答案的值,可以绑定索引index,也可以绑定答案内容times -->
                    <el-checkbox
                      v-for="(duo, duoIndex) in shiTi.xuanxiang"
                      :label="duoIndex"
                      :key="duoIndex"
                    >
                      {{ duo }}
                    </el-checkbox>
                  </el-checkbox-group>
                  <!-- 简单 -->
                  <div v-else>
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="shiTi.da"
                    />
                  </div>
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
          </el-card>
        </el-col>
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
            type: "单选",
            xuanxiang: ["A、春天", "B、夏天", "C、秋天", " D、冬天"],
            // 答案存放字符串
            da: "",
            mark: false,
          },
          {
            timu: "劝君更尽一杯酒，西出阳关无故人。”出自( B )的名句。",
            type: "单选",
            xuanxiang: ["A、李白", "B、王维", "C、王昌龄", "D、杜牧"],
            // 答案存放字符串
            da: "",
            mark: false,
          },
          {
            timu: "把“春风”比作“剪刀”的是哪首诗?( C )",
            type: "单选",
            xuanxiang: [
              "A、《忆江南》",
              "B、《滁州西涧》",
              "C、《咏柳》",
              "D、《游园不值》",
            ],
            // 答案存放字符串
            da: "",
            mark: false,
          },
          {
            timu: "横看成岭侧成峰，远近高低各不一样。”诗中写的名胜是( D )。",
            type: "单选",
            xuanxiang: ["A、泰山", "B、华山", "C、黄山", "D、庐山"],
            // 答案存放字符串
            da: "",
            mark: false,
          },
          {
            timu: "解落三秋叶，能开二月花。过江千尺浪，入竹万竿斜。”这首诗写的是( B )。",
            type: "单选",
            xuanxiang: ["A、花", "B、风", "C、竹", "D、水"],
            // 答案存放字符串
            da: "",
            mark: false,
          },
          {
            timu: "以下哪些诗句出自白居易的作品？( A、C、E )",
            type: "多选",
            xuanxiang: [
              "A、春风又绿江南岸",
              "B、白日依山尽",
              "C、人生自古谁无死",
              "D、大漠孤烟直",
              "E、举杯邀明月",
              "F、月落乌啼霜满天",
            ],
            // 答案存放数组
            da: [0, 2, 4],
            mark: false,
          },
          {
            timu: "以下哪些是唐代诗人？( A、B、C、E、F )",
            type: "多选",
            xuanxiang: [
              "A、杜甫",
              "B、苏轼",
              "C、白居易",
              "D、李清照",
              "E、辛弃疾",
              "F、陆游",
            ],
            // 答案存放数组
            da: [],
            mark: false,
          },
          {
            timu: "以下哪些诗人被称为“唐三百首”？( A、B、C )",
            type: "多选",
            xuanxiang: [
              "A、李白",
              "B、杜甫",
              "C、白居易",
              "D、苏轼",
              "E、王之涣",
            ],
            // 答案存放数组
            da: [],
            mark: false,
          },
          {
            timu: "以下哪些诗人被称为“宋词四大家”？( A、B、C、D  )",
            type: "多选",
            xuanxiang: [
              "A、李清照",
              "B、辛弃疾",
              "C、苏轼",
              "D、杜牧",
              "E、杨万里",
            ],
            // 答案存放数组
            da: [],
            mark: false,
          },
          {
            timu: "具有诗仙、诗圣、诗鬼称号的的诗人分别是谁?",
            type: "问答",
            xuanxiang: ["李白 杜甫 李贺"],
            // 答案存放字符串
            da: "",
            mark: false,
          },
          {
            timu: "在苏轼写的《惠崇春江晚景》这首中，让我们明白了有一种味美但内脏有毒的鱼叫什么?",
            type: "问答",
            xuanxiang: ["河豚"],
            // 答案存放字符串
            da: "",
            mark: false,
          },
        ],
        navgatorIndex: null,
        listBoxState: true, //点击导航栏时，暂时停止监听页面滚动
        isSkip: true,
        isShiTi: false,
      };
    },
    mounted() {
      let timeId;
      window.addEventListener(
        "scroll",
        () => {
          // 页面滚动停止100毫秒后才会执行下面的函数。
          clearTimeout(timeId);
          timeId = setTimeout(() => {
            this.scrollToTop();
            console.log("执行完成");
          }, 100);
        },
        true
      );
    },
    methods: {
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
      getSubmit() {
        console.log(this.examDetails);
        let list = this.examDetails.map((item) => {
          return item.da;
        });
        console.log(list);
        this.$message({
          message: JSON.stringify(list),
          type: "success",
        });
        // 0代表A 1代表B 2代表C 3代表D 4代表E 5代表F 6代表G 7代表H 8代表I 9代表J 10代表K... （ 可以用字符串 或者数组的 方法 将至 替换； 回显同理 实例中有一个回显的实例 ）
        // 1、 其中判断题可以 用A、B 或者用 对、错 需要单独处理。
        // 2、简单题也需要 单独处理。
        // [0, 0, 0, 0, 0, Array(1), Array(1), Array(1), Array(1), '12', '1212']
      },
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
    min-width: 1100px;
    min-height: 800px;
  }
  ::v-deep .el-card__body {
    padding: 10px;
    height: calc(100vh - 110px);
    overflow-y: scroll;
  }
  .answer-sheet {
    display: inline-block;
    margin-right: 10px;
    width: 330px;
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
  </style>