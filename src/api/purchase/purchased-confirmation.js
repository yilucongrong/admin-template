import scc from '@/utils/scc'

export function queryRecords(query) {  //查询采购订单
  return scc({
    url: '/'+query.supplierCode+'/orders',
    method: 'get',
    params:query
   
  })
}

export function queryRecords1(query) { //查询采购订单明细
 
  return scc({
    url: '/'+query.supplierCode+'/orders'+'/'+query.orderNumber+'/items',
    method: 'get',
    params:query
   
  })
}

export function confirm(query) {  //操作采购订单
  return scc({
    url: '/'+query.supplierCode+'/'+query.method+'/'+query.orderNumber,
    method: 'patch',
    params:query
   
  })
}

export function updateRecord(supplierCode,orderNumber,data1) { //批量更新采购订单明细
  // let data2=[]
  // data2[0]=data1
  
  return scc({
    url: '/'+supplierCode+'/orders'+'/'+orderNumber+'/items',
    method: 'patch',
    data:data1
  
  })
}


