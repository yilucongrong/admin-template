import request from '@/utils/request'

export function selectlists(query) {//查询员工列表
    return request({
        url: '/keyguard/employees',
        method: 'get',
        params: query
    })
}
export function creat(data) {//创建组织
    return request({
        url: '/keyguard/employees',
        method: 'post',
        data
    })
}
export function selectlist(query) {//查询单个组织列表
    return request({
        url: '/keyguard/employees/{employeeCode}',
        method: 'get',
        params: query
    })
}
export function deletelist(query) {//删除单个组织
    return request({
        url: '/keyguard/employees/' + query,
        method: 'delete'
    })
}
export function updatalist(code, data) {//更新单个组织
    return request({
        url: '/keyguard/employees/' + code,
        method: 'patch',
        data
    })
}
export function adduser(code, data) {//新增员工关联的用户
    return request({
        url: '/keyguard/employees/' + code + '/user',
        method: 'post',
        data
    })
}
export function selectuser(code) {//查询关联的员工记录
    return request({
        url: '/keyguard/employees/' + code + '/users',
        method: 'get',
    })
}
export function deleteuser(code, name) {//删除关联的员工记录
    return request({
        url: '/keyguard/employees/' + code + '/users?userNames=' + name,
        method: 'delete',
    })
}






