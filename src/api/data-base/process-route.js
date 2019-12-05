import request from '@/utils/request'

export function queryRecords(query) {
    //查询
    return request({
        url: `/mes/routRelationProcess`,
        method: 'get',
        params: query
    })
}

export function addRecord(routeCode) {
    //新增
    return request({
        url: `/mes/routRelationProcess/${routeCode}`,
        method: 'post'
    })
}

export function deleteRecord(routeCode) {
    //删除
    return request({
        url: `/mes/routRelationProcess/${routeCode}`,
        method: 'delete'
    })
}
