import request from '@/utils/request'

/**
 * 请求简单员工信息
 * @returns promise
 */
export const getEmployeesListAPI = () =>
  request({
    url: '/sys/user/simple'
  })
