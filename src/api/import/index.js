import request from '@/utils/request'

//导出excel模板
export function downloadModal(excelCode){
    return request({
        url: `/iwms/excels/${excelCode}/template`,
        method: 'post',
        responseType: 'blob'
    })
}

//导出excel文件
export function downloadExcel(excelCode,params){
    return request({
        url: `/iwms/excels/${excelCode}/export`,
        method: 'post',
        responseType: 'blob',
        params
    })
}

//上传excel文件
export function uploadExcel(excelCode,fileFormData){
    console.log(fileFormData);
    return request({
        url: `/iwms/excels/${excelCode}/import`,
        method: 'post',
        headers:{'Content-Type':'multipart/form-data'},
        data:fileFormData
        ,transformRequest: [function (data) {
          const formData = new FormData()
          for (const key of Object.keys(data)) {
            if(key==='raw'){
                formData.append("file", fileFormData[key])
            }
          }
          return formData
        }]
    })
}