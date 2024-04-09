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
    const router = useRouter()
    const videos = ref([
        {
          index: 17,
          thumbnailUrl: "https://via.placeholder.com/100x70", // 示例预览图 URL
          description: "手术无菌要求",
          videoUrl: "https://www.example.com/video1.mp4" // 示例视频 URL
        },
        {
          index: 18,
          thumbnailUrl: "https://via.placeholder.com/100x70", // 示例预览图 URL
          description: "常规手术、特殊手等的操作规范",
          videoUrl: "https://www.example.com/video2.mp4" // 示例视频 URL
        },
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
    router.push({
    path:'/funlearn/videoPlay/videoPlay',
    query:{ vurl: video.videoUrl} // 确保这里传递了正确的参数
  });
       console.log("videoUrl",video.videoUrl)
});
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
