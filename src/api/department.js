import request from '@/utils/request'
/**
 * 请求部门列表
 * @returns promise
 */
export const getDeptsAPI = () =>
  request({
    url: '/company/department'
  })

/**
 * 删除部门
 * @param {*} id 要删除的部门id
 * @returns promise
 */
export const delDeptsAPI = (id) =>
  request({
    url: '/company/department/' + id,
    method: 'DELETE'
  })
