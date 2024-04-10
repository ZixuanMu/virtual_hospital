import { createApp } from 'vue';
import App from './App.vue';
// ElementPlus 和 其 css文件
import store from './store';
import ElementPlus from 'element-plus';
import VueRouter from 'vue-router'; // 注意：先导入VueRouter
import router from './router'; // 然后再导入路由配置
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//import { provideToken } from './token';//token
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
                        
const app = createApp(App);
app.use(store);
app.use(VueRouter); // 先使用VueRouter插件
app.use(router); // 然后再将路由器实例传递给createApp函数
app.use(ElementPlus);
// 在应用程序的根组件中提供 token
//provideToken();
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app');
app.use(VueVideoPlayer)
