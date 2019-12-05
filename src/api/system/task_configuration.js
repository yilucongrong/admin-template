import request from '@/utils/request'

export function queryRecords(query) {
    //查询
    return request({
        url: '/ding/tasks' + '/list',
        method: 'get',
        params: query
    })
}
export function queryRecordsLog(query) {
    //查询日志
    return request({
        url: '/ding/taskLog' + '/list',
        method: 'get',
        params: query
    })
}
export function addRecord(data) {
    //新增
    return request({
        url: '/ding/tasks' + '/create',
        method: 'post',
        data
    })
}
export function updateRecord(data) {
    //编辑
    return request({
        url: '/ding/tasks' + '/update',
        method: 'post',
        data
    })
}
export function deleteRecord(rowId, jobGroup, jobName) {
    //删除
    return request({
        url: '/ding/tasks' + '/' + rowId + '/' + jobGroup + '/' + jobName,
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
