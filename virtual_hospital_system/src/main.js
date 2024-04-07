import { createApp } from 'vue';
import App from './App.vue';
// ElementPlus 和 其 css文件
import store from './store';
import ElementPlus from 'element-plus';
import VueRouter from 'vue-router'; // 注意：先导入VueRouter
import router from './router'; // 然后再导入路由配置
import 'element-plus/dist/index.css';
//import { provideToken } from './token';//token

const app = createApp(App);
app.use(store);
app.use(VueRouter); // 先使用VueRouter插件
app.use(router); // 然后再将路由器实例传递给createApp函数
app.use(ElementPlus);
// 在应用程序的根组件中提供 token
//provideToken();

app.mount('#app');
