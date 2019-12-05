import request from '@/utils/request'

export function queryRecords(query) {
    return request({
        url: '/iwms/dicts',
        method: 'get',
        params: query
    })
}

export function getRecord(dcitCode) {
    return request({
        url: '/iwms/dicts' + '/' + dcitCode,
        method: 'get'
    })
}

export function addRecord(data) {
    return request({
        url: '/iwms/dicts',
        method: 'post',
        data
    })
}

export function updateRecord(supplierCode, data) {
    return request({
        url: '/iwms/dicts' + '/' + supplierCode,
        method: 'patch',
        data
    })
}

export function deleteRecord(supplierCode) {
    return request({
        url: '/iwms/dicts' + '/' + supplierCode,
        method: 'delete'
    })
}
