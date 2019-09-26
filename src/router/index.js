import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout'

/* Router Modules */

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: { title: 'dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = []

const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

router.$addRoutes = (params) => {
    router.matcher = new Router({
        mode: 'history', //后端支持可开，去掉路径中的#
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    }).matcher
    router.addRoutes(params)
}
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
