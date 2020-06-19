import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)

/**图标分类功能*/
// const typeSvg = (arr) => {
//     return requireAll(arr).map((e) => {
//         //返回完整的图标名称
//         return e.default.id.slice(5)
//     })
// }

// const system = require.context('./svg/system', false, /\.svg$/)
// const database = require.context('./svg/database', false, /\.svg$/)
// const mes = require.context('./svg/mes', false, /\.svg$/)
// const ems = require.context('./svg/ems', false, /\.svg$/)
// const wms = require.context('./svg/wms', false, /\.svg$/)
// const srm = require.context('./svg/srm', false, /\.svg$/)
// const spm = require.context('./svg/spm', false, /\.svg$/)
// const other = require.context('./svg', false, /\.svg$/)

// let getSVG = []
// const allSvg = {
//     system: typeSvg(system),
//     database: typeSvg(database),
//     mes: typeSvg(mes),
//     ems: typeSvg(ems),
//     wms: typeSvg(wms),
//     srm: typeSvg(srm),
//     spm: typeSvg(spm),
//     other: typeSvg(other),
// }
// const typeName = {
//     system: '系统管理',
//     database: '基础数据',
//     mes: 'MES',
//     ems: 'EMS',
//     wms: 'WMS',
//     srm: 'SRM',
//     spm: 'SPM',
//     other: 'OTHER',
// }
// for (const key in allSvg) {
//     if (allSvg.hasOwnProperty(key)) {
//         if (allSvg[key]) {
//             getSVG.push({
//                 label: key,
//                 // name: typeName[key],
//                 id: 1,
//                 children: allSvg[key].map((e) => {
//                     if (e) {
//                         return {
//                             label: e,
//                         }
//                     }
//                 }),
//             })
//         }
//     }
// }
requireAll(req)
//获取所有icons文件夹下面的svg文件
let getSVG = requireAll(req).map((e) => {
    //返回完整的图标名称
    return e.default.id.slice(5)
})
export default getSVG
