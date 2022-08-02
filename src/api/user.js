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
