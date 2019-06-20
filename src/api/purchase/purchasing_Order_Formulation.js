import request from '@/utils/scc'

export function selectList(query) {//查询采购订单列表
  return request({
      url: '/orders',
      method: 'get',
      params: query,
  })
}
export function creatList(query) {//创建采购订单
  return request({
      url: '/orders',
      method: 'POST',
      data: query,
  })
}
export function handleList(query) {//操作采购订单, 只能提交、作废、关闭
  return request({
      url: '/orders/'+query.method+'/'+query.orderNumber,
      method: 'PATCH'
  })
}
export function selectOneList(query) {//查询单个采购订单
  return request({
      url: '/orders/{orderNumber}',
      method: 'get',
      params: query,
  })
}
export function deleteList(orderNumber) {//删除采购订单
  return request({
      url: '/orders/'+orderNumber,
      method: 'DELETE'
  })
}
export function updataList(query) {//更新采购订单
  return request({
      url: '/orders/'+query.orderNumber,
      method: 'PATCH',
      data: query,
  })
}
export function selectListItems(query) {//查询采购订单明细列表
  return request({
      url: '/orders/'+query.orderNumber+'/items',
      method: 'get',
      params: query,
  })
}
export function closedListItems(query) {//批量关闭采购订单明细
  return request({
      url: '/orders/'+query.orderNumber+'/items',
      method: 'PATCH',
      data:query.rowId
  })
}
