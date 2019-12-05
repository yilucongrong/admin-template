import request from '@/utils/request'

export function queryRecords(query) {
    return request({
        url: '/iwms/colors',
        method: 'get',
        params: query
    })
}

export function getRecord(colorCode) {
    return request({
        url: '/iwms/colors' + '/' + colorCode,
        method: 'get'
    })
}

export function addRecord(data) {
    return request({
        url: '/iwms/colors',
        method: 'post',
        data
    })
}

export function updateRecord(colorCode, data) {
    return request({
        url: '/iwms/colors' + '/' + colorCode,
        method: 'patch',
        data
    })
}

export function deleteRecord(colorCode) {
    return request({
        url: '/iwms/colors' + '/' + colorCode,
        method: 'delete'
    })
}
