import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

//获取所有icons文件夹下面的svg文件
let getSVG = requireAll(req).map((e) => {
    //返回完整的图标名称
    return e.default.id.slice(5)
})
export default getSVG
