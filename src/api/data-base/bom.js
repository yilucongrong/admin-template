import request from '@/utils/request'

// bom明细接口
export function getSlave_a(query) {
    //查询bom明细列表
    return request({
        url: `/mes/bom`,
        method: 'get',
        params: query
    })
}

export function creatSlave_a(data) {
    //新建bom明细列表
    return request({
        url: `/mes/bom/item`,
        method: 'post',
        data
    })
}
export function deleteSlave_a(data) {
    //删除bom明细列表
    return request({
        url: `/mes/bom/item`,
        method: 'delete',
        data
    })
}
export function getSlaveBy_a(data) {
    //根据id获取bom item
    return request({
        url: `/mes/bom/item`,
        method: 'delete',
        data
    })
}
export function updataSlave_a(data) {
    //修改bom item
    return request({
        url: `/mes/bom/item/${data.id}`,
        method: 'delete',
        data
    })
}

// bom主表接口
export function getMain_a(query) {
    //查询bom主表列表
    return request({
        url: `/mes/bom`,
        method: 'get',
        params: query
    })
}
export function creatMain_a(data) {
    //新建bom明细列表
    return request({
        url: `/mes/bom`,
        method: 'post',
        data
    })
}
export function deleteMain_a(data) {
    //批量删除bom
    return request({
        url: `/mes/bom`,
        method: 'delete',
        data
    })
}

export function getMainBy_a(data) {
    //根据id获取bom
    return request({
        url: `/mes//bom/${data.id}`,
        method: 'delete',
        data
    })
}
export function updataMainBy_a(data) {
    //更新bom
    return request({
        url: `/mes//bom/${data.id}`,
        method: 'delete',
        data
    })
}
export function invalidMainBy_a(data) {
    //作废bom
    return request({
        url: `/mes//bom/invalid`,
        method: 'delete',
        data
    })
}
export function publishMainBy_a(data) {
    //发布bom
    return request({
        url: `/mes//bom/publish`,
        method: 'delete',
        data
    })
}
