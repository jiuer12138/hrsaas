import router from '@/router'
import store from '@/store'
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  if (token) {
    //调用获取用户信息请求
    if (!store.state.user.userInfo.userId) {
      await store.dispatch('user/getUserInfo')
    }
    //1.登录
    //是否进入登录页
    //1.1是 跳到首页
    //1.2不是 直接进入
    to.path === '/login' ? next('/') : next()
  } else {
    //2.未登录
    //访问的是否在白名单（未登录也能访问的页面）
    //2.1在白名单放行
    //2.2不在白名单跳到登录页
    whiteList.includes(to.path) ? next() : next('/login')
  }
})
