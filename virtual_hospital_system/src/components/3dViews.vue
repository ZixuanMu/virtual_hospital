<template>
3dviews 11111
<div id="viewer"></div>
<div class="toggle_icon">
    <i class="el-icon-arrow-left" @click="toggleImg('reduce')"></i>
    <i class="el-icon-arrow-left" @click="toggleImg('add')"></i>
</div>
</template>

<script>
import { ref,onMounted, onBeforeMount } from 'vue'
import { Viewer } from 'photo-sphere-viewer'
import * as Marker from 'photo-sphere-viewer/dist/plugins/markers' // 引入插件
import 'photo-sphere-viewer/dist/plugins/markers.css' // 引入标注样式
export default {
    setup(){
        let viewer = '';
        const imgurl = [
            require('../assets/R-C.jpg'),
        ];
        let imgIndex = 0;
        // 全景视图
        let panoramaViewer = null
        // 注标列表
        let markersPlugin = null
        const markerList = ref([])
        const initViewer = async function () {
            panoramaViewer = new Viewer ({
                container:document.querySelector('#viewer'),//容器
                panorama:imgurl[imgIndex],//图片地址
                navbar: [
                    'autorotate',
                    'zoom',
                    'caption',
                    'fullscreen'
                ],
                plugins: [
                    [Marker.MarkersPlugin]
                ],//标记点
                size:{
                    width: '100%',
                    height: '100%',
                },
            });
            markersPlugin = panoramaViewer.getPlugin(Marker.MarkersPlugin)
            readyEvents()
        }

        onBeforeMount(() => {
            initViewer()
        })
        const toggleImg = (e) => {
            if(e=='add'){
            if(imgIndex < imgurl.length-1){
                imgIndex++
            }
            }else{
                imgIndex?imgIndex--:imgIndex;
            }
            //console.log(this.imgIndex)
            viewer.destroy();
            initViewer();
        };
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

        return {
            toggleImg
        };
    }
    
}
</script>

<style>
</style>./3dViews.vue