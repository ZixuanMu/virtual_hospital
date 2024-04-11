<template>
<div>
  <div id="viewer"></div>
</div>
<el-dialog
  v-model="discriptionVisible"
  title="科室介绍">
  <div>科室名：{{ departmentInfo.dname }}</div>
  <br>
  <div>科室介绍：{{ departmentInfo.introduction }}</div>
  <br>
  <div v-if="itemList.length">相关器具：</div>
  <div v-for="equipment in itemList">
    <div><el-button @click="showEquipmentInfo(equipment)">{{ equipment.ename }}</el-button></div>
    <div><img :src="equipment.suffix" style="width: 30vw;"></img></div>
  </div>
  <div v-if="medicineList.length">药品一览：</div>
  <div v-for="medicine in medicineList" >
    <p>{{ medicine.mname }}（id:{{ medicine.mid }}）</p>
    <p>药品用途：{{ medicine.content }}</p>
  </div>
  <el-dialog 
  v-model="equipmentInfoVisible"
  title="器具介绍">
    <p>器具名：{{ currentEquipment.ename }}</p>
    <p>器具作用：{{ currentEquipment.fun }}</p>
    <img :src="currentEquipment.suffix" style="width: 30vw;height:30vh" @click="showEquipmentInfo"></img>
    <video-player :src="currentEquipment.video" :controls="true" :autoplay="false" style="width: 30vw;height:30vh;"></video-player>
  </el-dialog>
</el-dialog>
</template> 

<script setup>
import { ref, onMounted} from "vue"; 
import { Viewer } from 'photo-sphere-viewer' // 引入插件
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css' //引入CSS样式
import { useRoute, useRouter } from "vue-router";
import { getDepartmentByDid,getEidByDid,getAllMedicine,getEquipmentByEid } from '@/api/api.js'
import { VideoPlayer } from '@videojs-player/vue'
import router from "@/router";
let panoramaViewer = null
const route = useRoute()
let thisDid = route.query.did
const departmentInfo = ref()
const discriptionVisible = ref(false)
const equipmentInfoVisible = ref(false)
const itemList = ref([])
const medicineList = ref([])
const imgUrl = ref()
const currentEquipment = ref()
const backGroundList = [
  {
    did:'4',
    src:require('@/assets/宠物医院前台.jpg')
  },
  {
    did:'5',
    src:require('@/assets/宠物医院档案室.jpg')
  },
  {
    did:'6',
    src:require('@/assets/宠物医院诊室.jpg')
  },
  {
    did:'7',
    src:require('@/assets/宠物医院免疫室.jpg')
  },
  {
    did:'8',
    src:require('@/assets/宠物医院化验室.jpg')
  },{
    did:'9',
    src:require('@/assets/宠物医院影像室.jpg')
  },
  {
    did:'10',
    src:require('@/assets/宠物医院专科检查室.jpg')
  },

  {
    did:'11',
    src:require('@/assets/宠物医院处置室.jpg')
  },
  {
    did:'12',
    src:require('@/assets/宠物药房.jpg')
  },
  {
    did:'13',
    src:require('@/assets/宠物医院注射室.jpg')
  },
  {
    did:'14',
    src:require('@/assets/宠物医院手术准备室.jpg')
  },
  {
    did:'15',
    src:require('@/assets/宠物医院手术室.jpg')
  },
  {
    did:'16',
    src:require('@/assets/宠物医院住院部.jpg')
  },
  {
    did:'17',
    src:require('@/assets/宠物医院病理剖检室.jpg')
  },
]
const currentDepartment = ref ()
// 全景图初始化
const initViewer = async function () {
 panoramaViewer = new Viewer({
    container: document.querySelector('#viewer'), // 容器
    // panorama: departmentInfo.value.suffix,
    panorama: currentDepartment.value,
    navbar: [
      'zoom',
      'caption',
      {
          id: 1,
          title: 'Toggle panel',
          content: '介绍',
          onClick: () => {
            if(discriptionVisible === true)
            {
              discriptionVisible.value = false
            }
            else{
              discriptionVisible.value = true
            }
          },
      },
      {
          id: 2,
          title: 'Back',
          content: '返回',
          onClick: () => {
            router.push('/3dviews')
          },
      },
      // {
      //     id: 3,
      //     title: 'goLeft',
      //     content: '<',
      //     onClick: () => {
      //       if(thisDid === 4)
      //       {
      //         router.push({
      //           path:'/fullScreenView',
      //           query:{
      //               did:12
      //           }
      //         })
      //         panoramaViewer.destroy()
      //         loadViewer()
      //       }
      //       else{
      //         router.push({
      //           path:'/fullScreenView',
      //           query:{
      //               did:parseInt(thisDid)-1
      //           }
      //         })
      //         panoramaViewer.destroy()
      //         loadViewer()
      //       }
      //       location.reload()
      //     },
      // },
      // {
      //     id: 4,
      //     title: 'goRight',
      //     content: '>',
      //     onClick: () => {
      //       if(thisDid === 12)
      //       {
      //         router.push({
      //           path:'/fullScreenView',
      //           query:{
      //               did:4
      //           }
      //         })
      //         panoramaViewer.destroy()
      //         loadViewer()
      //       }
      //       else{
      //         router.push({
      //           path:'/fullScreenView',
      //           query:{
      //               did:parseInt(thisDid)+1
      //           }
      //         })
      //         panoramaViewer.destroy()
      //         loadViewer()
      //       }
      //       location.reload()
      //     },
      // },
      'fullscreen',
   ],
   plugins: [], // 标记点
   size: {
     width: '98vw',
     height: '98vh'
   }
 })
}
const showEquipmentInfo = (equipment) => {
  currentEquipment.value = equipment
  equipmentInfoVisible.value = true
}
onMounted(() => {
  loadViewer()
})
const loadViewer = () => {
  getDepartmentByDid({did:thisDid}).then(res => {
    if(res.state === 200)
    {
      backGroundList.forEach(element => {
        if(thisDid === element.did)
        {
          currentDepartment.value = element.src
          console.log("current:"+currentDepartment)
        }
      })
      departmentInfo.value = res.data
      initViewer();
      if(res.data.dname === "药房")
      {
        getAllMedicine().then(res =>{
          if(res.state === 200)
          {
            medicineList.value = res.data
          }
          console.log(res)
        }).catch(err =>{
          console.err(err)
        })
      }
      else{
        getEidByDid({did:thisDid}).then(res =>{
          console.log(res)
          if(res.state === 200)
          {
            res.data.forEach(element => {
              getEquipmentByEid({eid:element}).then(res =>{
                if(res.state === 200)
                {
                  itemList.value.push(res.data)
                }
              })
            });
            console.log(itemList.value)
            itemList.value.forEach(element =>{
              console.log("suffix:"+element.suffix)
            })
          }
        })
      }
    }
  })
}
</script>
<style>
</style>