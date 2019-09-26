import request from '@/utils/request'

export function selectlists (query) {//查询
    return request({
        url: '/dataAccess',
        method: 'get',
        params: query
    })
}
export function addRecord (data) {//创建
    return request({
        url: '/dataAccess',
        method: 'post',
        data
    })
}
export function updateRecord (data) {//更新
    return request({
        url: '/dataAccess',
        method: 'patch',
        data
    })
}

export function deleteRecord (data1) { //删除
    return request({
        url: '/dataAccess',
        method: 'delete',
        data: data1
    })
}







