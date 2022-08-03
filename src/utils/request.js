import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getTokenTime } from './auth'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
//封装判断token过期的方法
const isTimeout = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  const timeout = 2 * 60 * 60 * 1000
  return currentTime - tokenTime > timeout
}

// 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  if (!store.state.user.token) return config
  //如果有token 判断token是否过期

  if (isTimeout()) {
    await store.dispatch('user/logout')
    router.push('/login')
    return Promise.reject(new Error('登录过期'))
  } else {
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async (error) => {
    console.dir(error)
    if (error?.response?.status === 401) {
      await store.dispatch('user/logout')
      router.push('/login')
      Message.error(error.response.data.message)
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
