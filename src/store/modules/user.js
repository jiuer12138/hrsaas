import { getUserDetailAPI, getUserInfoAPI, login } from '@/api'
import { resetRouter } from '@/router'
import { setTokenTime } from '@/utils/auth'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getToken({ commit }, payload) {
      const res = await login(payload)
      commit('setToken', res)
      setTokenTime()
    },
    async getUserInfo({ commit }) {
      const userBaseInfo = await getUserInfoAPI()
      const userInfo = await getUserDetailAPI(userBaseInfo.userId)
      // console.log(res)
      commit('setUserInfo', { ...userBaseInfo, ...userInfo })
      return userBaseInfo
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setUserInfo', {})
      resetRouter()
      commit('permission/setRoutes', [], { root: true })
    }
  },
  getters: {}
}
