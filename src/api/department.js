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

  /**
   * 新增部门
   * @param {Object} data 新增的部门信息
   * @returns promise
   */
export const AddDeptsAPI = (data) =>
  request({
    url: '/company/department/',
    method: 'POST',
    data
  })
