import request from '@/utils/request'

export function queryRecords(query) {
    //查询
    return request({
        url: `/mes/process/steps`,
        method: 'get',
        params: query
    })
}

export function addRecord(data) {
    //新增
    return request({
        url: `/mes/process/steps`,
        method: 'post',
        data
    })
}

export function getRecord(stepCode) {
    //查询单个设备类型
    return request({
        url: `/mes/process/steps/${stepCode}`,
        method: 'get'
    })
}

export function updataRecord(stepCode, data) {
    //修改
    return request({
        url: `/mes/process/steps/${stepCode}`,
        method: 'patch',
        data
    })
}

export function deleteRecord(data) {
    //删除
    return request({
        url: `/mes/process/steps`,
        method: 'delete',
        data
    })
}
