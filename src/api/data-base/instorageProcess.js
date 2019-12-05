// 库内加工BOM api
import request from '@/utils/request'

// 库内加工BOM创建
export function createRecords(data) {
    return request({
        url: '/iwms/stores/boms',
        method: 'post',
        data
    })
}

// 库内加工BOM批量删除
export function deleteRecords(bomList) {
    return request({
        url: `/iwms/stores/boms`,
        method: 'delete',
        data: bomList
    })
}

//库内加工BOM批量发布
export function publishRecords(bomList) {
    return request({
        url: `/iwms/stores/boms`,
        method: 'patch',
        data: bomList
    })
}

//库内加工BOM信息查询
export function queryRecords(orgCode, bomType, query) {
    return request({
        url: `/iwms/stores/boms/${orgCode}/${bomType}`,
        method: 'get',
        params: query
    })
}

//库内加工BOM明细查询
export function queryRecordsDetail(versions, query) {
    return request({
        url: `/iwms/stores/boms/${versions}/detail`,
        method: 'get',
        params: query
    })
}

//库内加工BOM更新
export function updateRecords(data) {
    return request({
        url: `/iwms/stores/boms/${data.versions}`,
        method: 'patch',
        data
    })
}
