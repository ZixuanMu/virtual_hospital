<template>
    <div class="directory">
      <h1>前台</h1>
      <ul class="chapter-list">
        <li>
          <div class="dropdown">
            <span @click="toggleChapter(1)" class="dropdown-toggle">{{ showChapter === 1 ? '▼' : '▶' }}</span>
            <h2 class="dropdown-title" @click="toggleChapter(1)">第一部分</h2>
          </div>
          <ul v-show="showChapter === 1" class="video-list">
            <li><a href="#">视频1</a></li>
            <li><a href="#">视频2</a></li>
          </ul>
        </li>
        <li>
          <div class="dropdown">
            <span @click="toggleChapter(2)" class="dropdown-toggle">{{ showChapter === 2 ? '▼' : '▶' }}</span>
            <h2 class="dropdown-title" @click="toggleChapter(2)">第二部分</h2>
          </div>
          <ul v-show="showChapter === 2" class="video-list">
            <li><a href="#">视频1</a></li>
            <li><a href="#">视频2</a></li>
          </ul>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showChapter: 0 // 0表示都不展开，1表示第一章展开，2表示第二章展开
    };
  },
  methods: {
    toggleChapter(chapter) {
      this.showChapter = this.showChapter === chapter ? 0 : chapter;
    }
  }
}
</script>

<style>

.directory {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.directory h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.chapter-list {
  list-style-type: none;
  padding: 0;
}

.chapter-list > li {
  margin-bottom: 20px;
}

.dropdown {
  display: flex;
  align-items: center;
}

.dropdown-toggle {
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
}

.dropdown-title {
  font-size: 20px;
  color: #666;
  margin-bottom: 10px;
  cursor: pointer;
}

.video-list {
  list-style-type: none;
  padding: 0;
  margin-left: 20px;
}

.video-list > li {
  margin-bottom: 5px;
}

.video-list a {
  font-size: 16px;
  color: #333;
  text-decoration: none;
}

.video-list a:hover {
  text-decoration: underline;
}
</style>
