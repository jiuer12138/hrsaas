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

/**
 * 删除员工接口
 * ****/

export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** **
 *  新增员工的接口
 * **/
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 批量导入员工
 * @param {Object} data 要导入的员工信息
 * @returns promise
 */
export const importEmployeesAPI = (data) =>
  request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/** *
 *  读取用户详情的基础信息
 * **/
 export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}