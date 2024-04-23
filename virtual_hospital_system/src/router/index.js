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
import topicManage from '@/components_admin/topicManage.vue';
import userManage from '@/components_admin/userManage.vue';
import suggestPage from '@/components/mineInformationCo/suggestPage.vue'
import equipmentManage from '@/components_admin/equitmentManage.vue';
import studyManage from '@/components_admin/studyManage.vue';
import medicineManage from '@/components_admin/medicineManage.vue';
import qianTai from '@/components/funlearn/qianTai.vue'
import yiZhu from '@/components/funlearn/yiZhu.vue'
import shouYi from '@/components/funlearn/shouYi.vue'
import store from '@/store';
import changeSuffix from '@/components/mineInformationCo/changeSuffix.vue';
import fullScreenView from '@/components/fullScreenView.vue';
import testShow from '@/components_admin/testShow.vue';
import myTestPage from '@/components/testComponents/myTestPage.vue';

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
    path:'/fullScreenView',
    name:"fullScreenView",
    component:fullScreenView
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
      {
        path:'/myTestPage',
        name:"myTestPage",
        component:myTestPage,
      }
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

        path:"/topicManage",
        name:"topicManage",
        component:topicManage,
      },
      {
        path:"/userManage",
        name:"userManage",
        component:userManage,
      },
      {
        path:"/testShow",
        name:"testShow",
        component:testShow,
      },
      {
        path:"/studyManage",
        name:"studyManage",
        component:studyManage,
      },
      {
        path:"/medicineManage",
        name:"meidicineManage",
        component:medicineManage,
      },
      {
        path:"/equipmentManage",
        name:"equipmentManage",
        component:equipmentManage,
      }
    ]
  },
  {
        path:"/mineInformationCo/suggestPage",
        name:"suggestPage",
        component: suggestPage,
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