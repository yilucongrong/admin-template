import request from '@/utils/request'

export function queryRecords(query) {
    //查询
    return request({
        url: `/ding/interfaceMonitoring/list`,
        method: 'get',
        params: query
    })
}
export function updateRecord(transactionNumber) {
    //同步接口
    return request({
        url: `/ding/interfaceMonitoring/syncInterface/${transactionNumber}`,
        method: 'patch'
    })
}
export function updatemonitor(transactionNumber) {
    //发送或更新接口
    return request({
        url: `/ding/interfaceMonitoring/sendOrUpdate/${transactionNumber}`,
        method: 'patch'
    })
}
export function queryRecorddata(query) {
    //查询交易数据
    return request({
        url: `/ding/interfaceMonitoring/getTransationRecord`,
        method: 'get',
        params: query
    })
}
export function queryRecordlog(transactionNumber) {
    //查询交易日志
    return request({
        url: `/ding/interfaceMonitoring/getTransationData/${transactionNumber}`,
        method: 'get'
    })
}
export function addRecord(data) {
    //新增
    return request({
        url: '/ding/interfaceDefinition' + '/create',
        method: 'post',
        data
    })
}
export function addRecordMQ(data) {
    //MQ配置
    return request({
        url: '/ding/interfaceDefinition' + '/configMQ',
        method: 'post',
        data
    })
}
export function addRecordFTP(data) {
    //MQ配置
    return request({
        url: '/ding/interfaceDefinition' + '/configFTP',
        method: 'post',
        data
    })
}
export function addRecordRFC(data) {
    //RFC配置
    return request({
        url: '/ding/interfaceDefinition' + '/configRFC',
        method: 'post',
        data
    })
}
// export function updateRecord(data) {//编辑
// return ding({
//     url: '/interfaceDefinition'+'/update',
//     method: 'post',
//     data
// })
// }
export function deleteRecord(rowId) {
    //删除
    return request({
        url: '/ding/interfaceDefinition' + '/' + rowId,
        method: 'delete'
    })
}
export function suspendRecord(data) {
    //挂起激活
    return request({
        url: '/ding/tasks' + '/changeJob',
        method: 'post',
        data
    })
}
