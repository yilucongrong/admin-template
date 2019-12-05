import request from '@/utils/request'

export function queryRecords(query) {
    return request({
        url: `/iwms/qc/config`,
        method: 'get',
        params: query
    })
}

export function addRecord(data) {
    return request({
        url: `/iwms/qc/config`,
        method: 'post',
        data
    })
}

export function updateRecord(data) {
    return request({
        url: `/iwms/qc/config`,
        method: 'patch',
        data
    })
}

export function deleteRecord(data) {
    return request({
        url: `/iwms/qc/config`,
        method: 'delete',
        data
    })
}
