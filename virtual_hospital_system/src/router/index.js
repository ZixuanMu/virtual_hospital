import {createRouter,createWebHistory} from 'vue-router';
import UserLayout from '@/Layout/UserLayout.vue'
import Views from '@/components/3dViews.vue'
import App from '@/App.vue'
import functionalLearning from '@/components/functionalLearning.vue'
import mineInformation from '@/components/mineInformation.vue'
import testUser from '@/components/testUser.vue'
import testPage from '@/components/testComponents/testPage.vue'
import Casestudying from '@/components/funlearn/caseStudying.vue'
import Roleplaying from '@/components/funlearn/rolePlaying.vue'
import AdminLayout from '@/Layout/AdminLayout.vue'
import caseManage from '@/components_admin/caseManage.vue'
import testManage from '@/components_admin/testManage.vue'
import userManage from '@/components_admin/userManage.vue'


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
    path:"/UserLayout",
    name:"UserLayout",
    component: UserLayout,
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
    path:"/AdminLayout",
    name:"AdminLayout",
    component: AdminLayout,
    children: [
      {
        path:"/caseManage",
        name:"caseManage",
        component:caseManage,
      },
      {
        path:"/testManage",
        name:"testManage",
        component:testManage,
      },
      {
        path:"/userManage",
        name:"userManage",
        component:userManage,
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