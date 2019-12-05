import request from '@/utils/request'

export function queryRecords(query) {
    //查询
    return request({
        url: `/mes/equipmentLedger`,
        method: 'get',
        params: query
    })
}

export function addRecord(data) {
    //新增
    return request({
        url: `/mes/equipmentLedger`,
        method: 'post',
        data
    })
}

export function updataRecord(equipmentCode, data) {
    //修改
    return request({
        url: `/mes/equipmentLedger/${equipmentCode}`,
        method: 'patch',
        data
    })
}

export function deleteRecord(data) {
    //删除
    return request({
        url: `/mes/equipmentLedger`,
        method: 'delete',
        data
    })
}

export function searchRecords(query) {
    //查询工作中心列表
    return request({
        url: `/mes/work-centers`,
        method: 'get',
        params: query
    })
}

export function querySuppierRecords(query) {
    //查询设备厂商
    return request({
        url: '/mes/suppliers',
        method: 'get',
        params: query
    })
}

export function queryUserRecords(query) {
    //查询责任人
    return request({
        url: '/keyguard/users',
        method: 'get',
        params: query
    })
}
