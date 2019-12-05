import request from '@/utils/request'

export function queryRecords(query) {
    return request({
        url: '/iwms/work-centers',
        method: 'get',
        params: query
    })
}

export function getRecord(colorCode) {
    return request({
        url: '/iwms/work-centers' + '/' + colorCode,
        method: 'get'
    })
}

export function addRecord(data) {
    return request({
        url: '/iwms/work-centers',
        method: 'post',
        data
    })
}

export function updateRecord(colorCode, data) {
    return request({
        url: '/iwms/work-centers' + '/' + colorCode,
        method: 'patch',
        data
    })
}

export function deleteRecord(colorCode) {
    return request({
        url: '/iwms/work-centers' + '/' + colorCode,
        method: 'delete'
    })
}

export function queryList(workCenterCode, query) {
    //查询工位列表

    return request({
        url: '/iwms/work-centers' + '/' + workCenterCode + '/stations/',
        method: 'get',
        params: query
    })
}

export function creatJob(workCenterCode, data) {
    //新增工位
    return request({
        url: '/iwms/work-centers' + '/' + workCenterCode + '/stations/',
        method: 'post',
        data
    })
}

export function queryJob(workCenterCode, stationCode) {
    //查询单个工位
    return request({
        url:
            '/iwms/work-centers' +
            '/' +
            workCenterCode +
            '/stations/' +
            stationCode,
        method: 'get'
    })
}

export function deleteJob(workCenterCode, stationCode) {
    //删除工位
    return request({
        url:
            '/iwms/work-centers' +
            '/' +
            workCenterCode +
            '/stations/' +
            stationCode,
        method: 'delete'
    })
}

export function updateJob(workCenterCode, stationCode, data) {
    //更新工位
    return request({
        url:
            '/iwms/work-centers' +
            '/' +
            workCenterCode +
            '/stations/' +
            stationCode,
        method: 'patch',
        data
    })
}
