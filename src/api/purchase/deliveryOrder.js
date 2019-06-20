import request from '@/utils/scc'

export function selectList(query) {//查询交货单列表
  return request({
      url: '/bl/'+query.supplierCode,
      method: 'get',
      params: query,
  })
}
export function creatList(query) {//创建交货单
  return request({
      url: '/bl/'+query.supplierCode,
      method: 'POST',
      data: query,
  })
}
export function deleteList(orderNumber) {//删除交货单
  return request({
      url: '/bl/{supplierCode}/{orderNumber}',
      method: 'DELETE'
  })
}
export function updataList(query) {//更新交货单
  return request({
      url: '/bl/{supplierCode}/{orderNumber}',
      method: 'PATCH',
      params: query,
  })
}
export function selectListItems1(query) {//查询交货单明细列表
  return request({
      url: '/bl/'+query.supplierCode+'/'+query.orderNumber+'/items',
      method: 'get',
      params: query,
  })
}
export function selectListItems2(query) {//查询已经确认的采购订单列表
  return request({
      url: '/bl/'+query.supplierCode+'/purchase-order',
      method: 'get',
      params: query,
  })
}
export function selectListItems3(query) {//查询采购订单明细列表
    return request({
        url: '/bl/'+query.supplierCode+'/purchase-order/'+query.orderNumber+'/items',
        method: 'get',
        params: query,
    })
  }
