import request from '@/utils/request'

//查询条码规则列表
export function queryRecords(query) {
    return request({
        url: '/iwms/barcodes/rules',
        method: 'get',
        params: query
    })
}

//查询单个条码规则类型
export function getRulesPreps(ruleType) {
    return request({
        url: `/iwms/barcodes/rules/preps/${ruleType}`,
        method: 'get'
    })
}

//创建条码规则
export function addRules(data, ruleType) {
    return request({
        url: `/iwms/barcodes/rules/${ruleType}`,
        method: 'post',
        data
    })
}

//更新条码规则
export function updateRules(rowId, data, ruleType) {
    return request({
        url: `/iwms/barcodes/rules/${ruleType}/` + rowId,
        method: 'patch',
        data
    })
}

//删除条码规则
export function deleteRules(rowId, ruleType) {
    return request({
        url: `/iwms/barcodes/rules/${ruleType}/` + rowId,
        method: 'delete'
    })
}

//查询条码规则明细列表
export function getRowDetail(query) {
    return request({
        url: '/iwms/barcodes/rules/details',
        method: 'get',
        params: query
    })
}

//查询条码规则明细列表
export function getSelectedDetail(query) {
    return request({
        url: `/iwms/barcodes/rules/details/${query.ruleType}/${query.arrivalCompany}`,
        method: 'get'
    })
}

//删除条码规则明细
export function deleteDetail(rowId, rulePrepCode, ruleType) {
    return request({
        url: `/iwms/barcodes/rules/${ruleType}/${rowId}/details/${rulePrepCode}`,
        method: 'delete'
    })
}
