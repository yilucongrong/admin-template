import request from '@/utils/request'

export function queryRecords(query) {
    //查询仓库物料
    return request({
        url: '/iwms/warehouse/materiels',
        method: 'get',
        params: query
    })
}
export function addRecord(data1) {
    //新增
    let sz = []
    sz.push(data1)
    return request({
        url: '/iwms/warehouse' + '/materiels',
        method: 'post',
        data: sz
    })
}

export function addRecord1(data) {
    //新增物料
    return request({
        url: '/iwms/warehouse/materiels',
        method: 'post',
        data
    })
}

export function deleteRecord(rowId) {
    //删除接口
    return request({
        url: '/iwms/warehouse' + '/materiels' + '/' + rowId,
        method: 'delete'
    })
}

export function updateRecord(rowId, data) {
    //编辑接口

    return request({
        url: '/iwms/warehouse' + '/materiels' + '/' + rowId,
        method: 'patch',
        data
    })
}
export function updateRecordcssz(data) {
    //参数设置接口

    return request({
        url: '/iwms/warehouse' + '/materiels' + '/emp',
        method: 'patch',
        data
    })
}
