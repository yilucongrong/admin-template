import request from '@/utils/request'

export function queryRecords(query) {
    //查询
    return request({
        url: `/mes/routing`,
        method: 'get',
        params: query
    })
}

export function addRecord(data) {
    //新增
    return request({
        url: `/mes/routing`,
        method: 'post',
        data
    })
}

export function getRecord(routeCode) {
    //查询单个工艺
    return request({
        url: `/mes/routing/${routeCode}`,
        method: 'get'
    })
}

export function updataRecord(routeCode, data) {
    //修改
    return request({
        url: `/mes/routing/${routeCode}`,
        method: 'patch',
        data
    })
}

export function deleteRecord(routeCode) {
    //删除
    return request({
        url: `/mes/routing/${routeCode}`,
        method: 'delete'
    })
}
