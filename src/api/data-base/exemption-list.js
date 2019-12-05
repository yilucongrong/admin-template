import request from '@/utils/request'

export function queryRecords(query) {
    //查询免检清单列表
    return request({
        url: '/iwms/uncheck',
        method: 'get',
        params: query
    })
}
export function addRecord(data1) {
    //新增明细

    return request({
        url: '/iwms/uncheck',
        method: 'post',
        data: data1
    })
}

export function addRecord1(data) {
    //新增主表
    return request({
        url: '/iwms/uncheck',
        method: 'post',
        data
    })
}
export function queryRecordsmx(query) {
    //查询免检清单明细列表
    return request({
        url: '/iwms/uncheck' + '/' + query.uncheckId + '/items',
        method: 'get',
        params: query
    })
}
export function updateRecord(uncheckId, data) {
    //编辑接口

    return request({
        url: '/iwms/uncheck' + '/' + uncheckId,
        method: 'patch',
        data
    })
}
export function deleteRecord(data) {
    //删除接口
    let sz = []
    sz.push(data)
    return request({
        url: '/iwms/uncheck',
        method: 'delete',
        data: sz
    })
}
export function deleteRecordmx(data) {
    //删除明细接口
    let sz = []
    sz.push(data)
    return request({
        url: '/iwms/uncheck' + '/' + '/items',
        method: 'delete',
        data: sz
    })
}

export function updateRecordcssz(data) {
    //参数设置接口

    return request({
        url: '/iwms/warehouse' + '/materiels' + '/' + '/emp',
        method: 'patch',
        data
    })
}
