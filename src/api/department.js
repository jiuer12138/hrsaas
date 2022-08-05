import request from '@/utils/request'
/**
 * 请求部门列表
 * @returns promise
 */
export const getDeptsAPI = () =>
  request({
    url: '/company/department'
  })
