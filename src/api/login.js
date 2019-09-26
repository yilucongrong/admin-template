import request from '@/utils/request'

export function getTokenId (jwtAuthDTO) {
    return request({
        url: '/keyguard/auth/tokens',
        method: 'post',
        data: jwtAuthDTO//data所传数据放在body里 param数据放在url路径里
    })
}
export function getCatalog (name) {
    return request({
        url: '/keyguard/auth/catalog?name=' + name,//`/keyguard/auth/catalog?name='${name}`
        method: 'get',
    })
}

export function logout () {
    return request({
        url: '/keyguard/login/logout',
        method: 'post'
    })
}

export function changePassword (userName, data) {
    return request({
        url: '/users/' + userName + '/password/',
        method: 'post',
        data
    })
}