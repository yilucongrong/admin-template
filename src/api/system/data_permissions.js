import request from '@/utils/request'
import scc from '@/utils/scc'

export function selectlists (query) {
    //查询用户列表
    return request({
        url: '/users',
        method: 'get',
        params: query
    })
}

export function queryqx (query) {
    //查询权限类别下拉框
    return request({
        url: '/dataAccess' + '/' + query,
        method: 'get'
    })
}
export function queryzy (endpointCode) {
    //查询单个资源
    return request({
        url: '/endpoints' + '/' + endpointCode,
        method: 'get'
    })
}
export function querylb (userName, accessTypeCode, metaDataType) {
    //查询授权列表
    return request({
        url: `/users/${userName}/datas/accessTypeCode=${accessTypeCode}&metaDataType=${metaDataType}`,
        method: 'get'
    })
}

export function queryurlkg (query) {
    //查询列表（调2001下的）
    return request({
        url: `${query.url}`,
        method: 'get',
        params: query.conditions
    })
}
export function queryurliwms (query) {
    //查询列表（调2002下的）
    return fetch({
        url: `${query.url}`,
        method: 'get',
        params: query.conditions
    })
}
export function queryurlscc (query) {
    //查询列表（调2003下的）
    return scc({
        url: `${query.url}`,
        method: 'get',
        params: query.conditions
    })
}
export function confirm (userName, data) {
    //数据授权
    return request({
        url: '/users' + '/' + userName + '/datas',
        method: 'post',
        data
    })
}
