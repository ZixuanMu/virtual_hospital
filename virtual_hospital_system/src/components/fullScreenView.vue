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
    <div><img :src="equipment.suffix" style="width: 10vw;height: 15vh;"></img></div>
  </div>
  <div v-if="medicineList.length">药品一览：</div>
  <div v-for="medicine in medicineList" >
    <p>{{ medicine.mname }}</p>
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
import "photo-sphere-viewer"
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css' //引入CSS样式
import { loadRouteLocation, useRoute, useRouter } from "vue-router";
import { getDepartmentByDid,getEidByDid,getAllMedicine,getEquipmentByEid } from '@/api/api.js'
import { VideoPlayer } from '@videojs-player/vue'
import router from "@/router";
import { stringify } from "json-bigint";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers"
import { markers } from "photo-sphere-viewer/dist/plugins/markers"
let panoramaViewer = null
const route = useRoute()
const thisDid = ref(route.query.did)
const departmentInfo = ref()
const discriptionVisible = ref(false)
const equipmentInfoVisible = ref(false)
const itemList = ref([])
const medicineList = ref([])
const imgUrl = ref()
const currentEquipment = ref()
const currentMarkers = ref([])
const backGroundList = [
  {
    did:'4',
    src:require('@/assets/宠物医院前台.jpg'),
    markers:[{
      id: 'image',
      longitude: 0.3,
      latitude: 0,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往药房',
      data: {
        value:'12'
      }
    }]
  },
  {
    did:'5',
    src:require('@/assets/宠物医院档案室.jpg'),
    markers:[{
      id: 'image',
      longitude: 2,
      latitude: 0,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往影像室',
      data: {
        value:'9'
      }
    }]
  },
  {
    did:'6',
    src:require('@/assets/宠物医院诊室.jpg'),
    markers:[{
      id: 'image',
      longitude: -2,
      latitude: 0.11,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往免疫室',
      data: {
        value:'7'
      }
    }]
  },
  {
    did:'7',
    src:require('@/assets/宠物医院免疫室.jpg'),
    markers:[{
      id: 'image',
      longitude: -1.4,
      latitude: 0.11,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往化验室',
      data: {
        value:'8'
      }
    }]
  },
  {
    did:'8',
    src:require('@/assets/宠物医院化验室.jpg'),
    markers:[{
      id: 'image',
      longitude: 2,
      latitude: 0.11,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往档案室',
      data: {
        value:'5'
      }
    }]
  },{
    did:'9',
    src:require('@/assets/宠物医院影像室.jpg'),
    markers:[{
      id: 'image',
      longitude: 2.7,
      latitude: 0.11,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往专科检查室',
      data: {
        value:'10'
      }
    }]
  },
  {
    did:'10',
    src:require('@/assets/宠物医院专科检查室.jpg'),
    markers:[{
      id: 'image',
      longitude: 0.5,
      latitude: 0.11,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往药房',
      data: {
        value:'12'
      }
    }]
  },

  {
    did:'11',
    src:require('@/assets/宠物医院处置室.jpg'),
    markers:[{
      id: 'image',
      longitude: -3,
      latitude: 0.11,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往住院部',
      data: {
        value:'16'
      }
    }]
  },
  {
    did:'12',
    src:require('@/assets/宠物药房.jpg'),
    markers:[{
      id: 'image',
      longitude: 1.5,
      latitude: 0.2,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往病例剖检室',
      data: {
        value:'17'
      }
    }]
  },
  {
    did:'13',
    src:require('@/assets/宠物医院注射室.jpg'),
    markers:[{
      id: 'image',
      longitude: -2.7,
      latitude: 0.2,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往住院部',
      data: {
        value:'16'
      }
    }]
  },
  {
    did:'14',
    src:require('@/assets/宠物医院手术准备室.jpg'),
    markers:[{
      id: 'image',
      longitude: 3,
      latitude: 0.2,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往注射室',
      data: {
        value:'13'
      }
    }]
  },
  {
    did:'15',
    src:require('@/assets/宠物医院手术室.jpg'),
    markers:[{
      id: 'image',
      longitude: 1.7,
      latitude: 0.2,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往手术准备室',
      data: {
        value:'14'
      }
    }]
  },
  {
    did:'16',
    src:require('@/assets/宠物医院住院部.jpg'),
    markers:[{
      id: 'image',
      longitude: 0,
      latitude: 0,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往注射室',
      data: {
        value:'13'
      }
    },{
      id: 'image2',
      longitude: 1,
      latitude: 0,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往免疫室',
      data: {
        value:'7'
      }
    }]
  },
  {
    did:'17',
    src:require('@/assets/宠物医院病理剖检室.jpg'),
    markers:[{
      id: 'image',
      longitude: -0.5,
      latitude: -0.5,
      image: require('@/assets/arrow.png'),
      width: 75,
      height: 75,
      anchor: 'bottom center',
      zoomLvl: 100,
      tooltip: '前往手术室',
      data: {
        value:'15'
      }
    }]
  },
]
const currentDepartment = ref ()
const markersPlugin = ref ()
const prevDepartment = ref ('')
const nextDepartment = ref ('')
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
      {
          id: 3,
          title: prevDepartment.value,
          content: '<',
          onClick: () => {
            if(thisDid.value === '4')
            {
              router.afterEach(() => {
                location.reload();
              })
              router.replace({
                path:'/fullScreenView',
                query:{
                  did:'17'
                }
              })
            }
            else{
              console.log(thisDid.value)
              router.afterEach(() => {
                location.reload();
              })
              router.replace({
                path:'/fullScreenView',
                query:{
                  did:stringify(Number(thisDid.value)-1)
                }
              })
            }
          },
      },
      {
          id: 4,
          title: nextDepartment.value,
          content: '>',
          onClick: () => {
            if(thisDid.value === '17')
            {
              router.afterEach(() => {
                location.reload();
              })
              router.replace({
                path:'/fullScreenView',
                query:{
                  did:'4'
                }
              })
            }
            else{
              router.afterEach(() => {
                location.reload();
              })
              router.replace({
                path:'/fullScreenView',
                query:{
                  did:stringify(Number(thisDid.value)+1)
                }
              })
            }
          },
      },
      'markers',
      'markersList',
      'fullscreen',
   ],
   minFov:50,
   maxFov:80,
   defaultZoomLvl: 0.6,
   plugins: [
    [MarkersPlugin, {
      markers: currentMarkers.value
    }],
   ], // 标记点
   size: {
     width: '98vw',
     height: '98vh'
   }
 })
 markersPlugin.value = panoramaViewer.getPlugin(MarkersPlugin)
 readyEvents()
}

