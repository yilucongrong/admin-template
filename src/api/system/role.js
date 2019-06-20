
import request from '@/utils/request'

export function selectrole(query) {//查询角色列表
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}
export function queryRecords(query) {
  return request({
    url: '/roles',
    method: 'get',
    params: query
  })
}

export function addRecord(data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  })
}

export function getRecord(roleCode) {
  return request({
    url: '/roles' + '/' + roleCode,
    method: 'get'
  })
}

export function roleToUser(data) {//查询角色关联的所有用户
  return request({
    url: '/roles/'+data.roleCode+'/users',
    method: 'get',
    params:data
  })
}
export function authorizationRecord(data) {
  return request({
    url: '/users',
    method: 'get',
    params:data

  })
}
export function selectRecord() {
  return request({
    url: '/catalogs',
    method: 'get'
  })
}

export function updateRecord(colorCode, data) {
  return request({
    url: '/roles' + '/' + colorCode,
    method: 'patch',
    data
  })
}

export function deleteRecord(colorCode) {
  return request({
    url: '/roles' + '/' + colorCode,
    method: 'delete'
  })
}

export function deleteRecord1(roleCode,userName) {
  return request({
    url: '/roles/'+roleCode+'/users/'+userName,
    method: 'delete'
  })
}

export function addMenu(roleCode,querys){///v1/roles/{roleCode}更新角色或授权菜单
  return request({
    url: '/roles/'+roleCode,
    method: 'patch',
    data:querys
  })
}
export function deleteUser(userName){//删除角色下的用户
  return request({
    url: '/users/'+userName,
    method: 'delete',
  })
}
