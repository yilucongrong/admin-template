import request from '@/utils/request'

//查询参照数据列表
export function queryRecords(query) {
    return request({
        url: '/iwms/warehouses/rules/referents',
        method: 'get',
        params: query
    })
}

//查询参照数据明细列表
export function queryRecordsDetail(query) {
    return request({
        url: `/iwms/warehouses/rules/referents/${query.rowId}/items`,
        method: 'get',
        params: query
    })
}

//创建参照数据或者参照数据明细
export function addMainRecords(data) {
    return request({
        url: `/iwms/warehouses/rules/referents`,
        method: 'post',
        data
    })
}

//删除参照数据
export function deleteMainRecords(rowId, data) {
    console.log(rowId, data)
    if (!data) {
        console.log(1111111)
        return request({
            url: `/iwms/warehouses/rules/referents/${rowId}`,
            method: 'delete'
        })
    } else {
        console.log(222222)
        return request({
            url: `/iwms/warehouses/rules/referents/${rowId}`,
            method: 'delete',
            data
        })
    }
}

//查询批次规则列表
export function queryBatchRecords(query) {
    return request({
        url: '/iwms/batchs/rules/preps',
        method: 'get',
        params: query
    })
}

//创建批次数据
export function addBatchRecords(data) {
    return request({
        url: `/iwms/batchs/rules/preps`,
        method: 'post',
        data
    })
}

//删除批次数据
export function deleteBatchRecords(rulePrepCode) {
    return request({
        url: `/iwms/batchs/rules/preps/${rulePrepCode}`,
        method: 'delete'
    })
}

//查询条码数据列表
export function queryBarRecords(query) {
    return request({
        url: '/iwms/barcodes/rules/preps',
        method: 'get',
        params: query
    })
}

//查询条码数据明细列表
export function queryBarRecordsDetail(ruleType, query) {
    return request({
        url: `/iwms/barcodes/rules/preps/${ruleType}`,
        method: 'get',
        params: query
    })
}

//创建条码明细
export function addBarRecords(ruleType, data) {
    return request({
        url: `/iwms/barcodes/rules/preps/${ruleType}`,
        method: 'post',
        data
    })
}

//删除条码明细
export function deleteBarRecords(ruleType, rulePrepCode) {
    return request({
        url: `/iwms/barcodes/rules/preps/${ruleType}/details/${rulePrepCode}`,
        method: 'delete'
    })
}

//查询规则属性定义中采购分类数据字典
export function getPurchaseDict(dictCode) {
    return request({
        url: `/iwms/dicts/${dictCode}`,
        method: 'get'
    })
}

//查询采购分类对照库存类型列表
export function queryPurchaseRecords(query) {
    return request({
        url: '/iwms/warehouses/rules/corresponds',
        method: 'get',
        params: query
    })
}

//创建采购分类对照库存类型列表
export function addPurchaseRecords(data) {
    return request({
        url: `/iwms/warehouses/rules/corresponds`,
        method: 'post',
        data
    })
}

//删除采购分类对照库存类型列表
export function deletePurchaseRecords(purchaseClassKey) {
    return request({
        url: `/iwms/warehouses/rules/corresponds/${purchaseClassKey}`,
        method: 'delete'
    })
}
