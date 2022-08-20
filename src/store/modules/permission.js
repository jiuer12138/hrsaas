import router, { asyncRoutes, constantRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    routes: [] //我们自己维护的路由规则，所有路由规则（静态路由+筛选后的动态路由）
  },
  mutations: {
    setRoutes(state, payload) {
      state.routes = [...constantRoutes, ...payload]
    }
  },
  actions: {
    filterRoutes({ commit }, payload) {
      const routes = asyncRoutes.filter((item) =>
        payload.menus.includes(item.meta.id)
      )
      commit('setRoutes', routes)
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  }
}
