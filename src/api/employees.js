import request from '@/utils/request'

/**
 * 请求简单员工信息
 * @returns promise
 */
export const getEmployeesListAPI = () =>
  request({
    url: '/sys/user/simple'
  })

  /**
   * 获取员工列表
   * @param {Object} params  {page,size}
   * @returns 
   */
export const getEmployeesInfoAPI = (params) =>
  request({
    url: '/sys/user',
    params
  })
