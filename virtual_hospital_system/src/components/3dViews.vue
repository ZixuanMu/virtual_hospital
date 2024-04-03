<template>
3dviews 11111
<div id="viewer" style="width: 80%;height: 80%;"></div>
</template>

<script>
import { ref,onMounted, onBeforeMount } from 'vue'
import { Viewer } from 'photo-sphere-viewer'
import * as Marker from 'photo-sphere-viewer/dist/plugins/markers' // 引入插件
import 'photo-sphere-viewer/dist/plugins/markers.css' // 引入标注样式
export default {
  setup() {
    // 全景视图
    let panoramaViewer = null
    // 注标列表
    const markerList = ref([])
    let markersPlugin = null
    const imgurl = [
        require('../assets/R-C.jpg'),
    ]
    let imgIndex = 0;
    // 全景图初始化
    const initViewer = async function () {
    panoramaViewer = new Viewer({
        container: document.querySelector('#viewer'),
        panorama: imgurl[imgIndex], // 全景图片地址
        navbar: [
        // 'autorotate',
        // 'zoom',
        // 'move',
        // 'caption',
        // 'fullscreen'
        ],
        // 标记点
        plugins: [
        [Marker.MarkersPlugin]
        ],
        size: {
        width: '80%',
        height: '80%'
        }
    })
    markersPlugin = panoramaViewer.getPlugin(Marker.MarkersPlugin)
    readyEvents()
    }

    onMounted(() => {
    initViewer()
    })

    // 全景图加载完毕
    const readyEvents = function () {
    // 加载完毕
    panoramaViewer.once('ready', () => {
        // 初始化标注坐标
        initMarkers()
    })
    // 全景图点击事件
    panoramaViewer.on('click', (e, data) => {
        // console.log(`${data.rightclick ? 'right ' : ''}clicked at longitude: ${data.longitude} latitude: ${data.latitude}`)
    })
    // 选中标注事件
    markersPlugin.on('select-marker', (e, marker) => {
        // console.log('选中标注事件')
    })
    }

    // 初始化标注坐标
    const initMarkers = async function () {
    markersPlugin.clearMarkers()
    markerList.value.forEach(markerItem => {
        const { latitude, longitude, markerId, title, style } = markerItem
        markersPlugin.addMarker({
        longitude: longitude,
        latitude: latitude,
        width: 20,
        height: 20,
        id: markerId,
        data: markerItem
        })
    })
    }
  }
}
</script>

<style>
</style>./3dViews.vue