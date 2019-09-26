import request from '@/utils/request'

export function selectDatas (query) {//查询菜单列表
    return request({
        url: '/keyguard/catalogs',
        method: 'get',
        params: query
    })
}
export function addData (data) {//创建服务
    return request({
        url: '/keyguard/catalogs',
        method: 'post',
        data
    })
}
export function selectData (query) {//查询单个服务列表
    return request({
        url: '/keyguard/catalogs/{catalogCode}',
        method: 'get',
        params: query
    })
}
export function deleteData (data) {//删除服务
    return request({
        url: '/keyguard/catalogs/' + data,
        method: 'delete',
    })
}
export function renewData (catalogCode, data) {//更新服务
    return request({
        url: '/keyguard/catalogs/' + catalogCode,
        method: 'patch',
        data
    })
}

export function selectRelation (query) {//查询关联的资源记录
    return request({
        url: '/keyguard/catalogs/' + query.catalogCode + '/endpoints',
        method: 'get',
        params: query
    })
}

export function addRelation (catalogCode, query, methods) {//授权资源
    let querys = {
        "catalogCode": catalogCode,
        "endpointCodes": query,
        "method": methods
    }
    return request({
        url: '/keyguard/catalogs/endpoints',
        method: 'post',
        data: querys
    })
}


// 服务目录code
// 1.为空值查询未被关联的资源
// 2.null查询全部资源
// 3.否则查询服务目录关联资源currentPage=1&pageSize=20&catalogCode=null
export function selectEndpoints (query) {//查询资源记录
    return request({
        url: '/keyguard/endpoints',
        method: 'get',
        params: query
    })
}
export function selectMenu (roleIds) {//查询角色对应的服务目录
    return request({
        url: `/keyguard/catalogs/options/${roleIds}`,
        method: 'get',
    })
}







