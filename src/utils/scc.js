import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

axios.defaults.withCredentials = true //  携带cookie

// 创建axios实例
const service = axios.create({
    baseURL: process.env.SCC_BASE_API_V1, // api的base_url
    // baseURL: process.env.KEYGUARD_BASE_API_V1, // api的base_url
    timeout: 300000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        // Do something before request is sent

        config.headers['X-Auth-Token'] = getToken()
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        return response.data
    },
    error => {
        console.log(error) // for debug
        let errDetil = ''
        if (error.response.data.violations) {
            for (let i = 0; i < error.response.data.violations.length; i++) {
                errDetil += ',' + error.response.data.violations[i].message
            }
        }
        if (error.response) {
            switch (error.response.status) {
                // 404 不弹窗
                case 404:
                    error.message = ''
                    break
                default:
                    error.message = error.response.data.message
            }
            if (error.message) {
                Message({
                    message: error.response.data.message + errDetil,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        }
        return Promise.reject(error)
    }
)

export default service
