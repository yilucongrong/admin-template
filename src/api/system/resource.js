import request from '@/utils/request'
//测试
export function selectlists (query) {//查询资源列表
    return request({
        url: '/endpoints',
        method: 'get',
        params: query
    })
}
export function creat (data) {//创建资源
    return request({
        url: '/endpoints',
        method: 'post',
        data
    })
}
export function selectlist (query) {//查询单个创建资源列表
    return request({
        url: '/endpoints/{endpointCode}',
        method: 'get',
        params: query
    })
}
export function deletelist (query) {//删除单个创建资源
    return request({
        url: '/endpoints/' + query,
        method: 'delete'
    })
}
export function updatalist (code, data) {//更新单个创建资源
    return request({
        url: '/endpoints/' + code,
        method: 'patch',
        data
    })
}






