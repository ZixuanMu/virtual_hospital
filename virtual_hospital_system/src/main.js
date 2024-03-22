import { createApp } from 'vue';
import App from './App.vue';
// ElementPlus 和 其 css文件
import ElementPlus from 'element-plus';
import VueRouter from 'vue-router';
import router from './router';
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(router);
app.use(VueRouter);
app.use(ElementPlus);

app.mount('#app');
