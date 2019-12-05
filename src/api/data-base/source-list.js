import request from '@/utils/request'

export function queryRecords(query) {
    return request({
        url: `/iwms/purchase-materiels`,
        method: 'get',
        params: query
    })
}

export function getRecord(rowId) {
    return request({
        url: `/iwms/purchase-materiels/${rowId}`,
        method: 'get'
    })
}

export function addRecord(data) {
    return request({
        url: `/iwms/purchase-materiels`,
        method: 'post',
        data
    })
}

export function updateRecord(rowId, data) {
    return request({
        url: `/iwms/purchase-materiels/${rowId}`,
        method: 'patch',
        data
    })
}

export function deleteRecord(rowId) {
    return request({
        url: `/iwms/purchase-materiels/${rowId}`,
        method: 'delete'
    })
}
