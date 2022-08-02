import request from '@/utils/request'

/**
 * 登录请求
 * @param {Object} data mobile password
 * @returns promise
 */
export const login = (data) =>
  request({
    method: 'POST',
    url: '/sys/login',
    data
  })

/**
 * 获取用户信息
 * @returns promise
 */
export const getUserInfoAPI = () =>
  request({
    method: 'POST',
    url: '/sys/profile'
  })

  /**
   * 根据用户id获取用户详细信息
   * @param {String} id 用户
   * @returns promise
   */
export const getUserDetailAPI = (id) =>
  request({
    url: '/sys/user/' + id
  })
