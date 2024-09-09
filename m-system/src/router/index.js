// 定义路由表
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('../views/other/main.vue'),
    },
    // { path: '/applypage', name: 'applypage',component: () => import('../views/other/applypage.vue') },
    { path: '/apply/breach', name: 'breach',component: () => import('../views/other/breach.vue') },
    { path: '/apply/rebirth', name: 'rebirth',component: () => import('../views/other/rebirth.vue') },

    { path: '/searchpage', name: 'searchpage',component: () => import('../views/other/searchpage.vue') },
    { path: '/checkpage', name: 'checkpage',component: () => import('../views/other/checkpage.vue') },

    { path: '/addpage', name: 'addpage',component: () => import('../views/other/addpage.vue') },

    { path: '/chart/industry', name: 'industry',component: () => import('../views/other/industry.vue') },
    { path: '/chart/region', name: 'region',component: () => import('../views/other/region.vue') }
    // { path: '/chart', name: 'chart',component: () => import('../views/other/chart.vue') }
]
// 创建路由器
const router = createRouter({
    history: createWebHashHistory(),
    // history: createMemoryHistory(),
    routes
})
// 导出路由器
export default router
