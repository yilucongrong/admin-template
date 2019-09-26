const _import = require('@/router/_import_prodection');//获取组件的方法
import { tree } from '@/utils/treeDate'
import Layout from '@/views/layout'
import EmptyTemplate from '@/views/layout/EmptyTemplate'

export function filterAsyncRouter (routerlist) {
    const routerlists = tree(routerlist)
    //获取路由信息
    function getRouter (routerlists) {
        routerlists.forEach(e => {
            // 删除无用属性
            delete e.catalogCode
            delete e.catalogOrder
            delete e.endpoints
            delete e.fullOrder

            // delete e.permName
            // delete e.id
            // delete e.parentId
            e.name = e.catalogName

            if (e.parentId === 0 || e.children) {//Layout组件特殊处理
                //路径为空时会因为undefind报错，给个默认值来解决
                e.path = e.url || 'nopath'
                if (e.url.split('/').length > 2) {
                    e.component = EmptyTemplate
                } else {
                    e.component = Layout
                }
                e.icon = 'setting-fill'

            } else {
                e.icon = 'circle'
                e.component = _import(e.url)
                //路径为空时会因为undefind报错，给个默认值来解决
                e.path = e.url.split('/')[2] || 'nopath'
            }
            // delete e.parentId
            delete e.url
            // if (e.redirect === '') {
            //   delete e.redirect
            // }

            if (e.icon !== '' && e.title !== '') { // 配置 菜单标题 与 图标
                e.meta = {
                    // title: e.catalogName 中文名称
                    // catalogEngName 英文名称
                    title: e.catalogEngName,
                    titleZh: e.catalogName,
                    icon: e.icon
                }
            }
            delete e.catalogName
            delete e.icon
            delete e.title
            // delete e.name//由于名字的存在导致named 错误 删掉
            if (e.children != null) {
                // 存在子路由就递归
                getRouter(e.children)
            }
        })
        return routerlists
    }
    const getRouters = getRouter(routerlists)
    // return asyncRouterMap

    return getRouters
}
