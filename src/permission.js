import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取token
import { filterAsyncRouter} from '@/utils/addRouter'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 进程配置

const whiteList = ['/login', '/auth-redirect'] // 没有重定向白名单
var getRouter
router.beforeEach(async(to, from, next) => {
    // 开始进度条
    NProgress.start()

    // 设置页面标题
    document.title = getPageTitle(to.meta.title)

    // 确定用户是否已登录
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
        // 如果已登录，请重定向到主页
        next({ path: '/' })
        NProgress.done()
        } else {
        // 确定用户是否通过GetMenu获取了菜单资源
        if (getRouter) {
            //如果getRouter存在直接下一步
            next()
        } else {
            try {
            // 获取用户信息
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            //通过命名空间调用user/GetMenu action
            const menus = await store.dispatch('user/GetMenu')
            
            getRouter = filterAsyncRouter(menus)//过滤菜单

            // 基于用户获取可访问的路由映射
            const accessRoutes = await store.dispatch('permission/generateRoutes', getRouter)

            // 动态添加可访问的路由
            router.addRoutes(accessRoutes)
            
            // 确保addroutes完整的hack方法
            // 设置replace:true，这样导航就不会留下历史记录。
            next({ ...to, replace: true })//解决刷新后出现空白
            // next()
            } catch (error) {
                // 删除token并转到登录页重新登录
                await store.dispatch('user/resetToken')
                Message.error(error || 'Has Error')
                next(`/login?redirect=${to.path}`)
                NProgress.done()
            }
        }
        }
    } else {
        /* has no token*/

        if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next()
        } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/login?redirect=${to.path}`)
        NProgress.done()
        }
    }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
