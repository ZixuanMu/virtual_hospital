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
export default {
  data() {
    return {
      videos: [
        {
          thumbnailUrl: "https://via.placeholder.com/100x70", // 示例预览图 URL
          description: "手术无菌要求",
          videoUrl: "https://www.example.com/video1.mp4" // 示例视频 URL
        },
        {
          thumbnailUrl: "https://via.placeholder.com/100x70", // 示例预览图 URL
          description: "常规手术、特殊手等的操作规范",
          videoUrl: "https://www.example.com/video2.mp4" // 示例视频 URL
        },
      ],
      mounted() {
    // 遍历 videos 数组
     this.videos.forEach(async (video) => {
     // 调用 getVideoUrl 方法获取视频 URL
     const videoUrl = await getVideoUrl(video.description);
     // 将获取到的视频 URL 赋值给 video 对象的 videoUrl 属性
     if (videoUrl) {
      video.videoUrl = videoUrl;
    } else {
      // 如果获取失败，可以进行一些错误处理，比如给出提示信息
      console.error('获取视频 URL 失败:', video.description);
    }
  });
}
    };
  },
  methods: {
    openVideoPage(video) {
      // 打开新的页面播放视频，同时传递视频的 URL
      window.open(`/video-page?videoUrl=${encodeURIComponent(video.videoUrl)}`);
    }
  }
}
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
