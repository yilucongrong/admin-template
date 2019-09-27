import request from '@/utils/request'

export function selectlists (query) {//查询员工列表
    return request({
        url: '/keyguard/users',
        method: 'get',
        params: query
    })
}
export function creat (data) {//创建用户
    return request({
        url: '/keyguard/users',
        method: 'post',
        data
    })
}
export function selectlist (query) {//查询单个用户列表
    return request({
        url: '/keyguard/users/' + query,
        method: 'get',
        params: query
    })
}
export function deletelist (query) {//删除单个用户
    return request({
        url: '/keyguard/users/' + query,
        method: 'delete'
    })
}
export function updatalist (code, data) {//更新单个用户
    return request({
        url: '/keyguard/users/' + code,
        method: 'patch',
        data
    })
}
export function authorizationfun (userName, catalogs) {//功能授权
    return request({
        url: '/keyguard/users/' + userName + '/catalogs?catalogs=' + catalogs,
        method: 'post',
    })
}
export function authorizationrole (userName, code, methods) {//授权角色
    let codes = {
        "method": methods,
        "roleCodes": [code],
        "userName": userName
    }
    return request({
        url: '/keyguard/users/' + userName + '/roles',
        method: 'post',
        data: codes
    })
}

export function relation (userName, query) {//查询关联的角色记录 query.type=1关联  query.type=2 未关联
    return request({
        url: '/keyguard/users/' + userName + '/roles',
        method: 'get',
        params: query
    })
}
export function changeUserInfo (userDTO) {//修改用户信息
    console.log(userDTO, 22222)
    return request({
        url: `/keyguard/users/info`,
        method: 'patch',
        data: userDTO
    })
}
export function userAvatar (fileFormData) {//上传用户头像
    return request({
        url: `/keyguard/users/avatar`,
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: fileFormData
    })
}
export function getUserAvatar () {//获取用户头像
    return request({
        url: `/keyguard/users/avatar`,
        method: 'get',
        responseType: 'arraybuffer',
    })
}







