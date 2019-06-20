import request from '@/utils/scc'

export function getDelivery(query) {//获取交货单
    return request({
        url: `/scc/bl/${query.supplierCode}`,
        method: 'get',
        params: query
    })
  }

export function getDeliveryDetail(query) {//获取交货单物料详情
    return request({
        url: `/scc/bl/${query.supplierCode}/${query.orderNumber}`,
        method: 'get',
        params: query
    })
}

export function updateDelivery(datas) {//更新交货单

  return request({
      url: `/scc/bl/${datas.supplierCode}/${datas.orderNumber}`,
      method: 'PATCH',
      data: datas,
  })
}

export function deleteDelivery(query) {//删除交货单
    return request({
        url: `/scc/bl/${query.supplierCode}/${query.orderNumber}`,
        method: 'delete',
        params: query
    })
  }

