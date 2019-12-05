import request from '@/utils/request'

export function queryRecords(query) {
    //查询
    return request({
        url: `/mes/equipmentType`,
        method: 'get',
        params: query
    })
}

export function addRecord(data) {
    //新增
    return request({
        url: `/mes/equipmentType`,
        method: 'post',
        data
    })
}

export function getRecord(EquipTypeCode) {
    //查询单个设备类型
    return request({
        url: `/mes/equipmentType/${EquipTypeCode}`,
        method: 'get'
    })
}

export function updataRecord(EquipTypeCode, data) {
    //修改
    return request({
        url: `/mes/equipmentType/${EquipTypeCode}`,
        method: 'patch',
        data
    })
}

export function deleteRecord(data) {
    //删除
    return request({
        url: `/mes/equipmentType`,
        method: 'delete',
        data
    })
}
