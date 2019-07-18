import request from '@/utils/request'

export function queryRecords(query) {
  return request({
    url: '/iwms/measure-units',
    method: 'get',
    params: query
  })
}

export function getRecord(colorCode) {
  return request({
    url: '/iwms/measure-units' + '/' + colorCode,
    method: 'get'
  })
}

export function addRecord(data) {
  return request({
    url: '/iwms/measure-units',
    method: 'post',
    data
  })
}

export function updateRecord(colorCode, data) {
  return request({
    url: '/iwms/measure-units' + '/' + colorCode,
    method: 'patch',
    data
  })
}

export function deleteRecord(colorCode) {
  return request({
    url: '/iwms/measure-units' + '/' + colorCode,
    method: 'delete'
  })
}
