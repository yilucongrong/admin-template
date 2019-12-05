import request from '@/utils/request'

export function queryRecords(query) {
    return request({
        url: '/iwms/batchs' + '/rules' + '/' + query.warehouseCode,
        method: 'get',
        params: query
    })
}
export function queryRecordsbz(query) {
    //新增查询
    console.log(query)
    return request({
        url: '/iwms/batchs' + '/' + '/rules' + '/' + '/preps',
        method: 'get',
        params: query
    })
}

export function queryRecordsbz1(query) {
    //编辑查询
    return request({
        url: '/iwms/batchs' + '/' + '/rules' + '/' + query + '/mute',
        method: 'get',
        params: query
    })
}

export function addRecord(code, data) {
    return request({
        url: '/iwms/batchs' + '/' + '/rules' + '/' + code,
        method: 'post',
        data
    })
}

export function updateRecord(rowId, data) {
    return request({
        url: '/iwms/batchs' + '/' + '/rules' + '/' + rowId,
        method: 'patch',
        data
    })
}

export function deleteRecord(rowId) {
    return request({
        url: '/iwms/batchs' + '/' + '/rules' + '/' + rowId,
        method: 'delete'
    })
}

export function deleteRecordfl(batchRuleId, objectCode) {
    return request({
        url:
            '/iwms/batchs' +
            '/rules' +
            '/' +
            batchRuleId +
            '/handle' +
            '/' +
            objectCode,
        method: 'delete'
    })
}
export function queryRecordsbfl(query) {
    //编辑查询
    return request({
        url: '/iwms/batchs' + '/' + '/rules' + '/' + query + '/handle',
        method: 'get',
        params: query
    })
}

export function addRecordpc(batchRuleId, data) {
    return request({
        url: '/iwms/batchs' + '/' + '/rules' + '/' + batchRuleId + '/handle',
        method: 'post',
        data
    })
}
export function queryItems(batchRuleId) {
    return request({
        url: '/iwms/batchs' + '/' + '/rules' + '/' + batchRuleId + '/handle',
        method: 'get'
    })
}
export function getRecord(colorCode) {
    return request({
        url: '/iwms/colors' + '/' + colorCode,
        method: 'get'
    })
}
