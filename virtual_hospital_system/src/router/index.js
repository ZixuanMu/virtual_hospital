import {createRouter,createWebHistory} from 'vue-router';
import Layout from '@/Layout/myLayout.vue'
import Views from '@/components/3dViews.vue'
import App from '@/App.vue'

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path: '/',
      name: 'App',
      component: App,
    },
    {
      path:"/layout",
      name:"Layout",
      component: Layout,
      children: [
        {
          path:"/3dviews",
          name:"3dview",
          component: Views,
        }
      ]
    },
  ]
});

export default router;