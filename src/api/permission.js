import request from '@/utils/request'
export function getPermissionList() {
  return request({
    url: '/sys/permission'
  })
}
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}
