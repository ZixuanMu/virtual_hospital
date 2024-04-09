// 引入axios封装
import axios from 'axios'
import { message } from 'ant-design-vue'

// 创建axios实例
const request = axios.create({
    baseURL: '/store', // url = base url + request url
    timeout: 5000 // 5s超时
})

// 请求拦截器 一般写法模式
request.interceptors.request.use(
    (response) => {
        return response // 请求成功则返回response
    },
    (error) => { // 请求失败则显示错误状态
        message.error(error.message)
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        message.error(error.message)
        return Promise.reject(error)
    }
) 

// 导出request
export default request 
