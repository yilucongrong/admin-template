// 会计周期接口
import request from '@/utils/request'

export function getData_a(query) {
    //会计周期信息查询
    return request({
        url: `/iwms/accounting`,
        method: 'get',
        params: query
    })
}
export function creatData_a(query) {
    //会计周期创建
    return request({
        url: `/iwms/accounting`,
        method: 'post',
        data: query
    })
}
export function deleteData_a(query) {
    //会计周期删除
    return request({
        url: `/iwms/accounting`,
        method: 'delete',
        data: query
    })
}
export function upData_a(query) {
    //会计周期更新
    return request({
        url: `/iwms/accounting`,
        method: 'patch',
        data: query
    })
}
export function changeData_a(query) {
    //会计周期开启关闭
    return request({
        url: `/iwms/accounting/${query.rowId}`,
        method: 'PATCH',
        data: query
    })
}
export function Carry(accountingYears) {
    //会计周期结转
    return request({
        url: `/iwms/accounts/period`,
        method: 'post',
        params: {
            accountingYears: accountingYears
        }
    })
}
