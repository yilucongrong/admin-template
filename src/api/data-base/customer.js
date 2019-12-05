import request from '@/utils/request'

export function queryRecords(query) {
    return request({
        url: '/iwms/customers',
        method: 'get',
        params: query
    })
}

export function getRecord(supplierCode) {
    return request({
        url: '/iwms/customers' + '/' + supplierCode,
        method: 'get'
    })
}

export function addRecord(data) {
    return request({
        url: '/iwms/customers',
        method: 'post',
        data
    })
}

export function updateRecord(supplierCode, data) {
    return request({
        url: '/iwms/customers' + '/' + supplierCode,
        method: 'patch',
        data
    })
}

export function deleteRecord(supplierCode) {
    return request({
        url: '/iwms/customers' + '/' + supplierCode,
        method: 'delete'
    })
}
