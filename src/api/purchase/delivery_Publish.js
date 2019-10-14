import request from '@/utils/scc'

export function getDelivery(query) {//获取交货单
    return request({
        url: `/bl/${query.supplierCode}`,
        method: 'get',
        params: query
    })
  }

export function getDeliveryDetail(query) {//获取交货单物料详情
    return request({
        url: `/bl/${query.supplierCode}/${query.orderNumber}`,
        method: 'get',
        params: query
    })
}

export function updateDelivery(datas) {//更新交货单
  console.log(datas)
  return request({
      url: `/bl/${datas.supplierCode}/${datas.orderNumber}`,
      method: 'PATCH',
      data: datas,
  })
}

export function deleteDelivery(query) {//删除交货单
    console.log(query)
    return request({
        url: `/bl/${query.supplierCode}/${query.orderNumber}`,
        method: 'delete',
        params: query
    });
}

export function createPackTag(data) {//创建包装标签
    return request({
        url: `/bl/label`,
        method: 'post',
        data
    });
}

export function queryPackTag(query) {//查询包装标签
    let querystring = '';
    querystring+=`materielCode=${query.materielCode}`;
    querystring+=`&orderNumber=${query.orderNumber}`;
    for(let i = 0;i<query.orderNumbers.length;i++){
        querystring += `&orderNumbers=${query.orderNumbers[i]}`
    }
    for(let i = 0;i<query.barcodeRuleDetails.length;i++){
        querystring += `&barcodeRuleDetails=${query.barcodeRuleDetails[i]}`
    }
    console.log(1111,querystring);
    return request({
        url: `/bl/label?${querystring}`,
        method: 'get'
    })
}

export function updatePackTag(data) {//更新包装标签;标签打印设置
    return request({
        url: `/bl/label`,
        method: 'patch',
        data
    })
}


