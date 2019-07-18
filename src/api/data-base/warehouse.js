import request from '@/utils/request'

export function queryRecords(query) {
  return request({
    url: '/iwms/warehouses',
    method: 'get',
    params: query
  })
}

export function getRecord(warehouseCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode,
    method: 'get'
  })
}

export function addRecord(data) {
  return request({
    url: '/iwms/warehouses',
    method: 'post',
    data
  })
}

export function updateRecord(warehouseCode, data) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode,
    method: 'patch',
    data
  })
}

export function deleteRecord(warehouseCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode,
    method: 'delete'
  })
}

export function listBatch(warehouseCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode + '/batches',
    method: 'get'
  })
}

export function addBatch(warehouseCode, data) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode + '/batches',
    method: 'post',
    data
  })
}

export function deleteBatch(warehouseCode, objectCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode + '/batches' + '/' + objectCode,
    method: 'delete'
  })
}


export function listMinus(warehouseCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode + '/minuses',
    method: 'get'
  })
}

export function addMinus(warehouseCode, data) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode + '/minuses',
    method: 'post',
    data
  })
}

export function deleteMinus(warehouseCode, objectCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode + '/minuses' + '/' + objectCode,
    method: 'delete'
  })
}


export function listArea(warehousesCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/' + '/areas',
    method: 'get'
  })
}

export function getArea(warehousesCode, areaCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas/' + areaCode,
    method: 'get'
  })
}

export function addArea(warehousesCode, data) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas',
    method: 'post',
    data
  })
}

export function updateArea(warehousesCode, areaCode, data) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas/' + areaCode,
    method: 'patch',
    data
  })
}

export function deleteArea(warehousesCode, areaCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas/' + areaCode,
    method: 'delete'
  })
}

export function listLocation(warehousesCode, areaCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas/' + areaCode + '/locations',
    method: 'get'
  })
}

export function getLocation(warehousesCode, areaCode, locationCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas/' + areaCode + '/locations/' + locationCode,
    method: 'get'
  })
}

export function addLocation(warehousesCode, areaCode, data) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas/' + areaCode + '/locations',
    method: 'post',
    data
  })
}

export function updateLocation(warehousesCode, areaCode, locationCode, data) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas/' + areaCode + '/locations/' + locationCode,
    method: 'patch',
    data
  })
}

export function deleteLocation(warehousesCode, areaCode, locationCode) {
  return request({
    url: '/iwms/warehouses' + '/' + warehousesCode + '/areas/' + areaCode + '/locations/' + locationCode,
    method: 'delete'
  })
}


export function queryLocation(warehouseCode,query) {//查询仓库库位列表
  return request({
    url: '/iwms/warehouses' + '/' + warehouseCode + '/locations/',
    method: 'get',
    params: query
  })
}
