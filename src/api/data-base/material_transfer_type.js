import request from '@/utils/request'

//查询仓库规则
export function queryRecords(query) {
    return request({
        url: '/iwms/warehouses/rules',
        method: 'get',
        params: query
    })
}

//创建仓库规则
export function createRecords(data) {
    return request({
        url: '/iwms/warehouses/rules',
        method: 'post',
        data
    })
}

//编辑仓库规则
export function updateRules(rowId, data) {
    return request({
        url: '/iwms/warehouses/rules/' + rowId,
        method: 'patch',
        data
    })
}

//删除单条仓库规则
export function deleteRules(wareRuleCode) {
    return request({
        url: '/iwms/warehouses/rules/' + wareRuleCode,
        method: 'delete'
    })
}

//查询参照数据更新
export function querySub1(wareRuleCode) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/trigger`,
        method: 'get'
    })
}

//查询单条参照数据更新
export function querySub1Row(wareRuleCode, updateObject) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/trigger/${updateObject}`,
        method: 'get'
    })
}

//新建参照数据更新
export function createSub1(wareRuleCode, data) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/trigger`,
        method: 'post',
        data
    })
}

//更新参照数据更新
export function updateSub1(wareRuleCode, updateObject, data) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/trigger/${updateObject}`,
        method: 'patch',
        data
    })
}

//删除参照数据更新
export function deleteSub1(wareRuleCode, updateObject) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/trigger/${updateObject}`,
        method: 'delete'
    })
}

//删除参照数据更新明细
export function deleteSub1Detail(wareRuleCode, updateObject, updateConfig) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/trigger/${updateObject}/detail/${updateConfig}`,
        method: 'delete'
    })
}

//查询仓库规则处理列表
export function querySubLeft(wareRuleCode, configType) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/handle/${configType}`,
        method: 'get'
    })
}

//创建仓库规则处理
export function createSubLeft(wareRuleCode, data, configType) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/handle/${configType}`,
        method: 'post',
        data
    })
}

//查询单个仓库规则处理
export function querySubLeftRow(wareRuleCode, rowId, configType) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/handle/${configType}/${rowId}`,
        method: 'get'
    })
}

//删除仓库规则处理
export function deleteSubLeft(wareRuleCode, rowId, configType) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/handle/${configType}/${rowId}`,
        method: 'delete'
    })
}

//更新仓库规则处理
export function updateSubLeft(wareRuleCode, rowId, data, configType) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/handle/${configType}/${rowId}`,
        method: 'patch',
        data
    })
}

//删除仓库规则处理明细
export function deleteSubLeftDetail(wareRuleCode, wareRuleHandleId, rowId) {
    return request({
        url: `/iwms/warehouses/rules/${wareRuleCode}/handle/${wareRuleHandleId}/details/${rowId}`,
        method: 'delete'
    })
}

//获取rowId
export function getRowId() {
    return request({
        url: `/iwms/warehouses/rules/referents?currentPage=1&pageSize=100`,
        method: 'get'
    })
}

//获取凭证/指示类型
export function getPIList(rowId) {
    return request({
        url: `/iwms/warehouses/rules/referents/${rowId}/items?rowId=${rowId}`,
        method: 'get'
    })
}

//获取参照数据来源
export function getAttrRules(query) {
    return request({
        url: '/iwms/warehouses/rules/referents',
        method: 'get',
        params: query
    })
}

export function getAttrRulesDetail(rowId) {
    return request({
        url: `/iwms/warehouses/rules/referents/${rowId}/items`,
        method: 'get'
    })
}

//拷贝移动类型
export function copyType(data) {
    return request({
        url: `/iwms/warehouses/rules/${data.oldWareRuleCode}/copy`,
        method: 'post',
        data
    })
}
