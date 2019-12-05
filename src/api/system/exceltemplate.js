import request from '@/utils/request'

export function queryRecords(query) {
    //查询主表
    return request({
        url: '/iwms/excels',
        method: 'get',
        params: query
    })
}

export function getRecorditems(query) {
    //查询明细
    return request({
        url: '/iwms/excels' + '/' + query.excelCode + '/items',
        method: 'get',
        params: query
    })
}

export function addRecorditems(excelCode, data) {
    //新增明细
    return request({
        url: '/iwms/excels' + '/' + excelCode + '/items',
        method: 'post',
        data
    })
}
export function addRecord(data) {
    //新增
    return request({
        url: '/iwms/excels',
        method: 'post',
        data
    })
}
export function deleteRecord(excelCode) {
    //删除
    return request({
        url: '/iwms/excels' + '/' + excelCode,
        method: 'delete'
    })
}
export function deleteRecorditems(excelCode, fieldCode) {
    //删除明细
    return request({
        url: '/iwms/excels' + '/' + excelCode + '/items' + '/' + fieldCode,
        method: 'delete'
    })
}
export function updateRecord(excelCode, data) {
    //编辑
    return request({
        url: '/iwms/excels' + '/' + excelCode,
        method: 'patch',
        data
    })
}
export function updateRecorditems(excelCode, fieldCode, data) {
    //编辑明细
    return request({
        url: '/iwms/excels' + '/' + excelCode + '/items' + '/' + fieldCode,
        method: 'patch',
        data
    })
}
