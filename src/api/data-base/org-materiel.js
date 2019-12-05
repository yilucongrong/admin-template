import request from '@/utils/request'

export function queryRecords(query) {
    return request({
        url: '/iwms/org-materiels',
        method: 'get',
        params: query
    })
}

export function getRecord(orgCode, materielCode) {
    return request({
        url: '/iwms/org-materiels' + '/' + orgCode + '/' + materielCode,
        method: 'get'
    })
}

export function addRecord(data) {
    return request({
        url: '/iwms/org-materiels',
        method: 'post',
        data
    })
}

export function updateRecord(orgCode, materielCode, data) {
    return request({
        url: '/iwms/org-materiels' + '/' + orgCode + '/' + materielCode,
        method: 'patch',
        data
    })
}

export function deleteRecord(orgCode, materielCode) {
    return request({
        url: '/iwms/org-materiels' + '/' + orgCode + '/' + materielCode,
        method: 'delete'
    })
}
