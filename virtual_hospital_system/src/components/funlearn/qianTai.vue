<template>
  <div class="video-list">
    <div class="video-item" v-for="(video, index) in videos" :key="index" @click="openVideoPage(video)">
      <div class="video-container">
        <img :src="video.thumbnailUrl" alt="视频预览图" class="thumbnail">
        <p class="description">{{ video.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    // const data = reactive({
    //     actor: '',
    //     content: '',
    //     did :'',
    //     name :'',
    //     video :''

    // })    
    const router = useRouter()
    const videos = ref([
      {
        index: 1,
        thumbnailUrl: "https://via.placeholder.com/100x70",
        description: "接待挂号",
        videoUrl: "" // 初始为空，后续会由接口赋值
      },
         {
          index: 2,
          thumbnailUrl: "https://via.placeholder.com/100x70",
          description: "导医咨询",
          videoUrl: "" // 初始为空，后续会由接口赋值
        },
        {
          index: 3,
          thumbnailUrl: "https://via.placeholder.com/100x70",
          description: "病历档案发出与回收",
          videoUrl: "" // 初始为空，后续会由接口赋值
        },
        {
          index: 4,
          thumbnailUrl: "https://via.placeholder.com/100x70",
          description: "收费",
          videoUrl: "" // 初始为空，后续会由接口赋值
        },
      // 其他视频数据
    ]);
    const openVideoPage = async (video) => {
      try {
        fetch('http://106.54.206.14:8080//duty/getDutyByDid?did='+video.index,{
          method:'GET',
          header:{
            'Content-Type': 'application/json',
          }
        }).then(response => response.json()).then(data =>{ 
          video.videoUrl = data.data.video;  
        console.log("vurl:",data.data.video)
    //     // 打开到新的页面播放视频，
    //     // 跳转到详情的页面
    //           router.push({
    //               path:'/funlearn/videoPlay/videoPlay',
    //               query:video.videourl
    //      // 多个参数这样的写法
    //      // query:{Shuju}
    //  })
    
    router.push({
    path:'/funlearn/videoPlay/videoPlay',
    query:{ vurl: video.videoUrl} // 确保这里传递了正确的参数
  });


       console.log("videoUrl",video.videoUrl)
});
        // 将接口返回的 video 赋值给对应的 videoUrl
        //videos.value.find(v => v.index === video.index).videoUrl = v_url;

        // 打开到新的页面播放视频，
        // 跳转到详情的页面
//         const router = useRouter()
//         const Detail = (Shuju)=>{
//               router.push({
//                   path:'/funlearn/videoPlay/videoPlay',
//                   query:video.videourl
//          // 多个参数这样的写法
//          // query:{Shuju}
//      })
//  }
      // console.log("跳转")
      // window.open(video.videoUrl);

      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    return {
      videos,
      openVideoPage
    };
  }
};
// import { getVideoUrl } from '@/api/api.js';
// // import { reactive } from 'vue';
// // import { ElMessage, ElPopperArrow } from 'element-plus';

// export default {
//   data() {
//     return {
//       videos: [
//         {
//           index: 1,
//           thumbnailUrl: "https://via.placeholder.com/100x70",
//           description: "接待挂号",
//           videoUrl: "" // 初始为空，后续会由接口赋值
//         },
//         {
//           index: 2,
//           thumbnailUrl: "https://via.placeholder.com/100x70",
//           description: "导医咨询",
//           videoUrl: "" // 初始为空，后续会由接口赋值
//         },
//         {
//           index: 3,
//           thumbnailUrl: "https://via.placeholder.com/100x70",
//           description: "病历档案发出与回收",
//           videoUrl: "" // 初始为空，后续会由接口赋值
//         },
//         {
//           index: 4,
//           thumbnailUrl: "https://via.placeholder.com/100x70",
//           description: "收费",
//           videoUrl: "" // 初始为空，后续会由接口赋值
//         }
//       ]
//     };
//   },

// const data = reactive({
//   getUrlData:{
//     index:''
//   }
// }),

// const getAndopenVideoPage = () => {
//   gao(data.getUrlData)
// },
// const gao = (data) => {
//     getVideoUrl({
//         did:data.index
//     }).then(res => {
//         console.log("res:",res)
//         if (res.state === 200) {


//         }

//     }).catch(error=>{
//         console.error('请求url错误:', error);
//         ElMessage({
//             message: "无法获取视频",
//             type: 'error',
//             duration: 1500,

//         });
//     });
// },


  // mounted() {
  //   // 在组件挂载后获取视频 URL
  //   this.videos.forEach(video => {
  //     this.getVideoUrl2(video.index);
  //   });
  // },
  // methods: {
  //   getVideoUrl2: function(videos) { // 使用普通函数定义
  // const requestData = { 
  //   index:1
  // };

//   // 调用您的 API 函数，传递正确的参数
//   getVideoUrl(requestData)
//     .then(response => {
//       // 获取后端返回的视频 URL
//       const videoUrl = response.data.video;
//       console.log("url是：" + videoUrl + "1111111")

//       // 更新对应视频对象的 videoUrl 属性
//       // this.videos.find(video => video.index === index).videoUrl = videoUrl;
//     })
//     .catch(error => {
//       console.error('Error fetching video URL:', error);
//     });
// },


    // openVideoPage(video) {
    //   // 打开新的页面播放视频，同时传递视频的 URL
    //   window.open(`/video-page?videoUrl=${encodeURIComponent(video.videoUrl)}`);
    // }
  // }

</script>


<style scoped>
.video-list {
  display: flex;
  flex-direction: column;
}

.video-item {
  margin-bottom: 10px;
}

.video-container {
  display: flex;
  border: 1px solid #ddd; /* 添加边框 */
  border-radius: 5px; /* 圆角边框 */
  overflow: hidden; /* 隐藏超出部分 */
}

.thumbnail {
  width: 100px;
  height: 70px;
  object-fit: cover; /* 保持图片比例并填充容器 */
}

.description {
  flex-grow: 1; /* 填充剩余空间 */
  padding: 5px; /* 添加内边距 */
  font-size: 14px;
  color: #666;
}
</style>
