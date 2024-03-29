import {createRouter,createWebHistory} from 'vue-router';
import Layout from '@/Layout/myLayout.vue'
import Views from '@/components/3dViews.vue'
import App from '@/App.vue'
import functionalLearning from '@/components/functionalLearning.vue'
import mineInformation from '@/components/mineInformation.vue'
import testUser from '@/components/testUser.vue'
import testPage from '@/components/testComponents/testPage.vue'
import Casestudying from '@/components/funlearn/caseStudying.vue'
import Roleplaying from '@/components/funlearn/rolePlaying.vue';




const routes = [

  {
    path: '/',
    name: 'App',
    component: App,
  },
  {
    path:'/testPage',
    name:"testPage",
    component:testPage,
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
      },
      {
        path:"/functionalLearning",
        name:"functionalLearning",
        component: functionalLearning,
      },
      {
        path:"/mineInformation",
        name:"mineInformation",
        component: mineInformation,
      },
      {
        path:"/testUser",
        name:"testUser",
        component: testUser,
      },
    ]
  },
  {
    path:'/funlearn/caseStudying.vue',
    name:"casestudying",
    component: Casestudying,
  },
  {
    path:'/funlearn/rolePlaying.vue',
    name:"roleplaying",
    component: Roleplaying,
  }
];

const router = createRouter({
  history:createWebHistory(),
  routes,
});

export default router;