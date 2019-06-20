import request from '@/utils/request'

export function selectlists(query) {//查询组织列表
  return request({
    url: '/organizations',
    method: 'get',
    params: query
  })
}
export function creat(data) {//创建组织
  return request({
    url: '/organizations',
    method: 'post',
    data
  })
}
export function selectlist(query) {//查询单个组织列表
  return request({
    url: '/organizations/{organizationCode}',
    method: 'get',
    params: query
  })
}
export function deletelist(query) {//删除单个组织
  return request({
    url: '/organizations/'+query,
    method: 'delete'
  })
}
export function updatalist(code,data) {//更新单个组织
  return request({
    url: '/organizations'+ '/' + code,
    method: 'patch',
    data
  })
}
export function selecttree() {//查询组织树列表
  return request({
    url: '/organizations',
    method: 'get',
  })
}





