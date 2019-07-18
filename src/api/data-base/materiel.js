import request from '@/utils/request'

export function queryRecords(query) {
  return request({
    url: '/iwms/materiels',
    method: 'get',
    params: query
  })
}

export function getRecord(supplierCode) {
  return request({
    url: '/iwms/materiels' + '/' + supplierCode,
    method: 'get'
  })
}

export function addRecord(data) {
  return request({
    url: '/iwms/materiels',
    method: 'post',
    data
  })
}

export function updateRecord(supplierCode, data) {
  return request({
    url: '/iwms/materiels' + '/' + supplierCode,
    method: 'patch',
    data
  })
}

export function deleteRecord(supplierCode) {
  return request({
    url: '/iwms/materiels' + '/' + supplierCode,
    method: 'delete'
  })
}
