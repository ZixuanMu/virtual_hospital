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
import suggestPage from '@/components/mineInformationCo/suggestPage.vue'
import qianTai from '@/components/funlearn/qianTai.vue'
import yiZhu from '@/components/funlearn/yiZhu.vue'
import shouYi from '@/components/funlearn/shouYi.vue'
import store from '@/store';
import videoPlay from '@/components/funlearn/videoPlay/videoPlay.vue'
import changeSuffix from '@/components/mineInformationCo/changeSuffix.vue';
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
        path:"/mineInformationCo/changeSuffix",
        name:"changeSuffix",
        component: changeSuffix,
      },
      {
        path:"/testUser",
        name:"testUser",
        component: testUser,
      },
      {
        path:'/funlearn/caseStudying',
        name:"casestudying",
        component: Casestudying,
      },
      {
        path:'/funlearn/rolePlaying',
        name:"roleplaying",
        component: Roleplaying,
      },
      {
        path:'/funlearn/qianTai',
        name:"qiantai",
        component: qianTai,
      },
      {
        path:'/funlearn/yiZhu',
        name:"yizhu",
        component: yiZhu,
      },
      {
        path:'/funlearn/shouYi',
        name:"shouyi",
        component: shouYi,
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
    ]
  },
  {
        path:"/mineInformationCo/suggestPage",
        name:"suggestPage",
        component: suggestPage,
  },
  {
    path:"/funlearn/videoPlay/videoPlay",
    name:"videoplay",
    component: videoPlay,
  },


];

const router = createRouter({
  history:createWebHistory(),
  routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (store.state.userInfo || to.path === "/"){
    next()
  } else {
    next('/')
  }
})

export default router;