const readyEvents = function () {
  markersPlugin.value.on('select-marker', (e, marker) => {
    const value = marker.data.value
    router.afterEach(() => {
      location.reload();
    })
    router.replace({
      path:'/fullScreenView',
      query:{
        did:value
      }
    })
  })
}

const showEquipmentInfo = (equipment) => {
  currentEquipment.value = equipment
  equipmentInfoVisible.value = true
}
onMounted(() => {
  loadViewer()
  if(thisDid>4){
    getDepartmentByDid({did:stringify(Number(thisDid.value)-1)}).then(res =>{
      prevDepartment.value = res.data.dname
    })
  }
  else{
    getDepartmentByDid({did:17}).then(res =>{
      prevDepartment.value = res.data.dname
    })
  }
  if(thisDid<17){
    getDepartmentByDid({did:stringify(Number(thisDid.value)+1)}).then(res =>{
      nextDepartment.value = res.data.dname
    })
  }
  else{
    getDepartmentByDid({did:4}).then(res =>{
      nextDepartment.value = res.data.dname
    })
  }
})
const loadViewer = () => {
  getDepartmentByDid({did:thisDid.value}).then(res => {
    if(res.state === 200)
    {
      backGroundList.forEach(element => {
        if(thisDid.value === element.did)
        {
          currentDepartment.value = element.src
          currentMarkers.value = element.markers
          console.log("current:"+currentDepartment.value)
          console.log("currentMarker:"+currentMarkers.value)
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
        getEidByDid({did:thisDid.value}).then(res =>{
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
.psv-markers{
  z-index:9999;
}
</style>