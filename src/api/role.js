import request from '@/utils/request'

/**
 * 获取所有角色列表
 * @param {Object} params 页码和每页条数
 * @returns promise
 */
export const getRolesAPI = (params) =>
  request({
    url: '/sys/role',
    params
  })

/**
 *添加角色
 * @param {Object} params 页码和每页条数
 * @returns promise
 */
export const addRolesAPI = (data) =>
  request({
    url: '/sys/role',
    method: 'POST',
    data
  })
// 获取权限详情
export function getPermissionDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
